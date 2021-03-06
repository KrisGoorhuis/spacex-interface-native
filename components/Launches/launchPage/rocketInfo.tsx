import React from "react"
import { Navigation as Navigation2, Layers } from "react-native-feather"
import { View, StyleSheet } from "react-native"
import { ListItem } from "react-native-elements"

import { LaunchProps } from "../../../model"
import { iconSize } from "../../../model/constants"



function RocketInfo(props: LaunchProps) {
   const cores = props.launch.rocket.first_stage.cores

   return (
      <View style={styles.container}>

         <ListItem containerStyle={styles.listItem}>
            <Navigation2 color="black" height={iconSize} width={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Rocket
               </ListItem.Title>
               <ListItem.Subtitle>
                  {props.launch.rocket.rocket_name}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  {props.launch.rocket.rocket_type}
               </ListItem.Subtitle>

            </ListItem.Content>
         </ListItem>

         <ListItem containerStyle={styles.listItem}>
            <Layers color="black" height={iconSize} width={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  First Stage
               </ListItem.Title>
               <ListItem.Subtitle>
                  {cores.map((core) => core.core_serial).join(", ")}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  {cores.every((core) => core.land_success)
                     ? cores.length === 1
                        ? "Recovered"
                        : "All recovered"
                     : "Lost"}
               </ListItem.Subtitle>
            </ListItem.Content>
         </ListItem>

         <ListItem containerStyle={styles.listItem}>
            <Layers color="black" height={iconSize} width={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Second Stage
               </ListItem.Title>
               <ListItem.Subtitle>
                  Block {props.launch.rocket.second_stage.block}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Payload: {" "}
                  {props.launch.rocket.second_stage.payloads
                     .map((payload) => payload.payload_type)
                     .join(", ")}
               </ListItem.Subtitle>
            </ListItem.Content>
         </ListItem>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {

   },
   listItem: {
      paddingTop: 5,
      paddingBottom: 5
   },

})


export default RocketInfo