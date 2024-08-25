import TextBold from "@/components/atom/text/TextBold";
import TextRegular from "@/components/atom/text/TextRegular";
import metrics from "@/theme/metrics";
import { PromoItem } from "@/types";
import React from "react";
import { View, Image, StyleSheet } from "react-native";

//Only because we are using dummy images as hard-coded
const getImageSource = (imagePath: string) => {
    switch (imagePath) {
      case 'pizza.jpg':
        return require('../../assets/images/pizza.jpg');
      case 'burger.jpg':
        return require('../../assets/images/burger.jpg');
      case 'sushi.jpg':
        return require('../../assets/images/sushi.jpg');
      case 'pasta.jpg':
        return require('../../assets/images/pasta.jpg');
      case 'taco.jpg':
        return require('../../assets/images/tico.jpg');
      default:
        return require('../../assets/images/pizza.jpg');
    }
  };
  
const PromoItemView = ({ item }: { item: PromoItem }) => (
    <View style={styles.promoItemContainer} key={item.id}>
      <Image source={getImageSource(item.image)} style={styles.promoImage} />
      <TextBold style={styles.promoText}>{item.name}</TextBold>
    </View>
  );

  const styles = StyleSheet.create({
    promoItemContainer: {
      alignItems: 'center',
    },
    promoImage: {
      width: metrics.screenWidth * 0.8,
      height: 200,
      borderRadius: 10,
      resizeMode: 'cover',
      marginHorizontal: (metrics.screenWidth * 0.1) / 2,
    },
    promoText: {
      marginTop: 8,
      fontSize: 16,
    },
  });


  export default React.memo(PromoItemView);