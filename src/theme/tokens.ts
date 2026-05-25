import { vars } from "nativewind";
import colors from "tailwindcss/colors";

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
    app: colors.zinc[50],
    surface: colors.white,
    surfaceMuted: colors.zinc[100],
    primary: colors.zinc[900],
    secondary: colors.zinc[600],
    subtle: colors.zinc[500],
    border: colors.zinc[300],
    accent: colors.cyan[700],
    accentSoft: colors.cyan[50],
    shadow: colors.cyan[500],
  },
  dark: {
    app: colors.slate[950],
    surface: colors.slate[900],
    surfaceMuted: colors.slate[800],
    primary: colors.zinc[50],
    secondary: colors.slate[300],
    subtle: colors.slate[400],
    border: colors.slate[700],
    accent: colors.sky[300],
    accentSoft: colors.sky[950],
    shadow: colors.sky[400],
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
