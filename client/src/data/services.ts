/**
 * Service catalog for the marketing site — mirrors the MobiSoins app catalog
 * (FrontendApp/src/data/mockServices.ts) and the official patient-facing
 * descriptions (FrontendApp/src/data/serviceDefinitions.ts). `short` is the
 * app's own wording; `long` + `points` expand it for the web detail page.
 *
 * These are general, non-clinical explanations — not medical advice.
 */

export interface ServiceDef {
  slug: string;
  nameFr: string; nameEn: string;
  shortFr: string; shortEn: string;
  longFr: string; longEn: string;
  pointsFr: string[]; pointsEn: string[];
}

export interface ServiceCategory {
  id: string;
  icon: 'nursing' | 'vaccination' | 'chronic' | 'checkup' | 'sexual' | 'pediatrics' | 'seniors' | 'analysis' | 'enterprises';
  nameFr: string; nameEn: string;
  services: ServiceDef[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'nursing', icon: 'nursing', nameFr: 'Soins infirmiers', nameEn: 'Nursing care',
    services: [
      { slug: 'pansements', nameFr: 'Pansements simples/complexes', nameEn: 'Simple & complex dressings',
        shortFr: 'Nettoyage et réfection de pansements pour des plaies simples ou complexes, afin de favoriser la guérison et de prévenir l’infection.',
        shortEn: 'Cleaning and redressing of wounds (simple or complex) to support healing and prevent infection.',
        longFr: 'L’infirmière évalue la plaie, la nettoie selon les protocoles cliniques et applique un pansement adapté. Elle surveille l’évolution de la guérison et ajuste les soins à chaque visite.',
        longEn: 'Your nurse assesses the wound, cleans it following clinical protocols, and applies the right dressing. She tracks healing and adjusts care at every visit.',
        pointsFr: ['Plaies post-opératoires, ulcères et brûlures mineures', 'Matériel stérile fourni', 'Surveillance des signes d’infection'],
        pointsEn: ['Post-op wounds, ulcers and minor burns', 'Sterile supplies provided', 'Monitoring for signs of infection'] },
      { slug: 'retrait-points', nameFr: 'Retrait de points', nameEn: 'Suture removal',
        shortFr: 'Retrait des points de suture ou des agrafes après une intervention, une fois la plaie cicatrisée.',
        shortEn: 'Removal of stitches or staples after a procedure, once the wound has healed.',
        longFr: 'Sans vous déplacer à la clinique, l’infirmière retire vos points ou agrafes en douceur et vérifie que la cicatrisation est complète.',
        longEn: 'Without a trip to the clinic, your nurse gently removes stitches or staples and confirms the wound has fully closed.',
        pointsFr: ['Après une chirurgie ou une suture à l’urgence', 'Vérification de la cicatrisation', 'Conseils pour la suite des soins'],
        pointsEn: ['After surgery or an ER suture', 'Healing check', 'Aftercare advice'] },
      { slug: 'catheters', nameFr: 'Cathéters', nameEn: 'Catheters',
        shortFr: 'Pose, entretien ou retrait d’un cathéter (intraveineux ou urinaire), selon la prescription.',
        shortEn: 'Insertion, maintenance, or removal of a catheter (IV or urinary), as prescribed.',
        longFr: 'L’infirmière pose, entretient ou retire votre cathéter en respectant les normes d’asepsie, et vous explique comment en prendre soin entre les visites.',
        longEn: 'Your nurse inserts, maintains or removes your catheter following strict aseptic standards, and shows you how to care for it between visits.',
        pointsFr: ['Cathéters intraveineux ou urinaires', 'Technique stérile', 'Enseignement à domicile'],
        pointsEn: ['IV or urinary catheters', 'Sterile technique', 'At-home guidance'] },
      { slug: 'medication-im-sc', nameFr: 'Médication IM/SC', nameEn: 'IM/SC medication',
        shortFr: 'Administration de médicaments par injection intramusculaire (IM) ou sous-cutanée (SC).',
        shortEn: 'Administering medication by intramuscular (IM) or subcutaneous (SC) injection.',
        longFr: 'Vos injections prescrites sont administrées à domicile, en toute sécurité, sans attente ni déplacement.',
        longEn: 'Your prescribed injections are given safely at home — no waiting, no travel.',
        pointsFr: ['Injections IM et SC prescrites', 'Traitements réguliers ou ponctuels', 'Gestion sécuritaire des aiguilles'],
        pointsEn: ['Prescribed IM & SC injections', 'One-time or recurring treatments', 'Safe sharps handling'] },
      { slug: 'lavage-oreilles', nameFr: 'Lavage d’oreilles', nameEn: 'Ear irrigation',
        shortFr: 'Nettoyage des oreilles pour retirer l’excès de cérumen et améliorer le confort et l’audition.',
        shortEn: 'Ear cleaning to remove excess earwax and improve comfort and hearing.',
        longFr: 'Un bouchon de cérumen peut réduire l’audition et causer de l’inconfort. L’infirmière procède à un lavage doux pour dégager le conduit auditif.',
        longEn: 'Earwax buildup can dull hearing and cause discomfort. Your nurse performs a gentle irrigation to clear the ear canal.',
        pointsFr: ['Soulagement de la sensation d’oreille bouchée', 'Meilleure audition', 'Procédure rapide et indolore'],
        pointsEn: ['Relief from a blocked-ear feeling', 'Clearer hearing', 'Quick, painless procedure'] },
    ],
  },
  {
    id: 'vaccination', icon: 'vaccination', nameFr: 'Vaccination', nameEn: 'Vaccination',
    services: [
      { slug: 'grippe', nameFr: 'Grippe', nameEn: 'Flu',
        shortFr: 'Vaccin saisonnier contre l’influenza, pour réduire le risque de grippe et de ses complications.',
        shortEn: 'Seasonal influenza vaccine to reduce the risk of the flu and its complications.',
        longFr: 'Faites-vous vacciner contre la grippe sans sortir de chez vous — idéal pour les familles, les aînés et les personnes à risque.',
        longEn: 'Get your flu shot without leaving home — ideal for families, seniors and at-risk individuals.',
        pointsFr: ['Vaccin saisonnier', 'Pour toute la famille', 'Sans salle d’attente'],
        pointsEn: ['Seasonal vaccine', 'For the whole family', 'No waiting room'] },
      { slug: 'covid', nameFr: 'COVID', nameEn: 'COVID',
        shortFr: 'Vaccin contre la COVID-19, dose initiale ou rappel selon votre admissibilité.',
        shortEn: 'COVID-19 vaccine, initial dose or booster depending on your eligibility.',
        longFr: 'Recevez votre dose ou votre rappel de vaccin contre la COVID-19 à domicile, administré par une infirmière certifiée.',
        longEn: 'Get your COVID-19 dose or booster at home, administered by a certified nurse.',
        pointsFr: ['Dose initiale ou rappel', 'Administré à domicile', 'Selon votre admissibilité'],
        pointsEn: ['Initial dose or booster', 'Given at home', 'Based on your eligibility'] },
      { slug: 'voyage', nameFr: 'Voyage', nameEn: 'Travel',
        shortFr: 'Vaccins recommandés avant un voyage, selon votre destination (ex. hépatite A, fièvre typhoïde).',
        shortEn: 'Recommended pre-travel vaccines based on your destination (e.g. hepatitis A, typhoid).',
        longFr: 'Préparez votre voyage sereinement : l’infirmière évalue vos besoins selon votre destination et administre les vaccins recommandés.',
        longEn: 'Travel with peace of mind: your nurse reviews your needs by destination and administers the recommended vaccines.',
        pointsFr: ['Conseils selon la destination', 'Hépatite A, typhoïde et plus', 'Planifiez avant le départ'],
        pointsEn: ['Destination-based advice', 'Hepatitis A, typhoid and more', 'Plan ahead of departure'] },
      { slug: 'carnet-vaccinal', nameFr: 'Carnet vaccinal', nameEn: 'Vaccination record',
        shortFr: 'Révision de votre carnet de vaccination et mise à jour des vaccins manquants.',
        shortEn: 'Review of your immunization record and catch-up of any missing vaccines.',
        longFr: 'L’infirmière passe en revue votre historique de vaccination et vous aide à rattraper les vaccins manquants.',
        longEn: 'Your nurse reviews your immunization history and helps you catch up on any missing vaccines.',
        pointsFr: ['Révision du carnet', 'Rattrapage des vaccins', 'Pour tous les âges'],
        pointsEn: ['Record review', 'Catch-up vaccines', 'For all ages'] },
    ],
  },
  {
    id: 'chronic', icon: 'chronic', nameFr: 'Suivi maladies chroniques', nameEn: 'Chronic disease follow-up',
    services: [
      { slug: 'suivi-diabete', nameFr: 'Suivi diabète', nameEn: 'Diabetes follow-up',
        shortFr: 'Suivi du diabète : contrôle de la glycémie, enseignement et surveillance des complications.',
        shortEn: 'Diabetes follow-up: blood-sugar monitoring, education, and watching for complications.',
        longFr: 'Un suivi régulier pour garder votre diabète sous contrôle : mesure de la glycémie, enseignement et prévention des complications.',
        longEn: 'Regular follow-up to keep diabetes under control: blood-sugar checks, education and complication prevention.',
        pointsFr: ['Contrôle de la glycémie', 'Enseignement personnalisé', 'Prévention des complications'],
        pointsEn: ['Blood-sugar monitoring', 'Personalized education', 'Complication prevention'] },
      { slug: 'suivi-tension', nameFr: 'Suivi tension artérielle', nameEn: 'Blood-pressure follow-up',
        shortFr: 'Mesure et suivi de la pression artérielle pour la gestion de l’hypertension.',
        shortEn: 'Blood-pressure measurement and follow-up for managing hypertension.',
        longFr: 'Des mesures régulières de votre pression artérielle et un suivi pour prévenir les risques liés à l’hypertension.',
        longEn: 'Regular blood-pressure readings and follow-up to reduce the risks tied to hypertension.',
        pointsFr: ['Mesure de la pression', 'Suivi régulier', 'Prévention cardiovasculaire'],
        pointsEn: ['Blood-pressure readings', 'Regular follow-up', 'Cardiovascular prevention'] },
    ],
  },
  {
    id: 'checkup', icon: 'checkup', nameFr: 'Bilan santé', nameEn: 'Health check-up',
    services: [
      { slug: 'bilan-complet', nameFr: 'Bilan complet', nameEn: 'Complete check-up',
        shortFr: 'Évaluation générale de l’état de santé : signes vitaux, antécédents et orientation au besoin.',
        shortEn: 'General health assessment: vital signs, history review, and referral if needed.',
        longFr: 'Un portrait complet de votre santé sans passer par la clinique : signes vitaux, revue de vos antécédents et recommandations.',
        longEn: 'A full picture of your health without a clinic visit: vital signs, history review and recommendations.',
        pointsFr: ['Signes vitaux complets', 'Revue des antécédents', 'Orientation au besoin'],
        pointsEn: ['Full vital signs', 'History review', 'Referral if needed'] },
      { slug: 'prise-sang', nameFr: 'Prise de sang', nameEn: 'Blood draw',
        shortFr: 'Prélèvement sanguin à domicile pour des analyses de laboratoire prescrites.',
        shortEn: 'At-home blood draw for prescribed laboratory tests.',
        longFr: 'L’infirmière effectue votre prise de sang à domicile et achemine les échantillons au laboratoire — vous recevez ensuite vos résultats.',
        longEn: 'Your nurse draws your blood at home and sends the samples to the lab — results follow.',
        pointsFr: ['À domicile, sans file d’attente', 'Analyses prescrites', 'Résultats acheminés'],
        pointsEn: ['At home, no lineup', 'Prescribed tests', 'Results delivered'] },
    ],
  },
  {
    id: 'sexual', icon: 'sexual', nameFr: 'Santé sexuelle', nameEn: 'Sexual health',
    services: [
      { slug: 'depistage-its', nameFr: 'Dépistage MST', nameEn: 'STI screening',
        shortFr: 'Dépistage des infections transmissibles sexuellement (ITSS), confidentiel et sans jugement.',
        shortEn: 'Confidential, judgment-free screening for sexually transmitted infections (STIs).',
        longFr: 'Un dépistage ITSS discret, à domicile, dans le respect total de votre confidentialité.',
        longEn: 'Discreet STI screening at home, with your privacy fully respected.',
        pointsFr: ['Confidentiel et sans jugement', 'À domicile', 'Résultats sécurisés'],
        pointsEn: ['Confidential, judgment-free', 'At home', 'Secure results'] },
      { slug: 'consultation-conseil', nameFr: 'Consultation conseil', nameEn: 'Advice consultation',
        shortFr: 'Consultation confidentielle pour vos questions de santé sexuelle et de prévention.',
        shortEn: 'Confidential consultation for your sexual-health and prevention questions.',
        longFr: 'Posez vos questions en toute confidentialité à une infirmière : prévention, contraception, dépistage et santé sexuelle.',
        longEn: 'Ask a nurse your questions in full confidence: prevention, contraception, screening and sexual health.',
        pointsFr: ['Écoute sans jugement', 'Prévention et conseils', 'En toute confidentialité'],
        pointsEn: ['Judgment-free listening', 'Prevention & advice', 'Complete confidentiality'] },
      { slug: 'suivi-contraception', nameFr: 'Suivi contraception', nameEn: 'Contraception follow-up',
        shortFr: 'Accompagnement et suivi de votre méthode de contraception.',
        shortEn: 'Guidance and follow-up for your chosen contraception method.',
        longFr: 'L’infirmière vous accompagne dans le choix et le suivi de votre contraception, selon vos besoins.',
        longEn: 'Your nurse supports you in choosing and following up on your contraception, based on your needs.',
        pointsFr: ['Choix de la méthode', 'Suivi personnalisé', 'Confidentiel'],
        pointsEn: ['Method selection', 'Personalized follow-up', 'Confidential'] },
    ],
  },
  {
    id: 'pediatrics', icon: 'pediatrics', nameFr: 'Pédiatrie', nameEn: 'Pediatrics',
    services: [
      { slug: 'vaccins-enfant', nameFr: 'Vaccins enfant', nameEn: 'Children vaccines',
        shortFr: 'Vaccins du calendrier régulier de l’enfant, administrés en douceur à domicile.',
        shortEn: 'Routine childhood vaccines, given gently at home.',
        longFr: 'Les vaccins de votre enfant, administrés dans le calme de la maison, avec douceur et patience.',
        longEn: 'Your child’s vaccines, given in the calm of home, gently and patiently.',
        pointsFr: ['Calendrier vaccinal de l’enfant', 'Environnement rassurant', 'Approche douce'],
        pointsEn: ['Childhood vaccine schedule', 'Reassuring setting', 'Gentle approach'] },
      { slug: 'suivi-bebe', nameFr: 'Suivi bébé', nameEn: 'Baby follow-up',
        shortFr: 'Suivi de la croissance et du bien-être de bébé (poids, alimentation, sommeil).',
        shortEn: 'Follow-up on baby’s growth and well-being (weight, feeding, sleep).',
        longFr: 'Un suivi rassurant du développement de bébé — poids, alimentation, sommeil — avec des conseils pour les parents.',
        longEn: 'Reassuring follow-up on baby’s development — weight, feeding, sleep — with guidance for parents.',
        pointsFr: ['Poids et croissance', 'Alimentation et sommeil', 'Conseils aux parents'],
        pointsEn: ['Weight & growth', 'Feeding & sleep', 'Parent guidance'] },
      { slug: 'bilan-pediatrique', nameFr: 'Bilan pédiatrique', nameEn: 'Pediatric check-up',
        shortFr: 'Évaluation de santé de l’enfant : croissance, développement et conseils aux parents.',
        shortEn: 'Child health assessment: growth, development, and guidance for parents.',
        longFr: 'Une évaluation complète de la santé de votre enfant : croissance, développement et réponses à vos questions.',
        longEn: 'A complete assessment of your child’s health: growth, development and answers to your questions.',
        pointsFr: ['Croissance et développement', 'Évaluation complète', 'Conseils personnalisés'],
        pointsEn: ['Growth & development', 'Complete assessment', 'Personalized advice'] },
    ],
  },
  {
    id: 'seniors', icon: 'seniors', nameFr: 'Aînés', nameEn: 'Seniors',
    services: [
      { slug: 'soins-domicile-aines', nameFr: 'Soins à domicile', nameEn: 'At-home care',
        shortFr: 'Soins infirmiers à domicile adaptés aux aînés, pour favoriser l’autonomie et le confort.',
        shortEn: 'At-home nursing care tailored to seniors, supporting independence and comfort.',
        longFr: 'Des soins infirmiers pensés pour les aînés, offerts à domicile pour préserver leur autonomie et leur confort.',
        longEn: 'Nursing care designed for seniors, delivered at home to preserve their independence and comfort.',
        pointsFr: ['Adaptés aux aînés', 'Favorise l’autonomie', 'Présence rassurante'],
        pointsEn: ['Tailored to seniors', 'Supports independence', 'Reassuring presence'] },
      { slug: 'suivi-tension-aines', nameFr: 'Suivi tension', nameEn: 'Blood-pressure follow-up',
        shortFr: 'Suivi régulier de la pression artérielle, adapté aux aînés.',
        shortEn: 'Regular blood-pressure monitoring tailored to seniors.',
        longFr: 'Un suivi régulier et bienveillant de la pression artérielle, directement au domicile de l’aîné.',
        longEn: 'Regular, caring blood-pressure follow-up, right in the senior’s home.',
        pointsFr: ['Suivi régulier', 'Adapté aux aînés', 'À domicile'],
        pointsEn: ['Regular follow-up', 'Senior-friendly', 'At home'] },
      { slug: 'aide-medication', nameFr: 'Aide à la médication', nameEn: 'Medication assistance',
        shortFr: 'Préparation, rappel et supervision de la prise des médicaments.',
        shortEn: 'Preparation, reminders, and supervision of medication intake.',
        longFr: 'L’infirmière prépare, vérifie et supervise la prise des médicaments pour éviter les oublis et les erreurs.',
        longEn: 'Your nurse prepares, checks and supervises medication intake to avoid missed doses and errors.',
        pointsFr: ['Préparation des médicaments', 'Rappels et supervision', 'Prévention des erreurs'],
        pointsEn: ['Medication preparation', 'Reminders & supervision', 'Error prevention'] },
    ],
  },
  {
    id: 'analysis', icon: 'analysis', nameFr: 'Analyses', nameEn: 'Laboratory tests',
    services: [
      { slug: 'prise-sang-labo', nameFr: 'Prise de sang', nameEn: 'Blood draw',
        shortFr: 'Prélèvement sanguin à domicile, acheminé au laboratoire pour analyse.',
        shortEn: 'At-home blood draw sent to the lab for analysis.',
        longFr: 'Votre prise de sang effectuée à domicile, puis acheminée au laboratoire — simple et sans déplacement.',
        longEn: 'Your blood draw done at home, then delivered to the lab — simple and travel-free.',
        pointsFr: ['À domicile', 'Acheminé au laboratoire', 'Résultats suivis'],
        pointsEn: ['At home', 'Sent to the lab', 'Tracked results'] },
      { slug: 'analyse-urine', nameFr: 'Analyse d’urine', nameEn: 'Urine analysis',
        shortFr: 'Collecte d’un échantillon d’urine pour des analyses de laboratoire.',
        shortEn: 'Collection of a urine sample for laboratory testing.',
        longFr: 'Collecte et acheminement d’un échantillon d’urine pour vos analyses prescrites, sans passer par la clinique.',
        longEn: 'Collection and delivery of a urine sample for your prescribed tests, with no clinic visit.',
        pointsFr: ['Échantillon collecté à domicile', 'Analyses prescrites', 'Discret'],
        pointsEn: ['Sample collected at home', 'Prescribed tests', 'Discreet'] },
      { slug: 'prelevement-biologique', nameFr: 'Prélèvement biologique', nameEn: 'Biological sampling',
        shortFr: 'Prélèvement d’échantillons biologiques (ex. gorge, sécrétions) pour analyse.',
        shortEn: 'Collection of biological samples (e.g. throat, secretions) for analysis.',
        longFr: 'Prélèvement d’échantillons (gorge, sécrétions et autres) effectué à domicile et envoyé au laboratoire.',
        longEn: 'Collection of samples (throat, secretions and more) done at home and sent to the lab.',
        pointsFr: ['Prélèvements variés', 'À domicile', 'Envoyés au laboratoire'],
        pointsEn: ['Various samples', 'At home', 'Sent to the lab'] },
    ],
  },
  {
    id: 'enterprises', icon: 'enterprises', nameFr: 'Entreprises', nameEn: 'Corporate',
    services: [
      { slug: 'medecine-travail', nameFr: 'Médecine du travail', nameEn: 'Occupational health',
        shortFr: 'Services infirmiers en entreprise : évaluations et suivi de santé au travail.',
        shortEn: 'Workplace nursing services: occupational health assessments and follow-up.',
        longFr: 'Des services infirmiers offerts directement en entreprise : évaluations de santé, suivi et prévention pour vos employés.',
        longEn: 'Nursing services delivered on-site at your company: health assessments, follow-up and prevention for your staff.',
        pointsFr: ['Évaluations en entreprise', 'Suivi de santé au travail', 'Pour vos équipes'],
        pointsEn: ['On-site assessments', 'Occupational health follow-up', 'For your teams'] },
      { slug: 'vaccination-collective', nameFr: 'Vaccination collective', nameEn: 'Group vaccination',
        shortFr: 'Campagne de vaccination organisée en milieu de travail pour vos équipes.',
        shortEn: 'Workplace vaccination campaign organized for your teams.',
        longFr: 'Nous organisons une campagne de vaccination clé en main sur votre lieu de travail — planification, logistique et infirmières incluses.',
        longEn: 'We run a turnkey vaccination campaign at your workplace — planning, logistics and nurses included.',
        pointsFr: ['Campagne clé en main', 'Sur le lieu de travail', 'Planification incluse'],
        pointsEn: ['Turnkey campaign', 'At your workplace', 'Planning included'] },
      { slug: 'bilan-sante-entreprise', nameFr: 'Bilan santé entreprise', nameEn: 'Corporate health check',
        shortFr: 'Bilans de santé pour les employés, organisés sur le lieu de travail.',
        shortEn: 'Employee health checks organized at the workplace.',
        longFr: 'Des journées de bilans de santé organisées pour vos employés, directement dans vos locaux.',
        longEn: 'Employee health-check days organized for your staff, right in your offices.',
        pointsFr: ['Bilans pour employés', 'Organisés sur place', 'Clé en main'],
        pointsEn: ['Employee check-ups', 'Organized on-site', 'Turnkey'] },
    ],
  },
];

export function getServiceBySlug(slug: string):
  { service: ServiceDef; category: ServiceCategory } | undefined {
  for (const category of SERVICE_CATEGORIES) {
    const service = category.services.find((s) => s.slug === slug);
    if (service) return { service, category };
  }
  return undefined;
}

export function allServiceSlugs(): string[] {
  return SERVICE_CATEGORIES.flatMap((c) => c.services.map((s) => s.slug));
}
