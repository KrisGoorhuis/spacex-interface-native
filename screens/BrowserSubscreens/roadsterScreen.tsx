import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'

import RoadsterPage from '../../components/roadster/roadsterPage'
import { Roadster } from '../../model'
import { queryRoadster } from '../../utils/networking'



interface RoadsterScreenProps {
   [x: string]: any
}

export default function RoadsterScreen(props: RoadsterScreenProps) {
   const {isLoading, data} = useQuery<Roadster, Error>(
      ['roadster'],
      (context) => queryRoadster(context)
   )
   
   return (
      <View style={styles.container}>
         {
            data ?
               <RoadsterPage roadster={data} />
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
