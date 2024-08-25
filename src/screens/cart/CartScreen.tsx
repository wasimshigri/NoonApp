import React, {useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/Navigation';
import {CartItem} from '@/types';
import {useAppDispatch, useAppSelector} from '@/hooks/store/store';
import CartItemView from './CartItemView';
import {clearCart} from '@/storage/store/cartSlice';
import colors from '@/theme/colors';
import TextRegular from '@/components/atom/text/TextRegular';
import TextMedium from '@/components/atom/text/TextMedium';
import TextBold from '@/components/atom/text/TextBold';
import RoundButton from '@/components/atom/buttons/RoundButton';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

const CartScreen = ({navigation}: {navigation: CartScreenNavigationProp}) => {
  // const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart);

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => total + item.totalPrice, 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal * 0.1).toFixed(2); // Assuming 10% tax rate
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const tax = parseFloat(calculateTax());
    return (subtotal + tax).toFixed(2);
  };

  const renderCartItem = ({item}: {item: CartItem}) => (
    <CartItemView item={item} />
  );

  const summarySectionView = () => {
    return (
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <TextMedium style={styles.summaryText}>Subtotal: </TextMedium>
          <TextMedium style={styles.summaryText}>
            ${calculateSubtotal()}
          </TextMedium>
        </View>
        <View style={styles.summaryRow}>
          <TextMedium style={styles.summaryText}>Tax: </TextMedium>
          <TextMedium style={styles.summaryText}>${calculateTax()}</TextMedium>
        </View>
        <View style={styles.summaryRow}>
          <TextBold style={styles.total}>Total: </TextBold>
          <TextBold style={styles.total}>${calculateTotal()}</TextBold>
        </View>
      </View>
    );
  };

  const paymentOptionView = () => {
    return (
      <View style={styles.paymentContainer}>
        <TextBold style={styles.paymentLabel}>Payment Method:</TextBold>
        <TextRegular style={styles.paymentMethod}>{"Credit Card"}</TextRegular>
        {/* <Button
          title="Change Payment Method"
          onPress={() => Alert.alert('Change Payment Method')}
        /> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        style={styles.cartList}
      />
      {paymentOptionView()}
      {summarySectionView()}

      <RoundButton
        style={styles.orderButton}
        title="Place Order"
        onPress={() => {
          navigation.navigate('Confirmation');
          dispatch(clearCart());
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 16},
  cartList: {marginBottom: 16},
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cartItemText: {fontSize: 18},
  paymentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 4,
    borderColor: colors.border,
    shadowOpacity: 0.1,
  },
  paymentLabel: {fontSize: 18, fontWeight: 'bold'},
  paymentMethod: {fontSize: 16, marginBottom: 8},
  summaryContainer: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 4,
    borderColor: colors.border,
    shadowOpacity: 0.1,
  },
  summaryRow: {flexDirection: 'row', justifyContent: 'space-between'},
  summaryText: {fontSize: 16, marginBottom: 2},
  total: {fontSize: 18, textAlign: 'right', marginTop: 4},
  orderButton: {
    width: '90%',
    height: 40,
    borderRadius: 8,
    alignSelf: 'center',
  },
});

export default CartScreen;
