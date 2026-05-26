export const siteLinks = {
  home: "https://hammerle.us/",
  expo: "https://expo.dev",
  github: "https://github.com/jacobhammerle",
  linkedin: "https://www.linkedin.com/in/jacobhammerle/",
  x: "https://x.com/JacobHammerle",
  email: "mailto:jacob@hammerle.us",
  appleMaps: "https://maps.apple.com/?q=Cincinnati%2C+OH",
  googleMaps:
    "https://www.google.com/maps/search/?api=1&query=Cincinnati%2C+OH",
  minute: "https://apps.apple.com/us/app/minute-audio-journal/id6502869472",
} as const;

export const siteMeta = {
  title: "Jacob Hammerle",
  description:
    "Jacob Hammerle is a field engineer at Expo based in Cincinnati, Ohio.",
  author: "Jacob Hammerle",
  headshotUrl: `${siteLinks.home}jacob-hammerle.jpg`,
  shareImageUrl: `${siteLinks.home}site-preview.jpg`,
  shareImageAlt:
    "Jacob Hammerle portfolio card with a blueprint-style Cincinnati river illustration.",
  shareImageType: "image/jpeg",
  shareImageWidth: "1200",
  shareImageHeight: "630",
} as const;

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": siteLinks.home,
  url: siteLinks.home,
  name: siteMeta.title,
  description: siteMeta.description,
  dateModified: "2026-05-25",
  mainEntity: {
    "@type": "Person",
    "@id": `${siteLinks.home}#jacob-hammerle`,
    name: siteMeta.title,
    givenName: "Jacob",
    familyName: "Hammerle",
    jobTitle: "Field Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Expo",
      url: siteLinks.expo,
    },
    email: siteLinks.email,
    image: siteMeta.headshotUrl,
    url: siteLinks.home,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cincinnati",
      addressRegion: "OH",
      addressCountry: "US",
    },
    sameAs: [siteLinks.github, siteLinks.linkedin, siteLinks.x],
  },
} as const;
