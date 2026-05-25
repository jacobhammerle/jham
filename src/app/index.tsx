import { FooterMark } from "@/components/footer-mark";
import { ProfileCard } from "@/components/profile-card";
import { SiteHead } from "@/components/site-head";
import { ThemedScreen } from "@/components/themed-screen";
import { useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_HEIGHT_FOR_FOOTER = 575;
const BUSINESS_CARD_MAX_HEIGHT = 420;
const BUSINESS_CARD_MAX_WIDTH = 560;

export default function HomeScreen() {
  const { height, width } = useWindowDimensions();
  const showFooter = height >= MIN_HEIGHT_FOR_FOOTER;
  const isBusinessCardLayout =
    height <= BUSINESS_CARD_MAX_HEIGHT && width <= BUSINESS_CARD_MAX_WIDTH;

  return (
    <>
      <SiteHead />
      <ThemedScreen hideThemeToggle={isBusinessCardLayout}>
        {(themeName) => (
          <SafeAreaView className="relative flex-1">
            <View
              className={`flex-1 items-center justify-center ${
                isBusinessCardLayout
                  ? "px-4 py-4"
                  : "px-6 pb-24 pt-28 sm:pb-20 sm:pt-20"
              }`}
            >
              <ProfileCard
                compact={isBusinessCardLayout}
                themeName={themeName}
              />
            </View>
            {showFooter && <FooterMark />}
          </SafeAreaView>
        )}
      </ThemedScreen>
    </>
  );
}
