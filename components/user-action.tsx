import { ICONS } from "@/constants/URLs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

type IUserAction = {
	onLike: () => void;
	onReject: () => void;
	onRefresh: () => void;
};

export const UserAction = ({ onLike, onReject, onRefresh }: IUserAction) => {
	const actions = [
		{
			iconUri: ICONS.REFRESH,
			onPress: onRefresh,
		},
		{
			iconUri: ICONS.REJECT,
			onPress: onReject,
		},
		{
			iconUri: ICONS.LIKE,
			onPress: onLike,
		},
	];

	return (
		<View style={styles.container}>
			{actions.map((action, index) => {
				return (
					<TouchableOpacity
						key={index.toString()}
						style={styles.pressable}
						onPress={action.onPress}>
						<View style={styles.iconContainer}>
							<Image
								source={{
									uri: action.iconUri,
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
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
		padding: 10,
	},
});
