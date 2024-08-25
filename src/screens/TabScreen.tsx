import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './home/HomeScreen';
import SearchScreen from './search/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartMenuItem } from '@/components/molecule';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation, route}) => ({
          title: 'Suggestions',
          headerShown: true,
          headerRight: () => (
            <View style={{marginEnd: 12}}>
              <CartMenuItem navigation={navigation} />
            </View>
          ),
        })}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default TabScreen;
