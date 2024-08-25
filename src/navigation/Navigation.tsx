import React from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from '@/screens/TabScreen';
import ConfirmationScreen from '@/screens/ConfirmationScreen';
import OutletDetailsScreen from '@/screens/outletDetail/OutletDetailsScreen';
import CartScreen from '@/screens/cart/CartScreen';
import CheckoutScreen from '@/screens/chekcout/CheckoutScreen';
import {MyLightTheme} from '@/theme/themes';

export type RootStackParamList = {
  Tab: undefined;
  Home: undefined;
  Search: undefined;
  OutletDetails: {outletId: string};
  Cart: undefined;
  Confirmation: undefined;
  Checkout: undefined;
};

// const Stack = createStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer theme={MyLightTheme}>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={({route, navigation}) => {
          return {
            headerBackTitleVisible: false,
          };
        }}>
        <Stack.Screen
          name="Tab"
          component={TabScreen}
          options={function ({route, navigation}) {
            return {
              headerShown: false,
            };
          }}
        />
        <Stack.Screen name="OutletDetails" component={OutletDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen}
        options={() => {
          return  {
            headerBackVisible: false
          }
        }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
