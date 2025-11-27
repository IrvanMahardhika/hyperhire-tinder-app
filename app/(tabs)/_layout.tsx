import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/app-header";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

import { UserProvider } from "@/contexts/user-context";

export default function TabLayout() {
	return (
		<UserProvider>
			<SafeAreaProvider>
				<SafeAreaView
					style={styles.container}
					edges={["left", "right", "bottom", "top"]}>
					<Tabs
						screenOptions={{
							tabBarActiveTintColor: "#fc0330",
							headerShown: true,
							header: () => <AppHeader />,
							tabBarShowLabel: false,
							tabBarStyle: {
								paddingTop: 16,
								backgroundColor: "#ffffff",
							},
							tabBarButton: HapticTab,
						}}>
						<Tabs.Screen
							name="index"
							options={{
								title: "Home",
								tabBarIcon: ({ color }) => (
									<IconSymbol size={48} name="flame.fill" color={color} />
								),
							}}
						/>
						<Tabs.Screen
							name="likes"
							options={{
								title: "Likes",
								tabBarIcon: ({ color }) => (
									<IconSymbol size={48} name="diamond.fill" color={color} />
								),
							}}
						/>
					</Tabs>
				</SafeAreaView>
			</SafeAreaProvider>
		</UserProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
