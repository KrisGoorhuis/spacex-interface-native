import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import LaunchPage from '../components/Launches/launchPage/launch-page';

import { Text, View } from '../components/Themed';
import { Launch } from '../model';


interface LaunchPadScreenProps {
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPadScreen(props: LaunchPadScreenProps) { 
   const launch = props.route.params.launchPad

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Launches!</Text>

         <Text style={styles.title}>{JSON.stringify(launch)}</Text>

         {
            launch &&
            <LaunchPadPage flight_number={launch.flight_number} />
         }


         <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


         {/* Use a light status bar on iOS to account for the black space above the modal */}
         <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
   },
});
