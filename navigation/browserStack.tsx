import * as React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useInfiniteQuery, useQuery } from 'react-query'

import { BrowserScreenProps, BrowserStackParamList } from "../model/navTypes"
import BrowserScreen from "../screens/BrowserScreen"
import LaunchScrollScreen from "../screens/BrowserSubscreens/Launches/launchesScreen"
import LaunchScreen from "../screens/BrowserSubscreens/Launches/LaunchScreen"
import LaunchPadScreen from "../screens/BrowserSubscreens/LaunchPads/LaunchPadScreen"
import LaunchPadScrollScreen from "../screens/BrowserSubscreens/LaunchPads/launchPadsScreen"
import { Launch, LaunchPad, Mission, Roadster, Ship } from '../model'
import { queryLaunches, queryLaunchPads, queryMissions, queryRoadster, queryShips } from '../utils/networking'
import { launchPadPageSize, launchesPageSize } from '../model/constants'
import ShipScrollScreen from '../screens/BrowserSubscreens/Ships/shipsScreen'
import MissionScreen from '../screens/BrowserSubscreens/Missions/missionScreen'
import MissionScrollScreen from '../screens/BrowserSubscreens/Missions/missionsScreen'
import ShipScreen from '../screens/BrowserSubscreens/Ships/shipScreen'
import RoadsterScreen from '../screens/BrowserSubscreens/roadsterScreen'


const Stack = createNativeStackNavigator<BrowserStackParamList>()

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
  useInfiniteQuery<Ship[], Error>(
    ['ships'],
    (context) => queryShips(context, launchesPageSize),
  )
  useInfiniteQuery<Mission[], Error>(
    ['missions'],
    (context) => queryMissions(context, launchesPageSize),
  )
  useQuery<Roadster, Error>(
    ['roadster'],
    (context) => queryRoadster(context)
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

      <Stack.Screen name="Missions" component={MissionScrollScreen} />
      <Stack.Screen name="Mission" component={MissionScreen} />

      <Stack.Screen name="Ships" component={ShipScrollScreen} />
      <Stack.Screen name="Ship" component={ShipScreen} />

      <Stack.Screen name="Roadster" component={RoadsterScreen} />

    </Stack.Navigator>
  )
}
