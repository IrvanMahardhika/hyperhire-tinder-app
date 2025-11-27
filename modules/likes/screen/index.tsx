import { useState } from "react";

import { Card } from "@/components/card";
import { SwipeCard } from "@/components/swipe-card";
import { StyleSheet, Text, View } from "react-native";

import { useUsers } from "@/contexts/user-context";
import { IUser } from "@/types/user";

export const Likes = () => {
	const { likedUsers } = useUsers();

	const [renderLikedUsers, setRenderLikedUsers] = useState<IUser[]>(likedUsers);

	return (
		<View style={styles.container}>
			<SwipeCard
				items={renderLikedUsers}
				setItems={setRenderLikedUsers}
				renderActionBar={(handleChoice: any) => {
					return null;
				}}>
				{(item: IUser, swipe: any, isFirst: boolean) => {
					return (
						<Card coverSrc={item.coverSrc}>
							<View style={styles.informationContainer}>
								<Text
									style={[styles.textColorWhite]}>{`${item.name} ${item.age}`}</Text>
								<Text
									style={[
										styles.textColorWhite,
									]}>{`${item.distance}km ${item.description}`}</Text>
							</View>
						</Card>
					);
				}}
			</SwipeCard>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	choiceContainer: {
		marginTop: 75,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	likeContainer: {},
	informationContainer: {
		marginTop: 250,
		paddingLeft: 16,
	},
	textColorWhite: {
		color: "#ffffff",
	},
});
