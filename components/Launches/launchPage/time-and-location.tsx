import React from "react";
import { Watch, MapPin } from "react-native-feather";
import { format as timeAgo } from "timeago.js";
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native";
import { Avatar, Divider, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { LaunchProps } from "../../../model";
import { formatDateTargetZone } from "../../../utils/format-date";
import { BrowserStackParamList } from "../../../model/navTypes";
import { launchPageIconSize } from "./launch-page";



function TimeAndLocation(props: LaunchProps) {
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>();

   return (
      <View style={styles.container}>

         <ListItem>
            <Watch color="black" width={launchPageIconSize} height={launchPageIconSize} style={styles.featherIcon} />
            <ListItem.Content style={styles.content}>
               <ListItem.Title style={styles.titleText}>
                  Launch Date
               </ListItem.Title>
               <ListItem.Subtitle>
                  {formatDateTargetZone(props.launch.launch_date_local)}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  {timeAgo(props.launch.launch_date_utc)}
               </ListItem.Subtitle>
            </ListItem.Content>
         </ListItem>

         <ListItem>
            <MapPin color="black" width={launchPageIconSize} height={launchPageIconSize} style={styles.featherIcon} />
            <ListItem.Content>
               <ListItem.Title style={styles.titleText} >
                  Launch Site
               </ListItem.Title>
               <ListItem.Subtitle >
                  <Pressable
                     onPress={() => navigation.navigate('Launch Pad', { launchPadId: props.launch.launch_site.site_id })}
                  >
                     <Text style={styles.location}>{props.launch.launch_site.site_name_long}</Text>
                  </Pressable>
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  {props.launch.launch_site.site_name}
               </ListItem.Subtitle>
            </ListItem.Content>
         </ListItem>

      </View>
   );
}

const styles = StyleSheet.create({
   container: {

   },
   featherIcon: {
      
   }, 
   listItemTitle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   location: {
      color: '#858585',
      maxWidth: Dimensions.get('window').width * .75,
      textDecorationLine: 'underline'
   },
   titleText: {

   },
   content: {
      fontSize: 20, // Replaces 'md' | 'xl'
   }
});


export default TimeAndLocation