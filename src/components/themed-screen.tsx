import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  useColorScheme as useSystemColorScheme,
  Platform,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { SketchGridBackground } from "@/components/sketch-grid-background";
import { ThemeToggle } from "@/components/theme-toggle";
import { useHydrated } from "@/hooks/use-hydrated";
import { themeVars, type ThemeName } from "@/theme/tokens";

type ThemedScreenProps = {
  children: (themeName: ThemeName) => React.ReactNode;
  hideThemeToggle?: boolean;
};

export function ThemedScreen({
  children,
  hideThemeToggle = false,
}: ThemedScreenProps) {
  const hydrated = useHydrated();
  const systemScheme = useSystemColorScheme();
  const systemTheme: ThemeName = systemScheme === "dark" ? "dark" : "light";
  const [manualTheme, setManualTheme] = useState<ThemeName | null>(null);
  const hasBrowserTheme = Platform.OS !== "web" || hydrated;
  const themeName = manualTheme ?? (hasBrowserTheme ? systemTheme : "light");

  function handleThemeChange(theme: ThemeName) {
    setManualTheme(theme);
  }

  return (
    <View
      className="flex-1 overflow-hidden bg-app"
      style={themeVars[themeName] as StyleProp<ViewStyle>}
    >
      <SketchGridBackground themeName={themeName} />
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      {Platform.OS === "web" && !hideThemeToggle && (
        <ThemeToggle themeName={themeName} onThemeChange={handleThemeChange} />
      )}
      {children(themeName)}
    </View>
  );
}
