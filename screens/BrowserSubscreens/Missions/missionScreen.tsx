import { RouteProp } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet } from 'react-native'

import MissionPage from '../../../components/missions/missionPage.tsx/missionPage'
import { View } from '../../../components/Themed'
import { BrowserStackParamList } from '../../../model/navTypes'


interface MissionScreenProps {
   route: RouteProp<BrowserStackParamList, "Mission">
}

export default function MissionScreen(props: MissionScreenProps) {
   const mission = props.route.params.mission

   return (
      <View style={styles.container}>
         {
            mission ?
               <MissionPage mission={mission} />
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
