import { tapHaptic } from "@/lib/haptics";
import { openURL } from "@/lib/open-url";
import { siteLinks } from "@/site";
import { type ThemeName } from "@/theme/tokens";
import { Image } from "expo-image";
import { useState } from "react";
import {
  Platform,
  Pressable,
  View,
  type ImageStyle,
  type StyleProp,
} from "react-native";

const isWeb = Platform.OS === "web";
const headshotSource = require("../../assets/images/headshot.jpg");
const nativeHeadshotStyle: StyleProp<ImageStyle> = {
  borderRadius: 48,
  height: 96,
  width: 96,
};
const compactNativeHeadshotStyle: StyleProp<ImageStyle> = {
  borderRadius: 34,
  height: 68,
  width: 68,
};

export function ProfilePortrait({
  compact = false,
  themeName,
}: {
  compact?: boolean;
  themeName: ThemeName;
}) {
  const [displayed, setDisplayed] = useState(!isWeb);

  return (
    <Pressable
      accessibilityLabel="Jacob Hammerle on X"
      accessibilityHint="Opens Jacob's X profile"
      accessibilityRole="link"
      className={`${compact ? "mb-3" : "mb-5"} rounded-full border bg-surface/80 p-1 shadow-2xl ${
        isWeb
          ? "transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:border-accent/45 hover:bg-surface hover:shadow-accent/15"
          : ""
      } ${
        themeName === "dark"
          ? "border-accent/25 shadow-accent/15"
          : "border-border/80 shadow-shadow/10"
      }`}
      onPress={() => {
        tapHaptic();
        openURL(siteLinks.x);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.86 : 1,
      })}
    >
      <View className="relative">
        {isWeb && (
          <View
            accessibilityElementsHidden
            className={`portrait-skeleton absolute inset-0 overflow-hidden rounded-full transition-opacity duration-300 ease-out ${
              displayed ? "opacity-0" : "opacity-100"
            }`}
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
          >
            <View
              className={`portrait-skeleton-shimmer absolute inset-y-0 -left-1/2 w-1/2 ${
                displayed ? "hidden" : ""
              }`}
            />
          </View>
        )}
        <Image
          accessibilityLabel="Portrait of Jacob Hammerle"
          source={headshotSource}
          placeholder={{ blurhash: "L7Pj|Xt700~q%Mof~qRjRjofxuof" }}
          placeholderContentFit="cover"
          contentFit="cover"
          onDisplay={isWeb ? () => setDisplayed(true) : undefined}
          transition={220}
          className={`${compact ? "h-[68px] w-[68px]" : "h-24 w-24 md:h-28 md:w-28"} rounded-full ${
            isWeb
              ? `transition-opacity duration-300 ease-out ${
                  displayed ? "opacity-100" : "opacity-0"
                }`
              : ""
          }`}
          style={
            isWeb
              ? undefined
              : compact
                ? compactNativeHeadshotStyle
                : nativeHeadshotStyle
          }
        />
      </View>
    </Pressable>
  );
}
