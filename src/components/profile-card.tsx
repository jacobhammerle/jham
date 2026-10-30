import { LocationRow } from "@/components/location-row";
import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ProfileRole } from "@/components/profile-role";
import { SocialLinks } from "@/components/social-links";
import { siteMeta } from "@/site";
import { type ThemeName } from "@/theme/tokens";
import { Text, View } from "react-native";

export function ProfileCard({
  layout = "default",
  themeName,
}: {
  layout?: ProfileLayout;
  themeName: ThemeName;
}) {
  const compact = layout === "compact";

  return (
    <View className="items-center">
      <ProfilePortrait layout={layout} themeName={themeName} />
      <Text
        accessibilityRole="header"
        className={`max-w-[720px] px-2 text-center font-black leading-tight tracking-normal text-primary ${profileLayoutStyles[layout].title}`}
      >
        {siteMeta.title}
      </Text>
      <ProfileRole layout={layout} />
      <LocationRow compact={compact} themeName={themeName} />
      <SocialLinks layout={layout} themeName={themeName} />
    </View>
  );
}
