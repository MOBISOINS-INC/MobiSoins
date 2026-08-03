import { LegalLayout } from './LegalLayout';

export const TermsOfService = () => {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" lastUpdated="8 Avril 2026">
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptation des Conditions</h2>
        <p className="mb-4">
          En accédant et en utilisant les services de MobiSoins, vous acceptez d'être lié par les présentes conditions générales. 
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
        <p className="mb-4">
          MobiSoins agit en tant qu'intermédiaire technologique connectant des patients avec des professionnels de la santé indépendants. 
          Nous ne fournissons pas directement de services médicaux, mais facilitons l'accès à des soins infirmiers à domicile.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">3. Engagements de l'Utilisateur</h2>
        <p className="mb-4">
          Vous vous engagez à fournir des informations exactes et complètes lors de votre inscription et de la réservation de soins. 
          Vous vous engagez également à maintenir un environnement sécuritaire pour les professionnels de santé lors des visites à domicile.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">4. Annulation et Remboursement</h2>
        <p className="mb-4">
          Les annulations effectuées plus de 24 heures avant le rendez-vous sont entièrement remboursables. 
          Des frais peuvent s'appliquer pour les annulations tardives ou les absences lors du rendez-vous.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-4">5. Limitation de Responsabilité</h2>
        <p className="mb-4">
          MobiSoins s'efforce de vérifier les qualifications de tous les professionnels partenaires, mais ne peut être tenu responsable 
          des actes médicaux posés. La responsabilité professionnelle incombe au praticien de santé.
        </p>
      </section>
    </LegalLayout>
  );
};

