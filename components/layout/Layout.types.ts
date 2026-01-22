import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface NavigationItem {
	name: string;
	href: string;
	icon?: IconProp;
	external?: boolean;
}

export interface LayoutProps {
	children: React.ReactNode;
}
