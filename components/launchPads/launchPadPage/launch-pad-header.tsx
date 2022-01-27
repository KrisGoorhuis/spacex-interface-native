import React from "react"
import { StyleSheet, View, Text } from 'react-native'
import { Badge } from 'react-native-elements'
import { LinearGradient } from "expo-linear-gradient"

import FavoriteLaunchPadButton from "../favoriteLaunchPadButton"
import { LaunchPad as LaunchPadType } from '../../../model/index'


function LaunchPadHeader(props: { launchPad: LaunchPadType }) {

   const randomColor = (start = 200, end = 250) =>
      `hsl(${start + end * Math.random()}, 80%, 90%)`

   return (
      <LinearGradient
         style={styles.container}
         colors={[randomColor(), randomColor()]}
      >
         <Text style={styles.header}>
            {props.launchPad.site_name_long}
         </Text>
         <View style={styles.stack}>
            <View style={styles.badge}>
               <FavoriteLaunchPadButton {...props} />
            </View>
            <Badge containerStyle={styles.badge} value={`${props.launchPad.successful_launches}/${props.launchPad.attempted_launches} successful`} status={'primary'} />
            {props.launchPad.status === "active" ? (
               <Badge containerStyle={styles.badge} value={'Active'} status={'success'} />
            ) : (
               <Badge containerStyle={styles.badge} value={'Retired'} status={'warning'} />
            )}
         </View>
      </LinearGradient>
   )
}

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 130
   },
   image: {
      position: 'absolute',
      top: 5,
      right: 5,
      height: 50,
      width: 50,
   },
   stack: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 5,
      right: 5,
   },
   badge: {
      marginRight: 5
   },
   header: {
      borderRadius: 10,
      color: 'black',
      display: 'flex',
      justifyContent: 'center',
      fontSize: 18,
      padding: 3
   },
})


export default LaunchPadHeader