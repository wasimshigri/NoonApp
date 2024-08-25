import React, {useMemo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TextProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import fonts from '../../../theme/fonts';

type TextWidgetProps = TextProps & {
  children: React.ReactNode;
};

const TextRegular: React.FC<TextWidgetProps> = ({children, style, ...rest}) => {
  const {colors} = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Text style={[styles.textStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    textStyle: {
      fontSize: 14,
      color: colors.text,
    },
  });

export default React.memo(TextRegular);
