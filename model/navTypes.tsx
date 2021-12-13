/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Launch, LaunchPad } from '.';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  Launch: { launch: Launch };
  Launches: undefined;

  "Launch Pad": { launchPad: LaunchPad };
  "Launch Pads": undefined;
  NotFound: undefined;
};

export type BrowserStackParamList = {
  "Browser Screen": undefined;

  Launch: { launch: Launch };
  Launches: undefined;

  "Launch Pad": { launchPad: LaunchPad };
  "Launch Pads": undefined;
};

export type FavoritesStackParamList = {
  "Favorites Screen": undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Browser: undefined;
  Favorites: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;