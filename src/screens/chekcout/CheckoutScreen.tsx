import React, {useState} from 'react';
import {View, Text, FlatList, Button, StyleSheet, Alert} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigation/Navigation';
import {CartItem} from '@/types';
import {useAppDispatch, useAppSelector} from '@/hooks/store/store';
import CartItemView from './CartItemView';
import { clearCart } from '@/storage/store/cartSlice';
import { RouterProps } from '@/navigation/routerTypes';

const CheckoutScreen: React.FC<RouterProps<'Checkout'>> = ({navigation}) => {
  // const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart);
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');

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

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        style={styles.cartList}
      />

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentLabel}>Payment Method:</Text>
        <Text style={styles.paymentMethod}>{paymentMethod}</Text>
        <Button
          title="Change Payment Method"
          onPress={() => Alert.alert('Change Payment Method')}
        />
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Subtotal: </Text>
          <Text style={styles.summaryText}> ${calculateSubtotal()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Tax: </Text>
          <Text style={styles.summaryText}>${calculateTax()}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.total}>Total: </Text>
          <Text style={styles.total}>${calculateTotal()}</Text>
        </View>
      </View>

      <Button
        title="Place Order"
        onPress={() => {
          navigation.navigate('Confirmation')
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
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  paymentLabel: {fontSize: 18, fontWeight: 'bold'},
  paymentMethod: {fontSize: 16, marginBottom: 8},
  summaryContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  summaryRow: {flexDirection: 'row', justifyContent: 'space-between'},
  summaryText: {fontSize: 18, marginBottom: 8},
  total: {fontSize: 20, fontWeight: 'bold', textAlign: 'right', marginTop: 8},
});

export default CheckoutScreen;
