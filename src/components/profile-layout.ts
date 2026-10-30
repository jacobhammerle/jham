export type ProfileLayout = "default" | "compact" | "banner";

// Keep each profile size together so its spacing and typography stay in sync.
export const profileLayoutStyles = {
  default: {
    content: "px-6 pb-24 pt-28 sm:pb-20 sm:pt-20",
    title: "text-4xl md:text-6xl",
    portraitMargin: "mb-5",
    portraitSize: "h-24 w-24 md:h-28 md:w-28",
    nativePortraitSize: 96,
    roleText: "text-base leading-7 md:text-lg",
    roleMargin: "mt-2 md:mt-3",
    socialContainer: "mt-7 gap-2",
    socialButton: "h-11 w-11",
    socialIconSize: 19,
  },
  compact: {
    content: "px-4 py-4",
    title: "text-2xl",
    portraitMargin: "mb-3",
    portraitSize: "h-[68px] w-[68px]",
    nativePortraitSize: 68,
    roleText: "text-sm leading-5",
    roleMargin: "mt-1",
    socialContainer: "mt-4 gap-1.5",
    socialButton: "h-10 w-10",
    socialIconSize: 17,
  },
  banner: {
    content: "px-6 py-3",
    title: "text-4xl",
    portraitMargin: "mb-3",
    portraitSize: "h-[72px] w-[72px]",
    nativePortraitSize: 72,
    roleText: "text-sm leading-5",
    roleMargin: "mt-1.5",
    socialContainer: "mt-3 gap-1.5",
    socialButton: "h-9 w-9",
    socialIconSize: 16,
  },
} as const satisfies Record<ProfileLayout, Record<string, string | number>>;

const BUSINESS_CARD_MAX_HEIGHT = 420;
const BUSINESS_CARD_MAX_WIDTH = 560;
const BANNER_MAX_HEIGHT = 430;
const BANNER_MIN_WIDTH = 900;

export function getProfileLayout({
  hasBrowserLayout,
  height,
  width,
}: {
  hasBrowserLayout: boolean;
  height: number;
  width: number;
}): ProfileLayout {
  if (
    hasBrowserLayout &&
    height <= BUSINESS_CARD_MAX_HEIGHT &&
    width <= BUSINESS_CARD_MAX_WIDTH
  ) {
    return "compact";
  }

  if (
    hasBrowserLayout &&
    height <= BANNER_MAX_HEIGHT &&
    width >= BANNER_MIN_WIDTH
  ) {
    return "banner";
  }

  return "default";
}
