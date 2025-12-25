import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChartLine, faCoins, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/Button';

const maturities = [
  {
    duration: '30 Days',
    apy: '3.8%',
    minAmount: '$10,000',
    totalLocked: '$2.1M',
    status: 'Available',
    description: 'Short-term funding for working capital and liquidity needs.',
  },
  {
    duration: '90 Days',
    apy: '4.5%',
    minAmount: '$25,000',
    totalLocked: '$5.8M',
    status: 'Available',
    description: 'Medium-term funding for seasonal operations and project financing.',
  },
  {
    duration: '180 Days',
    apy: '5.2%',
    minAmount: '$50,000',
    totalLocked: '$8.3M',
    status: 'Available',
    description: 'Extended-term funding for structured finance and asset development.',
  },
  {
    duration: '1 Year',
    apy: '6.1%',
    minAmount: '$100,000',
    totalLocked: '$12.5M',
    status: 'Limited',
    description: 'Long-term institutional funding for major credit facilities.',
  },
];

const upcomingMaturities = [
  { date: '2024-02-15', amount: '$850K', rate: '4.2%' },
  { date: '2024-02-28', amount: '$1.2M', rate: '4.5%' },
  { date: '2024-03-15', amount: '$2.1M', rate: '5.0%' },
  { date: '2024-03-30', amount: '$950K', rate: '4.8%' },
];

export default function MaturitiesPage() {
  return (
    <>
      <NextSeo
        title="Maturities - USDU Finance"
        description="Explore USDU fixed-term funding options with competitive rates from 30 days to 1 year. Institutional-grade structured finance solutions."
      />

      <div className="min-h-screen bg-usdu-bg pt-24">
        {/* Header */}
        <section className="py-16 bg-usdu-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-usdu-black mb-6">
                Fixed-Term Funding Maturities
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Predictable, fixed-rate funding options designed for institutional borrowers
                with terms ranging from 30 days to 1 year.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" href="/dashboard">
                  Launch App
                </Button>
                <Button variant="outline" size="lg" href="/transparency">
                  View Risk Metrics
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Available Maturities */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-usdu-black mb-4">Available Terms</h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Choose from our range of fixed-term funding options with competitive rates
                and institutional-grade security.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {maturities.map((maturity, index) => (
                <motion.div
                  key={maturity.duration}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-usdu-card p-8 rounded-xl border border-usdu-surface hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-usdu-black mb-2">{maturity.duration}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            maturity.status === 'Available'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {maturity.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-usdu-orange">{maturity.apy}</div>
                      <div className="text-sm text-text-secondary">Fixed APY</div>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-6">{maturity.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Minimum Amount</div>
                      <div className="font-semibold text-usdu-black">{maturity.minAmount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-text-secondary mb-1">Total Locked</div>
                      <div className="font-semibold text-usdu-black">{maturity.totalLocked}</div>
                    </div>
                  </div>

                  <Button 
                    href="/dashboard" 
                    className="w-full"
                    icon={<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />}
                  >
                    Get Funding
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Maturities */}
        <section className="py-16 bg-usdu-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-usdu-black mb-4">Upcoming Maturities</h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Track upcoming maturity events and plan your liquidity accordingly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-usdu-bg rounded-xl border border-usdu-surface overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-usdu-surface/50 text-sm font-medium text-text-secondary">
                  <div>Maturity Date</div>
                  <div>Amount</div>
                  <div>Rate</div>
                  <div>Status</div>
                </div>
                {upcomingMaturities.map((item, index) => (
                  <div key={item.date} className="grid grid-cols-4 gap-4 p-4 border-t border-usdu-surface">
                    <div className="flex items-center gap-2 text-usdu-black">
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4 text-usdu-orange" />
                      {item.date}
                    </div>
                    <div className="font-semibold text-usdu-black">{item.amount}</div>
                    <div className="text-usdu-orange font-medium">{item.rate}</div>
                    <div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-usdu-bg">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-usdu-black mb-4">How Fixed-Term Funding Works</h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Simple, transparent fixed-rate funding with institutional-grade security and compliance.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Select Term',
                  description: 'Choose your preferred funding duration and review the fixed APY rate for your term.',
                  icon: faCalendarAlt,
                },
                {
                  step: '2',
                  title: 'Lock Funds',
                  description: 'Deposit your collateral and receive USDU tokens at the agreed fixed rate.',
                  icon: faCoins,
                },
                {
                  step: '3',
                  title: 'Earn & Redeem',
                  description: 'Earn fixed returns throughout the term and redeem your principal plus interest at maturity.',
                  icon: faChartLine,
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-usdu-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FontAwesomeIcon icon={step.icon} className="w-8 h-8 text-usdu-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-usdu-black mb-4">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}