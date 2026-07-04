import { LegalLayout } from './LegalLayout';

export const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Politique de Confidentialité" lastUpdated="8 Avril 2026">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
        <p className="mb-4">
          Chez MobiSoins, nous accordons une importance primordiale à la protection de vos données personnelles. 
          Cette politique détaille comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez nos services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">2. Collecte des Données</h2>
        <p className="mb-4">
          Nous collectons les informations nécessaires pour fournir nos services de soins à domicile, notamment :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Informations d'identification (nom, adresse, contact)</li>
          <li>Données de santé pertinentes pour les soins</li>
          <li>Informations de paiement (traitées de manière sécurisée)</li>
          <li>Données de navigation et d'utilisation de l'application</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">3. Utilisation des Données</h2>
        <p className="mb-4">
          Vos données sont utilisées exclusivement pour :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Coordonner et fournir les soins infirmiers</li>
          <li>Communiquer avec vous concernant vos rendez-vous</li>
          <li>Améliorer nos services et votre expérience</li>
          <li>Respecter nos obligations légales et réglementaires</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">4. Protection des Données</h2>
        <p className="mb-4">
          Nous utilisons des mesures de sécurité avancées pour protéger vos informations, incluant le chiffrement des données, 
          des contrôles d'accès stricts et des audits de sécurité réguliers. Vos données de santé sont traitées avec la plus stricte confidentialité.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Vos Droits</h2>
        <p className="mb-4">
          Vous avez le droit d'accéder à vos données personnelles, de les corriger ou de demander leur suppression. 
          Pour exercer ces droits, veuillez nous contacter à travers notre support client.
        </p>
      </section>
    </LegalLayout>
  );
};

