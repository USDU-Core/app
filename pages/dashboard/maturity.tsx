import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function MaturityPage() {
	return (
		<div className="space-y-8">
			{/* Header */}
			<div>
				<h1 className="text-3xl font-bold text-usdu-black mb-2">
					Maturity
				</h1>
				<p className="text-usdu-black">
					Manage repayment and rolling of existing positions. 
					Monitor upcoming maturities and optimize your position strategies.
				</p>
			</div>

			{/* Coming Soon Section */}
			<div className="bg-usdu-bg p-6 rounded-xl border border-usdu-surface">
				<div className="text-center">
					<div className="w-16 h-16 bg-usdu-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className="w-8 h-8 text-usdu-orange"
						/>
					</div>
					<h2 className="text-xl font-bold text-usdu-black mb-2">
						Coming Soon
					</h2>
					<p className="text-text-secondary">
						The maturity dashboard will help you manage repayment schedules
						and roll existing positions. View upcoming maturity dates and
						optimize your position strategies effectively.
					</p>
				</div>
			</div>
		</div>
	);
}