import React from "react";
import { Watch, MapPin } from "react-feather";
import { format as timeAgo } from "timeago.js";
import { View, StyleSheet, Text } from "react-native";
import { Divider, ListItem } from "react-native-elements";

import { LaunchProps } from "../../../model";
import { formatDateLong, formatDateTargetZone } from "../../../utils/format-date";
// import { Link } from "@react-navigation/native";



function TimeAndLocation(props: LaunchProps) {

   return (
      <View style={styles.container}>
         <ListItem>
            <ListItem.Content style={styles.content}>
               <ListItem.Title style={styles.listItemTitle}>
                  <Watch />{" "}
                  <Text style={styles.titleText}>
                     Launch Date
                  </Text>
               </ListItem.Title>
               {/* TODO: choose one. No tooltips here. */}
               <Text>
                  {formatDateLong(props.launch.launch_date_local)}
                  {formatDateTargetZone(props.launch.launch_date_local)}
               </Text>
               {/* Replaces borderBottom for .Content: */}
               <Divider />
            </ListItem.Content>
            {/* Previously '<StatHelpText />' */}
            <Text>{timeAgo(props.launch.launch_date_utc)}</Text>
         </ListItem>
         <ListItem>
            <ListItem.Title style={styles.listItemTitle}>
               <MapPin />{" "}
               <Text style={styles.titleText} >
                  Launch Site
               </Text>
            </ListItem.Title>
            <ListItem.Content>
               {/* <Link
          // to={`/launch-pads/${props.launch.launch_site.site_id}`}
          // Singular? How to get appropriate site_id in?
            to={{ screen: 'launch-pads', params: { site_id: props.launch.launch_site.site_id } }}>
            {props.launch.launch_site.site_name_long}
          </Link> */}
            </ListItem.Content>
            <Text>{props.launch.launch_site.site_name}</Text>
         </ListItem>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      borderWidth: 1,
      padding: 4,
      borderRadius: 5, // TODO: Test. Previously 'md' in chakra
      // columns={[1, 1, 2]}
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


export default TimeAndLocation