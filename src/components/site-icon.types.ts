export type SiteIconName =
  | "github"
  | "x-twitter"
  | "linkedin-in"
  | "envelope"
  | "location-dot"
  | "check"
  | "sun"
  | "moon";

export type SiteIconProps = {
  name: SiteIconName;
  size: number;
  color: string;
};
