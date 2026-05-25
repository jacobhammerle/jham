import { SocialLinks } from "@/components/social-links";
import { tapHaptic } from "@/lib/haptics";
import { openURL } from "@/lib/open-url";
import { siteLinks, siteMeta } from "@/site";
import { themeColors, type ThemeName } from "@/theme/tokens";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import {
  Platform,
  Pressable,
  Text,
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

export function ProfileCard({
  compact = false,
  themeName,
}: {
  compact?: boolean;
  themeName: ThemeName;
}) {
  return (
    <View className="items-center">
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
        <Image
          accessibilityLabel="Portrait of Jacob Hammerle"
          source={headshotSource}
          placeholder={{ blurhash: "L7Pj|Xt700~q%Mof~qRjRjofxuof" }}
          placeholderContentFit="cover"
          contentFit="cover"
          transition={220}
          className={
            compact
              ? "h-[68px] w-[68px] rounded-full"
              : "h-24 w-24 rounded-full md:h-28 md:w-28"
          }
          style={
            isWeb
              ? undefined
              : compact
                ? compactNativeHeadshotStyle
                : nativeHeadshotStyle
          }
        />
      </Pressable>

      <Text
        accessibilityRole="header"
        className={`max-w-[720px] px-2 text-center font-black leading-tight tracking-normal text-primary ${
          compact ? "text-2xl" : "text-4xl md:text-6xl"
        }`}
      >
        {siteMeta.title}
      </Text>

      <View
        className={`${compact ? "mt-1" : "mt-2 md:mt-3"} max-w-[720px] flex-row flex-wrap items-center justify-center px-2`}
      >
        <Text
          className={`text-center text-secondary ${
            compact ? "text-sm leading-5" : "text-base leading-7 md:text-lg"
          }`}
        >
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
            <View className="flex-row items-center">
              <View className="relative">
                <Text
                  className={`font-semibold text-accent ${
                    compact
                      ? "text-sm leading-5"
                      : "text-base leading-7 md:text-lg"
                  }`}
                >
                  @Expo
                </Text>
                {isWeb && (
                  <View
                    className={`absolute bottom-px left-0 h-px bg-accent transition-all duration-200 ease-out ${
                      hovered || pressed ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                )}
              </View>
              {isWeb && (
                <Text
                  className={`ml-1 text-xs font-semibold text-accent transition duration-200 ease-out ${
                    hovered || pressed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ↗
                </Text>
              )}
            </View>
          )}
        </Pressable>
      </View>

      <View
        accessibilityLabel="Located in Cincinnati, Ohio"
        accessibilityRole="text"
        accessible
        className={`${compact ? "mt-0" : "mt-1"} flex-row items-center justify-center gap-1.5`}
      >
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <FontAwesome6
            name="location-dot"
            solid
            size={compact ? 10 : 12}
            color={themeColors[themeName].subtle}
          />
        </View>
        <Text
          className={`text-center font-medium text-subtle ${
            compact ? "text-xs leading-5" : "text-sm leading-6"
          }`}
        >
          Cincinnati, OH
        </Text>
      </View>

      <SocialLinks compact={compact} themeName={themeName} />
    </View>
  );
}
