export type ProfileLayout = "default" | "compact" | "banner";

export function isCompactProfileLayout(layout: ProfileLayout) {
  return layout === "compact";
}

export function isBannerProfileLayout(layout: ProfileLayout) {
  return layout === "banner";
}
