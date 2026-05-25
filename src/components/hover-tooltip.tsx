import { View } from "react-native";

export function HoverTooltip({
  children,
  positionClassName = "top-12",
}: {
  children: React.ReactNode;
  positionClassName?: string;
}) {
  return (
    <View
      accessibilityElementsHidden
      className={`absolute ${positionClassName} rounded-full border border-border/70 bg-surface px-2 py-1 shadow-md shadow-shadow/10`}
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
    >
      {children}
    </View>
  );
}
