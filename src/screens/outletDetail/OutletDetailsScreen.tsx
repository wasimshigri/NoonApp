import React, {useCallback} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/Navigation';
import {MenuItem, CartItem} from '@/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useOutletDetails} from '@/hooks/api/useOutletDetail';
import {useAppDispatch, useAppSelector} from '@/hooks/store/store';
import {addToCart, clearCart, removeFromCart} from '@/storage/store/cartSlice';
import {Badge, CartMenuItem} from '@/components/molecule';
import MenuItemView from './MenuItemView';
import OutletHeader from './OutletHeader';
import colors from '@/theme/colors';
import TextBold from '@/components/atom/text/TextBold';
import {RouterProps} from '@/navigation/routerTypes';

const OutletDetailsScreen: React.FC<RouterProps<'OutletDetails'>> = ({
  route,
  navigation,
}) => {
  const {outletId} = route.params;
  const dispatch = useAppDispatch();
  const {data: outletDetail, isLoading, error} = useOutletDetails(outletId);

  const cartItems = useAppSelector(state => state.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );

  const handleAddToCart = useCallback(
    (item: MenuItem) => {
      if (
        cartItems.length > 0 &&
        cartItems[0].menuItem.outletId !== item.outletId
      ) {
        Alert.alert(
          'Cart alert',
          'You have items in cart from another outlet. Do you want to discard them?',
          [
            {text: 'YES', style: 'destructive', onPress: () => {
             // dispatch(clearCart());
              dispatch(addToCart(item));
            }},
            {text: 'NO', style: 'cancel', onPress: () => {}},
          ],
        );
      } else {
        dispatch(addToCart(item));
      }
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (menuItem: MenuItem) => {
      dispatch(removeFromCart(menuItem.id));
    },
    [dispatch],
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (!outletDetail) {
    return <Text>Outlet not found</Text>;
  }

  // const {outlet, menuItems} = outletDetail;

  const renderMenuItem = ({item}: {item: MenuItem}) => {
    const cartItem: CartItem | null =
      cartItems.find(cartItem => cartItem.id === item.id) || null;

    return (
      <MenuItemView
        item={item}
        cartItem={cartItem}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    );
  };

  const renderPriceSection = () => (
    <View style={styles.footerContainer}>
      <View>
        <View style={styles.footerRow}>
          <TextBold style={styles.footerLabel}>Total Price:</TextBold>
          <TextBold style={styles.footerLabel}>
            ${totalPrice.toFixed(2)}
          </TextBold>
        </View>
      </View>

      <Pressable
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Ionicons name="cart" size={36} color={'#ff6347'} />
        {totalItems > 0 && (
          <Badge
            style={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: '#ff6347',
            }}
            size={20}
            text={`${totalItems}`}
          />
        )}
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={outletDetail.menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <OutletHeader
            image={outletDetail.outlet.image}
            name={outletDetail.outlet.name}
          />
        }
      />
      {renderPriceSection()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontSize: 16,
  },
});

export default OutletDetailsScreen;
