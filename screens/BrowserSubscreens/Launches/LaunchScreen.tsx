import { RouteProp } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform, StyleSheet } from 'react-native'

import LaunchPage from '../../../components/Launches/launchPage/launchPage'
import { View } from '../../../components/Themed'
import { Launch } from '../../../model'
import { BrowserStackParamList } from '../../../model/navTypes'


interface LaunchScreenProps {
   route: RouteProp<BrowserStackParamList, "Launch">
}

export default function LaunchScreen(props: LaunchScreenProps) {
   const launch: Launch = props.route.params.launch

   return (
      <View style={styles.container}>
         {
            launch ?
               <LaunchPage launch={launch} />
               :
               null
         }
         {/* Use a light status bar on iOS to account for the black space above the modal */}
         <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
})
