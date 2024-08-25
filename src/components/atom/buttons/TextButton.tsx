import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import TextRegular from '../text/TextRegular';

type TextButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;      
  textStyle?: StyleProp<TextStyle>; 
};

const TextButton: React.FC<TextButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <TextRegular style={[styles.title, textStyle]}>
        {title}
      </TextRegular>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
  },
});

export default React.memo(TextButton);
