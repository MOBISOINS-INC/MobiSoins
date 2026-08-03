'use client';

import { ArticleLayout } from '../../../components/articles/ArticleLayout';
import type { ArticleData } from '../../../components/articles/ArticleLayout';

const article: { FR: ArticleData; EN: ArticleData } = {
  FR: {
    slug: 'telesante',
    tag: 'Innovation sant\u00e9',
    date: 'Mai 2026',
    title: 'Comment la t\u00e9l\u00e9sant\u00e9 transforme le suivi m\u00e9dical',
    subtitle: 'Et si consulter un professionnel de sant\u00e9 devenait aussi simple qu\u2019un appel vid\u00e9o ? La t\u00e9l\u00e9sant\u00e9 transforme aujourd\u2019hui le suivi m\u00e9dical en profondeur. Ce qui \u00e9tait autrefois une option devient maintenant une composante essentielle du syst\u00e8me de sant\u00e9 canadien.',
    readTime: '5 min',
    image: '/images/articles/telesante.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Un acc\u00e8s aux soins, sans fronti\u00e8res',
        content: [
          'La t\u00e9l\u00e9sant\u00e9 am\u00e9liore l\u2019acc\u00e8s aux services en \u00e9liminant les d\u00e9placements, surtout pour les personnes en r\u00e9gions \u00e9loign\u00e9es ou \u00e0 mobilit\u00e9 r\u00e9duite.',
        ],
      },
      {
        title: '2. Un suivi plus r\u00e9gulier et proactif',
        content: [
          'Les soins virtuels permettent un suivi plus fr\u00e9quent, avec des exp\u00e9riences positives rapport\u00e9es par la majorit\u00e9 des patients, renfor\u00e7ant la continuit\u00e9 des soins.',
        ],
      },
      {
        title: '3. Un gain de temps et d\u2019efficacit\u00e9',
        content: [
          'Moins d\u2019attente, moins de d\u00e9placements, et une meilleure utilisation des ressources du syst\u00e8me de sant\u00e9 \u2014 un avantage autant pour les patients que pour les professionnels.',
        ],
      },
      {
        title: '4. Une nouvelle relation patient-soignant',
        content: [
          'Le suivi devient plus accessible, plus continu et plus centr\u00e9 sur le patient, qui joue un r\u00f4le plus actif dans sa sant\u00e9.',
        ],
      },
    ],
    sources: [
      {
        label: 'T\u00e9l\u00e9sant\u00e9 Qu\u00e9bec, 2024 \u2014 Avantages et points de vigilance',
        url: 'https://telesantequebec.ca/wp-content/uploads/fiches_informatives/02-avantage_points_vigilance_072024.pdf',
      },
      {
        label: 'Institut canadien d\u2019information sur la sant\u00e9, 2022 \u2014 Soins virtuels au Canada',
        url: 'https://www.cihi.ca/sites/default/files/document/virtual-care-in-canada-strengthening-data-information-report-fr.pdf',
      },
    ],
    conclusion: {
      title: 'Ce qu\u2019il faut retenir',
      content: [
        'La t\u00e9l\u00e9sant\u00e9 ne remplace pas les soins en personne \u2014 elle les optimise. Elle incarne surtout une nouvelle vision : une sant\u00e9 plus connect\u00e9e, plus rapide et adapt\u00e9e aux r\u00e9alit\u00e9s d\u2019aujourd\u2019hui.',
      ],
    },
  },
  EN: {
    slug: 'telesante',
    tag: 'Health Innovation',
    date: 'May 2026',
    title: 'How Telehealth Is Transforming Medical Monitoring',
    subtitle: 'What if consulting a healthcare professional were as simple as a video call? Telehealth is now fundamentally transforming medical monitoring. What was once an option is becoming an essential component of the Canadian healthcare system.',
    readTime: '5 min',
    image: '/images/articles/telesante.jpg',
    fallbackImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    sections: [
      {
        title: '1. Access to care, without borders',
        content: [
          'Telehealth improves access to services by eliminating travel, especially for people in remote areas or with reduced mobility.',
        ],
      },
      {
        title: '2. More regular and proactive follow-up',
        content: [
          'Virtual care enables more frequent follow-ups, with positive experiences reported by the majority of patients, strengthening continuity of care.',
        ],
      },
      {
        title: '3. Saving time and improving efficiency',
        content: [
          'Less waiting, less travel, and better use of healthcare system resources \u2014 a benefit for both patients and professionals.',
        ],
      },
      {
        title: '4. A new patient-caregiver relationship',
        content: [
          'Follow-up becomes more accessible, more continuous, and more patient-centered, allowing the patient to play a more active role in their health.',
        ],
      },
    ],
    sources: [
      {
        label: 'T\u00e9l\u00e9sant\u00e9 Qu\u00e9bec, 2024 \u2014 Advantages and points of vigilance',
        url: 'https://telesantequebec.ca/wp-content/uploads/fiches_informatives/02-avantage_points_vigilance_072024.pdf',
      },
      {
        label: 'Canadian Institute for Health Information, 2022 \u2014 Virtual Care in Canada',
        url: 'https://www.cihi.ca/sites/default/files/document/virtual-care-in-canada-strengthening-data-information-report-fr.pdf',
      },
    ],
    conclusion: {
      title: 'Key takeaway',
      content: [
        'Telehealth doesn\u2019t replace in-person care \u2014 it optimizes it. Above all, it embodies a new vision: healthcare that is more connected, faster, and adapted to today\u2019s realities.',
      ],
    },
  },
};

export default function TelesantePage() {
  return <ArticleLayout article={article} />;
}
