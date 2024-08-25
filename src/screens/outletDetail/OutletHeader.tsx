import TextBold from '@/components/atom/text/TextBold';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type OutletHeaderProps = {
  image: any;
  name: string;
};

const OutletHeader: React.FC<OutletHeaderProps> = React.memo(({ image, name }) => {
    console.log(`Render - OutletHeader: `)

  return (
    <View>
      <Image source={image} style={styles.image} />
      <TextBold style={styles.outletName}>{name}</TextBold>
    </View>
  );
});

const styles = StyleSheet.create({
  image: { width: '100%', height: 200, marginBottom: 16 },
  outletName: { fontSize: 24, marginBottom: 16 },
});

export default OutletHeader;
