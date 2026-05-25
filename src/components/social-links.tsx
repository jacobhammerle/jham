import { longPressHaptic, tapHaptic } from "@/lib/haptics";
import { openURL } from "@/lib/open-url";
import { siteLinks } from "@/site";
import { themeColors, type ThemeName } from "@/theme/tokens";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

type SocialLink = {
  label: string;
  href: string;
  icon: string;
  brand: boolean;
  shapeClassName: string;
  tooltipLabel: string;
};

const links: SocialLink[] = [
  {
    label: "GitHub profile",
    href: siteLinks.github,
    icon: "github",
    brand: true,
    shapeClassName: "rounded-[14px]",
    tooltipLabel: "My Code",
  },
  {
    label: "X profile",
    href: siteLinks.x,
    icon: "x-twitter",
    brand: true,
    shapeClassName: "rounded-xl",
    tooltipLabel: "Follow Along",
  },
  {
    label: "Email Jacob",
    href: siteLinks.email,
    icon: "envelope",
    brand: false,
    shapeClassName: "rounded-[10px]",
    tooltipLabel: "Email Me",
  },
];

export function SocialLinks({
  compact = false,
  themeName,
}: {
  compact?: boolean;
  themeName: ThemeName;
}) {
  return (
    <View
      className={`${compact ? "mt-4 gap-2" : "mt-7 gap-3"} flex-row flex-wrap justify-center`}
    >
      {links.map((link) => (
        <SocialLinkButton
          compact={compact}
          key={link.href}
          {...link}
          themeName={themeName}
        />
      ))}
    </View>
  );
}

function SocialLinkButton({
  label,
  href,
  icon,
  brand,
  shapeClassName,
  themeName,
  tooltipLabel,
  compact,
}: SocialLink & { compact: boolean; themeName: ThemeName }) {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [focused, setFocused] = useState(false);
  const emailAddress = href.startsWith("mailto:")
    ? href.replace("mailto:", "")
    : "";
  const webClassName = isWeb
    ? "transition duration-300 ease-out active:bg-surface-muted focus-visible:border-accent focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:border-accent/50 hover:bg-surface hover:shadow-md hover:shadow-shadow/10"
    : "";

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = setTimeout(() => setCopied(false), 1400);

    return () => clearTimeout(timeout);
  }, [copied]);

  async function copyEmailAddress() {
    longPressHaptic();

    if (!emailAddress) {
      return;
    }

    const didCopy = await Clipboard.setStringAsync(emailAddress);

    if (didCopy) {
      setCopied(true);
    }
  }

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityHint={
        emailAddress
          ? "Opens an email draft. Long press to copy the email address"
          : "Opens a new site"
      }
      accessibilityRole="link"
      className={`${compact ? "h-10 w-10" : "h-11 w-11"} items-center justify-center border border-border/70 bg-surface/70 shadow-sm shadow-shadow/0 ${webClassName} ${shapeClassName}`}
      hitSlop={8}
      onBlur={isWeb ? () => setFocused(false) : undefined}
      onFocus={
        isWeb
          ? () => {
              setDismissed(false);
              setFocused(true);
            }
          : undefined
      }
      onHoverIn={isWeb ? () => setDismissed(false) : undefined}
      onHoverOut={isWeb ? () => setDismissed(false) : undefined}
      onLongPress={emailAddress ? () => void copyEmailAddress() : undefined}
      onPress={() => {
        tapHaptic();
        setDismissed(true);
        setFocused(false);
        openURL(href);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.84 : 1,
      })}
    >
      {({ hovered, pressed }) => (
        <>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              opacity: hovered || pressed ? 1 : 0.95,
            }}
          >
            <FontAwesome6
              name={icon}
              brand={brand}
              solid={!brand}
              size={compact ? 17 : 19}
              color={
                hovered || pressed
                  ? themeColors[themeName].accent
                  : themeColors[themeName].subtle
              }
            />
          </View>
          {isWeb && (((hovered || focused) && !dismissed) || copied) ? (
            <View
              accessibilityElementsHidden
              className="absolute top-12 rounded-full border border-border/70 bg-surface px-2 py-1 shadow-md shadow-shadow/10"
              importantForAccessibility="no-hide-descendants"
              pointerEvents="none"
            >
              {copied ? (
                <FontAwesome6
                  name="check"
                  solid
                  size={10}
                  color={themeColors[themeName].accent}
                />
              ) : (
                <Text
                  className="text-xs font-medium text-primary"
                  numberOfLines={1}
                >
                  {tooltipLabel}
                </Text>
              )}
            </View>
          ) : null}
        </>
      )}
    </Pressable>
  );
}
