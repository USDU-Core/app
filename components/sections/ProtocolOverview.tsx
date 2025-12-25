import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faShield,
	faExchangeAlt,
	faChartLine,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';

const features = [
	{
		icon: faShield,
		title: 'Non-Algorithmic Design',
		description:
			'Protocol-issued stablecoin backed by real assets, not complex algorithms or speculation.',
	},
	{
		icon: faExchangeAlt,
		title: 'USDC Convertibility',
		description:
			'Fully convertible to USDC on-chain, ensuring liquidity and maintaining peg stability.',
	},
	{
		icon: faChartLine,
		title: 'Fixed-Term Funding',
		description:
			'Offers 4-6% fixed-term funding rates for structured finance and credit markets.',
	},
	{
		icon: faUsers,
		title: 'DAO Governance',
		description:
			'Governed by a decentralized autonomous organization ensuring transparent decision-making.',
	},
];

export default function ProtocolOverview() {
	return (
		<section className="py-20 bg-usdu-card">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-usdu-black mb-6">
						Protocol Overview
					</h2>
					<p className="text-xl text-text-secondary max-w-3xl mx-auto">
						USDU represents a new paradigm in decentralized
						stablecoins, designed specifically for
						institutional-grade credit and structured finance
						applications.
					</p>
				</motion.div>

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
					{features.map((feature, index) => (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: index * 0.1 }}
							viewport={{ once: true }}
							className="bg-usdu-bg p-6 rounded-xl border border-usdu-surface hover:shadow-lg transition-shadow">
							<div className="w-12 h-12 bg-usdu-orange/10 rounded-lg flex items-center justify-center mb-4">
								<FontAwesomeIcon
									icon={feature.icon}
									className="w-6 h-6 text-usdu-orange"
								/>
							</div>
							<h3 className="text-lg font-semibold text-usdu-black mb-3">
								{feature.title}
							</h3>
							<p className="text-text-secondary text-sm leading-relaxed">
								{feature.description}
							</p>
						</motion.div>
					))}
				</div>

				{/* Key Stats */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-16 bg-gradient-to-r from-usdu-orange/5 to-usdu-orange/10 rounded-2xl p-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
						<div>
							<div className="text-2xl font-bold text-usdu-orange mb-2">
								$12.5M+
							</div>
							<div className="text-sm text-text-secondary">
								USDU Supply
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-usdu-orange mb-2">
								$1.7M+
							</div>
							<div className="text-sm text-text-secondary">
								DEX Liquidity
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-usdu-orange mb-2">
								$1.001
							</div>
							<div className="text-sm text-text-secondary">
								USDU Price
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-usdu-orange mb-2">
								4
							</div>
							<div className="text-sm text-text-secondary">
								Protocol Adapters
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
