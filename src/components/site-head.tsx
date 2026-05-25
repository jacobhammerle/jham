import Head from "expo-router/head";

import { personStructuredData, siteLinks, siteMeta } from "@/site";

export function SiteHead() {
  return (
    <Head>
      <title>{siteMeta.title}</title>
      <meta name="description" content={siteMeta.description} />
      <meta name="author" content={siteMeta.author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <meta
        name="theme-color"
        content="#020617"
        media="(prefers-color-scheme: dark)"
      />
      <meta
        name="theme-color"
        content="#fafafa"
        media="(prefers-color-scheme: light)"
      />
      <link rel="canonical" href={siteLinks.home} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="me" href={siteLinks.github} />
      <link rel="me" href={siteLinks.x} />
      <meta name="apple-mobile-web-app-title" content="Jacob" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteMeta.title} />
      <meta property="og:url" content={siteLinks.home} />
      <meta property="og:title" content={siteMeta.title} />
      <meta property="og:description" content={siteMeta.description} />
      <meta property="og:image" content={siteMeta.shareImageUrl} />
      <meta property="og:image:alt" content={siteMeta.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteMeta.title} />
      <meta name="twitter:description" content={siteMeta.description} />
      <meta name="twitter:image" content={siteMeta.shareImageUrl} />
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
    </Head>
  );
}
