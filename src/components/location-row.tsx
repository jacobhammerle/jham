import { ExternalLinkArrow } from "@/components/external-link-arrow";
import { HoverTooltip } from "@/components/hover-tooltip";
import { SiteIcon } from "@/components/site-icon";
import { SiteLink } from "@/components/site-link";
import { useHydrated } from "@/hooks/use-hydrated";
import { siteLinks } from "@/site";
import { themeColors, type ThemeName } from "@/theme/tokens";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

const isWeb = Platform.OS === "web";
const cincinnatiTimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
});
const localClockFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "numeric",
});
const cincinnatiClockFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  month: "numeric",
  timeZone: "America/New_York",
});

function getCincinnatiMapUrl(hasBrowser: boolean) {
  const isAppleDevice =
    Platform.OS === "ios" ||
    (isWeb &&
      hasBrowser &&
      typeof navigator !== "undefined" &&
      /Mac|iPhone|iPad|iPod/i.test(
        `${navigator.platform} ${navigator.userAgent}`,
      ));

  return isAppleDevice ? siteLinks.appleMaps : siteLinks.googleMaps;
}

function getCincinnatiTimeLabel() {
  return `Local time: ${cincinnatiTimeFormatter.format(new Date())}`;
}

function hasDifferentLocalTimeFromCincinnati() {
  const now = new Date();

  return (
    localClockFormatter.format(now) !== cincinnatiClockFormatter.format(now)
  );
}

export function LocationRow({
  compact = false,
  themeName,
}: {
  compact?: boolean;
  themeName: ThemeName;
}) {
  const hydrated = useHydrated();
  const [showLocalTime, setShowLocalTime] = useState(false);
  const [localTimeLabel, setLocalTimeLabel] = useState("");
  const canShowLocalTime =
    isWeb && hydrated && !compact && hasDifferentLocalTimeFromCincinnati();

  useEffect(() => {
    if (!showLocalTime || !canShowLocalTime) {
      return;
    }

    // Update on the next minute boundary instead of polling every second.
    const timeout = setTimeout(
      () => {
        setLocalTimeLabel(getCincinnatiTimeLabel());
      },
      60_000 - (Date.now() % 60_000),
    );

    return () => clearTimeout(timeout);
  }, [canShowLocalTime, showLocalTime, localTimeLabel]);

  function showCincinnatiTime() {
    setLocalTimeLabel(getCincinnatiTimeLabel());
    setShowLocalTime(true);
  }

  if (compact) {
    return (
      <View
        accessibilityLabel="Located in Cincinnati, Ohio"
        accessibilityRole="text"
        accessible
        className="mt-0 flex-row items-center justify-center gap-1.5"
      >
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <SiteIcon
            name="location-dot"
            size={10}
            color={themeColors[themeName].subtle}
          />
        </View>
        <Text className="text-center text-xs font-medium leading-5 text-subtle">
          Cincinnati, OH
        </Text>
      </View>
    );
  }

  return (
    <SiteLink
      href={getCincinnatiMapUrl(hydrated)}
      accessibilityLabel="View Cincinnati, Ohio on a map"
      accessibilityHint="Opens Cincinnati in a maps app"
      className={`mt-1 flex-row items-center justify-center gap-1.5 rounded-md ${
        isWeb
          ? "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          : ""
      }`}
      onBlur={canShowLocalTime ? () => setShowLocalTime(false) : undefined}
      onFocus={canShowLocalTime ? showCincinnatiTime : undefined}
      onHoverIn={canShowLocalTime ? showCincinnatiTime : undefined}
      onHoverOut={canShowLocalTime ? () => setShowLocalTime(false) : undefined}
      onPress={() => {
        setShowLocalTime(false);
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.78 : 1,
      })}
    >
      {({ hovered, pressed }) => (
        <>
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <SiteIcon
              name="location-dot"
              size={12}
              color={
                hovered || pressed
                  ? themeColors[themeName].accent
                  : themeColors[themeName].subtle
              }
            />
          </View>
          <View className="relative">
            <Text
              className={`text-center text-sm font-medium leading-6 ${
                hovered || pressed ? "text-accent" : "text-subtle"
              }`}
            >
              Cincinnati, OH
            </Text>
            {isWeb && (
              <View
                className={`absolute bottom-px left-0 h-px bg-accent transition-all duration-200 ease-out ${
                  hovered || pressed ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            )}
          </View>
          {isWeb && (
            <ExternalLinkArrow
              className="text-accent"
              hovered={hovered}
              pressed={pressed}
            />
          )}
          {canShowLocalTime && showLocalTime && (
            <HoverTooltip positionClassName="left-full top-1/2 ml-2 -translate-y-1/2">
              <Text
                className="text-xs font-medium text-primary"
                numberOfLines={1}
              >
                {localTimeLabel}
              </Text>
            </HoverTooltip>
          )}
        </>
      )}
    </SiteLink>
  );
}
