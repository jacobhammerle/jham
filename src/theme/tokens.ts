import { vars } from "nativewind";

export type ThemeName = "light" | "dark";

const colorRoles = [
  "app",
  "surface",
  "surfaceMuted",
  "primary",
  "secondary",
  "subtle",
  "border",
  "accent",
  "accentSoft",
  "shadow",
  "minute",
] as const;

type ColorRole = (typeof colorRoles)[number];
type Palette = Record<ThemeName, Record<ColorRole, string>>;
type CssVariableMap = Record<`--jh-${string}`, string>;

function hexToRgbChannels(hex: string) {
  const normalized = hex.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized
          .split("")
          .map((channel) => channel + channel)
          .join("")
      : normalized;
  const value = parseInt(fullHex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `${red} ${green} ${blue}`;
}

const palette: Palette = {
  light: {
    app: "#fafafa",
    surface: "#ffffff",
    surfaceMuted: "#f4f4f5",
    primary: "#18181b",
    secondary: "#52525b",
    subtle: "#71717a",
    border: "#d4d4d8",
    accent: "#0e7490",
    accentSoft: "#ecfeff",
    shadow: "#06b6d4",
    minute: "#c2410c",
  },
  dark: {
    app: "#020617",
    surface: "#0f172a",
    surfaceMuted: "#1e293b",
    primary: "#fafafa",
    secondary: "#cbd5e1",
    subtle: "#94a3b8",
    border: "#334155",
    accent: "#7dd3fc",
    accentSoft: "#082f49",
    shadow: "#38bdf8",
    minute: "#fdba74",
  },
};

function toKebabCase(role: ColorRole) {
  return role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function createThemeVars(themeName: ThemeName) {
  const tokens = colorRoles.reduce<CssVariableMap>((acc, role) => {
    acc[`--jh-${toKebabCase(role)}`] = hexToRgbChannels(
      palette[themeName][role],
    );
    return acc;
  }, {});

  return vars(tokens);
}

export const themeVars = {
  light: createThemeVars("light"),
  dark: createThemeVars("dark"),
};

export const themeColors = {
  light: {
    primary: palette.light.primary,
    subtle: palette.light.subtle,
    accent: palette.light.accent,
  },
  dark: {
    primary: palette.dark.primary,
    subtle: palette.dark.subtle,
    accent: palette.dark.accent,
  },
} as const;
