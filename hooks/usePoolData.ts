import { useState, useEffect } from 'react';
import { useReadContracts } from 'wagmi';
import { ICurveStableSwapNG } from '@/lib/abis/curve/ICurveStableSwapNG';
import { erc20Abi, parseEther, parseUnits } from 'viem';
import { ADDRESS } from '@usdu-finance/usdu-core';
import { mainnet } from 'viem/chains';

interface PoolData {
	// Pool balances
	usdcBalance: bigint | null;
	usduBalance: bigint | null;

	// LP token info
	totalSupply: bigint | null;
	adapterLPBalance: bigint | null;
	adapterLPRatio: bigint | null;

	// Pool stats
	poolImbalance: boolean | null;
	usduPrice: bigint | null;

	// Loading states
	isLoading: boolean;
	error: string | null;
}

export function usePoolData(): PoolData {
	const [poolData, setPoolData] = useState<PoolData>({
		usdcBalance: null,
		usduBalance: null,
		totalSupply: null,
		adapterLPBalance: null,
		adapterLPRatio: null,
		poolImbalance: null,
		usduPrice: null,
		isLoading: true,
		error: null,
	});

	const poolAddress = ADDRESS[mainnet.id].curveStableSwapNG_USDUUSDC_2;
	const adapterAddress = ADDRESS[mainnet.id].usduCurveAdapterV1_1_USDC_2;

	// Contract read calls
	const { data, isError, isLoading } = useReadContracts({
		contracts: [
			// Pool balances
			{
				address: poolAddress,
				abi: ICurveStableSwapNG,
				functionName: 'balances',
				args: [0n], // USDC balance (index 0)
			},
			{
				address: poolAddress,
				abi: ICurveStableSwapNG,
				functionName: 'balances',
				args: [1n], // USDU balance (index 1)
			},
			// LP token total supply
			{
				address: poolAddress,
				abi: ICurveStableSwapNG,
				functionName: 'totalSupply',
			},
			// Adapter LP balance
			{
				address: poolAddress,
				abi: erc20Abi,
				functionName: 'balanceOf',
				args: [adapterAddress],
			},
			// USDU price from Curve (get_dy: from USDU to USDC, 1 USDU = ? USDC)
			{
				address: poolAddress,
				abi: ICurveStableSwapNG,
				functionName: 'get_dy',
				args: [1n, 0n, BigInt(1e18)], // from token 1 (USDU) to token 0 (USDC), 1 USDU (1e18 wei)
			},
		],
		query: {
			refetchInterval: 30000, // Refetch in seconds
		},
	});

	useEffect(() => {
		if (isLoading) {
			setPoolData((prev) => ({ ...prev, isLoading: true, error: null }));
			return;
		}

		if (isError || !data) {
			setPoolData((prev) => ({
				...prev,
				isLoading: false,
				error: 'Failed to fetch pool data',
			}));
			return;
		}

		const [usdcBalanceResult, usduBalanceResult, totalSupplyResult, adapterLPResult, priceResult] = data;

		// Check if all calls succeeded
		const allSuccess = [usdcBalanceResult, usduBalanceResult, totalSupplyResult, adapterLPResult, priceResult].every(
			(result) => result.status === 'success'
		);

		if (!allSuccess) {
			setPoolData((prev) => ({
				...prev,
				isLoading: false,
				error: 'Some contract calls failed',
			}));
			return;
		}

		const usdcBalance = usdcBalanceResult.result as bigint;
		const usduBalance = usduBalanceResult.result as bigint;
		const totalSupply = totalSupplyResult.result as bigint;
		const adapterLPBalance = adapterLPResult.result as bigint;

		// Calculate USDU price (how much USDC for 1 USDU)
		const usduPrice = priceResult.result ? (priceResult.result as bigint) : null;

		// Calculate ratio for adapter
		const adapterLPRatio = (adapterLPBalance * parseEther('1')) / totalSupply;

		// Calculate pool imbalance (check if USDU > 50% of pool)
		const totalValue = parseUnits(String(usdcBalance), 18 - 6) + usduBalance; // Assuming 1:1 value ratio
		const usduPercentage = totalValue > 0n ? (usduBalance * 100n) / totalValue : 0n;
		const poolImbalance = usduPercentage > 50n;

		setPoolData({
			usdcBalance,
			usduBalance,
			totalSupply,
			adapterLPBalance,
			adapterLPRatio,
			poolImbalance,
			usduPrice,
			isLoading: false,
			error: null,
		});
	}, [data, isError, isLoading]);

	return poolData;
}

export function usePoolStats() {
	const poolData = usePoolData();

	// Calculate additional stats
	const totalPoolValue = poolData.usdcBalance && poolData.usduBalance ? poolData.usdcBalance + poolData.usduBalance : null;

	const usduPercentage =
		totalPoolValue && totalPoolValue > 0n && poolData.usduBalance
			? Number((poolData.usduBalance * 10000n) / totalPoolValue) / 100 // 2 decimal precision
			: null;

	const usdcPercentage = usduPercentage !== null ? 100 - usduPercentage : null;

	const adapterLPPercentage =
		poolData.totalSupply && poolData.totalSupply > 0n && poolData.adapterLPBalance
			? Number((poolData.adapterLPBalance * 10000n) / poolData.totalSupply) / 100
			: null;

	return {
		...poolData,
		totalPoolValue,
		usduPercentage,
		usdcPercentage,
		adapterLPPercentage,
	};
}
