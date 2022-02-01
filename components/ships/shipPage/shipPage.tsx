import React from "react"
import { StyleSheet, Text, View } from 'react-native'

import { Ship } from '../../../model/index'



interface ShipPage {
   ship: Ship,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function ShipPage(props: ShipPage) {



   const Header = () => (
      <>
         <View>
            <Text>Ship Page</Text>
         </View>
      </>
   )

   return (
      <View style={styles.container}>
         <Header />
      </View >
   )
}


const styles = StyleSheet.create({
   container: {

   }
})