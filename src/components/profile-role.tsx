import { ExternalLinkArrow } from "@/components/external-link-arrow";
import {
  isBannerProfileLayout,
  isCompactProfileLayout,
  type ProfileLayout,
} from "@/components/profile-layout";
import { tapHaptic } from "@/lib/haptics";
import { openURL } from "@/lib/open-url";
import { siteLinks } from "@/site";
import { Platform, Pressable, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

export function ProfileRole({ layout = "default" }: { layout?: ProfileLayout }) {
  const banner = isBannerProfileLayout(layout);
  const compact = isCompactProfileLayout(layout);
  const textClassName = compact
    ? "text-sm leading-5"
    : banner
      ? "text-sm leading-5"
    : "text-base leading-7 md:text-lg";

  return (
    <View
      className={`${compact ? "mt-1" : banner ? "mt-1.5" : "mt-2 md:mt-3"} max-w-[720px] flex-row flex-wrap items-center justify-center px-2`}
    >
      <Text className={`text-center text-secondary ${textClassName}`}>
        Field Engineering{" "}
      </Text>
      <Pressable
        accessibilityLabel="Expo website"
        accessibilityHint="Opens expo.dev"
        accessibilityRole="link"
        className={`rounded-md ${
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
          <View className="relative">
            <Text className={`font-semibold text-accent ${textClassName}`}>
              @Expo
            </Text>
            {isWeb && (
              <>
                <View
                  className={`absolute bottom-px left-0 h-px bg-accent transition-all duration-200 ease-out ${
                    hovered || pressed ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
                <View className="absolute left-full top-1/2 ml-1 mt-0.5 -translate-y-1/2">
                  <ExternalLinkArrow
                    className="text-accent"
                    hovered={hovered}
                    pressed={pressed}
                  />
                </View>
              </>
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
}
