import { LinkPill } from "@/components/link-pill";
import { SiteLink } from "@/components/site-link";
import { siteLinks, type SiteHref } from "@/site";
import { Platform, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

export function FooterMark() {
  const currentYear = new Date().getFullYear();

  return (
    <View
      role="contentinfo"
      className="absolute bottom-6 left-0 right-0 mx-auto items-center gap-3 px-4"
    >
      <MinuteLink />
      <View className="flex-row items-center gap-2">
        <FooterTextLink
          accessibilityHint="Opens the home page"
          accessibilityLabel="Open hammerle.us"
          href={siteLinks.home}
        >
          hammerle.us
        </FooterTextLink>
        <FooterSeparator />
        <FooterTextLink
          accessibilityHint="Opens expo.dev"
          accessibilityLabel="Built with Expo"
          href={siteLinks.expo}
        >
          Built with Expo
        </FooterTextLink>
        <FooterSeparator />
        <Text className="text-[11px] font-medium text-subtle">
          © {currentYear}
        </Text>
      </View>
    </View>
  );
}

function MinuteLink() {
  return (
    <LinkPill
      accessibilityHint="Opens Minute on the App Store"
      accessibilityLabel="Try Minute audio journal"
      href={siteLinks.minute}
      label="Try Minute!"
      leading={{ type: "dot" }}
      tone="minute"
    />
  );
}

function FooterTextLink({
  accessibilityHint,
  accessibilityLabel,
  children,
  href,
}: {
  accessibilityHint: string;
  accessibilityLabel: string;
  children: React.ReactNode;
  href: SiteHref;
}) {
  return (
    <SiteLink
      href={href}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      className={`rounded-sm ${
        isWeb
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          : ""
      }`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.78 : 1,
      })}
    >
      {({ hovered, pressed }) => (
        <Text
          className={`text-[11px] font-medium text-subtle ${
            hovered || pressed ? "text-accent underline" : ""
          }`}
        >
          {children}
        </Text>
      )}
    </SiteLink>
  );
}

function FooterSeparator() {
  return <Text className="text-[11px] font-medium text-subtle/60">·</Text>;
}
