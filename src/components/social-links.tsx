import { HoverTooltip } from "@/components/hover-tooltip";
import {
  profileLayoutStyles,
  type ProfileLayout,
} from "@/components/profile-layout";
import { useDismissibleTooltip } from "@/hooks/use-dismissible-tooltip";
import { SiteIcon } from "@/components/site-icon";
import { type SiteIconName } from "@/components/site-icon.types";
import { SiteLink } from "@/components/site-link";
import { longPressHaptic } from "@/lib/haptics";
import { siteLinks, type SiteHref } from "@/site";
import { themeColors, type ThemeName } from "@/theme/tokens";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

const isWeb = Platform.OS === "web";

type SocialLink = {
  label: string;
  href: SiteHref;
  icon: SiteIconName;
  shapeClassName: string;
  tooltipLabel: string;
};

const links: SocialLink[] = [
  {
    label: "GitHub profile",
    href: siteLinks.github,
    icon: "github",
    shapeClassName: "rounded-[14px]",
    tooltipLabel: "My Code",
  },
  {
    label: "X profile",
    href: siteLinks.x,
    icon: "x-twitter",
    shapeClassName: "rounded-xl",
    tooltipLabel: "Latest Activity",
  },
  {
    label: "LinkedIn profile",
    href: siteLinks.linkedin,
    icon: "linkedin-in",
    shapeClassName: "rounded-[10px]",
    tooltipLabel: "Connect",
  },
  {
    label: "Email Jacob",
    href: siteLinks.email,
    icon: "envelope",
    shapeClassName: "rounded-[10px]",
    tooltipLabel: "Email Me",
  },
];

export function SocialLinks({
  layout = "default",
  themeName,
}: {
  layout?: ProfileLayout;
  themeName: ThemeName;
}) {
  return (
    <View
      className={`${profileLayoutStyles[layout].socialContainer} flex-row flex-wrap justify-center`}
    >
      {links.map((link) => (
        <SocialLinkButton
          key={link.href}
          layout={layout}
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
  shapeClassName,
  themeName,
  tooltipLabel,
  layout,
}: SocialLink & { layout: ProfileLayout; themeName: ThemeName }) {
  const [copyFeedback, setCopyFeedback] = useState<"copied" | "failed" | null>(
    null,
  );
  const { socialButton, socialIconSize: iconSize } =
    profileLayoutStyles[layout];
  const {
    blurTooltip,
    dismissTooltip,
    focusTooltip,
    resetDismissal,
    shouldShowTooltip,
  } = useDismissibleTooltip();
  const emailAddress = href.startsWith("mailto:")
    ? href.replace("mailto:", "")
    : "";
  const webClassName = isWeb
    ? "transition duration-300 ease-out active:bg-surface-muted focus-visible:border-accent focus-visible:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:border-accent/50 hover:bg-surface hover:shadow-md hover:shadow-shadow/10"
    : "";

  useEffect(() => {
    if (!copyFeedback) {
      return;
    }

    const timeout = setTimeout(() => setCopyFeedback(null), 1400);

    return () => clearTimeout(timeout);
  }, [copyFeedback]);

  async function copyEmailAddress() {
    if (!emailAddress) {
      return;
    }

    longPressHaptic();

    try {
      const didCopy = await Clipboard.setStringAsync(emailAddress);
      setCopyFeedback(didCopy ? "copied" : "failed");
    } catch {
      setCopyFeedback("failed");
    }
  }

  return (
    <SiteLink
      href={href}
      accessibilityLabel={label}
      accessibilityHint={
        emailAddress
          ? "Opens an email draft. Long press to copy the email address"
          : "Opens a new site"
      }
      className={`${socialButton} items-center justify-center border border-border/70 bg-surface/70 shadow-sm shadow-shadow/0 ${webClassName} ${shapeClassName}`}
      hitSlop={8}
      onBlur={isWeb ? blurTooltip : undefined}
      onFocus={isWeb ? focusTooltip : undefined}
      onHoverIn={isWeb ? resetDismissal : undefined}
      onHoverOut={isWeb ? resetDismissal : undefined}
      onLongPress={emailAddress ? () => void copyEmailAddress() : undefined}
      onPress={dismissTooltip}
      style={({ pressed }) => ({
        opacity: pressed ? 0.84 : 1,
      })}
    >
      {({ hovered, pressed }) => {
        const active = hovered || pressed;
        const showTooltip =
          isWeb &&
          layout === "default" &&
          (shouldShowTooltip(hovered) || copyFeedback !== null);

        return (
          <>
            <Text accessibilityLiveRegion="polite" className="sr-only">
              {copyFeedback === "copied"
                ? "Email address copied"
                : copyFeedback === "failed"
                  ? "Could not copy the email address"
                  : ""}
            </Text>
            <View
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
              style={{
                opacity: active ? 1 : 0.95,
              }}
            >
              <SiteIcon
                name={icon}
                size={iconSize}
                color={
                  active
                    ? themeColors[themeName].accent
                    : themeColors[themeName].subtle
                }
              />
            </View>
            {showTooltip ? (
              <HoverTooltip>
                {copyFeedback === "copied" ? (
                  <SiteIcon
                    name="check"
                    size={10}
                    color={themeColors[themeName].accent}
                  />
                ) : (
                  <Text
                    className="text-xs font-medium text-primary"
                    numberOfLines={1}
                  >
                    {copyFeedback === "failed"
                      ? "Could not copy"
                      : tooltipLabel}
                  </Text>
                )}
              </HoverTooltip>
            ) : null}
          </>
        );
      }}
    </SiteLink>
  );
}
