import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChartLine,
	faArrowUp,
	faArrowDown,
	faCircle,
} from '@fortawesome/free-solid-svg-icons';

export default function AnalyticsPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-usdu-black mb-2">
					Analytics
				</h1>
				<p className="text-text-secondary">
					Track protocol metrics and performance insights
				</p>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Chart Placeholder */}
				<div className="bg-dark-card p-6 rounded-xl border border-dark-surface">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-white">
							USDU Price
						</h3>
						<div className="flex items-center gap-2 text-green-400">
							<FontAwesomeIcon
								icon={faArrowUp}
								className="w-4 h-4"
							/>
							<span className="text-sm">+0.12%</span>
						</div>
					</div>
					<div className="flex items-center justify-center h-64 text-text-muted">
						<div className="text-center">
							<FontAwesomeIcon
								icon={faChartLine}
								className="w-16 h-16 mb-4"
							/>
							<p>Chart visualization coming soon</p>
						</div>
					</div>
				</div>

				{/* TVL Chart */}
				<div className="bg-dark-card p-6 rounded-xl border border-dark-surface">
					<div className="flex items-center justify-between mb-6">
						<h3 className="text-lg font-semibold text-white">
							Total Value Locked
						</h3>
						<div className="flex items-center gap-2 text-green-400">
							<FontAwesomeIcon
								icon={faArrowUp}
								className="w-4 h-4"
							/>
							<span className="text-sm">+8.2%</span>
						</div>
					</div>
					<div className="flex items-center justify-center h-64 text-text-muted">
						<div className="text-center">
							<FontAwesomeIcon
								icon={faChartLine}
								className="w-16 h-16 mb-4"
							/>
							<p>TVL trends coming soon</p>
						</div>
					</div>
				</div>
			</div>

			{/* Protocol Stats */}
			<div className="bg-dark-card p-6 rounded-xl border border-dark-surface">
				<h3 className="text-lg font-semibold text-white mb-6">
					Protocol Statistics
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div>
						<p className="text-text-muted text-sm mb-1">
							Circulating Supply
						</p>
						<p className="text-2xl font-bold text-white">
							8.7M USDU
						</p>
						<div className="flex items-center gap-2 mt-2">
							<FontAwesomeIcon
								icon={faCircle}
								className="w-2 h-2 text-green-400"
							/>
							<span className="text-green-400 text-sm">
								+2.1% this week
							</span>
						</div>
					</div>

					<div>
						<p className="text-text-muted text-sm mb-1">
							Market Cap
						</p>
						<p className="text-2xl font-bold text-white">$8.74M</p>
						<div className="flex items-center gap-2 mt-2">
							<FontAwesomeIcon
								icon={faCircle}
								className="w-2 h-2 text-green-400"
							/>
							<span className="text-green-400 text-sm">
								+2.2% this week
							</span>
						</div>
					</div>

					<div>
						<p className="text-text-muted text-sm mb-1">
							24h Volume
						</p>
						<p className="text-2xl font-bold text-white">$245K</p>
						<div className="flex items-center gap-2 mt-2">
							<FontAwesomeIcon
								icon={faCircle}
								className="w-2 h-2 text-red-400"
							/>
							<span className="text-red-400 text-sm">
								-5.3% today
							</span>
						</div>
					</div>

					<div>
						<p className="text-text-muted text-sm mb-1">
							Collateral Ratio
						</p>
						<p className="text-2xl font-bold text-white">142%</p>
						<div className="flex items-center gap-2 mt-2">
							<FontAwesomeIcon
								icon={faCircle}
								className="w-2 h-2 text-green-400"
							/>
							<span className="text-green-400 text-sm">
								Healthy
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Activity */}
			<div className="bg-dark-card p-6 rounded-xl border border-dark-surface">
				<h3 className="text-lg font-semibold text-white mb-6">
					Recent Protocol Activity
				</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-green-400/10 rounded-lg flex items-center justify-center">
								<FontAwesomeIcon
									icon={faArrowUp}
									className="w-4 h-4 text-green-400"
								/>
							</div>
							<div>
								<p className="text-white font-medium">
									Large Deposit
								</p>
								<p className="text-text-muted text-sm">
									USDU Core Vault
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-white">+$125K</p>
							<p className="text-text-muted text-sm">
								2 hours ago
							</p>
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-blue-400/10 rounded-lg flex items-center justify-center">
								<FontAwesomeIcon
									icon={faChartLine}
									className="w-4 h-4 text-blue-400"
								/>
							</div>
							<div>
								<p className="text-white font-medium">
									APY Update
								</p>
								<p className="text-text-muted text-sm">
									USDU-ETH LP
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-green-400">12.5% APY</p>
							<p className="text-text-muted text-sm">
								4 hours ago
							</p>
						</div>
					</div>

					<div className="flex items-center justify-between p-4 bg-dark-surface rounded-lg">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-orange-400/10 rounded-lg flex items-center justify-center">
								<FontAwesomeIcon
									icon={faCircle}
									className="w-4 h-4 text-orange-400"
								/>
							</div>
							<div>
								<p className="text-white font-medium">
									Price Update
								</p>
								<p className="text-text-muted text-sm">
									USDU Peg
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-white">$1.001</p>
							<p className="text-text-muted text-sm">
								6 hours ago
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
