import React, { useCallback, memo, useRef, useState, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  Animated
} from "react-native";
import { IconButton, Colors } from 'react-native-paper';
import {PinchGestureHandler,PanGestureHandler} from 'react-native-gesture-handler';


const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  slide: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  slideImage: { width: windowWidth , height: windowHeight  },
  slideTitle: { 
      fontSize: 24,
      color:"white",
      position:"absolute",
      top:20,
      right:20,
         },
  slideSubtitle: { fontSize: 18 },

  pagination: {
    position: "absolute",
    bottom: 8,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  close:{
      position:"absolute",
      top:10,
      left:15,

},
  paginationDotActive: { backgroundColor: "orange" },
  paginationDotInactive: { backgroundColor: "gray" },

  carousel: { flex: 1 },
});






export default function FullScreenCarousel(props) {

    useEffect(() => {
        const parent = props.navigation.dangerouslyGetParent();
        parent.setOptions({
          tabBarVisible: false,
        });
        return () =>
          parent.setOptions({
            tabBarVisible: true,
          });
      }, []);



  let images =props.route.params   
  console.log(props.route)
  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(s => String(s.id), []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      []
    ),
  };

  const Slide = memo(function Slide({ data, index }) {

    const scale = useRef(new Animated.Value(1)).current;

    
    const onPinchEvent = Animated.event([{ nativeEvent:{scale}}],{useNativeDriver: false},)
  

    return (
      <View style={styles.slide}>
     
      <Animated.View>
        <PinchGestureHandler onGestureEvent={onPinchEvent}>      
                <Animated.Image source={{ uri: data.image }} style={[styles.slideImage,{transform:[{scale}]}]} resizeMode={"contain"}/>
        </PinchGestureHandler>
        </Animated.View>
       
        <Text style={styles.slideTitle}>{index+1} of {images.length}</Text>
        <Text style={styles.close}>{index+1} of {images.length}</Text>
        <IconButton  icon="close"
        style={styles.close}
        color={"white"}
        size={24}
        onPress={() => props.navigation.goBack()} />
        
      </View>
    );
  });
  

  const renderItem = useCallback(function renderItem({ item,index }) {
    return <Slide data={item} index={index} />;
  }, []);


  function Pagination({ index }) {
    return (
      <View style={styles.pagination} pointerEvents="none">
        {images.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={images}
        style={styles.carousel}
        renderItem={renderItem}
        style={{backgroundColor:"black"}}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
      />
      <Pagination index={index}></Pagination>
    </>
  );
}
