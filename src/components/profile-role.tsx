import { ExternalLinkArrow } from "@/components/external-link-arrow";
import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";
import { SiteLink } from "@/components/site-link";
import { siteLinks } from "@/site";
import { Platform, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

export function ProfileRole({
  layout = "default",
}: {
  layout?: ProfileLayout;
}) {
  const { roleText: textClassName, roleMargin } = profileLayoutStyles[layout];

  return (
    <View
      className={`${roleMargin} max-w-[720px] flex-row flex-wrap items-center justify-center px-2`}
    >
      <Text className={`text-center text-secondary ${textClassName}`}>
        Field Engineering{" "}
      </Text>
      <SiteLink
        href={siteLinks.expo}
        accessibilityLabel="Expo website"
        accessibilityHint="Opens expo.dev"
        className={`rounded-md ${
          isWeb
            ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            : ""
        }`}
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
      </SiteLink>
    </View>
  );
}
