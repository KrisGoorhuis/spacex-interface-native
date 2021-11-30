import React from "react";

import { LaunchProps } from "../../../model";
import FavoriteLaunchButton from "../favoriteLaunchButton";
import { View, Image, ImageBackground, StyleSheet, Text } from "react-native";
import { Badge } from "react-native-elements";



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
      margin: '2px 4px',
      borderRadius: 10 // 'large'
   },
   stack: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // isInline spacing="3" alignItems="center" justifyContent="center" display="flex"
   }
});

const LaunchPageHeader = (props: LaunchProps) => {
   return (

      <ImageBackground
         resizeMode="cover"
         style={styles.container}
         source={{ uri: `url(${props.launch.links.flickr_images[0]})` }}
      >
         <View
         // bgPos="center"
         // bgRepeat="no-repeat"
         >
            <Image
               source={require(props.launch.links.mission_patch_small)}
            // objectFit="contain"
            // objectPosition="bottom"
            />
            <Text style={styles.header}>
               {props.launch.mission_name}
            </Text>

            <View 
               style={styles.stack}
            >
               <FavoriteLaunchButton {...props} />
               {/* colorScheme="purple" */}
               <Badge>
                  #{props.launch.flight_number}
               </Badge>
               {props.launch.launch_success ? (
                  // colorScheme="green"
                  <Badge>
                     Successful
                  </Badge>
               ) : (
                  // colorScheme="red"
                  <Badge>
                     Failed
                  </Badge>
               )}

            </View>
         </View>
      </ImageBackground>
   );
}

export default LaunchPageHeader