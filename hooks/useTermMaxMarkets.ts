import { ADDRESS } from '@usdu-finance/usdu-core';
import { useEffect, useState } from 'react';
import { mainnet } from 'viem/chains';

// Base interfaces for the API response
interface MarketContracts {
	routerAddr: string;
	marketAddr: string;
	underlyingAddr: string;
	collateralAddr: string;
	ftAddr: string;
	xtAddr: string;
	gtAddr: string;
}

interface FeeConfig {
	lendTakerFeeRatio: string;
	lendMakerFeeRatio: string;
	borrowTakerFeeRatio: string;
	borrowMakerFeeRatio: string;
	issueFtFeeRatio: string;
	issueFtFeeRef: string;
	redeemFeeRatio: string;
	mintGtFeeRatio: string;
	mintGtFeeRef: string;
}

interface Market {
	contracts: MarketContracts;
	symbol: string;
	isFixed: boolean;
	openTime: string;
	maturity: string;
	treasurer: string;
	defaultFeeConfig: FeeConfig;
	liquidationWindowSeconds: number;
	maxLtv: string;
	liquidationLtv: string;
	liquidatable: boolean;
	isEnabled: boolean;
	version: string;
}

interface AssetConfig {
	type: string;
	contractAddress: string;
	icon: string;
	name: string;
	displayName: string;
	issuer: string;
	symbol: string;
	decimals: number;
	maturity?: string | null;
	version: string | null;
}

interface GTConfig {
	contractAddress: string;
	icon: string;
	name: string;
	displayName: string;
	issuer: string;
	symbol: string;
	maxLtv: string;
	liquidationLtv: string;
	liquidatable: boolean;
	version: string;
}

interface OrderContracts {
	orderAddr: string;
	routerAddr: string;
	marketAddr: string;
}

interface OrderConfig {
	contracts: OrderContracts;
	symbol: string;
	makerAddress: string;
	makerIsVault: boolean;
	tags: string[];
	version: string;
}

interface OrderStats {
	orderAddress: string;
	borrowCapacityAmount: string;
	borrowCapacityUsdValue: number;
	lendCapacityAmount: string;
	lendCapacityUsdValue: number;
	borrowApy: number;
	leverageApy: number;
	leverageCapacityAmount: string;
	leverageCapacityUsdValue: number;
	leverageRatio: number;
}

interface Incentive {
	ft: {
		apr: number;
		apy: number;
		thirdPartyRewards: any[];
	};
	xt: {
		apr: number;
		apy: number;
		thirdPartyRewards: any[];
	};
	points: any[];
}

interface Collection {
	marketAddress: string;
	sortedOrderStats: OrderStats[];
	incentive: Incentive;
}

// Main API response interface
interface TermMaxAPIResponse {
	data: {
		network: string;
		chainId: number;
		assetConfigs: AssetConfig[];
		gtConfigs: GTConfig[];
		markets: Market[];
		orderConfigs: OrderConfig[];
		collections: Collection[];
	};
}

// Processed market type that combines all related data
export interface TermMaxMarket {
	// Core market data
	market: Market;

	// Related asset configurations
	underlying: AssetConfig | null;
	collateral: AssetConfig | null;
	ftToken: AssetConfig | null;
	xtToken: AssetConfig | null;

	// Related GT configuration
	gtConfig: GTConfig | null;

	// Related order configurations
	orderConfigs: OrderConfig[];

	// Collection data with borrow rates and capacity
	collection: Collection | null;

	// Computed fields for convenience
	isUSDUMarket: boolean;
	daysToMaturity: number | null;
	isExpired: boolean;
}

interface TermMaxMarketsData {
	markets: TermMaxMarket[];
	isLoading: boolean;
	error: string | null;
}

// Helper function to find asset config by contract address
function findAssetByAddress(assets: AssetConfig[], address: string): AssetConfig | null {
	return assets.find((asset) => asset.contractAddress.toLowerCase() === address.toLowerCase()) || null;
}

// Helper function to find GT config by contract address
function findGTByAddress(gtConfigs: GTConfig[], address: string): GTConfig | null {
	return gtConfigs.find((gt) => gt.contractAddress.toLowerCase() === address.toLowerCase()) || null;
}

// Helper function to find order configs by market address
function findOrdersByMarketAddress(orderConfigs: OrderConfig[], marketAddress: string): OrderConfig[] {
	return orderConfigs.filter((order) => order.contracts.marketAddr.toLowerCase() === marketAddress.toLowerCase());
}

