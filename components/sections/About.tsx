import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faShield, faChartLine } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: faCoins,
    title: 'USDU Protocol',
    description: 'Access the next generation stablecoin with advanced stability mechanisms and yield optimization.',
  },
  {
    icon: faShield,
    title: 'Secure & Audited',
    description: 'Built with security-first principles and audited smart contracts for maximum protection.',
  },
  {
    icon: faChartLine,
    title: 'Yield Optimization',
    description: 'Maximize your returns with automated yield farming and liquidity provision strategies.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Built for the Future of Finance
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            USDU Finance provides a comprehensive platform for interacting with the USDU protocol, 
            offering advanced DeFi features with institutional-grade security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-dark-card p-8 rounded-2xl border border-dark-surface hover:border-accent-orange/30 transition-colors"
            >
              <div className="w-16 h-16 bg-accent-orange/10 rounded-xl flex items-center justify-center mb-6">
                <FontAwesomeIcon icon={feature.icon} className="w-8 h-8 text-accent-orange" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}