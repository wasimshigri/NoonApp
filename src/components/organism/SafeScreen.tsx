import {SafeAreaView, StatusBar, View, useColorScheme} from 'react-native';
import type {PropsWithChildren} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const SafeScreen = ({children}: PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
      {children}
      </View>
    </SafeAreaView>
  );
};

export default SafeScreen;
