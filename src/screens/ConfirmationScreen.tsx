import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TextRegular from '@/components/atom/text/TextRegular';
import TextButton from '@/components/atom/buttons/TextButton';
import colors from '@/theme/colors';
import { RouterProps } from '@/navigation/routerTypes';

const ConfirmationScreen: React.FC<RouterProps<'Confirmation'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextRegular style={styles.message}>Order Placed Successfully!</TextRegular>
      <TextRegular style={styles.subMessage}>Your order is on its way.</TextRegular>
      <TextButton textStyle={styles.backButton} title="Back to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  message: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subMessage: { fontSize: 18, color: 'gray', marginBottom: 24 },
  backButton: { color: colors.primary}
});

export default ConfirmationScreen;
