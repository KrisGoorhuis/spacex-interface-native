import React from "react";
import { Watch, MapPin } from "react-native-feather";
import { format as timeAgo } from "timeago.js";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Divider, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { LaunchProps } from "../../../model";
import { formatDateTargetZone } from "../../../utils/format-date";
import { BrowserStackParamList } from "../../../model/navTypes";
// import { Link } from "@react-navigation/native";



function TimeAndLocation(props: LaunchProps) {
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>();


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
               <Text>
                  {formatDateTargetZone(props.launch.launch_date_local)}
               </Text>
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
               <Pressable
                  onPress={() => navigation.navigate('Launch Pad', { launchPadId: props.launch.launch_site.site_id })}
               >
                  <Text>{props.launch.launch_site.site_name_long}</Text>
               </Pressable>
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