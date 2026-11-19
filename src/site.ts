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

// Blog posts, newest first. External posts link out to where they are
// published; a future on-site blog section can add internal posts here too.
export type BlogPost = {
  title: string;
  // Shorter titles for narrow screens.
  shortTitle: string;
  compactTitle: string;
  href: `https://${string}`;
  // ISO 8601 date, used in structured data.
  publishedAt: string;
  // The blog or site where the post is published.
  publisher: string;
  publisherUrl: `https://${string}`;
};

export const blogPosts = [
  {
    title: "Agentic Workflows with Expo Simulators",
    shortTitle: "Agentic Workflows with Expo",
    compactTitle: "Agentic Workflows",
    href: "https://expo.dev/blog/agentic-workflows-with-expo-simulators",
    publishedAt: "2026-11-19",
    publisher: "Expo blog",
    publisherUrl: "https://expo.dev/blog",
  },
] as const satisfies readonly BlogPost[];

export const latestBlogPost: BlogPost = blogPosts[0];

export type SiteHref =
  | (typeof siteLinks)[keyof typeof siteLinks]
  | BlogPost["href"];

export const siteAssets = {
  avatar: "/jacob-hammerle-avatar.jpg",
} as const;

export const siteMeta = {
  title: "Jacob Hammerle",
  pageTitle: "Jacob Hammerle | Field Engineer at Expo",
  description: `Jacob Hammerle is a field engineer at Expo based in Cincinnati, Ohio. Latest post: ${latestBlogPost.title}.`,
  author: "Jacob Hammerle",
  headshotUrl: `${siteLinks.home}jacob-hammerle.jpg`,
  shareImageUrl: `${siteLinks.home}site-preview.png`,
  shareImageAlt:
    "Light mode Jacob Hammerle software developer profile card with a rounded email field and cyan blueprint accents.",
  shareImageType: "image/png",
  shareImageWidth: "1428",
  shareImageHeight: "746",
} as const;

const personId = `${siteLinks.home}#jacob-hammerle`;

// One BlogPosting per post, so search engines connect each article to the
// same Person entity as the profile.
const blogPostingStructuredData = blogPosts.map((post) => ({
  "@type": "BlogPosting",
  "@id": post.href,
  headline: post.title,
  url: post.href,
  mainEntityOfPage: post.href,
  datePublished: post.publishedAt,
  author: { "@id": personId },
  isPartOf: {
    "@type": "Blog",
    name: post.publisher,
    url: post.publisherUrl,
  },
}));

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": siteLinks.home,
  url: siteLinks.home,
  name: siteMeta.title,
  description: siteMeta.description,
  mainEntity: {
    "@type": "Person",
    "@id": personId,
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
  hasPart: blogPostingStructuredData,
} as const;
