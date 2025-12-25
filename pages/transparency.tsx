import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faShieldAlt,
	faFileAlt,
	faExternalLinkAlt,
	faDownload,
	faEye,
	faLock,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/Button';

const riskMetrics = [
	{
		label: 'Total Value Locked',
		value: '$12.5M',
		change: '+2.1%',
		status: 'stable',
	},
	{
		label: 'Collateralization Ratio',
		value: '125%',
		change: '+0.8%',
		status: 'healthy',
	},
	{
		label: 'Reserve Coverage',
		value: '110%',
		change: '+1.2%',
		status: 'adequate',
	},
	{
		label: 'Liquidity Buffer',
		value: '15%',
		change: '-0.3%',
		status: 'strong',
	},
	{ label: 'Active Borrowers', value: '47', change: '+5', status: 'growing' },
	{
		label: 'Average Loan Size',
		value: '$265K',
		change: '+12%',
		status: 'stable',
	},
];

const auditReports = [
	{
		title: 'Q4 2023 Security Audit',
		auditor: 'Trail of Bits',
		date: 'December 2023',
		status: 'Completed',
		link: '#',
	},
	{
		title: 'Reserve Verification Report',
		auditor: 'Armanino LLP',
		date: 'January 2024',
		status: 'Completed',
		link: '#',
	},
	{
		title: 'Smart Contract Assessment',
		auditor: 'OpenZeppelin',
		date: 'November 2023',
		status: 'Completed',
		link: '#',
	},
];

const governanceMetrics = [
	{ label: 'Total Proposals', value: '23' },
	{ label: 'Active Voters', value: '156' },
	{ label: 'Participation Rate', value: '67%' },
	{ label: 'Treasury Balance', value: '$2.1M' },
];

