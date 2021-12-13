import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import LaunchPage from '../../../components/Launches/launchPage/launch-page';

import { View } from '../../../components/Themed';
import { Launch } from '../../../model';


interface LaunchScreenProps {
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchScreen(props: LaunchScreenProps) { 
   const launch: Launch = props.route.params.launch

   return (
      <View style={styles.container}>
         {
            launch &&
            <LaunchPage launch={launch} />
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
