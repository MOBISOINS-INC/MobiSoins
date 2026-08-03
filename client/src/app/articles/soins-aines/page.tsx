'use client';

import { ArticleLayout } from '../../../components/articles/ArticleLayout';
import type { ArticleData } from '../../../components/articles/ArticleLayout';

const article: { FR: ArticleData; EN: ArticleData } = {
  FR: {
    slug: 'soins-aines',
    tag: 'Tendance sant\u00e9',
    date: 'Mai 2026',
    title: 'Les avantages des soins \u00e0 domicile pour les a\u00een\u00e9s',
    subtitle: 'Et si la meilleure place pour vieillir n\u2019\u00e9tait pas l\u2019h\u00f4pital\u2026 mais tout simplement chez soi ? Aujourd\u2019hui, les soins \u00e0 domicile ne sont plus une alternative secondaire : ils deviennent une v\u00e9ritable r\u00e9volution silencieuse dans notre fa\u00e7on d\u2019accompagner les a\u00een\u00e9s.',
    readTime: '6 min',
    image: '/images/articles/soins-aines.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Pr\u00e9server l\u2019autonomie\u2026 r\u00e9ellement',
        content: [
          'Rester \u00e0 domicile permet aux a\u00een\u00e9s de conserver leurs rep\u00e8res, leurs habitudes et leur rythme de vie. Ce n\u2019est pas seulement du confort \u2014 c\u2019est un levier direct sur l\u2019estime de soi et la dignit\u00e9. On ne \u00ab place \u00bb plus une personne, on l\u2019accompagne l\u00e0 o\u00f9 elle vit.',
        ],
      },
      {
        title: '2. Une approche humaine et individualis\u00e9e',
        content: [
          'Contrairement aux milieux institutionnels souvent standardis\u00e9s, les soins \u00e0 domicile permettent une prise en charge adapt\u00e9e \u00e0 chaque personne. Chaque intervention devient cibl\u00e9e : soins infirmiers, suivi des maladies chroniques, pr\u00e9vention\u2026 tout est pens\u00e9 selon les besoins r\u00e9els.',
        ],
      },
      {
        title: '3. R\u00e9duction des hospitalisations \u00e9vitables',
        content: [
          'Les donn\u00e9es canadiennes montrent que plusieurs a\u00een\u00e9s pourraient \u00e9viter l\u2019h\u00e9bergement en \u00e9tablissement gr\u00e2ce \u00e0 un meilleur acc\u00e8s aux soins \u00e0 domicile, ce qui r\u00e9duit la pression sur le syst\u00e8me hospitalier.',
        ],
      },
      {
        title: '4. Un impact direct sur la sant\u00e9 mentale',
        content: [
          'Vieillir chez soi, c\u2019est rester dans un environnement familier, entour\u00e9 de souvenirs. Cela diminue significativement le stress, l\u2019anxi\u00e9t\u00e9 et favorise le bien-\u00eatre global.',
        ],
      },
      {
        title: '5. Une solution align\u00e9e avec les r\u00e9alit\u00e9s d\u2019aujourd\u2019hui',
        content: [
          'Avec le vieillissement rapide de la population canadienne, les soins \u00e0 domicile deviennent une r\u00e9ponse strat\u00e9gique pour maintenir les a\u00een\u00e9s en sant\u00e9 plus longtemps dans leur milieu de vie.',
        ],
      },
    ],
    sources: [
      {
        label: 'Institut canadien d\u2019information sur la sant\u00e9, 2023 \u2014 A\u00een\u00e9s en transition : cheminements dans le continuum des soins',
        url: 'https://www.cihi.ca/fr/aines-en-transition-cheminements-dans-le-continuum-des-soins',
      },
    ],
    conclusion: {
      title: 'Ce qu\u2019il faut retenir',
      content: [
        'Les soins \u00e0 domicile ne sont pas seulement pratiques \u2014 ils repr\u00e9sentent une transformation profonde du syst\u00e8me de sant\u00e9. Ils redonnent du pouvoir aux a\u00een\u00e9s, soutiennent les familles et permettent aux professionnels de sant\u00e9 d\u2019intervenir autrement : plus pr\u00e8s, plus humainement.',
        'Et si le futur des soins passait\u2026 par le retour \u00e0 la maison ?',
      ],
    },
  },
  EN: {
    slug: 'soins-aines',
    tag: 'Health Trend',
    date: 'May 2026',
    title: 'The Benefits of Home Care for Seniors',
    subtitle: 'What if the best place to age wasn\u2019t the hospital\u2026 but simply at home? Today, home care is no longer a secondary alternative: it\u2019s becoming a quiet revolution in how we support our seniors.',
    readTime: '6 min',
    image: '/images/articles/soins-aines.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Truly preserving autonomy',
        content: [
          'Staying at home allows seniors to maintain their routines, habits, and pace of life. It\u2019s not just about comfort \u2014 it\u2019s a direct lever for self-esteem and dignity. We no longer \u201Cplace\u201D a person somewhere; we support them where they live.',
        ],
      },
      {
        title: '2. A human and individualized approach',
        content: [
          'Unlike institutional settings that are often standardized, home care allows for personalized support tailored to each individual. Every intervention becomes targeted: nursing care, chronic disease monitoring, prevention\u2026 everything is designed around real needs.',
        ],
      },
      {
        title: '3. Reducing avoidable hospitalizations',
        content: [
          'Canadian data shows that many seniors could avoid institutional care through better access to home care, which reduces pressure on the hospital system.',
        ],
      },
      {
        title: '4. A direct impact on mental health',
        content: [
          'Aging at home means staying in a familiar environment, surrounded by memories. This significantly reduces stress and anxiety while promoting overall well-being.',
        ],
      },
      {
        title: '5. A solution aligned with today\u2019s realities',
        content: [
          'With the rapid aging of the Canadian population, home care is becoming a strategic response to keep seniors healthier for longer in their own living environment.',
        ],
      },
    ],
    sources: [
      {
        label: 'Canadian Institute for Health Information, 2023 \u2014 Seniors in Transition: Pathways Across the Continuum of Care',
        url: 'https://www.cihi.ca/fr/aines-en-transition-cheminements-dans-le-continuum-des-soins',
      },
    ],
    conclusion: {
      title: 'Key takeaway',
      content: [
        'Home care isn\u2019t just practical \u2014 it represents a profound transformation of the healthcare system. It empowers seniors, supports families, and allows healthcare professionals to intervene differently: closer, more humanely.',
        'What if the future of care meant\u2026 coming back home?',
      ],
    },
  },
};

export default function SoinsAinesPage() {
  return <ArticleLayout article={article} />;
}