export default function TransparencyPage() {
	return (
		<>
			<NextSeo
				title="Transparency - USDU Finance"
				description="Real-time transparency into USDU protocol metrics, risk controls, audit reports, and governance activities. Full institutional-grade disclosure."
			/>

			<div className="min-h-screen bg-usdu-bg pt-24">
				{/* Header */}
				<section className="py-16 bg-usdu-card">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center max-w-4xl mx-auto">
							<h1 className="text-4xl md:text-5xl font-bold text-usdu-black mb-6">
								Transparency & Risk Management
							</h1>
							<p className="text-xl text-text-secondary mb-8">
								Real-time protocol metrics, comprehensive audit
								reports, and transparent governance ensure
								institutional-grade accountability and risk
								management.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button size="lg" href="/dashboard">
									Live Dashboard
								</Button>
								<Button
									variant="outline"
									size="lg"
									href="https://aragon.usdu.finance"
									target="_blank"
									icon={
										<FontAwesomeIcon
											icon={faExternalLinkAlt}
											className="w-4 h-4"
										/>
									}>
									DAO Governance
								</Button>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Real-Time Metrics */}
				<section className="py-16">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-12">
							<h2 className="text-3xl font-bold text-usdu-black mb-4">
								Real-Time Protocol Metrics
							</h2>
							<p className="text-lg text-text-secondary max-w-3xl mx-auto">
								Live monitoring of all critical protocol health
								indicators and risk metrics.
							</p>
						</motion.div>

						<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
							{riskMetrics.map((metric, index) => (
								<motion.div
									key={metric.label}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="bg-usdu-card p-6 rounded-xl border border-usdu-surface">
									<div className="text-2xl font-bold text-usdu-orange mb-2">
										{metric.value}
									</div>
									<div className="text-sm font-medium text-usdu-black mb-2">
										{metric.label}
									</div>
									<div className="flex items-center gap-2">
										<span
											className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
											{metric.change}
										</span>
										<span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
											{metric.status}
										</span>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Audit Reports */}
				<section className="py-16 bg-usdu-card">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-12">
							<h2 className="text-3xl font-bold text-usdu-black mb-4">
								Security & Audit Reports
							</h2>
							<p className="text-lg text-text-secondary max-w-3xl mx-auto">
								Independent third-party audits ensure protocol
								security and reserve verification.
							</p>
						</motion.div>

						<div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
							{auditReports.map((report, index) => (
								<motion.div
									key={report.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="bg-usdu-bg p-6 rounded-xl border border-usdu-surface">
									<div className="w-12 h-12 bg-usdu-orange/10 rounded-lg flex items-center justify-center mb-4">
										<FontAwesomeIcon
											icon={faFileAlt}
											className="w-6 h-6 text-usdu-orange"
										/>
									</div>
									<h3 className="text-lg font-bold text-usdu-black mb-3">
										{report.title}
									</h3>
									<div className="space-y-2 mb-4">
										<div className="text-sm text-text-secondary">
											<span className="font-medium">
												Auditor:
											</span>{' '}
											{report.auditor}
										</div>
										<div className="text-sm text-text-secondary">
											<span className="font-medium">
												Date:
											</span>{' '}
											{report.date}
										</div>
										<div>
											<span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
												{report.status}
											</span>
										</div>
									</div>
									<button className="inline-flex items-center gap-2 text-usdu-orange hover:text-opacity-80 font-medium text-sm">
										<FontAwesomeIcon
											icon={faDownload}
											className="w-4 h-4"
										/>
										Download Report
									</button>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Governance Transparency */}
				<section className="py-16 bg-usdu-bg">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-12">
							<h2 className="text-3xl font-bold text-usdu-black mb-4">
								Governance Transparency
							</h2>
							<p className="text-lg text-text-secondary max-w-3xl mx-auto">
								Decentralized governance ensures transparent
								decision-making for all protocol parameters.
							</p>
						</motion.div>

						<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
								className="bg-usdu-card p-8 rounded-xl border border-usdu-surface">
								<h3 className="text-xl font-bold text-usdu-black mb-6">
									DAO Metrics
								</h3>
								<div className="grid grid-cols-2 gap-4">
									{governanceMetrics.map((metric) => (
										<div
											key={metric.label}
											className="text-center">
											<div className="text-2xl font-bold text-usdu-orange mb-1">
												{metric.value}
											</div>
											<div className="text-sm text-text-secondary">
												{metric.label}
											</div>
										</div>
									))}
								</div>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
								className="bg-usdu-card p-8 rounded-xl border border-usdu-surface">
								<h3 className="text-xl font-bold text-usdu-black mb-4">
									Recent Proposals
								</h3>
								<div className="space-y-4">
									<div className="border-b border-usdu-surface pb-3">
										<div className="text-sm font-medium text-usdu-black">
											Adjust Collateral Ratio
										</div>
										<div className="text-xs text-text-secondary">
											Passed • 89% approval
										</div>
									</div>
									<div className="border-b border-usdu-surface pb-3">
										<div className="text-sm font-medium text-usdu-black">
											Treasury Reallocation
										</div>
										<div className="text-xs text-text-secondary">
											Active • 67% approval
										</div>
									</div>
									<div>
										<div className="text-sm font-medium text-usdu-black">
											Risk Parameter Update
										</div>
										<div className="text-xs text-text-secondary">
											Draft • Under review
										</div>
									</div>
								</div>
							</motion.div>
						</div>

						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="text-center">
							<Button
								href="https://aragon.usdu.finance"
								target="_blank"
								size="lg"
								icon={
									<FontAwesomeIcon
										icon={faUsers}
										className="w-4 h-4"
									/>
								}>
								Participate in Governance
							</Button>
						</motion.div>
					</div>
				</section>

				{/* Risk Controls */}
				<section className="py-16 bg-usdu-card">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-12">
							<h2 className="text-3xl font-bold text-usdu-black mb-4">
								Risk Management Framework
							</h2>
							<p className="text-lg text-text-secondary max-w-3xl mx-auto">
								Comprehensive risk controls and monitoring
								systems ensure protocol stability and safety.
							</p>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-8">
							{[
								{
									icon: faShieldAlt,
									title: 'Multi-Signature Security',
									description:
										'Critical operations require multiple signatures with time-delay mechanisms for enhanced security.',
								},
								{
									icon: faEye,
									title: 'Continuous Monitoring',
									description:
										'Real-time monitoring of collateral ratios, liquidity levels, and market conditions.',
								},
								{
									icon: faLock,
									title: 'Emergency Controls',
									description:
										'Automated circuit breakers and emergency pause functions to protect against extreme events.',
								},
							].map((control, index) => (
								<motion.div
									key={control.title}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{ once: true }}
									className="bg-usdu-bg p-6 rounded-xl border border-usdu-surface text-center">
									<div className="w-16 h-16 bg-usdu-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
										<FontAwesomeIcon
											icon={control.icon}
											className="w-8 h-8 text-usdu-orange"
										/>
									</div>
									<h3 className="text-lg font-bold text-usdu-black mb-4">
										{control.title}
									</h3>
									<p className="text-text-secondary text-sm leading-relaxed">
										{control.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
