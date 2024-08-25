import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {PromoItem} from '@/types';
import PromoItemView from './PromoItemView';

const PromoCarousalView = ({promoItems}: {promoItems: PromoItem[]}) => {
  const renderPromoItem = ({item}: {item: PromoItem}) => (
    <PromoItemView item={item} />
  );

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={promoItems}
        renderItem={renderPromoItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 16,
    marginBottom: 24,
  }
});

export default React.memo(PromoCarousalView);
