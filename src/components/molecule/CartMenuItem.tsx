import {useAppDispatch, useAppSelector} from '@/hooks/store/store';
// import colors from '@/theme/colors';
// import fonts from '@/theme/fonts';
import {NavigationProp} from '@react-navigation/native';
import {ColorValue, Pressable} from 'react-native';
// import {Badge} from 'react-native-paper';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Badge from './Badge';

type CartMenuItemProps = {
  navigation: NavigationProp<any, any>;
  color?: string | number | ColorValue | undefined;
};
const CartMenuItem = ({navigation, color}: CartMenuItemProps) => {
  const cartCount = useAppSelector(state => state.cart.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Cart');
      }}>
      <Iconicons name="cart" size={24} color={color} />
      {cartCount > 0 && (
        <Badge
          style={{
            position: 'absolute',
            top: -10,
            right: -10,
            backgroundColor: "#ff6347",
          }} 
          size={20}
          text={`${cartCount}`} />
       
      )}
    </Pressable>
  );
};

export default CartMenuItem;
