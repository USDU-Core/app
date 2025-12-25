import Hero from '@/components/sections/Hero';
import ProtocolOverview from '@/components/sections/ProtocolOverview';
import PrimaryApplications from '@/components/sections/PrimaryApplications';
import TransparencyRisk from '@/components/sections/TransparencyRisk';
import UnderstandingProtocol from '@/components/sections/UnderstandingProtocol';
import Contact from '@/components/sections/Contact';
import OperationalStructure from '@/components/sections/OperationalStructure';
import LiveMarkets from '@/components/sections/LiveMarkets';

export default function HomePage() {
	return (
		<>
			<Hero />
			<ProtocolOverview />
			<PrimaryApplications />
			<TransparencyRisk />
			<UnderstandingProtocol />
			<OperationalStructure />
			<LiveMarkets />
			<Contact />
		</>
	);
}
