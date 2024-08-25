import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {MenuItem, CartItem} from '@/types';
import colors from '@/theme/colors';
import TextBold from '@/components/atom/text/TextBold';
import TextRegular from '@/components/atom/text/TextRegular';
import TextMedium from '@/components/atom/text/TextMedium';
import RoundButton from '@/components/atom/buttons/RoundButton';

type MenuItemViewProps = {
  item: MenuItem;
  cartItem: CartItem | null;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
};

const MenuItemView: React.FC<MenuItemViewProps> = React.memo(
  ({item, cartItem, onAddToCart, onRemoveFromCart}) => {
    console.log(
      `Render - MenuItemView: ${item.id}, cartQuantity: ${cartItem?.quantity}`,
    );
    const quantity = cartItem?.quantity || 0;

    return (
      <View style={styles.container}>
        <Image source={item.image} style={styles.thumbnail} />
        <View style={styles.detailsContainer}>
          <TextBold style={styles.title}>{item.name}</TextBold>
          <TextRegular
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.description}
          </TextRegular>
          <TextMedium style={styles.price}>${item.price.toFixed(2)}</TextMedium>
          <View style={styles.cartActions}>
            <RoundButton
              style={[styles.button]}
              onPress={() => onRemoveFromCart(item)}
              disabled={!cartItem}
              title="-"
            />
            <TextMedium style={styles.quantityText}>{quantity}</TextMedium>
            <RoundButton
              style={styles.button}
              onPress={() => onAddToCart(item)}
              title="+"
            />
          </View>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.cartItem === nextProps.cartItem &&
      prevProps.item === nextProps.item
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
  },
  thumbnail: {
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
    marginBottom: 5,
  },
  description: {
    color: 'gray',
    marginBottom: 10,
  },
  price: {
    color: 'green',
    marginBottom: 10,
  },
  cartActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default MenuItemView;
