import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FavoritesStackParamList, RootTabScreenProps } from "../model/navTypes";
import FavoritesScreen from '../screens/FavoritesScreen';
import LaunchPadScreen from '../screens/BrowserSubscreens/Launches/LaunchPads/LaunchPadScreen';
import LaunchScreen from '../screens/BrowserSubscreens/Launches/LaunchScreen';


const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export default function FavoritesStack({ navigation }: RootTabScreenProps<'Browser'>) {

  return (
    <Stack.Navigator initialRouteName="Favorites Screen">
      <Stack.Screen
        name="Favorites Screen"
        options={() => ({
          headerTitle: `Favorites`,
        })}
        component={FavoritesScreen}
      />

      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Launch Pad" component={LaunchPadScreen} />
    </Stack.Navigator>
  );
}
