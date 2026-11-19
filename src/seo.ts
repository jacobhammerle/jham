import type { Metadata } from "expo-router/server";

import { siteLinks, siteMeta } from "@/site";

// Head tags for static HTML. In SDK 58, tags rendered with
// expo-router/head are not in the exported HTML, so routes export
// generateMetadata() instead. Tags that Metadata does not support
// (theme-color with media, rel="me", JSON-LD) and the 404 page's tags
// are in src/app/+html.tsx.
export const homeMetadata: Metadata = {
  title: siteMeta.pageTitle,
  description: siteMeta.description,
  authors: { name: siteMeta.author, url: siteLinks.home },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteLinks.home },
  icons: {
    icon: { url: "/favicon.ico", sizes: "any" },
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "Jacob",
    statusBarStyle: "black-translucent",
  },
  // appleWebApp adds mobile-web-app-capable; keep the older Apple tag too.
  other: { "apple-mobile-web-app-capable": "yes" },
  openGraph: {
    type: "website",
    siteName: siteMeta.title,
    locale: "en_US",
    url: siteLinks.home,
    title: siteMeta.pageTitle,
    description: siteMeta.description,
    images: {
      url: siteMeta.shareImageUrl,
      type: siteMeta.shareImageType,
      width: Number(siteMeta.shareImageWidth),
      height: Number(siteMeta.shareImageHeight),
      alt: siteMeta.shareImageAlt,
    },
  },
  twitter: {
    card: "summary_large_image",
    creator: "@JacobHammerle",
    title: siteMeta.pageTitle,
    description: siteMeta.description,
    images: { url: siteMeta.shareImageUrl, alt: siteMeta.shareImageAlt },
  },
};
