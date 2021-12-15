import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import LaunchPadPage from '../../../components/launchPads/launchPadPage/launch-pad-page';

import { Text, View } from '../../../components/Themed';


interface LaunchPadScreenProps {
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPadScreen(props: LaunchPadScreenProps) { 
   const launchPad = props.route.params.launchPad


   return (
      <View style={styles.container}>
         <Text style={styles.title}>Launches!</Text>

         <Text style={styles.title}>{JSON.stringify(launchPad)}</Text>
         {
            launchPad &&
            <LaunchPadPage launchPad={launchPad} />
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
