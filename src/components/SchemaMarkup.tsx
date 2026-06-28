export default function SchemaMarkup() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "DobrePrinty",
        url: "https://dobreprinty.pl",
        logo: "https://dobreprinty.pl/logo.png",
        description:
          "Drukarnia internetowa — druk ulotek, wizytówek, plakatów. Dostawa w całej Polsce.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "hej@dobreprinty.pl",
          contactType: "customer service",
          availableLanguage: "Polish",
        },
        areaServed: "PL",
      },
      {
        "@type": "WebSite",
        name: "DobrePrinty",
        url: "https://dobreprinty.pl",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
