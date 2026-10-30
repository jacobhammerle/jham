import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";
import { PortraitImage } from "@/components/portrait-image";
import { SiteLink } from "@/components/site-link";
import { siteLinks } from "@/site";
import { type ThemeName } from "@/theme/tokens";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export function ProfilePortrait({
  layout = "default",
  themeName,
}: {
  layout?: ProfileLayout;
  themeName: ThemeName;
}) {
  return (
    <SiteLink
      href={siteLinks.x}
      accessibilityLabel="Jacob Hammerle on X"
      accessibilityHint="Opens Jacob's X profile"
      className={`${profileLayoutStyles[layout].portraitMargin} rounded-full border bg-surface/80 p-1 shadow-2xl ${
        isWeb
          ? "transition duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:border-accent/45 hover:bg-surface hover:shadow-accent/15"
          : ""
      } ${
        themeName === "dark"
          ? "border-accent/25 shadow-accent/15"
          : "border-border/80 shadow-shadow/10"
      }`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.86 : 1,
      })}
    >
      <PortraitImage layout={layout} />
    </SiteLink>
  );
}
