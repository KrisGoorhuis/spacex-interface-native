import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider, ListItem } from "react-native-elements";
import { MapPin, Navigation } from "react-native-feather";

import { LaunchPad } from "../../../model";


interface LocationAndVehiclesProps {
   launchPad: LaunchPad
}

const LocationAndVehicles = (props: LocationAndVehiclesProps) => {
   return (
      <View style={styles.container}>

         <ListItem>
            <ListItem.Title style={styles.listItemTitle}>
               <MapPin />{" "}
               <Text style={styles.titleText}>
                  Location
               </Text>
            </ListItem.Title>

            <ListItem.Content style={styles.content}>
               <Text>
                  {props.launchPad.location.name}
               </Text>
               <Divider />
            </ListItem.Content>
            <Text>
               {props.launchPad.location.region}
            </Text>
         </ListItem>

         <ListItem>
            <ListItem.Title style={styles.listItemTitle}>
               <Navigation />{" "}
               <Text style={styles.titleText}>
                  Vehicles
               </Text>
            </ListItem.Title>
            <ListItem.Content>
               {props.launchPad.vehicles_launched.join(", ")}
            </ListItem.Content>
         </ListItem>

      </View>
   );
}

const styles = StyleSheet.create({
   launchPadDetails: {
      color: 'darkgray',
      marginLeft: 8,
      marginRight: 8
   },
   container: {
      marginTop: 4,
      padding: 4,
      borderRadius: 5, 
   },
   listItemTitle: {
      display: 'flex',
   },
   titleText: {
      marginLeft: 2
   },
   content: {
      fontSize: 20,
   },
   recentLaunchesContainer: {
      display: 'flex',
      marginLeft: 8,
      marginRight: 8,
   },
   recentLaunchesItem: {
      minWidth: 350
   }
});
export default LocationAndVehicles