import React from "react";
import { Navigation, Layers } from "react-native-feather";
import { View, StyleSheet, Text } from "react-native";
import { Divider, ListItem } from "react-native-elements";

import { LaunchProps } from "../../../model";



function RocketInfo(props: LaunchProps) {
   const cores = props.launch.rocket.first_stage.cores;

   return (
      <View style={styles.container}>
         <ListItem>
            <ListItem.Title style={styles.listItemTitle}>
               <Navigation />{" "}
               <Text style={styles.titleText}>
                  Rocket
               </Text>
            </ListItem.Title>
            <ListItem.Content style={styles.content}>
               <Text>
                  {props.launch.rocket.rocket_name}
               </Text>
               <Divider />
            </ListItem.Content>
            <Text>
               {props.launch.rocket.rocket_type}
            </Text>
         </ListItem>
         <View>
            <ListItem>
               <ListItem.Title style={styles.listItemTitle}>
                  <Layers />{" "}
                  <Text style={styles.titleText}>
                     First Stage
                  </Text>
               </ListItem.Title>
               <ListItem.Content style={styles.content}>
                  <Text>
                     {cores.map((core) => core.core_serial).join(", ")}
                  </Text>
               </ListItem.Content>
               <Text>
                  {cores.every((core) => core.land_success)
                     ? cores.length === 1
                        ? "Recovered"
                        : "All recovered"
                     : "Lost"}
               </Text>
            </ListItem>
            <ListItem>
               <ListItem.Title style={styles.listItemTitle}>
                  <Layers />{" "}
                  <Text style={styles.titleText}>
                     Second Stage
                  </Text>
               </ListItem.Title>
               <ListItem.Content>
                  <Text>
                     Block {props.launch.rocket.second_stage.block}
                  </Text>
               </ListItem.Content>
               <Text>
                  Payload:{" "}
                  {props.launch.rocket.second_stage.payloads
                     .map((payload) => payload.payload_type)
                     .join(", ")}
               </Text>
            </ListItem>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      // borderWidth: '1px',
      marginTop: 4,
      padding: 4,
      borderRadius: 5, // 'md'
   },
   listItemTitle: {
      display: 'flex',
   },
   titleText: {
      marginLeft: 2
   },
   content: {
      fontSize: 20, // Replaces 'md' | 'xl'
   }
});
//  borderWidth="1px"
//  mt="4"
//  p="4"
//  borderRadius="md"

export default RocketInfo