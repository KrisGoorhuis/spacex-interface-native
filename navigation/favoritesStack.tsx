import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FavoritesStackParamList, RootTabScreenProps } from "../model/navTypes";


const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export default function BrowserStack({ navigation }: RootTabScreenProps<'Browser'>) {

  return (
    <Stack.Navigator initialRouteName="Favorites Screen">

    </Stack.Navigator>
  );
}
