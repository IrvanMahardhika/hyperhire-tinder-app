import { Card } from "@/components/card";
import { Choice } from "@/components/choice";
import { SwipeCard } from "@/components/swipe-card";
import { UserAction } from "@/components/user-action";
import { Fragment, useCallback } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { useUsers } from "@/contexts/user-context";
import { IUser } from "@/types/user";

export const Home = () => {
	const {
		users,
		setUsers,
		setLikedUsers,
		refreshUsers: handleRefresh,
	} = useUsers();

	const likeOpacity = (swipe: any) => {
		return swipe.x.interpolate({
			inputRange: [25, 100],
			outputRange: [0, 1],
			extrapolate: "clamp",
		});
	};

	const nopeOpacity = (swipe: any) => {
		return swipe.x.interpolate({
			inputRange: [-100, -25],
			outputRange: [1, 0],
			extrapolate: "clamp",
		});
	};

	const handleLike = (user: IUser) => {
		setLikedUsers((prev) => [...prev, user]);
	};

	const renderChoice = useCallback((swipe: any) => {
		return (
			<Fragment>
				<View style={styles.choiceContainer}>
					<Animated.View
						style={[
							styles.likeContainer,
							{
								opacity: likeOpacity(swipe),
							},
						]}>
						<Choice type="like" />
					</Animated.View>
					<Animated.View
						style={[
							styles.likeContainer,
							{
								opacity: nopeOpacity(swipe),
							},
						]}>
						<Choice type="nope" />
					</Animated.View>
				</View>
			</Fragment>
		);
	}, []);

	return (
		<View style={styles.container}>
			<SwipeCard
				items={users}
				setItems={setUsers}
				handleLike={handleLike}
				renderActionBar={(handleChoice: any) => {
					return (
						<UserAction
							onLike={() => handleChoice(1)}
							onReject={() => handleChoice(-1)}
							onRefresh={handleRefresh}
						/>
					);
				}}>
				{(item: IUser, swipe: any, isFirst: boolean) => {
          if (!item) {
            return null;
          }

					return (
						<Card coverSrc={item.coverSrc}>
							{isFirst && renderChoice(swipe)}
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
