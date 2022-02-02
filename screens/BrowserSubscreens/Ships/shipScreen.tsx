import * as React from 'react'
import { StyleSheet } from 'react-native'

import ShipPage from '../../../components/ships/shipPage/shipPage'
import { View } from '../../../components/Themed'


interface ShipScreenProps {
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function ShipScreen(props: ShipScreenProps) {
   const ship = props.route.params.ship

   return (
      <View style={styles.container}>
         {
            ship ?
               <ShipPage ship={ship} />
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
