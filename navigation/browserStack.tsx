import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BrowserScreenProps, BrowserStackParamList } from "../model/navTypes";
import BrowserScreen from "../screens/BrowserScreen";
import LaunchScrollScreen from "../screens/BrowserSubscreens/Launches/launchesScreen";
import LaunchScreen from "../screens/BrowserSubscreens/Launches/LaunchScreen";
import LaunchPadScreen from "../screens/BrowserSubscreens/LaunchPads/LaunchPadScreen";
import LaunchPadScrollScreen from "../screens/BrowserSubscreens/LaunchPads/launchPadsScreen";
import { useInfiniteQuery } from 'react-query';
import { Launch, LaunchPad } from '../model';
import { queryLaunches, queryLaunchPads } from '../utils/networking';
import { launchPadPageSize, launchesPageSize } from '../model/constants';


const Stack = createNativeStackNavigator<BrowserStackParamList>();

export default function BrowserStack({ navigation }: BrowserScreenProps<'Browser Screen'>) {


  // Begin queries before users reach their relevant pages. So cool!
  useInfiniteQuery<LaunchPad[], Error>(
    ['launchPads'],
    (context) => queryLaunchPads(context, launchPadPageSize),
  )
  useInfiniteQuery<Launch[], Error>(
    ['launches'],
    (context) => queryLaunches(context, launchesPageSize),
  )

  return (
    <Stack.Navigator initialRouteName="Browser Screen">
      <Stack.Screen
        name="Browser Screen"
        options={() => ({
          headerTitle: `Browse`,
        })}
        component={BrowserScreen} />

      <Stack.Screen name="Launches" component={LaunchScrollScreen} />
      <Stack.Screen
        name="Launch"
        options={({ route }) => ({
          headerTitle: `${route.params.launch.mission_name}`
        })}
        component={LaunchScreen}
      />

      <Stack.Screen name="Launch Pads" component={LaunchPadScrollScreen} />
      <Stack.Screen name="Launch Pad" component={LaunchPadScreen} />
    </Stack.Navigator>
  );
}
