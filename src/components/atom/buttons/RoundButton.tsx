import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  DimensionValue,
  ColorValue,
  TextStyle,
  View,
  ActivityIndicator,
} from 'react-native';
import TextRegular from '../text/TextRegular';
import {useTheme} from '@react-navigation/native';
import { MyTheme } from '@/theme/Themes';

type RoundButtonProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
};

const RoundButton: React.FC<RoundButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const {colors} = useTheme() as MyTheme;

  const styles = createStyles(colors);

  const content = loading ? (
    <ActivityIndicator
      color={
        StyleSheet.flatten([styles.title, textStyle])?.color ?? colors.secondary
      }
    />
  ) : (
    <TextRegular style={[styles.title, textStyle]}>{title}</TextRegular>
  );

  return disabled ? (
    <View style={[styles.button, style, styles.disabled]}>{content}</View>
  ) : (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {content}
    </TouchableOpacity>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    button: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.primary,
      borderWidth: 1,
    },
    title: {
      color: 'white',
    },
    disabled: {
      opacity: 0.5,
    },
  });

export default RoundButton;
