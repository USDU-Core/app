import React, { useMemo, useState, useEffect } from 'react';
import { useModuleDataAll } from '@/hooks/useModulesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheckCircle,
	faHourglass,
	faTimesCircle,
	faClock,
	faExternalLinkAlt,
	faRefresh,
	faEye,
	faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import Accordion from '@/components/ui/Accordion';
import StatsCard from '@/components/ui/StatsCard';
import { mainnet } from 'viem/chains';
import { formatAddress } from '@/lib/utils';

export default function Modules() {
	const { modules, activeModules, history, isLoading, error } = useModuleDataAll(mainnet.id);
	const [showExpired, setShowExpired] = useState(false);
	const [, setTick] = useState(0);

	// Update countdown every second
	useEffect(() => {
		const interval = setInterval(() => {
			setTick((prev) => prev + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Group history by module
	const historyByModule = useMemo(() => {
		const grouped: Record<string, typeof history> = {};
		history.forEach((item) => {
			const moduleAddress = item.module.toLowerCase();
			if (!grouped[moduleAddress]) {
				grouped[moduleAddress] = [];
			}
			grouped[moduleAddress].push(item);
		});
		return grouped;
	}, [history]);

	// Create unified module list: real modules + synthetic modules from pending proposals
	const allModules = useMemo(() => {
		const moduleAddresses = new Set(modules.map((m) => m.module.toLowerCase()));
		const syntheticModules: typeof modules = [];

		// Find pending proposals without a module mapping and create synthetic modules
		Object.entries(historyByModule).forEach(([moduleAddress, items]) => {
			if (moduleAddresses.has(moduleAddress)) return;

			const latestItem = items[0];

			// Only create synthetic module if latest status is "Proposed" (pending)
			if (latestItem.kind === 'Proposed') {
				const now = BigInt(Math.floor(Date.now() / 1000));
				const syntheticModule: (typeof modules)[0] = {
					chainId: latestItem.chainId,
					module: latestItem.module,
					message: latestItem.message,
					messageUpdated: null,
					createdAt: latestItem.createdAt,
					updatedAt: latestItem.createdAt,
					expiredAt: latestItem.expiredAt || BigInt(0),
					txHash: latestItem.txHash,
					logIndex: latestItem.logIndex,
					blockheight: latestItem.blockheight,
					caller: latestItem.caller,
					isExpired: latestItem.expiredAt ? latestItem.expiredAt < now : false,
				};
				syntheticModules.push(syntheticModule);
			}
		});

		return [...modules, ...syntheticModules];
	}, [modules, historyByModule, history]);

	// Determine module status based on latest history
	const getModuleStatus = (module: (typeof allModules)[0]) => {
		const moduleHistory = historyByModule[module.module.toLowerCase()] || [];
		const latestHistory = moduleHistory[0];

		if (module.isExpired) {
			return { status: 'expired', label: 'Expired', color: 'text-gray-500', bgColor: 'bg-gray-100' };
		}

		if ((!module.isExpired && latestHistory?.kind === 'Revoked') || latestHistory?.kind === 'Set') {
			return { status: 'active', label: 'Active', color: 'text-green-600', bgColor: 'bg-green-100' };
		}

		if (latestHistory?.kind === 'Proposed') {
			return { status: 'pending', label: 'Pending', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
		}

		if (latestHistory?.kind === 'Revoked') {
			return { status: 'revoked', label: 'Revoked', color: 'text-red-600', bgColor: 'bg-red-100' };
		}

		return { status: 'unknown', label: 'Unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
	};

	// Sort modules: pending first, then active, then revoked, then expired
	const sortedModules = useMemo(() => {
		return [...allModules].sort((a, b) => {
			const statusA = getModuleStatus(a);
			const statusB = getModuleStatus(b);

			const statusOrder = { pending: 0, active: 1, revoked: 3, expired: 4, unknown: 5 };
			return (
				statusOrder[statusA.status as keyof typeof statusOrder] -
				statusOrder[statusB.status as keyof typeof statusOrder]
			);
		});
	}, [allModules, historyByModule]);

	// Filter modules based on showExpired state
	const displayedModules = useMemo(() => {
		if (showExpired) return sortedModules;
		return sortedModules.filter((m) => !m.isExpired);
	}, [sortedModules, showExpired]);

	const formatTimestamp = (timestamp: bigint) => {
		const date = new Date(Number(timestamp) * 1000);
		return date.toLocaleString();
	};

	const formatDate = (timestamp: bigint) => {
		const date = new Date(Number(timestamp) * 1000);
		return date.toLocaleDateString();
	};

	const formatTime = (timestamp: bigint) => {
		const date = new Date(Number(timestamp) * 1000);
		return date.toLocaleTimeString();
	};

	const getTimelockStatus = (createdAt: bigint, timelock: bigint | null) => {
		if (!timelock) return null;

		const timelockEndTime = Number(createdAt) + Number(timelock);
		const now = Math.floor(Date.now() / 1000);
		const isPast = now >= timelockEndTime;

		if (isPast) {
			// Show the actual date/time when timelock ended
			return {
				isPast: true,
				display: formatTimestamp(BigInt(timelockEndTime)),
			};
		} else {
			// Show countdown
			const remaining = timelockEndTime - now;
			const hours = Math.floor(remaining / 3600);
			const minutes = Math.floor((remaining % 3600) / 60);
			const seconds = remaining % 60;

			return {
				isPast: false,
				display: `${hours}h ${minutes}m ${seconds}s remaining`,
			};
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'active':
				return faCheckCircle;
			case 'pending':
				return faHourglass;
			case 'expired':
				return faTimesCircle;
			case 'revoked':
				return faTimesCircle;
			default:
				return faClock;
		}
	};

	const getKindBadge = (kind: 'Proposed' | 'Revoked' | 'Set') => {
		const badges = {
			Proposed: { color: 'text-blue-700', bgColor: 'bg-blue-100', label: 'Proposed' },
			Set: { color: 'text-green-700', bgColor: 'bg-green-100', label: 'Set' },
			Revoked: { color: 'text-red-700', bgColor: 'bg-red-100', label: 'Revoked' },
		};
		const badge = badges[kind];
		return (
			<span className={`px-2 py-1 rounded text-xs font-medium ${badge.bgColor} ${badge.color}`}>
				{badge.label}
			</span>
		);
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-12 space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-usdu-black mb-2">Modules</h1>
					<p className="text-text-secondary">Loading modules...</p>
				</div>
				<div className="flex items-center justify-center py-20">
					<FontAwesomeIcon icon={faRefresh} className="w-8 h-8 text-usdu-orange animate-spin" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-12 space-y-8">
				<div>
					<h1 className="text-3xl font-bold text-usdu-black mb-2">Modules</h1>
					<p className="text-text-secondary">Manage protocol modules and governance</p>
				</div>
				<div className="bg-red-50 border border-red-200 rounded-xl p-6">
					<p className="text-red-600">Error loading modules: {error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-12 space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-usdu-black mb-2">Modules</h1>
					<p className="text-text-secondary">
						Manage protocol modules using expiration-based proposals, review and revoke them during the
						timelock phase, or apply the changes after the timelock.
					</p>
				</div>
				{/* <button
					onClick={() => refetch()}
					className="px-4 py-2 bg-usdu-orange text-white rounded-lg hover:bg-usdu-orange/90 transition-colors flex items-center gap-2"
				>
					<FontAwesomeIcon icon={faRefresh} className="w-4 h-4" />
					Refresh
				</button> */}
			</div>

			{/* Stats */}
			<StatsCard
				stats={[
					{
						value: allModules.length,
						label: 'Total Modules',
						color: 'text-usdu-card',
					},
					{
						// value: allModules.filter((m) => getModuleStatus(m).status === 'active').length,
						// @dev: this used the activeModules to count, since a pending state changes on an active module, still counts to the active modules
						value: activeModules.length,
						label: 'Active Modules',
						color: 'text-green-400',
					},
					{
						value: allModules.filter((m) => getModuleStatus(m).status === 'pending').length,
						label: 'Pending Proposals',
						color: 'text-yellow-400',
					},
					{
						value: allModules.filter((m) => m.isExpired).length,
						label: 'Expired Modules',
						color: 'text-gray-400',
					},
				]}
			/>

			{/* Modules List */}
			<div className="space-y-4 max-w-7xl mx-auto">
				{displayedModules.length === 0 ? (
					<div className="bg-usdu-bg p-12 rounded-xl border border-usdu-surface text-center">
						<p className="text-text-secondary">
							{showExpired ? 'No modules found' : 'No active modules found'}
						</p>
					</div>
				) : (
					displayedModules.map((module) => {
						const status = getModuleStatus(module);
						const moduleHistory = historyByModule[module.module.toLowerCase()] || [];

						return (
							<div
								key={module.module}
								className="bg-usdu-bg rounded-xl border border-usdu-surface overflow-hidden"
							>
								{/* Module Header */}
								<div className="p-6">
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="text-lg font-semibold text-usdu-black">
													{module.message || 'Unnamed Module'}
												</h3>
												<span
													className={`px-3 py-1 rounded-full text-sm font-medium ${status.bgColor} ${status.color} flex items-center gap-2`}
												>
													<FontAwesomeIcon
														icon={getStatusIcon(status.status)}
														className="w-3 h-3"
													/>
													{status.label}
												</span>
											</div>
											<a
												href={`https://etherscan.io/address/${module.module}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-usdu-orange hover:text-usdu-orange/80 flex items-center gap-1 font-mono"
											>
												{formatAddress(module.txHash)}
												<FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
											</a>
											{module.messageUpdated && (
												<p className="text-sm text-usdu-black mb-2">
													<span className="font-medium">Update:</span> {module.messageUpdated}
												</p>
											)}
										</div>
									</div>

									{/* Module Details Grid */}
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
										<div>
											<p className="text-text-secondary mb-1">Last Updated</p>
											<p className="text-usdu-black font-medium">
												{formatTimestamp(module.updatedAt)}
											</p>
										</div>
										<div>
											<p className="text-text-secondary mb-1">Expires</p>
											<p className="text-usdu-black font-medium">
												{formatTimestamp(module.expiredAt)}
											</p>
										</div>
										<div>
											<p className="text-text-secondary mb-1">Transaction</p>
											<a
												href={`https://etherscan.io/tx/${module.txHash}`}
												target="_blank"
												rel="noopener noreferrer"
												className="text-usdu-orange hover:text-usdu-orange/80 flex items-center gap-1 font-mono"
											>
												{formatAddress(module.txHash)}
												<FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
											</a>
										</div>
									</div>
								</div>

								{/* Module History Accordion */}
								{moduleHistory.length > 0 && (
									<div className="border-t border-usdu-surface">
										<Accordion
											title={
												<div className="flex items-center justify-between w-full">
													<span className="font-medium text-usdu-black">
														History ({moduleHistory.length} events)
													</span>
												</div>
											}
										>
											<div className="space-y-4">
												{moduleHistory.map((historyItem, idx) => {
													const timelockStatus = getTimelockStatus(
														historyItem.createdAt,
														historyItem.timelock
													);

													return (
														<div
															key={`${historyItem.txHash}-${historyItem.logIndex}`}
															className={`pb-4 ${idx !== moduleHistory.length - 1 ? 'border-b border-usdu-surface' : ''}`}
														>
															<div className="flex items-start justify-between mb-3">
																<div className="flex items-center gap-3">
																	{getKindBadge(historyItem.kind)}
																	<span className="text-sm text-usdu-black font-medium">
																		{historyItem.message}
																	</span>
																</div>
																<div className="text-xs text-text-secondary text-right">
																	<div>{formatDate(historyItem.createdAt)}</div>
																	<div>{formatTime(historyItem.createdAt)}</div>
																</div>
															</div>
															<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
																<div className="order-1">
																	<p className="text-text-secondary mb-1">
																		Transaction
																	</p>
																	<a
																		href={`https://etherscan.io/tx/${historyItem.txHash}`}
																		target="_blank"
																		rel="noopener noreferrer"
																		className="text-usdu-orange hover:text-usdu-orange/80 flex items-center gap-1 font-mono"
																	>
																		{formatAddress(historyItem.txHash)}
																		<FontAwesomeIcon
																			icon={faExternalLinkAlt}
																			className="w-3 h-3"
																		/>
																	</a>
																</div>
																<div className="order-2">
																	<p className="text-text-secondary mb-1">Caller</p>
																	<p className="text-usdu-black font-mono">
																		{formatAddress(historyItem.caller)}
																	</p>
																</div>
																{historyItem.expiredAt && (
																	<div className="order-3">
																		<p className="text-text-secondary mb-1">
																			Expires At
																		</p>
																		<p className="text-usdu-black">
																			{formatTimestamp(historyItem.expiredAt)}
																		</p>
																	</div>
																)}
																{timelockStatus && (
																	<div className="order-4">
																		<p className="text-text-secondary mb-1">
																			{timelockStatus.isPast
																				? 'Timelock Ended'
																				: 'Timelock'}
																		</p>
																		<p
																			className={`${timelockStatus.isPast ? 'text-usdu-black' : 'text-yellow-600 font-medium'}`}
																		>
																			{timelockStatus.display}
																		</p>
																	</div>
																)}
															</div>
														</div>
													);
												})}
											</div>
										</Accordion>
									</div>
								)}
							</div>
						);
					})
				)}

				{/* Toggle Expired Modules Button */}
				{sortedModules.filter((m) => m.isExpired).length > 0 && (
					<div className="flex justify-center pt-6">
						<button
							onClick={() => setShowExpired(!showExpired)}
							className="px-6 py-3 bg-usdu-surface hover:bg-usdu-orange/10 border border-usdu-surface hover:border-usdu-orange/30 rounded-lg transition-colors flex items-center gap-2 text-usdu-black"
						>
							<FontAwesomeIcon icon={showExpired ? faEyeSlash : faEye} className="w-4 h-4" />
							{showExpired ? 'Hide' : 'Show'} Expired Modules (
							{sortedModules.filter((m) => m.isExpired).length})
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
