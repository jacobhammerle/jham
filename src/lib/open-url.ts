import { Linking } from "react-native";

export function openURL(href: string) {
  void Linking.openURL(href);
}
