import type { Metadata } from "next";
import { useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Mentions légales" : "Legal Notice",
    description:
      locale === "fr"
        ? "Mentions légales de La Table de Marguerite — identification, hébergement, propriété intellectuelle."
        : "La Table de Marguerite legal notice — identification, hosting, intellectual property.",
    alternates: {
      canonical: `https://table-de-marguerite.vercel.app/${locale}/mentions-legales`,
      languages: {
        fr: "https://table-de-marguerite.vercel.app/fr/mentions-legales",
        en: "https://table-de-marguerite.vercel.app/en/mentions-legales",
      },
    },
  };
}

export default function LegalNoticePage() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 font-heading text-3xl font-bold text-bark">
        {isFr ? "Mentions légales" : "Legal Notice"}
      </h1>

      <div className="prose prose-bark max-w-none space-y-8 text-bark/80">
        {/* 1. Identification */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "1. Identification de l'entreprise" : "1. Company identification"}
          </h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Dénomination sociale" : "Legal name"} :</strong>{" "}
              La Table de Marguerite
            </li>
            <li>
              <strong>{isFr ? "Adresse" : "Address"} :</strong>{" "}
              42, rue du Petit-Champlain, Québec, QC G1K 4H4
            </li>
            <li>
              <strong>{isFr ? "Téléphone" : "Phone"} :</strong> (418) 555-0142
            </li>
            <li>
              <strong>{isFr ? "Courriel" : "Email"} :</strong>{" "}
              <a href="mailto:info@tablede-marguerite.ca" className="text-olive-600 underline">
                info@tablede-marguerite.ca
              </a>
            </li>
          </ul>
        </section>

        {/* 2. Hébergement */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "2. Hébergement" : "2. Hosting"}
          </h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Hébergeur" : "Host"} :</strong> Vercel Inc.
            </li>
            <li>
              <strong>{isFr ? "Adresse" : "Address"} :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </li>
          </ul>
        </section>

        {/* 3. Réglementation */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "3. Réglementation applicable" : "3. Applicable regulations"}
          </h2>
          <p>
            {isFr
              ? "La Table de Marguerite est un établissement de restauration régi par les lois du Québec, notamment la Loi sur les permis d'alcool (RACJ), la Loi sur la protection du consommateur et les règlements municipaux de la Ville de Québec en matière de salubrité alimentaire."
              : "La Table de Marguerite is a dining establishment governed by the laws of Quebec, including the Alcohol Permits Act (RACJ), the Consumer Protection Act and the City of Quebec municipal regulations regarding food safety."}
          </p>
        </section>

        {/* 4. RPP */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr
              ? "4. Responsable de la protection des renseignements personnels"
              : "4. Person responsible for the protection of personal information"}
          </h2>
          <p>
            {isFr
              ? "Conformément à la Loi 25 du Québec (art. 3.1), le responsable est :"
              : "In accordance with Quebec's Law 25 (s. 3.1), the responsible person is:"}
          </p>
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

        {/* 5. Propriété intellectuelle */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "5. Propriété intellectuelle" : "5. Intellectual property"}
          </h2>
          <p>
            {isFr
              ? "L'ensemble du contenu de ce site (textes, photographies, recettes, graphismes, logo, icônes, etc.) est la propriété de La Table de Marguerite ou de ses partenaires et est protégé par les lois applicables en matière de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite."
              : "All content on this website (texts, photographs, recipes, graphics, logo, icons, etc.) is the property of La Table de Marguerite or its partners and is protected by applicable intellectual property laws. Any unauthorized reproduction, representation, modification or exploitation is prohibited."}
          </p>
        </section>

        {/* 6. Limitation de responsabilité */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "6. Limitation de responsabilité" : "6. Limitation of liability"}
          </h2>
          <p>
            {isFr
              ? "Les informations présentées sur ce site (menus, prix, horaires) sont fournies à titre indicatif et peuvent être modifiées sans préavis en fonction de la disponibilité des produits et des saisons. La Table de Marguerite s'efforce de maintenir ces informations à jour mais ne peut garantir leur exactitude à tout moment."
              : "The information presented on this site (menus, prices, hours) is provided for informational purposes and may be changed without notice based on product availability and seasons. La Table de Marguerite strives to keep this information up to date but cannot guarantee its accuracy at all times."}
          </p>
        </section>

        {/* 7. Allergènes et restrictions alimentaires */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "7. Allergènes et restrictions alimentaires" : "7. Allergens and dietary restrictions"}
          </h2>
          <p>
            {isFr
              ? "Nos plats peuvent contenir des allergènes courants (noix, gluten, produits laitiers, fruits de mer, œufs, soja). Les descriptions de menu sur ce site ne constituent pas une liste exhaustive des ingrédients. Veuillez informer notre personnel de toute allergie ou restriction alimentaire lors de votre visite ou de votre réservation."
              : "Our dishes may contain common allergens (nuts, gluten, dairy, seafood, eggs, soy). Menu descriptions on this site do not constitute an exhaustive list of ingredients. Please inform our staff of any allergies or dietary restrictions during your visit or when making a reservation."}
          </p>
        </section>

        {/* 8. Liens externes */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "8. Liens externes" : "8. External links"}
          </h2>
          <p>
            {isFr
              ? "Ce site peut contenir des liens vers des sites externes. La Table de Marguerite n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu."
              : "This site may contain links to external websites. La Table de Marguerite has no control over these sites and disclaims all responsibility for their content."}
          </p>
        </section>

        {/* 9. Droit applicable */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "9. Droit applicable" : "9. Applicable law"}
          </h2>
          <p>
            {isFr
              ? "Les présentes mentions légales sont régies par les lois du Québec et du Canada. Tout litige relatif à l'utilisation de ce site sera soumis aux tribunaux compétents du district judiciaire de Québec."
              : "These legal notices are governed by the laws of Quebec and Canada. Any dispute relating to the use of this site shall be submitted to the competent courts of the judicial district of Quebec."}
          </p>
        </section>

        {/* 10. Contact */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-bark">
            {isFr ? "10. Contact" : "10. Contact"}
          </h2>
          <p>
            <strong>La Table de Marguerite</strong>
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
