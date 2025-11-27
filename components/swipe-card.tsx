import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import {
	Animated,
	Dimensions,
	ImageBackground,
	PanResponder,
	StyleSheet,
	View
} from "react-native";

import { IUser } from "@/types/user";

type ISwipeCard = {
	children: any;
	items: any[];
	setItems: Dispatch<SetStateAction<IUser[]>>;
	handleLike?: (val: IUser) => void;
	renderActionBar: any;
};

export const SwipeCard = ({
	children,
	items,
	setItems,
	handleLike,
	renderActionBar,
}: ISwipeCard) => {
	const { height } = Dimensions.get("screen");

	const itemIndex = useRef(0);
	const swipe = useRef(new Animated.ValueXY()).current;
	const titlSign = useRef(new Animated.Value(1)).current;

	const removeTopCard = useCallback(() => {
		if (!items.length) return;

		const swipeInterpolate = swipe.x;
		const isLiking = Number(JSON.stringify(swipeInterpolate)) > 0;

		if (isLiking && handleLike) {
			handleLike(items[itemIndex.current]);
		}

		setItems((prev: IUser[]) => prev.slice(1));
		swipe.setValue({ x: 0, y: 0 });
		itemIndex.current += 1;
	}, [handleLike, items, setItems, swipe, itemIndex]);

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: (_, { dx, dy, y0 }) => {
				swipe.setValue({ x: dx, y: dy });
				titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
			},
			onPanResponderRelease: (_, { dx, dy }) => {
				const direction = Math.sign(dx);
				const isSwipedOffScreen = Math.abs(dx) > 100;

				if (isSwipedOffScreen) {
					Animated.timing(swipe, {
						duration: 100,
						toValue: {
							x: direction * 500,
							y: dy,
						},
						useNativeDriver: true,
					}).start(removeTopCard);
					return;
				}

				Animated.spring(swipe, {
					toValue: {
						x: 0,
						y: 0,
					},
					useNativeDriver: true,
					friction: 5,
				}).start();
			},
		}),
	).current;

	const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
		inputRange: [-100, 0, 100],
		outputRange: ["8deg", "0deg", "-8deg"],
	});

	const animatedCardStyle = {
		transform: [...swipe.getTranslateTransform(), { rotate }],
	};

	const handleChoice = useCallback(
		(direction: number) => {
			Animated.timing(swipe.x, {
				toValue: direction * 500,
				duration: 400,
				useNativeDriver: true,
			}).start(removeTopCard);
		},
		[removeTopCard, swipe.x],
	);

	return (
		<View style={styles.container}>
			<ImageBackground
				{...(items?.[1] && { source: { uri: items?.[1]?.coverSrc } })}
				style={styles.swipeCard}>
				{(items as any[])?.map((item, index) => (
					<Animated.View
						key={index.toString()}
						style={[index === 0 ? animatedCardStyle : {}]}
						{...(index === 0 ? panResponder.panHandlers : {})}>
						{children(item, swipe, index === 0)}
					</Animated.View>
				))}
			</ImageBackground>

			<View style={styles.actionBar}>{renderActionBar(handleChoice)}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	swipeCard: {
		flex: 1,
	},
	actionBar: {
		width: "100%",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
});
