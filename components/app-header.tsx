import { ICONS } from "@/constants/URLs";
import { Image, StyleSheet, Text, View } from "react-native";

export const AppHeader = () => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: ICONS.HOMEPAGE_ACTIVE }} style={styles.image} />
			<Text style={styles.text}>tinder</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 80,
		backgroundColor: "#ffffff",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	image: {
		width: 30,
		height: 30,
		resizeMode: "cover",
	},
	text: {
		fontWeight: "bold",
		fontSize: 36,
		color: "#fc0330",
	},
});
