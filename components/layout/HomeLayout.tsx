import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUpRightFromSquare,
	faBars,
	faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { PROJECT, SOCIAL } from '@/lib/constants';
import Footer from './Footer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

interface NavigationItem {
	name: string;
	href: string;
	icon?: IconProp;
	external?: boolean;
}

const navigation: NavigationItem[] = [
	{ name: 'Maturities', href: '/maturities' },
	{ name: 'Transparency', href: '/transparency' },
	{ name: 'Governance', href: SOCIAL.Aragon, external: true },
];

interface HomeLayoutProps {
	children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="min-h-screen bg-usdu-bg text-text-primary">
			{/* Home Header */}
			<header className="fixed top-0 left-0 right-0 z-50 bg-usdu-card border-b border-usdu-surface">
				<div className="container mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<div className="flex items-center gap-4">
							<Link href="/">
								<Image
									src={'/assets/usdu-full-text-1024x346.png'}
									alt={PROJECT.name.split(' ')[0]}
									width={80}
									height={80}
									className="w-full h-auto object-contain"
								/>
							</Link>
						</div>

						{/* Desktop Navigation */}
						<nav className="hidden md:flex items-center space-x-8">
							{navigation.map((item) =>
								item.external ? (
									<a
										key={item.name}
										href={item.href}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-2 text-text-secondary hover:text-usdu-orange transition-colors text-sm font-medium">
										{item.icon && (
											<FontAwesomeIcon
												icon={item.icon}
												className="w-4 h-4"
											/>
										)}
										{item.name}
									</a>
								) : (
									<Link
										key={item.name}
										href={item.href}
										className="flex items-center gap-2 text-text-secondary hover:text-usdu-orange transition-colors text-sm font-medium">
										{item.icon && (
											<FontAwesomeIcon
												icon={item.icon}
												className="w-4 h-4"
											/>
										)}
										{item.name}
									</Link>
								)
							)}
						</nav>

						{/* Desktop CTA Button */}
						<div className="hidden md:flex items-center gap-4">
							<Link
								href="/dashboard"
								className="inline-flex items-center gap-2 bg-usdu-orange text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium">
								Launch App
								<FontAwesomeIcon
									icon={faArrowUpRightFromSquare}
									className="w-3 h-3"
								/>
							</Link>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={toggleMobileMenu}
							className="md:hidden p-2 text-text-secondary hover:text-usdu-orange transition-colors">
							<FontAwesomeIcon
								icon={isMobileMenuOpen ? faTimes : faBars}
								className="w-5 h-5"
							/>
						</button>
					</div>

					{/* Mobile Navigation */}
					{isMobileMenuOpen && (
						<div className="md:hidden mt-4 pb-4 border-t border-usdu-surface pt-4">
							<nav className="space-y-4">
								{navigation.map((item) =>
									item.external ? (
										<a
											key={item.name}
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 text-text-secondary hover:text-usdu-orange transition-colors text-sm font-medium"
											onClick={closeMobileMenu}>
											{item.icon && (
												<FontAwesomeIcon
													icon={item.icon}
													className="w-4 h-4"
												/>
											)}
											{item.name}
										</a>
									) : (
										<Link
											key={item.name}
											href={item.href}
											className="flex items-center gap-3 text-text-secondary hover:text-usdu-orange transition-colors text-sm font-medium"
											onClick={closeMobileMenu}>
											{item.icon && (
												<FontAwesomeIcon
													icon={item.icon}
													className="w-4 h-4"
												/>
											)}
											{item.name}
										</Link>
									)
								)}
								<Link
									href="/dashboard"
									className="inline-flex items-center gap-2 bg-usdu-orange text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors text-sm font-medium"
									onClick={closeMobileMenu}>
									Launch App
									<FontAwesomeIcon
										icon={faArrowUpRightFromSquare}
										className="w-3 h-3"
									/>
								</Link>
							</nav>
						</div>
					)}
				</div>
			</header>

			<main className="max-md:mt-18">{children}</main>

			<Footer />
		</div>
	);
}
