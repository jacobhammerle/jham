import { HoverTooltip } from "@/components/hover-tooltip";
import { useDismissibleTooltip } from "@/hooks/use-dismissible-tooltip";
import { themeColors, type ThemeName } from "@/theme/tokens";
import { SymbolView } from "expo-symbols";
import { Platform, Pressable, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

type ThemeToggleProps = {
  themeName: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
};

export function ThemeToggle({ themeName, onThemeChange }: ThemeToggleProps) {
  return (
    <View
      accessibilityLabel="Theme"
      accessibilityRole="radiogroup"
      className="absolute right-6 top-6 z-10 flex-row rounded-full border border-border/70 bg-surface-muted/80 p-0.5 shadow-xl shadow-shadow/5"
    >
      <View
        accessibilityElementsHidden
        className={`absolute left-0.5 top-0.5 h-9 w-9 rounded-full bg-surface shadow-sm transition-transform duration-300 ease-out ${
          themeName === "dark" ? "translate-x-9" : "translate-x-0"
        }`}
        importantForAccessibility="no-hide-descendants"
        pointerEvents="none"
      />
      <ThemeToggleButton
        accessibilityLabel="Use light theme"
        isActive={themeName === "light"}
        tooltipLabel="Light"
        onPress={() => onThemeChange("light")}
      >
        <SymbolView
          name={{
            ios: "sun.max.fill",
            android: "light_mode",
            web: "light_mode",
          }}
          fallback={<Text className="text-primary">☀</Text>}
          size={15}
          tintColor={
            themeName === "light"
              ? themeColors[themeName].primary
              : themeColors[themeName].subtle
          }
        />
      </ThemeToggleButton>

      <ThemeToggleButton
        accessibilityLabel="Use dark theme"
        isActive={themeName === "dark"}
        tooltipLabel="Dark"
        onPress={() => onThemeChange("dark")}
      >
        <SymbolView
          name={{ ios: "moon.fill", android: "dark_mode", web: "dark_mode" }}
          fallback={<Text className="text-primary">☾</Text>}
          size={15}
          tintColor={
            themeName === "dark"
              ? themeColors[themeName].primary
              : themeColors[themeName].subtle
          }
        />
      </ThemeToggleButton>
    </View>
  );
}

function ThemeToggleButton({
  accessibilityLabel,
  children,
  isActive,
  tooltipLabel,
  onPress,
}: {
  accessibilityLabel: string;
  children: React.ReactNode;
  isActive: boolean;
  tooltipLabel: string;
  onPress: () => void;
}) {
  const {
    blurTooltip,
    dismissTooltip,
    focusTooltip,
    resetDismissal,
    shouldShowTooltip,
  } = useDismissibleTooltip();
  const webClassName = isWeb
    ? "transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:bg-surface/40"
    : "";

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Changes the page color theme"
      accessibilityRole="radio"
      accessibilityState={{ checked: isActive }}
      {...(isWeb ? { "aria-checked": isActive } : {})}
      className={`z-10 h-9 w-9 items-center justify-center rounded-full ${webClassName}`}
      hitSlop={10}
      onBlur={isWeb ? blurTooltip : undefined}
      onFocus={isWeb ? focusTooltip : undefined}
      onHoverIn={isWeb ? resetDismissal : undefined}
      onHoverOut={isWeb ? resetDismissal : undefined}
      onPress={() => {
        dismissTooltip();
        onPress();
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.82 : 1,
      })}
    >
      {({ hovered }) => (
        <>
          {children}
          {isWeb && shouldShowTooltip(hovered) && (
            <HoverTooltip>
              <Text className="text-xs font-medium text-primary">
                {tooltipLabel}
              </Text>
            </HoverTooltip>
          )}
        </>
      )}
    </Pressable>
  );
}
