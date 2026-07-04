import { LegalLayout } from './LegalLayout';

export const CookiePolicy = () => {
  return (
    <LegalLayout title="Politique des Cookies" lastUpdated="8 Avril 2026">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. Qu'est-ce qu'un Cookie ?</h2>
        <p className="mb-4">
          Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site web. 
          Il permet de conserver des données utilisateur afin de faciliter la navigation et permettre certaines fonctionnalités.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">2. Utilisation des Cookies</h2>
        <p className="mb-4">
          Nous utilisons des cookies pour :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Assurer le bon fonctionnement du site (cookies essentiels)</li>
          <li>Mémoriser vos préférences (langue, connexion)</li>
          <li>Analyser l'utilisation du site pour en améliorer les performances</li>
          <li>Vous proposer une expérience personnalisée</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">3. Types de Cookies</h2>
        <p className="mb-4">
          <strong>Cookies Essentiels :</strong> Nécessaires au fonctionnement technique du site.<br/>
          <strong>Cookies Analytiques :</strong> Nous aident à comprendre comment les visiteurs interagissent avec le site.<br/>
          <strong>Cookies Fonctionnels :</strong> Permettent d'améliorer et de personnaliser les fonctionnalités du site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">4. Gestion des Cookies</h2>
        <p className="mb-4">
          Vous pouvez à tout moment configurer votre navigateur pour accepter ou refuser les cookies. 
          Notez que la désactivation des cookies essentiels pourrait affecter votre utilisation de certaines parties du site.
        </p>
      </section>
    </LegalLayout>
  );
};

