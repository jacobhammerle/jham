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
        <HomeLink />
        <FooterSeparator />
        <BuiltWithExpoLink />
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
          <Text
            className={`text-xs font-semibold text-orange-700 dark:text-orange-300 ${
              isWeb ? "transition duration-200 ease-out" : ""
            } ${hovered || pressed ? "opacity-100" : "opacity-70"}`}
          >
            ↗
          </Text>
        </View>
      )}
    </Pressable>
  );
}

function HomeLink() {
  return (
    <Pressable
      accessibilityLabel="Open hammerle.us"
      accessibilityHint="Opens the home page"
      accessibilityRole="link"
      className={`rounded-sm ${
        isWeb
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          : ""
      }`}
      onPress={() => {
        tapHaptic();
        openURL(siteLinks.home);
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
          hammerle.us
        </Text>
      )}
    </Pressable>
  );
}

function FooterSeparator() {
  return <Text className="text-[11px] font-medium text-subtle/60">·</Text>;
}

function BuiltWithExpoLink() {
  return (
    <Pressable
      accessibilityLabel="Built with Expo"
      accessibilityHint="Opens expo.dev"
      accessibilityRole="link"
      className={`rounded-sm ${
        isWeb
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          : ""
      }`}
      onPress={() => {
        tapHaptic();
        openURL(siteLinks.expo);
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
          Built with Expo
        </Text>
      )}
    </Pressable>
  );
}
