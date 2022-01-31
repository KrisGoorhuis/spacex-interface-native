import * as React from 'react'
import { StyleSheet } from 'react-native'

import { View } from '../../../components/Themed'


interface MissionScreenProps {
   [x: string]: any 
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
