import { Image } from "expo-image";

import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";

export function PortraitImage({ layout }: { layout: ProfileLayout }) {
  const size = profileLayoutStyles[layout].nativePortraitSize;

  return (
    <Image
      accessibilityLabel="Portrait of Jacob Hammerle"
      source={require("../../public/jacob-hammerle-avatar.jpg")}
      placeholder={{ blurhash: "L7Pj|Xt700~q%Mof~qRjRjofxuof" }}
      placeholderContentFit="cover"
      contentFit="cover"
      transition={220}
      style={{ borderRadius: size / 2, height: size, width: size }}
    />
  );
}
