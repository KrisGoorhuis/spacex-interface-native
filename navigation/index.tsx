import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import Favorites from '../screens/FavoritesScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../model/navTypes';
import LinkingConfiguration from './LinkingConfiguration';
import BrowserStack from './browserStack';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

      {/* Nest stacks */}
      {/* <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name="Launches" component={LaunchScrollScreen} />
        <Stack.Screen
          name="Launch"
          options={({ route }) => ({
            headerTitle: `${route.params.launch.mission_name}`
          })}
          component={LaunchScreen}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen name="Launch Pads" component={LaunchPadScrollScreen} />
        <Stack.Screen name="Launch Pad" component={LaunchPadScreen} />
      </Stack.Group> */}

    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Browser"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme].tint,
      })}>
      <BottomTab.Screen
        name="Browser"
        component={BrowserStack}
        options={({ navigation }: RootTabScreenProps<'Browser'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="rocket1" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <TabBarIcon name="staro" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={30} style={{ marginBottom: -3 }} {...props} />;
}
