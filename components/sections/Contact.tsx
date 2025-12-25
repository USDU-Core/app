import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { SOCIAL } from '@/lib/constants';
import Button from '@/components/ui/Button';

const communityLinks = [
  {
    title: 'GitHub',
    description: 'Explore our open-source codebase and contribute to USDU protocol development.',
    url: SOCIAL.Github_user,
    icon: faGithub,
  },
  {
    title: 'Twitter',
    description: 'Follow us for the latest updates, announcements, and insights from the USDU team.',
    url: SOCIAL.Twitter,
    icon: faXTwitter,
  },
  {
    title: 'Telegram',
    description: 'Join our community discussion and get real-time support from our team.',
    url: SOCIAL.Telegram,
    icon: faTelegram,
  },
];

const externalResources = [
  {
    title: 'CoinGecko',
    description: 'View USDU market data and analytics',
    url: SOCIAL.Coingecko,
  },
  {
    title: 'DeFiLlama',
    description: 'Track USDU protocol metrics and TVL',
    url: SOCIAL.Defillama,
  },
  {
    title: 'DAO Governance',
    description: 'Participate in protocol governance',
    url: SOCIAL.Aragon,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-usdu-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-usdu-black mb-6">
            Join the USDU Community
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Connect with developers, institutional users, and the USDU team. Stay updated on protocol 
            developments, governance decisions, and ecosystem growth.
          </p>
        </motion.div>

        {/* Community Links */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {communityLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-usdu-bg p-8 rounded-xl border border-usdu-surface hover:shadow-lg transition-shadow group"
            >
              <div className="w-16 h-16 bg-usdu-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-usdu-orange/20 transition-colors">
                <FontAwesomeIcon icon={link.icon} className="w-8 h-8 text-usdu-orange" />
              </div>
              <h3 className="text-xl font-bold text-usdu-black mb-4">{link.title}</h3>
              <p className="text-text-secondary mb-6">{link.description}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-usdu-orange hover:text-opacity-80 font-medium"
              >
                Visit {link.title}
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* External Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-usdu-orange/5 to-usdu-orange/10 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-usdu-black mb-4">Additional Resources</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Explore USDU across different platforms and stay informed about protocol metrics, 
              market data, and governance activities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {externalResources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-usdu-card p-6 rounded-xl border border-usdu-surface hover:shadow-md transition-shadow group text-center"
              >
                <h4 className="text-lg font-bold text-usdu-black mb-2 group-hover:text-usdu-orange transition-colors">
                  {resource.title}
                </h4>
                <p className="text-text-secondary text-sm mb-4">{resource.description}</p>
                <div className="inline-flex items-center gap-2 text-usdu-orange text-sm font-medium">
                  Visit Platform
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="w-3 h-3" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-usdu-black mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Access the USDU protocol through our secure dashboard and start building 
            with institutional-grade stablecoin infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              href="/dashboard"
              icon={<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />}
            >
              Launch App
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              href="/transparency"
            >
              View Documentation
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}