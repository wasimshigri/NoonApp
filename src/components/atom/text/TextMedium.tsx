import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import TextRegular from './TextRegular';

type TextMediumProps = TextProps & {
  children: React.ReactNode;
};

const TextMedium: React.FC<TextMediumProps> = ({ children, style, ...rest }) => {
  return (
    <TextRegular
      style={[styles.text, style]}
      {...rest}
    >
      {children}
    </TextRegular>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
  },
});

export default React.memo(TextMedium);
