import React from "react"
import { StyleSheet, Text, View } from 'react-native'


import { Mission } from '../../../model/index'



interface MissionPage {
   mission: Mission,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function MissionPage(props: MissionPage) {



   const Header = () => (
      <>
         <View>
            <Text>Mission Page</Text>
            <Text>{props.mission}</Text>
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