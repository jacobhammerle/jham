import { LocationRow } from "@/components/location-row";
import { ProfilePortrait } from "@/components/profile-portrait";
import { ProfileRole } from "@/components/profile-role";
import { SocialLinks } from "@/components/social-links";
import { siteMeta } from "@/site";
import { type ThemeName } from "@/theme/tokens";
import { Text, View } from "react-native";

export function ProfileCard({
  compact = false,
  themeName,
}: {
  compact?: boolean;
  themeName: ThemeName;
}) {
  return (
    <View className="items-center">
      <ProfilePortrait compact={compact} themeName={themeName} />
      <Text
        accessibilityRole="header"
        className={`max-w-[720px] px-2 text-center font-black leading-tight tracking-normal text-primary ${
          compact ? "text-2xl" : "text-4xl md:text-6xl"
        }`}
      >
        {siteMeta.title}
      </Text>
      <ProfileRole compact={compact} />
      <LocationRow compact={compact} themeName={themeName} />
      <SocialLinks compact={compact} themeName={themeName} />
    </View>
  );
}
