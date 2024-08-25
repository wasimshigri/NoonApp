import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';

type BadgeProps = {
  text: string;
  size: number;
  style?: ViewStyle;
};

const Badge: React.FC<BadgeProps> = ({text, style, size}) => {
  return (
    <View
    style={[
      styles.badge,
      {
        width: size,
        height: size,
        borderRadius: size / 2,
      },
      style,
    ]}
  >
    <Text style={styles.text}>{text}</Text>
  </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
    color: '#fff'
  },
});

export default Badge;
