import { Platform, Text } from "react-native";

const isWeb = Platform.OS === "web";

export function ExternalLinkArrow({
  className = "text-accent",
  hovered,
  motion = "enter",
  pressed,
}: {
  className?: string;
  hovered: boolean;
  motion?: "enter" | "flight";
  pressed: boolean;
}) {
  const motionClassName =
    motion === "flight"
      ? `${isWeb ? "transition duration-200 ease-out" : ""} ${
          hovered || pressed ? "opacity-100" : "opacity-70"
        } ${isWeb && hovered ? "external-link-arrow-flight" : ""}`
      : hovered
        ? "external-link-arrow-enter opacity-100"
        : pressed
          ? "opacity-100"
          : "opacity-0";

  return (
    <Text className={`text-xs font-semibold ${className} ${motionClassName}`}>
      ↗
    </Text>
  );
}
