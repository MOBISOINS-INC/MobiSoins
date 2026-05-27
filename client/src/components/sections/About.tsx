'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Activity,
  ClipboardCheck,
  ShieldCheck,
  Users,
  TestTube,
  Building2,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export const About = () => {
  const { t } = useLanguage();

  const services = [
    { icon: <Heart className="w-5 h-5" />, titleKey: 'about.service1Title', descKey: 'about.service1Desc' },
    { icon: <Activity className="w-5 h-5" />, titleKey: 'about.service2Title', descKey: 'about.service2Desc' },
    { icon: <ClipboardCheck className="w-5 h-5" />, titleKey: 'about.service3Title', descKey: 'about.service3Desc' },
    { icon: <ShieldCheck className="w-5 h-5" />, titleKey: 'about.service4Title', descKey: 'about.service4Desc' },
    { icon: <Users className="w-5 h-5" />, titleKey: 'about.service5Title', descKey: 'about.service5Desc' },
    { icon: <TestTube className="w-5 h-5" />, titleKey: 'about.service6Title', descKey: 'about.service6Desc' },
    { icon: <Building2 className="w-5 h-5" />, titleKey: 'about.service7Title', descKey: 'about.service7Desc' },
  ];

  return (
    <section id="about" className="py-32 bg-background-light relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container-custom relative">
        {/* ── À propos ── */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
              {t('about.title')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-5">
            {(['description1', 'description2', 'description3'] as const).map((key, i) => (
              <motion.p
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-base text-gray-600 leading-relaxed text-center"
              >
                {t(`about.${key}`)}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ── Services ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-4">
              {t('about.servicesTitle')}
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('about.servicesIntro')}
            </p>
            <p className="mt-6 inline-block max-w-2xl mx-auto text-sm font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3">
              {t('about.insuranceNote')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-navy-900 mb-2">
                  {t(service.titleKey)}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(service.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
