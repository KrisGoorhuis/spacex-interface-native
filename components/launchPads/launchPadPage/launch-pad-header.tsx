import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements'
import LinearGradient from "react-native-linear-gradient";

import FavoriteLaunchPadButton from "../favoriteLaunchPadButton";
import { LaunchPad as LaunchPadType } from '../../../model/index'


function LaunchPadHeader(props: { launchPad: LaunchPadType }) {

   const randomColor = (start = 200, end = 250) =>
      `hsl(${start + end * Math.random()}, 80%, 90%)`;

   return (
      <View // TODO: Change back to LinearGradient. Don't work on web
         style={styles.container}
      // colors={[randomColor(), randomColor()]}
      >
         <Text style={styles.header}>
            {props.launchPad.site_name_long}
         </Text>
         <View style={styles.stack}>
            <FavoriteLaunchPadButton {...props} />
            <Badge value={`${props.launchPad.successful_launches}/${props.launchPad.attempted_launches} successful`} status={'primary'} />
            {props.launchPad.status === "active" ? (
               <Badge value={'Active'} status={'success'} />
            ) : (
               <Badge value={'Retired'} status={'warning'} />
            )}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      padding: 2,
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 150
   },
   image: {
      position: 'absolute',
      top: 5,
      right: 5,
      height: 50,
      width: 50,
   },
   title: {
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, .25)',
      borderRadius: 5,
      position: 'absolute',
      left: 5,
      bottom: 5,
      padding: 3,
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
      // display: 'inline',
      backgroundColor: '#718096b8',
      // fontSize: 'large' or '5xl'
      // margin: '2 4',
      borderRadius: 10 // 'large'
   },
})


export default LaunchPadHeader