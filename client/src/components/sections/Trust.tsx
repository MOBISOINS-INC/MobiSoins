'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { TestimonialsColumn } from '../ui/testimonials-columns-1';

const testimonials = [
  {
    text: 'MobiSoins a transformé ma façon de gérer les soins de ma mère. L\'infirmière est arrivée en moins de 2 heures, qualifiée et professionnelle.',
    image: 'https://i.pravatar.cc/80?img=47',
    name: 'Marie Tremblay',
    role: 'Patiente, Montréal',
    stars: 5,
  },
  {
    text: 'En tant qu\'infirmière, MobiSoins me permet de choisir mes missions et de gagner 40% de plus qu\'en milieu hospitalier. La plateforme est intuitive.',
    image: 'https://i.pravatar.cc/80?img=32',
    name: 'Sarah Beauchamp',
    role: 'Infirmière OIIQ, Québec',
    stars: 5,
  },
  {
    text: 'Le matching IA est impressionnant — il a trouvé une infirmière spécialisée en soins post-opératoires disponible le soir même.',
    image: 'https://i.pravatar.cc/80?img=53',
    name: 'Pierre Gagnon',
    role: 'Aidant naturel, Laval',
    stars: 5,
  },
  {
    text: 'Après mon opération, j\'avais besoin de soins réguliers à domicile. MobiSoins a rendu ça simple et rassurant.',
    image: 'https://i.pravatar.cc/80?img=12',
    name: 'Lucie Fontaine',
    role: 'Patiente, Sherbrooke',
    stars: 5,
  },
  {
    text: 'La flexibilité des horaires est incroyable. Je peux accepter des missions selon mes disponibilités, c\'est parfait pour ma vie de famille.',
    image: 'https://i.pravatar.cc/80?img=20',
    name: 'Amina Diallo',
    role: 'Infirmière, Longueuil',
    stars: 5,
  },
  {
    text: 'Service rapide, professionnel et humain. L\'infirmière a su mettre mon père à l\'aise dès les premières minutes.',
    image: 'https://i.pravatar.cc/80?img=60',
    name: 'Robert Côté',
    role: 'Aidant, Brossard',
    stars: 5,
  },
  {
    text: 'MobiSoins m\'a permis de trouver une infirmière bilingue disponible rapidement. Un service vraiment adapté au Québec.',
    image: 'https://i.pravatar.cc/80?img=25',
    name: 'Jocelyne Ouellet',
    role: 'Patiente, Gatineau',
    stars: 5,
  },
  {
    text: 'Fini les longues attentes aux urgences pour des soins mineurs. MobiSoins est ma première option maintenant.',
    image: 'https://i.pravatar.cc/80?img=8',
    name: 'Thomas Bernard',
    role: 'Patient, Laval',
    stars: 5,
  },
  {
    text: 'Excellente expérience du début à la fin. Réservation en quelques clics, infirmière compétente et ponctuelle.',
    image: 'https://i.pravatar.cc/80?img=38',
    name: 'Nadia Rousseau',
    role: 'Patiente, Montréal',
    stars: 5,
  },
];

const firstColumn  = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn  = testimonials.slice(6, 9);

export const Trust = () => {
  const { t } = useLanguage();

  return (
    <section id="trust" className="relative py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            {t('trust.title')}
          </h2>
          <p className="text-lg max-w-xl font-light text-white/60">
            {t('trust.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[480px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
};
