import { FooterMark } from "@/components/footer-mark";
import { type ProfileLayout } from "@/components/profile-layout";
import { ProfileCard } from "@/components/profile-card";
import { SiteHead } from "@/components/site-head";
import { ThemedScreen } from "@/components/themed-screen";
import { useHydrated } from "@/hooks/use-hydrated";
import { Platform, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_HEIGHT_FOR_FOOTER = 575;
const BUSINESS_CARD_MAX_HEIGHT = 420;
const BUSINESS_CARD_MAX_WIDTH = 560;
const BANNER_MAX_HEIGHT = 430;
const BANNER_MIN_WIDTH = 900;

function getProfileLayout({
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

export default function HomeScreen() {
  const hydrated = useHydrated();
  const { height, width } = useWindowDimensions();
  const hasBrowserLayout = Platform.OS !== "web" || hydrated;
  const showFooter = !hasBrowserLayout || height >= MIN_HEIGHT_FOR_FOOTER;
  const profileLayout = getProfileLayout({ hasBrowserLayout, height, width });

  return (
    <>
      <SiteHead />
      <ThemedScreen hideThemeToggle={profileLayout === "compact"}>
        {(themeName) => (
          <SafeAreaView className="relative flex-1">
            <View
              className={`flex-1 items-center justify-center ${
                profileLayout === "compact"
                  ? "px-4 py-4"
                  : profileLayout === "banner"
                    ? "px-6 py-3"
                  : "px-6 pb-24 pt-28 sm:pb-20 sm:pt-20"
              }`}
            >
              <ProfileCard layout={profileLayout} themeName={themeName} />
            </View>
            {showFooter && <FooterMark />}
          </SafeAreaView>
        )}
      </ThemedScreen>
    </>
  );
}
