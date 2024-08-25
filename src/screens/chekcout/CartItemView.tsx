import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CartItem } from '@/types';

type CartItemViewProps = {
  item: CartItem;
};

const CartItemView: React.FC<CartItemViewProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image source={item.menuItem.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.menuItem.name}</Text>
        <Text style={styles.description}>{item.menuItem.description}</Text>
        <View style={styles.priceContainer}>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.price}>Price: ${item.totalPrice.toFixed(2)}</Text>
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
    shadowRadius: 10,
    elevation: 5,
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
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quantity: {
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartItemView;
