import { Link } from "expo-router";
import Head from "expo-router/head";
import { Pressable, Text, View } from "react-native";

import { ThemedScreen } from "@/components/themed-screen";

export default function NotFoundScreen() {
  return (
    <>
      <Head>
        <title>Page not found | Jacob Hammerle</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <ThemedScreen>
        {() => (
          <View
            role="main"
            className="flex-1 items-center justify-center gap-4 px-6 py-24"
          >
            <Text className="text-sm font-semibold tracking-widest text-accent">
              404
            </Text>
            <Text
              accessibilityRole="header"
              className="text-center text-3xl font-bold text-primary"
            >
              Page not found
            </Text>
            <Text className="max-w-sm text-center text-base text-secondary">
              This link may have moved. You can find me on my home page.
            </Text>
            <Link href="/" asChild>
              <Pressable className="mt-2 min-h-11 justify-center rounded-xl border border-border bg-surface px-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 hover:border-accent">
                <Text className="text-base font-semibold text-accent">
                  Back to home
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
      </ThemedScreen>
    </>
  );
}
