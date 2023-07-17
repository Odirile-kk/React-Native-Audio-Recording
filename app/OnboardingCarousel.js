// import React from 'react';
// import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
// import Carousel from 'react-native-snap-carousel';

// const { width } = Dimensions.get('window');

// const images = [
//   require('./assets/img3.jpg'),
//   require('./assets/img3.jpg'),
//   require('./assets/img3.jpg'),
// ];

// const OnboardingCarousel = () => {
//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.slide}>
//         <Image source={item} style={styles.image} />
//       </View>
//     );
//   };

//   return (
//     <Carousel
//       data={images}
//       renderItem={renderItem}
//       sliderWidth={width}
//       itemWidth={width}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   image: {
//     width: '80%',
//     height: '80%',
//     resizeMode: 'contain',
//   },
// });

// export default OnboardingCarousel;
