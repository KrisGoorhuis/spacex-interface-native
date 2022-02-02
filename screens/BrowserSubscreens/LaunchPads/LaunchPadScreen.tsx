import * as React from 'react'
import { StyleSheet } from 'react-native'

import LaunchPadPage from '../../../components/launchPads/launchPadPage/launchPadPage'
import { View } from '../../../components/Themed'


interface LaunchPadScreenProps {
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPadScreen(props: LaunchPadScreenProps) {
   const launchPad = props.route.params.launchPad

   return (
      <View style={styles.container}>
         {
            launchPad ?
               <LaunchPadPage launchPad={launchPad} />
               :
               null
         }
      </View>
   )
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
})
