import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation/Navigation';
import {Outlet, PromoItem} from '@/types';
import {useOutlets} from '@/hooks/api/useOutlets';
import {usePromoItems} from '@/hooks/api/usePromoItems';
import PromoCarousalView from './PromoCarousalView';
import OutletItemView from './OutletItemView';
// import { TouchableOpacity } from 'react-native-gesture-handler';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen = ({navigation,}: {navigation: HomeScreenNavigationProp}) => {
  const {data: outlets, isLoading, error} = useOutlets();
  const {data: promoItems} = usePromoItems();

  const handlePress = useCallback((outletId: string) => {
    navigation.navigate('OutletDetails', {outletId});
  }, [navigation]);

  const renderOutlet = ({item}: {item: Outlet}) => (
    <OutletItemView item={item} onPress={handlePress} />
  );

  const renderHeader = () =>
    (promoItems?.length  ?? 0) > 0 ? (
      <PromoCarousalView promoItems={promoItems ?? []} />
    ) : (
      <></>
    );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={outlets}
        renderItem={renderOutlet}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          (promoItems?.length ?? 0) > 0 ? renderHeader : <></>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
