import {
  ScrollViewStyleReset,
  useServerDocumentContext,
} from "expo-router/html";
import { type PropsWithChildren } from "react";

import { notFoundTitle, personStructuredData, siteLinks } from "@/site";

// Web only. Runs in Node.js during static rendering. Route-specific tags
// come from each route's generateMetadata() through headNodes. The 404
// page does not get generateMetadata() output, so its tags are set here.
export default function Root({
  children,
  pathname,
}: PropsWithChildren<{ pathname?: string }>) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } =
    useServerDocumentContext();
  const isHome = pathname === "/";
  const isNotFound = pathname === "/+not-found";

  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <ScrollViewStyleReset />
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
        <link rel="me" href={siteLinks.github} />
        <link rel="me" href={siteLinks.linkedin} />
        <link rel="me" href={siteLinks.x} />
        {isNotFound && (
          <>
            <title>{notFoundTitle}</title>
            <meta name="robots" content="noindex, follow" />
          </>
        )}
        {isHome && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(personStructuredData).replace(
                /</g,
                "\\u003c",
              ),
            }}
          />
        )}
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
