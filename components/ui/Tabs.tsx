import {
	useState,
	useRef,
	useEffect,
	ReactNode,
	Children,
	cloneElement,
	isValidElement,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

interface TabsProps {
	children: ReactNode;
	selectedIndex?: number;
	onSelectionChange?: (index: number) => void;
	className?: string;
	showScrollButtons?: boolean;
}

interface TabProps {
	children: ReactNode;
	value?: any;
	className?: string;
}

export function Tab({ children, className = '' }: TabProps) {
	return <div className={className}>{children}</div>;
}

export default function Tabs({
	children,
	selectedIndex,
	onSelectionChange,
	className = '',
	showScrollButtons = true,
}: TabsProps) {
	const tabChildren = Children.toArray(children).filter(
		(child) => isValidElement(child) && child.type === Tab
	);

	const [internalSelectedIndex, setInternalSelectedIndex] = useState<number>(
		selectedIndex !== undefined ? selectedIndex : 0
	);
	const [showLeftButton, setShowLeftButton] = useState(false);
	const [showRightButton, setShowRightButton] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// Use controlled or uncontrolled mode
	const currentSelectedIndex =
		selectedIndex !== undefined ? selectedIndex : internalSelectedIndex;

	// Check if scroll buttons should be shown
	const checkScrollButtons = () => {
		if (!scrollContainerRef.current || !showScrollButtons) return;

		const container = scrollContainerRef.current;
		const canScrollLeft = container.scrollLeft > 0;
		const canScrollRight =
			container.scrollLeft <
			container.scrollWidth - container.clientWidth;

		setShowLeftButton(canScrollLeft);
		setShowRightButton(canScrollRight);
	};

	useEffect(() => {
		checkScrollButtons();

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', checkScrollButtons);
			return () =>
				container.removeEventListener('scroll', checkScrollButtons);
		}
	}, [tabChildren.length, showScrollButtons]);

	useEffect(() => {
		// Re-check scroll buttons when children change
		setTimeout(checkScrollButtons, 0);
	}, [tabChildren.length]);

	const handleTabClick = (index: number) => {
		if (selectedIndex === undefined) {
			setInternalSelectedIndex(index);
		}
		onSelectionChange?.(index);
	};

	const scroll = (direction: 'left' | 'right') => {
		if (!scrollContainerRef.current) return;

		const scrollAmount = 200;
		const newScrollLeft =
			direction === 'left'
				? scrollContainerRef.current.scrollLeft - scrollAmount
				: scrollContainerRef.current.scrollLeft + scrollAmount;

		scrollContainerRef.current.scrollTo({
			left: newScrollLeft,
			behavior: 'smooth',
		});
	};

	if (tabChildren.length === 0) {
		return null;
	}

	return (
		<div className={`relative ${className}`}>
			{/* Left scroll button */}
			{showScrollButtons && showLeftButton && (
				<button
					onClick={() => scroll('left')}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-colors"
					aria-label="Scroll left">
					<FontAwesomeIcon
						icon={faChevronLeft}
						className="w-3 h-3 text-usdu-black"
					/>
				</button>
			)}

			{/* Tabs container */}
			<div
				ref={scrollContainerRef}
				className="overflow-x-auto scrollbar-hide"
				style={{
					scrollbarWidth: 'none', // Firefox
					msOverflowStyle: 'none', // IE/Edge
				}}>
				<div className="flex space-x-3 w-max">
					{tabChildren.map((child, index) => {
						const isSelected = index === currentSelectedIndex;

						return (
							<button
								key={index}
								onClick={() => handleTabClick(index)}
								className={`
									px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0
									${
										isSelected
											? 'bg-usdu-orange text-white shadow-md'
											: 'bg-white text-usdu-black hover:bg-usdu-surface border border-usdu-surface'
									}
								`}>
								{isValidElement(child)
									? child.props.children
									: child}
							</button>
						);
					})}
				</div>
			</div>

			{/* Right scroll button */}
			{showScrollButtons && showRightButton && (
				<button
					onClick={() => scroll('right')}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full shadow-lg p-2 transition-colors"
					aria-label="Scroll right">
					<FontAwesomeIcon
						icon={faChevronRight}
						className="w-3 h-3 text-usdu-black"
					/>
				</button>
			)}

			{/* Custom CSS to hide scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
}
