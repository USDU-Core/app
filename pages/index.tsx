import Hero from '@/components/sections/Hero';
import ProtocolOverview from '@/components/sections/ProtocolOverview';
import PrimaryApplications from '@/components/sections/PrimaryApplications';
import TransparencyRisk from '@/components/sections/TransparencyRisk';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
	return (
		<>
			<Hero />
			<ProtocolOverview />
			<PrimaryApplications />
			<TransparencyRisk />
			<About />
			<Contact />
		</>
	);
}
