import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { type SiteIconProps } from "@/components/site-icon.types";

export function SiteIcon({ name, size, color }: SiteIconProps) {
  const brand = ["github", "x-twitter", "linkedin-in"].includes(name);

  return (
    <FontAwesome6
      name={name}
      brand={brand}
      solid={!brand}
      size={size}
      color={color}
    />
  );
}
