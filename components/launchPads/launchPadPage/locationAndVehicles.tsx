import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { MapPin, Navigation, Send, Truck } from "react-native-feather";

import { LaunchPad } from "../../../model";
import { launchPageIconSize } from "../../../model/constants";


interface LocationAndVehiclesProps {
   launchPad: LaunchPad
}

const LocationAndVehicles = (props: LocationAndVehiclesProps) => {
   return (
      <View style={styles.container}>

         <ListItem>
            <MapPin color="black" width={launchPageIconSize} height={launchPageIconSize} />
            <ListItem.Title style={styles.listItemTitle}>Location</ListItem.Title>
            <ListItem.Content style={styles.content}>
               <ListItem.Title>{props.launchPad.location.name}</ListItem.Title>
               <ListItem.Subtitle>{props.launchPad.location.region}</ListItem.Subtitle>
            </ListItem.Content>
         </ListItem>

         <ListItem>
            <Send color="black" width={launchPageIconSize} height={launchPageIconSize} />
            <ListItem.Title style={styles.listItemTitle}>Vehicles</ListItem.Title>
            <ListItem.Content>
               <Text>{props.launchPad.vehicles_launched.join(", ")}</Text>
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