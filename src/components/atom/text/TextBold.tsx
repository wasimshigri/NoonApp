import React from 'react';
import { StyleSheet, TextProps } from 'react-native';
import TextRegular from './TextRegular';

type TextBoldProps = TextProps & {
  children: React.ReactNode;
};

const TextBold: React.FC<TextBoldProps> = ({ children, style, ...rest }) => {
  return (
    <TextRegular
      style={[ styles.text, style]}
      {...rest}
    >
      {children}
    </TextRegular>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(TextBold);
