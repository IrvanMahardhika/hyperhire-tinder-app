import { Image, StyleSheet, View } from "react-native";

type ICard = {
	coverSrc: string;
	children: any;
};

export const Card = ({ coverSrc, children }: ICard) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: coverSrc }}
				style={{
					width: "100%",
					height: "100%",
					borderRadius: 8,
					resizeMode: "cover",
				}}
			/>
			<View style={styles.children}  >
				{children}
			</View>	
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	children: {
		position: "absolute",
		left: 0,
		right: 0
	}
});
