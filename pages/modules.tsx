import React, { useMemo } from 'react';
import { useModuleDataAll } from '@/hooks/useModulesData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { mainnet } from 'viem/chains';
import ModulesOverview from '@/components/sections/modules/ModulesOverview';
import ModulesList from '@/components/sections/modules/ModulesList';
import {
	groupHistoryByModule,
	createAllModules,
	sortModules,
	getModuleStatus,
} from '@/components/sections/modules/helpers';
import { NextSeo } from 'next-seo';
import { SEO } from '@/lib/constants';

export default function ModulesPage() {
	const { modules, activeModules, history, isLoading, error } = useModuleDataAll(mainnet.id);

	// Group history by module
	const historyByModule = useMemo(() => groupHistoryByModule(history), [history]);

	// Create unified module list: real modules + synthetic modules from pending proposals
	const allModules = useMemo(() => createAllModules(modules, historyByModule), [modules, historyByModule]);

	// Sort modules: pending first, then active, then revoked, then expired
	const sortedModules = useMemo(() => sortModules(allModules, historyByModule), [allModules, historyByModule]);

	// Helper function to get module status
	const getStatus = (module: (typeof allModules)[0]) => getModuleStatus(module, historyByModule);

	if (isLoading) {
		return (
			<>
				<NextSeo title={SEO.modules.title} description={SEO.modules.description} openGraph={SEO.modules.openGraph} />
				<section className="relative min-h-screen px-4 pt-32 text-center bg-usdu-card">
					<div>
						<h1 className="text-3xl font-bold text-usdu-black mb-2">Modules</h1>
						<p className="text-text-secondary">Loading modules...</p>
					</div>
					<div className="flex items-center justify-center py-20">
						<FontAwesomeIcon icon={faRefresh} className="w-8 h-8 text-usdu-orange animate-spin" />
					</div>
				</section>
			</>
		);
	}

	if (error) {
		return (
			<>
				<NextSeo title={SEO.modules.title} description={SEO.modules.description} openGraph={SEO.modules.openGraph} />
				<section className="relative min-h-screen px-4 pt-32 text-center bg-usdu-card">
					<div>
						<h1 className="text-3xl font-bold text-usdu-black mb-2">Modules</h1>
						<p className="text-text-secondary">Manage protocol modules and governance</p>
					</div>
					<div className="bg-red-50 border border-red-200 rounded-xl mt-12 p-6 md:mx-12">
						<p className="text-red-600">Error loading modules: {error}</p>
					</div>
				</section>
			</>
		);
	}

	return (
		<>
			<NextSeo title={SEO.modules.title} description={SEO.modules.description} openGraph={SEO.modules.openGraph} />

			<ModulesOverview allModules={allModules} activeModules={activeModules} getModuleStatus={getStatus} />
			<ModulesList sortedModules={sortedModules} historyByModule={historyByModule} getModuleStatus={getStatus} />
		</>
	);
}
