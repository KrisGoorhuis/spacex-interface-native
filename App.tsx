import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  QueryClientProvider,
  QueryClient,
} from 'react-query'
import { Provider } from 'react-redux';
import 'localstorage-polyfill';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import store from './redux'

AppRegistry.registerComponent('main', () => App);

export default function App() {
  const isLoadingComplete = useCachedResources(); // TODO: being replaced?
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient()

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient} >
        <Provider store={store}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>\
        </Provider>
      </QueryClientProvider>
    );
  }
}
