import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function tapHaptic() {
  if (Platform.OS === "web") {
    return;
  }

  void Haptics.selectionAsync();
}

export function longPressHaptic() {
  if (Platform.OS === "web") {
    return;
  }

  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}
