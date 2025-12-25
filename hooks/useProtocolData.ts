import { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { ERC20ABI } from '@/lib/abis/erc/ERC20';
import { ICurveStableSwapNG } from '@/lib/abis/curve/ICurveStableSwapNG';
import { COINS, ADDRESSES } from '@/lib/addresses';

interface ProtocolData {
	usduSupply: string | null;
	dexLiquidity: string | null;
	usduPrice: string | null;
	isLoading: boolean;
	error: string | null;
}

export function useProtocolData(): ProtocolData {
	const [protocolData, setProtocolData] = useState<ProtocolData>({
		usduSupply: null,
		dexLiquidity: null,
		usduPrice: null,
		isLoading: true,
		error: null,
	});

	// Contract read calls
	const { data, error, isLoading } = useReadContracts({
		contracts: [
			// USDU Total Supply
			{
				address: COINS.USDU as `0x${string}`,
				abi: ERC20ABI,
				functionName: 'totalSupply',
			},
			// USDU balance in Curve pool (DEX Liquidity)
			{
				address: COINS.USDU as `0x${string}`,
				abi: ERC20ABI,
				functionName: 'balanceOf',
				args: [ADDRESSES.curveStableSwapNG_USDUUSDC_2 as `0x${string}`],
			},
			// USDC balance in Curve pool (for total liquidity calculation)
			{
				address: COINS.USDC as `0x${string}`,
				abi: ERC20ABI,
				functionName: 'balanceOf',
				args: [ADDRESSES.curveStableSwapNG_USDUUSDC_2 as `0x${string}`],
			},
			// USDU price from Curve (get_dy: from USDU to USDC, 1 USDU = ? USDC)
			{
				address:
					ADDRESSES.curveStableSwapNG_USDUUSDC_2 as `0x${string}`,
				abi: ICurveStableSwapNG,
				functionName: 'get_dy',
				args: [0n, 1n, BigInt(1e6)], // from token 0 (USDU) to token 1 (USDC), 1 USDU (1e6 wei)
			},
		],
		query: {
			enabled: true,
			refetchInterval: 30000, // Refresh every 30 seconds
		},
	});

	useEffect(() => {
		if (error) {
			setProtocolData((prev) => ({
				...prev,
				isLoading: false,
				error: error.message,
			}));
			return;
		}

		if (data && data.length === 4 && !isLoading) {
			try {
				const [
					usduSupplyResult,
					usduBalanceResult,
					usdcBalanceResult,
					priceResult,
				] = data;

				// Calculate USDU supply (formatted from 6 decimals)
				const usduSupply = usduSupplyResult.result
					? formatUnits(usduSupplyResult.result as bigint, 18)
					: null;

				// Calculate total DEX liquidity (USDU + USDC balance in pool)
				let dexLiquidity: string | null = null;
				if (usduBalanceResult.result && usdcBalanceResult.result) {
					const usduBalance = Number(
						formatUnits(usduBalanceResult.result as bigint, 18)
					);
					const usdcBalance = Number(
						formatUnits(usdcBalanceResult.result as bigint, 6)
					);
					dexLiquidity = (usduBalance + usdcBalance).toString();
				}

				// Calculate USDU price (how much USDC for 1 USDU)
				const usduPrice = priceResult.result
					? formatUnits(priceResult.result as bigint, 18)
					: null;

				setProtocolData({
					usduSupply,
					dexLiquidity,
					usduPrice,
					isLoading: false,
					error: null,
				});
			} catch (err) {
				setProtocolData((prev) => ({
					...prev,
					isLoading: false,
					error: `Error processing data: ${err instanceof Error ? err.message : 'Unknown error'}`,
				}));
			}
		} else {
			setProtocolData((prev) => ({
				...prev,
				isLoading,
			}));
		}
	}, [data, error, isLoading]);

	return protocolData;
}
