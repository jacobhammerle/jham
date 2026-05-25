import { Platform, View, type StyleProp, type ViewStyle } from "react-native";

import { type ThemeName } from "@/theme/tokens";

export function SketchGridBackground({ themeName }: { themeName: ThemeName }) {
  const minorOpacity = themeName === "dark" ? 0.11 : 0.18;
  const majorOpacity = themeName === "dark" ? 0.18 : 0.24;
  const sketchOpacity = themeName === "dark" ? 0.05 : 0.08;
  const veilOpacity = themeName === "dark" ? 0.78 : 0.88;

  return (
    <View className="absolute inset-0" style={{ pointerEvents: "none" }}>
      <View
        className="absolute inset-0"
        style={
          Platform.select({
            web: {
              backgroundImage: `
                linear-gradient(to right, rgb(var(--jh-border) / ${majorOpacity}) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(var(--jh-border) / ${majorOpacity}) 1px, transparent 1px),
                linear-gradient(to right, rgb(var(--jh-border) / ${minorOpacity}) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(var(--jh-border) / ${minorOpacity}) 1px, transparent 1px)
              `,
              backgroundSize: "160px 160px, 160px 160px, 32px 32px, 32px 32px",
            },
            default: {
              opacity: minorOpacity,
            },
          }) as StyleProp<ViewStyle>
        }
      />
      <View
        className="absolute inset-0"
        style={
          Platform.select({
            web: {
              backgroundImage: `
                repeating-linear-gradient(135deg, transparent 0 26px, rgb(var(--jh-accent) / ${sketchOpacity}) 26px 27px, transparent 27px 52px),
                radial-gradient(circle at center, transparent 0%, rgb(var(--jh-app) / 0.2) 32%, rgb(var(--jh-app) / ${veilOpacity}) 68%, rgb(var(--jh-app) / 0.96) 100%)
              `,
            },
            default: {
              opacity: veilOpacity,
            },
          }) as StyleProp<ViewStyle>
        }
      />
      <SketchMark className="left-[10%] top-[18%] h-24 w-24 rotate-12 rounded-2xl border border-border/20" />
      <SketchMark className="bottom-[16%] right-[12%] h-32 w-32 -rotate-12 rounded-full border border-accent/15" />
      <SketchMark className="left-[20%] top-[67%] h-px w-40 -rotate-12 bg-border/20" />
      <SketchMark className="right-[19%] top-[29%] h-px w-28 rotate-12 bg-accent/20" />
    </View>
  );
}

function SketchMark({ className }: { className: string }) {
  return <View className={`absolute hidden md:flex ${className}`} />;
}
