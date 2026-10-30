import { FooterMark } from "@/components/footer-mark";
import {
  getProfileLayout,
  profileLayoutStyles,
} from "@/components/profile-layout";
import { ProfileCard } from "@/components/profile-card";
import { SiteHead } from "@/components/site-head";
import { ThemedScreen } from "@/components/themed-screen";
import { useHydrated } from "@/hooks/use-hydrated";
import { Platform, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MIN_HEIGHT_FOR_FOOTER = 575;

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
              role="main"
              className={`flex-1 items-center justify-center ${profileLayoutStyles[profileLayout].content}`}
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
