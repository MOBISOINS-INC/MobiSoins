'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      question: t('faq.question5'),
      answer: t('faq.answer5')
    },
    {
      question: t('faq.question6'),
      answer: t('faq.answer6')
    },
    {
      question: t('faq.question7'),
      answer: t('faq.answer7')
    },
    {
      question: t('faq.question8'),
      answer: t('faq.answer8')
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="relative py-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-3 text-white" style={{ letterSpacing: '-0.03em' }}>
            {t('faq.title')}
          </h2>
          <p className="font-light text-lg mb-6 text-white/60">
            {t('faq.subtitle')}
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            <input
              type="text"
              placeholder={t('faq.searchPlaceholder')}
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-white/25 focus:ring-1 focus:ring-white/15 outline-none transition-all backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-dark !rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none hover:bg-white/[0.03] transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-base pr-4 text-white">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-white/45 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-white/45 flex-shrink-0" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-white/60 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-white/50 py-12">{t('faq.noResults')}</p>
          )}
        </div>
      </div>
    </section>
  );
};
