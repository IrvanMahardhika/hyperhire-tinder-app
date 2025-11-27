import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ICONS } from "../constants/URLs";

export const BottomTab = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.pressable} onPress={() => {}}>
				<View style={styles.iconContainer}>
					<Image
						source={{
							uri: ICONS.HOMEPAGE_ACTIVE,
						}}
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "transparent",
							resizeMode: "cover",
						}}
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity style={styles.pressable} onPress={() => {}}>
				<View style={styles.iconContainer}>
					<Image
						source={{
							uri: ICONS.LIKEPAGE_INACTIVE,
						}}
						style={{
							width: "100%",
							height: "100%",
							backgroundColor: "transparent",
							resizeMode: "cover",
						}}
					/>
				</View>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.pressable}
				onPress={() => {}}></TouchableOpacity>
			<TouchableOpacity
				style={styles.pressable}
				onPress={() => {}}></TouchableOpacity>
			<TouchableOpacity
				style={styles.pressable}
				onPress={() => {}}></TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
    backgroundColor: "#ffffff",
		width: "100%",
		height: 100,
		flexDirection: "row",
	},
	pressable: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	iconContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: "#ffffff",
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
	},
});