// Helper function to find collection by market address
function findCollectionByMarketAddress(collections: Collection[], marketAddress: string): Collection | null {
	return collections.find((collection) => collection.marketAddress.toLowerCase() === marketAddress.toLowerCase()) || null;
}

// Helper function to calculate days to maturity
function calculateDaysToMaturity(maturityDate: string): number {
	const maturity = new Date(maturityDate);
	const now = new Date();
	const diffTime = maturity.getTime() - now.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper function to check if market involves USDU
function isUSDUInvolved(underlying: AssetConfig | null, collateral: AssetConfig | null): boolean {
	const usduAddress = ADDRESS[mainnet.id].usduStable.toLowerCase();
	if (!usduAddress) return false;

	return underlying?.contractAddress.toLowerCase() === usduAddress || collateral?.contractAddress.toLowerCase() === usduAddress;
}

// Main hook for fetching and processing TermMax markets data
export function useTermMaxMarkets(filterByUnderlying?: string[], chainId: number = 1): TermMaxMarketsData {
	const [data, setData] = useState<TermMaxMarketsData>({
		markets: [],
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		const fetchTermMaxMarkets = async () => {
			try {
				setData((prev) => ({ ...prev, isLoading: true, error: null }));

				const response = await fetch(
					`https://api.termmax.ts.finance/v2/market/list-with-collection?chainId=${chainId}&tags=borrow&includeInactive=false&sortBy=capacity&sortDirection=desc`,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);

				if (!response.ok) {
					throw new Error(`Failed to fetch TermMax data: ${response.statusText}`);
				}

				const apiData: TermMaxAPIResponse = await response.json();
				const { assetConfigs, gtConfigs, markets, orderConfigs, collections } = apiData.data;

				// Process markets and combine with related data
				let processedMarkets: TermMaxMarket[] = markets.map((market) => {
					const underlying = findAssetByAddress(assetConfigs, market.contracts.underlyingAddr);
					const collateral = findAssetByAddress(assetConfigs, market.contracts.collateralAddr);
					const ftToken = findAssetByAddress(assetConfigs, market.contracts.ftAddr);
					const xtToken = findAssetByAddress(assetConfigs, market.contracts.xtAddr);
					const gtConfig = findGTByAddress(gtConfigs, market.contracts.gtAddr);
					const relatedOrders = findOrdersByMarketAddress(orderConfigs, market.contracts.marketAddr);
					const collection = findCollectionByMarketAddress(collections || [], market.contracts.marketAddr);

					const daysToMaturity = calculateDaysToMaturity(market.maturity);
					const isExpired = daysToMaturity < 0;
					const isUSDUMarket = isUSDUInvolved(underlying, collateral);

					return {
						market,
						underlying,
						collateral,
						ftToken,
						xtToken,
						gtConfig,
						orderConfigs: relatedOrders,
						collection,
						isUSDUMarket,
						daysToMaturity,
						isExpired,
					};
				});

				// Filter by underlying addresses if specified
				if (filterByUnderlying && filterByUnderlying.length > 0) {
					processedMarkets = processedMarkets.filter((processedMarket) =>
						filterByUnderlying.some(
							(address) => processedMarket.underlying?.contractAddress.toLowerCase() === address.toLowerCase()
						)
					);
				}

				setData({
					markets: processedMarkets,
					isLoading: false,
					error: null,
				});
			} catch (error) {
				setData({
					markets: [],
					isLoading: false,
					error: error instanceof Error ? error.message : 'Unknown error occurred',
				});
			}
		};

		fetchTermMaxMarkets();
	}, [filterByUnderlying, chainId]);

	return data;
}

// Convenience hook specifically for USDU markets on Ethereum mainnet
export function useUSDUTermMaxMarkets(): TermMaxMarketsData {
	const allMarkets = useTermMaxMarkets(undefined, 1);

	return {
		...allMarkets,
		markets: allMarkets.markets.filter((market) => market.isUSDUMarket),
	};
}

// Convenience hook for active (non-expired) markets
export function useActiveTermMaxMarkets(filterByUnderlying?: string[], chainId: number = 1): TermMaxMarketsData {
	const allMarkets = useTermMaxMarkets(filterByUnderlying, chainId);

	return {
		...allMarkets,
		markets: allMarkets.markets.filter((market) => !market.isExpired),
	};
}
