import type { Metadata } from "next";
import { useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Politique de confidentialité" : "Privacy Policy",
    description:
      locale === "fr"
        ? "Politique de confidentialité de La Table de Marguerite — conforme à la Loi 25 du Québec. Protection des données de réservation et préférences alimentaires."
        : "La Table de Marguerite privacy policy — compliant with Quebec's Law 25. Protection of reservation data and dietary preferences.",
    alternates: {
      canonical: `https://table-de-marguerite.vercel.app/${locale}/politique-confidentialite`,
      languages: {
        fr: "https://table-de-marguerite.vercel.app/fr/politique-confidentialite",
        en: "https://table-de-marguerite.vercel.app/en/politique-confidentialite",
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 font-heading text-3xl font-bold text-bark">
        {isFr ? "Politique de confidentialité" : "Privacy Policy"}
      </h1>
      <p className="mb-8 text-sm text-bark-light">
        {isFr ? "Dernière mise à jour : février 2026" : "Last updated: February 2026"}
      </p>

      <div className="prose prose-bark max-w-none space-y-8 text-bark-light">
        {/* 1. Introduction */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "1. Introduction" : "1. Introduction"}
          </h2>
          <p>
            {isFr
              ? "La Table de Marguerite (ci-après « nous ») s'engage à protéger les renseignements personnels de ses clients et utilisateurs conformément à la Loi 25 du Québec (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels). En tant que restaurant, nous accordons une attention particulière à la protection de vos données de réservation et préférences alimentaires."
              : "La Table de Marguerite (hereinafter \"we\") is committed to protecting the personal information of its customers and users in accordance with Quebec's Law 25 (Act to modernize legislative provisions regarding the protection of personal information). As a restaurant, we pay particular attention to the protection of your reservation data and dietary preferences."}
          </p>
        </section>

        {/* 2. RPP */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr
              ? "2. Responsable de la protection des renseignements personnels (RPP)"
              : "2. Person responsible for the protection of personal information"}
          </h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Nom" : "Name"} :</strong> Marguerite Tremblay
            </li>
            <li>
              <strong>{isFr ? "Titre" : "Title"} :</strong>{" "}
              {isFr ? "Cheffe fondatrice et propriétaire" : "Founding Chef and Owner"}
            </li>
            <li>
              <strong>{isFr ? "Courriel" : "Email"} :</strong>{" "}
              <a href="mailto:info@tablede-marguerite.ca" className="text-olive-600 underline">
                info@tablede-marguerite.ca
              </a>
            </li>
          </ul>
        </section>

        {/* 3. Renseignements collectés */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "3. Renseignements personnels collectés" : "3. Personal information collected"}
          </h2>
          <p>
            {isFr
              ? "Nous collectons les renseignements suivants dans le cadre de nos activités :"
              : "We collect the following information as part of our activities:"}
          </p>
          <h3 className="font-heading text-lg font-medium text-bark">
            {isFr ? "Via le site web" : "Via the website"}
          </h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>{isFr ? "Nom et prénom" : "First and last name"}</li>
            <li>{isFr ? "Adresse courriel" : "Email address"}</li>
            <li>{isFr ? "Numéro de téléphone" : "Phone number"}</li>
            <li>{isFr ? "Nombre de convives" : "Number of guests"}</li>
            <li>{isFr ? "Type de demande (réservation, événement, question)" : "Type of inquiry (reservation, event, question)"}</li>
            <li>
              {isFr
                ? "Messages envoyés via le formulaire de contact"
                : "Messages sent via the contact form"}
            </li>
            <li>
              {isFr
                ? "Données de navigation (via témoins analytiques, si consentement)"
                : "Browsing data (via analytics cookies, if consented)"}
            </li>
          </ul>
          <h3 className="mt-4 font-heading text-lg font-medium text-bark">
            {isFr ? "Lors de votre visite au restaurant" : "During your restaurant visit"}
          </h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              {isFr
                ? "Préférences alimentaires et allergies (communiquées lors de la réservation ou sur place)"
                : "Dietary preferences and allergies (communicated during reservation or on-site)"}
            </li>
            <li>
              {isFr
                ? "Données de paiement (traitées de manière sécurisée par notre processeur de paiement — nous ne conservons pas les numéros de carte)"
                : "Payment data (securely processed by our payment processor — we do not store card numbers)"}
            </li>
          </ul>
        </section>

        {/* 4. Finalités */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "4. Finalités de la collecte" : "4. Purposes of collection"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>{isFr ? "Gérer vos réservations de table" : "Manage your table reservations"}</li>
            <li>{isFr ? "Répondre à vos demandes d'événements privés" : "Respond to your private event requests"}</li>
            <li>{isFr ? "Adapter notre service à vos préférences alimentaires et allergies" : "Adapt our service to your dietary preferences and allergies"}</li>
            <li>{isFr ? "Améliorer l'expérience de navigation sur le site" : "Improve the browsing experience on the site"}</li>
            <li>{isFr ? "Vous informer de nos événements saisonniers (si inscription à l'infolettre)" : "Inform you of our seasonal events (if subscribed to the newsletter)"}</li>
          </ul>
        </section>

        {/* 5. Consentement */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "5. Consentement" : "5. Consent"}
          </h2>
          <p>
            {isFr
              ? "Conformément à l'article 8.1 de la Loi 25, nous obtenons votre consentement manifeste, libre et éclairé avant de collecter vos renseignements personnels. Les témoins (cookies) non essentiels ne sont activés qu'après votre consentement explicite. Vous pouvez modifier vos préférences à tout moment via le lien « Gestion des témoins » en bas de chaque page."
              : "In accordance with Section 8.1 of Law 25, we obtain your manifest, free and informed consent before collecting your personal information. Non-essential cookies are only activated after your explicit consent. You can change your preferences at any time via the \"Cookie Settings\" link at the bottom of each page."}
          </p>
        </section>

        {/* 6. Conservation */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "6. Durée de conservation" : "6. Retention period"}
          </h2>
          <p>
            {isFr
              ? "Les données de réservation et de contact sont conservées pendant 24 mois après votre dernière interaction avec nous. Les données relatives aux préférences alimentaires et allergies sont conservées uniquement pour la durée de votre visite et supprimées après le service, sauf si vous demandez que nous les conservions pour vos prochaines visites. Après la période de conservation, les données sont détruites de manière sécurisée conformément à l'article 23 de la Loi 25."
              : "Reservation and contact data is retained for 24 months after your last interaction with us. Data related to dietary preferences and allergies is retained only for the duration of your visit and deleted after service, unless you request that we keep it for future visits. After the retention period, data is securely destroyed in accordance with Section 23 of Law 25."}
          </p>
        </section>

        {/* 7. Droits */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "7. Vos droits" : "7. Your rights"}
          </h2>
          <p>
            {isFr ? "En vertu de la Loi 25, vous avez le droit de :" : "Under Law 25, you have the right to:"}
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>{isFr ? "Accéder" : "Access"}</strong> —{" "}
              {isFr ? "consulter vos renseignements personnels" : "view your personal information"}
            </li>
            <li>
              <strong>{isFr ? "Rectifier" : "Rectify"}</strong> —{" "}
              {isFr ? "corriger des informations inexactes" : "correct inaccurate information"}
            </li>
            <li>
              <strong>{isFr ? "Supprimer" : "Delete"}</strong> —{" "}
              {isFr ? "demander la suppression de vos données" : "request deletion of your data"}
            </li>
            <li>
              <strong>{isFr ? "Retirer votre consentement" : "Withdraw consent"}</strong> —{" "}
              {isFr ? "à tout moment" : "at any time"}
            </li>
            <li>
              <strong>{isFr ? "Porter plainte" : "File a complaint"}</strong> —{" "}
              {isFr
                ? "auprès de la Commission d'accès à l'information du Québec (CAI)"
                : "with the Commission d'accès à l'information du Québec (CAI)"}
            </li>
          </ul>
          <p className="mt-2">
            {isFr ? "Pour exercer ces droits : " : "To exercise these rights: "}
            <a href="mailto:info@tablede-marguerite.ca" className="text-olive-600 underline">
              info@tablede-marguerite.ca
            </a>
            {isFr ? ". Nous répondrons dans un délai de 30 jours." : ". We will respond within 30 days."}
          </p>
        </section>

        {/* 8. Services tiers */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "8. Services tiers" : "8. Third-party services"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Vercel</strong> — {isFr ? "Hébergement du site" : "Website hosting"} (USA)
            </li>
            <li>
              <strong>Google Analytics</strong> —{" "}
              {isFr ? "Statistiques de navigation (si consentement)" : "Browsing analytics (if consented)"} (USA)
            </li>
          </ul>
        </section>

        {/* 9. Transfert hors Québec */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "9. Transfert hors Québec" : "9. Transfer outside Quebec"}
          </h2>
          <p>
            {isFr
              ? "Certains services tiers (Vercel, Google) sont situés aux États-Unis. En utilisant notre site et en consentant aux témoins analytiques, vous acceptez que certaines données de navigation puissent être traitées aux États-Unis. Ces fournisseurs s'engagent à protéger vos données conformément à leurs politiques de confidentialité respectives. Vos données de réservation et préférences alimentaires ne sont jamais transférées hors du Québec."
              : "Some third-party services (Vercel, Google) are located in the United States. By using our site and consenting to analytical cookies, you agree that some browsing data may be processed in the United States. These providers are committed to protecting your data in accordance with their respective privacy policies. Your reservation data and dietary preferences are never transferred outside of Quebec."}
          </p>
        </section>

        {/* 10. Témoins */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "10. Témoins (cookies)" : "10. Cookies"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>{isFr ? "Essentiels" : "Essential"}</strong> —{" "}
              {isFr
                ? "Nécessaires au fonctionnement du site. Toujours actifs."
                : "Required for the website to function. Always active."}
            </li>
            <li>
              <strong>{isFr ? "Analytiques" : "Analytics"}</strong> —{" "}
              {isFr
                ? "Activés uniquement avec votre consentement."
                : "Activated only with your consent."}
            </li>
            <li>
              <strong>Marketing</strong> —{" "}
              {isFr
                ? "Activés uniquement avec votre consentement."
                : "Activated only with your consent."}
            </li>
          </ul>
        </section>

        {/* 11. Sécurité */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "11. Sécurité" : "11. Security"}
          </h2>
          <p>
            {isFr
              ? "Nous mettons en place des mesures de sécurité raisonnables : chiffrement HTTPS, headers de sécurité HTTP complets, aucune clé API exposée côté client. Les données de paiement sont traitées de manière sécurisée par notre processeur de paiement certifié PCI-DSS — nous ne stockons jamais vos informations bancaires."
              : "We implement reasonable security measures: HTTPS encryption, complete HTTP security headers, no API keys exposed client-side. Payment data is securely processed by our PCI-DSS certified payment processor — we never store your banking information."}
          </p>
        </section>

        {/* 12. Incident */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "12. Incident de confidentialité" : "12. Privacy incident"}
          </h2>
          <p>
            {isFr
              ? "En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous nous engageons à aviser la Commission d'accès à l'information du Québec (CAI) et les personnes concernées, et à tenir un registre des incidents conformément à l'article 3.5 de la Loi 25."
              : "In the event of a privacy incident presenting a risk of serious harm, we commit to notifying the Commission d'accès à l'information du Québec (CAI) and affected individuals, and to maintaining a register of incidents in accordance with Section 3.5 of Law 25."}
          </p>
          <p>
            {isFr ? "Courriel de notification d'incident : " : "Incident notification email: "}
            <a href="mailto:info@tablede-marguerite.ca" className="text-olive-600 underline">
              info@tablede-marguerite.ca
            </a>
          </p>
        </section>

        {/* 13. Contact */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "13. Contact" : "13. Contact"}
          </h2>
          <p>
            <strong>La Table de Marguerite</strong>
            <br />
            Marguerite Tremblay, RPP
            <br />
            42, rue du Petit-Champlain
            <br />
            Québec, QC G1K 4H4
            <br />
            (418) 555-0142
            <br />
            <a href="mailto:info@tablede-marguerite.ca" className="text-olive-600 underline">
              info@tablede-marguerite.ca
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
