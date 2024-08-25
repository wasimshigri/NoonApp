import TextBold from '@/components/atom/text/TextBold';
import TextRegular from '@/components/atom/text/TextRegular';
import {Outlet} from '@/types';
import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';

const OutletItemView = ({
  item,
  onPress,
}: {
  item: Outlet;
  onPress: (outletId: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => {
      //   navigation.navigate('OutletDetails', {outletId: item.id});
      onPress(item.id);
    }}>
    <View style={styles.outletContainer}>
      <Image source={item.image} style={styles.outletImage} />
      <View style={styles.outletTextContainer}>
        <TextBold style={styles.outletName}>{item.name}</TextBold>
        <TextRegular style={styles.outletDescription}>{item.description}</TextRegular>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  outletContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    overflow: 'hidden',
  },
  outletImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  outletTextContainer: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  outletName: {
    fontSize: 18,
  },
  outletDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default React.memo(OutletItemView);
