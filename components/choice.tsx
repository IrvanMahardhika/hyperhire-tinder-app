import { StyleSheet, Text, View } from "react-native";

type IChoice = {
	type: "like" | "nope";
};

export const Choice = ({ type }: IChoice) => {
	return (
		<View>
			{type === "like" ? (
				<Text style={styles.likeText}>Like</Text>
			) : (
				<Text style={styles.nopeText}>Nope</Text>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	likeText: {
		color: "green",
		fontWeight: "bold",
		fontSize: 100,
	},
	nopeText: {
		color: "red",
		fontWeight: "bold",
		fontSize: 100,
	},
});
