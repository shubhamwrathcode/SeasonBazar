import {
    StyleSheet,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Animated,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { ImageAssets } from '../../../components/ImageAssets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../components/colors';
import { AppFonts } from '../../../components/Appfonts';
import AppText from '../../../components/AppText';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        title: 'Welcome to\nSeason Bazaar',
        subtitle: "From daily needs to special treats,\nwe've got you covered",
        image: ImageAssets.OnBoarding1,
    },
    {
        id: '2',
        title: 'Free\nHome Delivery',
        subtitle: 'Enjoy Free Delivery on All Orders\nAbove ₹499, Shop Now.',
        image: ImageAssets.OnBoarding2,
    },
    {
        id: '3',

        title: 'Fast, Flexible\nSecure Payments',
        subtitle: 'Pay seamlessly with cards, wallets,\nor cash on delivery.',
        image: ImageAssets.OnBoarding3,
    },
];

const OnBoarding = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        viewAreaCoveragePercentThreshold: 50,
    }).current;

    const handleNext = () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            navigation.replace('Welcome');
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex - 1,
                animated: true,
            });
        }
    };

    const renderImageSlide = ({ item }: { item: typeof SLIDES[0] }) => (
        <View style={styles.imageSlide}>
            <View style={styles.imageCard}>
                <Image source={item.image} style={styles.mainImage} resizeMode="contain" />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* Fixed Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <Image source={ImageAssets.AppLogo} style={[styles.logo, {}]} resizeMode="contain" />
            </View>

            {/* Swipeable Image Area */}
            <View style={[styles.imageAreaContainer, {}]}>
                <FlatList
                    ref={flatListRef}
                    data={SLIDES}
                    renderItem={renderImageSlide}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    keyExtractor={(item) => item.id}
                    scrollEventThrottle={16}
                    bounces={false}
                />
            </View>

            {/* Fixed Purple Container with Swipeable Text */}
            <View style={styles.bottomCard}>
                {/* Animated Text Track Container */}
                <View style={styles.textTrackWrapper}>
                    <Animated.View style={[
                        styles.textTrack,
                        {
                            transform: [{
                                translateX: scrollX.interpolate({
                                    inputRange: [0, width, width * 2],
                                    outputRange: [0, -width, -width * 2]
                                })
                            }]
                        }
                    ]}>
                        {SLIDES.map((item, index) => (
                            <View key={index} style={styles.textSlide}>
                                <AppText size={30} font={AppFonts.SemiBold} color={Colors.white} textAlign="center" style={{ lineHeight: 38 }}>
                                    {item.title}
                                </AppText>
                                <AppText size={18} font={AppFonts.Light} color={Colors.white80} textAlign="center" style={styles.subtitleStyle}>
                                    {item.subtitle}
                                </AppText>
                            </View>
                        ))}
                    </Animated.View>
                </View>

                {/* Fixed Footer Buttons and Dots */}
                <View style={styles.footer}>
                    <View style={styles.navButtonsContainer}>
                        {currentIndex > 0 ? (
                            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                                <Image
                                    source={ImageAssets.Next}
                                    style={[styles.navIcon, { tintColor: Colors.white, transform: [{ rotate: '180deg' }] }]}
                                />
                            </TouchableOpacity>
                        ) : <View style={styles.placeholderButton} />}

                        <View style={styles.indicatorContainer}>
                            {SLIDES.map((_, index) => {
                                const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                                const dotWidth = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [6, 25, 6],
                                    extrapolate: 'clamp',
                                });
                                const opacity = scrollX.interpolate({
                                    inputRange,
                                    outputRange: [0.4, 1, 0.4],
                                    extrapolate: 'clamp',
                                });
                                return (
                                    <Animated.View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            { width: dotWidth, opacity, backgroundColor: Colors.white }
                                        ]}
                                    />
                                );
                            })}
                        </View>

                        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                            <Image source={ImageAssets.Next} style={styles.navIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default OnBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        paddingHorizontal: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: Colors.white,
    },
    logo: {
        width: 150,
        height: 40,
    },
    imageAreaContainer: {
        flex: 0.55,
        zIndex: 1,
    },
    imageSlide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
        backgroundColor: Colors.white,
    },
    imageCard: {
        width: width * 0.82,
        height: '85%',
        backgroundColor: Colors.lightPurple,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    bottomCard: {
        flex: 0.45,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        zIndex: 2,
        overflow: 'hidden',
    },
    textTrackWrapper: {
        width: width,
        flex: 1,
    },
    textTrack: {
        flexDirection: 'row',
        width: width * 3,
    },
    textSlide: {
        width: width,
        paddingTop: 45,
        alignItems: 'center',
    },
    subtitleStyle: {
        lineHeight: 24,
        paddingHorizontal: 40,
        marginTop: 15,
    },
    footer: {
        position: 'absolute',
        bottom: 35,
        width: width,
        paddingHorizontal: 30,
    },
    navButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 6,
        borderRadius: 3,
        marginHorizontal: 4,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.white30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderButton: {
        width: 44,
    },
    nextButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navIcon: {
        width: 20,
        height: 20,
        tintColor: Colors.primary,
        resizeMode: "contain"
    },
});