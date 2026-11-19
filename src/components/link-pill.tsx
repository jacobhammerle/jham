import { ExternalLinkArrow } from "@/components/external-link-arrow";
import { SiteLink } from "@/components/site-link";
import { type SiteHref } from "@/site";
import { Platform, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

export type LinkPillTone = "accent" | "minute";

// Shows a different label per screen width. Each `className` toggles
// visibility at a breakpoint, for example "hidden sm:flex".
export type ResponsiveLabel = { text: string; className: string };

type LinkPillLeading = { type: "dot" } | { type: "badge"; text: string };

// Full class strings per tone so Tailwind can find every class.
const toneStyles = {
  accent: {
    container: "border-accent/30 bg-accent-soft/70 shadow-shadow/10",
    containerWeb:
      "focus-visible:ring-accent/70 hover:border-accent/60 hover:bg-accent-soft hover:shadow-shadow/20",
    text: "text-accent",
    mark: "bg-accent",
    markActive: "bg-accent/80",
  },
  minute: {
    container: "border-orange-500/35 bg-orange-500/10 shadow-orange-500/10",
    containerWeb:
      "focus-visible:ring-orange-500/70 hover:border-orange-500/65 hover:bg-orange-500/15 hover:shadow-orange-500/20",
    text: "text-minute",
    mark: "bg-orange-500",
    markActive: "bg-orange-400",
  },
} as const satisfies Record<LinkPillTone, Record<string, string>>;

const transitionClassName = isWeb ? "transition duration-200 ease-out" : "";

// The rounded call-to-action chip used for the Minute app and blog posts.
export function LinkPill({
  accessibilityHint,
  accessibilityLabel,
  className = "",
  href,
  label,
  leading,
  tone,
}: {
  accessibilityHint: string;
  accessibilityLabel: string;
  className?: string;
  href: SiteHref;
  label: string | readonly ResponsiveLabel[];
  leading: LinkPillLeading;
  tone: LinkPillTone;
}) {
  const styles = toneStyles[tone];
  const labels =
    typeof label === "string" ? [{ text: label, className: "" }] : label;
  const padding = leading.type === "badge" ? "pl-1 pr-3" : "px-3";

  return (
    <SiteLink
      href={href}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      className={`h-8 max-w-full justify-center rounded-full border shadow-sm ${padding} ${styles.container} ${
        isWeb
          ? `${transitionClassName} focus-visible:outline-none focus-visible:ring-2 ${styles.containerWeb}`
          : ""
      } ${className}`}
      hitSlop={8}
      style={({ pressed }) => ({
        opacity: pressed ? 0.86 : 1,
      })}
    >
      {({ hovered, pressed }) => {
        const active = hovered || pressed;
        const markClassName = `${transitionClassName} ${
          active ? styles.markActive : styles.mark
        }`;

        return (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            className="min-w-0 flex-row items-center gap-1.5"
          >
            {leading.type === "dot" ? (
              <View
                className={`h-1.5 w-1.5 rounded-full ${
                  isWeb ? "animate-pulse" : ""
                } ${markClassName}`}
              />
            ) : (
              <View
                className={`h-6 justify-center rounded-full px-2 ${markClassName}`}
              >
                <Text className="text-[10px] font-bold uppercase tracking-[0.08em] text-app">
                  {leading.text}
                </Text>
              </View>
            )}
            {labels.map(({ text, className: labelClassName }) => (
              <Text
                key={text}
                className={`shrink text-xs font-semibold tracking-[0.04em] ${styles.text} ${labelClassName} ${
                  active ? "underline" : ""
                }`}
                numberOfLines={1}
              >
                {text}
              </Text>
            ))}
            <ExternalLinkArrow
              className={styles.text}
              hovered={hovered}
              motion="flight"
              pressed={pressed}
            />
          </View>
        );
      }}
    </SiteLink>
  );
}
