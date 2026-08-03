'use client';

import { ArticleLayout } from '../../../components/articles/ArticleLayout';
import type { ArticleData } from '../../../components/articles/ArticleLayout';

const article: { FR: ArticleData; EN: ArticleData } = {
  FR: {
    slug: 'premiere-visite',
    tag: 'Guide pratique',
    date: 'Mai 2026',
    title: 'Comment bien se pr\u00e9parer \u00e0 sa premi\u00e8re visite avec MobiSoins',
    subtitle: 'Recevoir des soins infirmiers \u00e0 domicile, c\u2019est b\u00e9n\u00e9ficier d\u2019un suivi professionnel directement dans son environnement. Une premi\u00e8re visite bien pr\u00e9par\u00e9e permet d\u2019assurer des soins s\u00e9curitaires, efficaces et adapt\u00e9s.',
    readTime: '4 min',
    image: '/images/articles/premiere-visite.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Rassembler les informations essentielles',
        content: [
          'Avant la visite, pr\u00e9parez les documents suivants. Ces informations permettent une \u00e9valuation compl\u00e8te d\u00e8s le d\u00e9part.',
        ],
        list: [
          'Votre carte d\u2019assurance maladie',
          'Votre liste de m\u00e9dicaments \u00e0 jour',
          'Vos ordonnances ou r\u00e9sultats r\u00e9cents',
        ],
      },
      {
        title: '2. Pr\u00e9voir un espace adapt\u00e9',
        content: [
          'Un environnement calme, propre et bien \u00e9clair\u00e9 facilite les soins et am\u00e9liore la qualit\u00e9 de l\u2019intervention.',
        ],
      },
      {
        title: '3. Exprimer vos besoins clairement',
        content: [
          'D\u00e9crire vos sympt\u00f4mes, vos attentes et vos pr\u00e9occupations permet d\u2019adapter le plan de soins \u00e0 votre r\u00e9alit\u00e9.',
        ],
      },
      {
        title: '4. Comprendre ce que fait r\u00e9ellement une infirmi\u00e8re \u00e0 domicile',
        content: [
          'Une infirmi\u00e8re ne fait pas que des soins techniques. Elle \u00e9value votre condition de sant\u00e9, assure une surveillance clinique et adapte le plan de soins selon votre \u00e9volution.',
        ],
      },
    ],
    sources: [
      {
        label: 'Ordre des infirmi\u00e8res et infirmiers du Qu\u00e9bec (OIIQ), 2024 \u2014 Champ d\u2019exercice et activit\u00e9s r\u00e9serv\u00e9es',
        url: 'https://www.oiiq.org/pratique-professionnelle/exercice-infirmier/champ-exercice-activites-reservees',
      },
    ],
    conclusion: {
      title: 'Ce qu\u2019il faut retenir',
      content: [
        'Une premi\u00e8re visite bien pr\u00e9par\u00e9e permet un suivi plus structur\u00e9, plus humain et centr\u00e9 sur vos besoins r\u00e9els.',
        'Des soins professionnels, directement chez vous.',
      ],
    },
  },
  EN: {
    slug: 'premiere-visite',
    tag: 'Practical Guide',
    date: 'May 2026',
    title: 'How to Prepare for Your First Visit with MobiSoins',
    subtitle: 'Receiving home nursing care means benefiting from professional follow-up directly in your own environment. A well-prepared first visit ensures safe, effective, and personalized care.',
    readTime: '4 min',
    image: '/images/articles/premiere-visite.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Gather essential information',
        content: [
          'Before the visit, prepare the following documents. This information allows for a complete assessment from the start.',
        ],
        list: [
          'Your health insurance card',
          'Your up-to-date medication list',
          'Your prescriptions or recent test results',
        ],
      },
      {
        title: '2. Prepare a suitable space',
        content: [
          'A calm, clean, and well-lit environment facilitates care and improves the quality of the intervention.',
        ],
      },
      {
        title: '3. Express your needs clearly',
        content: [
          'Describing your symptoms, expectations, and concerns allows the care plan to be adapted to your reality.',
        ],
      },
      {
        title: '4. Understand what a home nurse actually does',
        content: [
          'A nurse doesn\u2019t just perform technical care. She evaluates your health condition, provides clinical monitoring, and adapts the care plan based on your progress.',
        ],
      },
    ],
    sources: [
      {
        label: 'Ordre des infirmi\u00e8res et infirmiers du Qu\u00e9bec (OIIQ), 2024 \u2014 Scope of practice and reserved activities',
        url: 'https://www.oiiq.org/pratique-professionnelle/exercice-infirmier/champ-exercice-activites-reservees',
      },
    ],
    conclusion: {
      title: 'Key takeaway',
      content: [
        'A well-prepared first visit leads to more structured, more human follow-up centered on your real needs.',
        'Professional care, delivered directly to your home.',
      ],
    },
  },
};

export default function PremiereVisitePage() {
  return <ArticleLayout article={article} />;
}
