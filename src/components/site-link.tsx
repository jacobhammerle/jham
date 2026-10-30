import { Link } from "expo-router";
import { Platform, Pressable, type PressableProps } from "react-native";

import { tapHaptic } from "@/lib/haptics";
import { type SiteHref } from "@/site";

// Real anchors let visitors open/copy links and navigate before hydration.
export function SiteLink({
  href,
  onPress,
  ...props
}: PressableProps & { href: SiteHref }) {
  const external = href.startsWith("https://");
  const hrefAttrs = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : undefined;

  return (
    <Link asChild href={href} {...hrefAttrs}>
      <Pressable
        {...props}
        {...(Platform.OS === "web" ? { hrefAttrs } : {})}
        accessibilityRole="link"
        onPress={(event) => {
          tapHaptic();
          onPress?.(event);
        }}
      />
    </Link>
  );
}
