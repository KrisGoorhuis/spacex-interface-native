import React from "react"
import { View, ImageBackground, StyleSheet, Text, Dimensions } from "react-native"
import { Badge } from "react-native-elements"

import { Ship } from "../../../model"
import FavoriteShipButton from "../favoriteShipButton"


interface ShipProps {
   ship: Ship
}

const ShipPageHeader = (props: ShipProps) => {

   return (
      <ImageBackground
         resizeMode="cover"
         style={styles.container}
         source={{ uri: props.ship.image }}
      >
         <Text style={styles.title}>
            {props.ship.ship_name}
         </Text>

         <View style={styles.stack}>
            <View style={styles.badge}>
               <FavoriteShipButton {...props} />
            </View>
            <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.badge} value={`#${props.ship.ship_id}`} />
            {
               props.ship.active ? (
                  <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.badge} value={"Active"} status={"success"} />
               ) : (
                  <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.badge} value={"Inactive"} status={"warning"} />
               )
            }
         </View>
      </ImageBackground>
   )
}

const styles = StyleSheet.create({
   container: {
      position: 'relative',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 150,
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
   badgeStyle: {
      borderRadius: 3,
    },
})

export default ShipPageHeader

