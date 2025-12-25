import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { SOCIAL } from '@/lib/constants';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Community
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
            Connect with us and stay updated on the latest developments in the USDU ecosystem.
          </p>

          <div className="flex justify-center gap-8">
            <motion.a
              href={SOCIAL.Github_user}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-dark-card hover:bg-accent-orange/10 border border-dark-surface hover:border-accent-orange/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} className="w-8 h-8 text-text-secondary hover:text-accent-orange transition-colors" />
            </motion.a>

            <motion.a
              href={SOCIAL.Twitter}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-dark-card hover:bg-accent-orange/10 border border-dark-surface hover:border-accent-orange/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faXTwitter} className="w-8 h-8 text-text-secondary hover:text-accent-orange transition-colors" />
            </motion.a>

            <motion.a
              href={SOCIAL.Telegram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 bg-dark-card hover:bg-accent-orange/10 border border-dark-surface hover:border-accent-orange/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faTelegram} className="w-8 h-8 text-text-secondary hover:text-accent-orange transition-colors" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}