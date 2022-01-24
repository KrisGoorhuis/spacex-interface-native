import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Badge } from 'react-native-elements'

import FavoriteLaunchPadButton from "../favoriteLaunchPadButton";
import { LaunchPad as LaunchPadType } from '../../../model/index'
import LinearGradient from "react-native-linear-gradient";


function LaunchPadHeader(props: { launchPad: LaunchPadType }) {

   const randomColor = (start = 200, end = 250) =>
      `hsl(${start + end * Math.random()}, 80%, 90%)`;
   const styles = StyleSheet.create({
      container: {
         minHeight: '30vh',
         position: 'relative',
         padding: 2,
         alignItems: 'flex-end',
         justifyContent: 'space-between'
      },
      image: {
         position: 'absolute',
         top: 5,
         right: 5,
         height: 85, // 150?
      },
      header: {
         color: 'white',
         // display: 'inline',
         backgroundColor: '#718096b8',
         // fontSize: 'large' or '5xl'
         margin: '2 4',
         borderRadius: 10 // 'large'
      },
      stack: {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         // isInline spacing="3" alignItems="center" justifyContent="center" display="flex"
      }
   })


   // withbackground component. Wraps the rest. Used it elsewhere. 
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
            {/* colorScheme="purple" */}
            <Badge>
               {props.launchPad.successful_launches}/{props.launchPad.attempted_launches}{" "}
               successful
            </Badge>
            {props.launchPad.status === "active" ? (
               // colorScheme="green"
               <Badge>
                  Active
               </Badge>
            ) : (
               // colorScheme="red"
               <Badge>
                  Retired
               </Badge>
            )}
         </View>
      </View>
   );
}



export default LaunchPadHeader