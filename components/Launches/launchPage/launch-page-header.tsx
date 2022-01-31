import React from "react"
import { View, Image, ImageBackground, StyleSheet, Text } from "react-native"
import { Badge } from "react-native-elements"

import { LaunchProps } from "../../../model"
import FavoriteLaunchButton from "../favoriteLaunchButton"


const LaunchPageHeader = (props: LaunchProps) => {

   console.log(`!props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg")`)
   console.log(props.launch.links.flickr_images[0])
   console.log(props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg"))

   return (
      <ImageBackground
         resizeMode="cover"
         style={{ ...styles.container }}
         source={{
            uri:
               props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
               props.launch.links.mission_patch_small
         }}
      >
         {
            props.launch.links.mission_patch_small !== null && props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") &&
            <Image
               style={styles.image}
               source={{ uri: props.launch.links.mission_patch_small }}
               resizeMode="contain"
            />
         }
         <Text style={styles.title}>
            {props.launch.mission_name}
         </Text>

         <View style={styles.stack}>
            <View style={styles.badge}>
               <FavoriteLaunchButton {...props} />
            </View>
            <Badge containerStyle={styles.badge} value={`#${props.launch.flight_number}`} />
            {
               props.launch.launch_success ? (
                  <Badge containerStyle={styles.badge} value={"Successful"} status={"success"} />
               ) : (
                  <Badge containerStyle={styles.badge} value={"Failed"} status={"warning"} />
               )
            }
         </View>
      </ImageBackground>
   )
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
   }
})

export default LaunchPageHeader

