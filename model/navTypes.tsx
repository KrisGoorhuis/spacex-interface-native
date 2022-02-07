/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { Launch, LaunchPad, Mission, Roadster, Ship } from '.'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}


// Stack params
export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
}

export type BrowserStackParamList = {
  "Browser Screen": undefined

  Launch: { launch: Launch }
  Launches: undefined

  "Launch Pad": { launchPad: LaunchPad }
  "Launch Pads": undefined

  "Ship": { ship: Ship }
  "Ships": undefined

  "Mission": { mission: Mission }
  "Missions": undefined

  "Roadster": undefined
}

export type FavoritesStackParamList = {
  "Favorites Screen": undefined

  Launch: { launch: Launch }
  "Launch Pad": { launchPad: LaunchPad }
}

export type RootTabParamList = {
  Browser: undefined
  Favorites: undefined
}


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type BrowserScreenProps<Screen extends keyof BrowserStackParamList> = CompositeScreenProps<
  BottomTabScreenProps<BrowserStackParamList, Screen>,
  NativeStackScreenProps<BrowserStackParamList>
>

export type FavoritesScreenProps<Screen extends keyof FavoritesStackParamList> = NativeStackScreenProps<FavoritesStackParamList, Screen>

