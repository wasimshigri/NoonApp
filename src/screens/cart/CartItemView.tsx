import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CartItem } from '@/types';
import TextBold from '@/components/atom/text/TextBold';
import TextRegular from '@/components/atom/text/TextRegular';
import TextMedium from '@/components/atom/text/TextMedium';

type CartItemViewProps = {
  item: CartItem;
};

const CartItemView: React.FC<CartItemViewProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.menuItem.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <TextBold>{item.menuItem.name}</TextBold>
        <TextRegular>{item.menuItem.description}</TextRegular>
        <View style={styles.priceContainer}>
        <TextRegular>Quantity: {item.quantity}</TextRegular>
        <TextMedium>Price: ${item.totalPrice.toFixed(2)}</TextMedium>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});

export default React.memo(CartItemView);
