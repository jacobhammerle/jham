import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";
import { siteAssets } from "@/site";

export function PortraitImage({ layout }: { layout: ProfileLayout }) {
  return (
    <img
      alt="Portrait of Jacob Hammerle"
      src={siteAssets.avatar}
      width={336}
      height={336}
      fetchPriority="high"
      loading="eager"
      decoding="async"
      className={`block rounded-full bg-surface-muted object-cover ${profileLayoutStyles[layout].portraitSize}`}
    />
  );
}
