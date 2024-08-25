import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigation from '@/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from '@/storage/store/store';
import SafeScreen from '@/components/organism/SafeScreen';

const queryClient = new QueryClient();

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SafeScreen>
          <AppNavigation />
        </SafeScreen>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
