import { ExternalLinkArrow } from "@/components/external-link-arrow";
import { tapHaptic } from "@/lib/haptics";
import { openURL } from "@/lib/open-url";
import { siteLinks } from "@/site";
import { Platform, Pressable, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

const minutePillClassName = `h-8 justify-center rounded-full border border-orange-500/35 bg-orange-500/10 px-3 shadow-sm shadow-orange-500/10 ${
  isWeb
    ? "transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/70 hover:border-orange-500/65 hover:bg-orange-500/15 hover:shadow-orange-500/20"
    : ""
}`;

export function FooterMark() {
  const currentYear = new Date().getFullYear();

  return (
    <View className="absolute bottom-6 left-0 right-0 mx-auto items-center gap-3 px-4">
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
    <Pressable
      accessibilityLabel="Try Minute audio journal"
      accessibilityHint="Opens Minute on the App Store"
      accessibilityRole="link"
      className={minutePillClassName}
      onPress={() => {
        tapHaptic();
        openURL(siteLinks.minute);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.86 : 1,
      })}
    >
      {({ hovered, pressed }) => (
        <View className="flex-row items-center gap-1.5">
          <View
            className={`h-1.5 w-1.5 rounded-full ${
              isWeb ? "animate-pulse transition duration-200 ease-out" : ""
            } ${hovered || pressed ? "bg-orange-400" : "bg-orange-500"}`}
          />
          <Text
            className={`text-xs font-semibold tracking-[0.04em] text-orange-700 dark:text-orange-300 ${
              hovered || pressed ? "underline" : ""
            }`}
          >
            Try Minute!
          </Text>
          <ExternalLinkArrow
            className="text-orange-700 dark:text-orange-300"
            hovered={hovered}
            motion="flight"
            pressed={pressed}
          />
        </View>
      )}
    </Pressable>
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
  href: string;
}) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole="link"
      className={`rounded-sm ${
        isWeb
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          : ""
      }`}
      onPress={() => {
        tapHaptic();
        openURL(href);
      }}
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
    </Pressable>
  );
}

function FooterSeparator() {
  return <Text className="text-[11px] font-medium text-subtle/60">·</Text>;
}
