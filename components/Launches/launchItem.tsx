import React from "react";
import { format as timeAgo } from "timeago.js";
import { Image, Badge } from 'react-native-elements'
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack'

import { formatDateSimple } from "../../utils/format-date";
import { Launch } from "../../model";
import FavoriteLaunchButton from "./favoriteLaunchButton";
import { BrowserStackParamList } from "../../model/navTypes";


interface LaunchItemProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

const LaunchItem = (props: LaunchItemProps) => {
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>();

   return (
      <Pressable
         onPress={() => navigation.navigate('Launch', { launch: props.launch })}
         data-testid={"launchItem"}
         style={styles.container}
      >
         <View>
            <Image
               source={{
                  uri:
                     props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
                     props.launch.links.mission_patch_small
               }}
               containerStyle={{ height: props.isDrawerFavorite ? 100 : 300 }}
               resizeMode="cover"
            />

            {
               !props.isDrawerFavorite ?
               <Image
                  source={{ uri: props.launch.links.mission_patch_small }}
                  style={styles.patch}
                  resizeMode="contain"
               />
               : 
               null
            }
            {
               props.isDrawerFavorite ?
               <View style={styles.launchButtonContainer} >
                  <FavoriteLaunchButton {...props} />
               </View>
               :
               null
            }
         </View>

         <View style={styles.body}>
            <View>
               <View>
                  {props.launch.launch_success ?
                     <View>
                        <Badge containerStyle={styles.launchSuccessBadge} value="Successful" status={"success"} />

                     </View>
                     :
                     <View>
                        <Badge containerStyle={styles.launchSuccessBadge} value="Failed" status={"warning"} />
                     </View>
                  }
                  <Text style={styles.rocketName}>
                     {props.launch.rocket.rocket_name} &bull; {props.launch.launch_site.site_name}
                  </Text>
               </View>
               {
                  !props.isDrawerFavorite ?
                  <View>
                     <FavoriteLaunchButton {...props} />
                  </View>
                  :
                  null
               }
            </View>
            <Text
               style={styles.missionName}
               numberOfLines={3} // TODO: adjust me. Replacement for isTruncated from chakraUI
            >
               {props.launch.mission_name}
            </Text>
            <View style={{ flexDirection: props.isDrawerFavorite ? 'column' : 'row' }}>
               <Text style={styles.launchDate}>{formatDateSimple(props.launch.launch_date_utc)} </Text>
               <Text style={styles.timeAgo}>
                  {timeAgo(props.launch.launch_date_utc)}
               </Text>
            </View>
         </View>
      </Pressable>
   );
}

const styles = StyleSheet.create({
   container: {
      overflow: "hidden",
      position: "relative",
   },
   patch: {
      position: "absolute",
      top: "5",
      right: "5",
      height: "75px"
   },
   body: {
      padding: 6,
   },
   launchSuccessBadge: {
      paddingLeft: 2,
      paddingRight: 2,
      display: 'flex',
      alignItems: 'center'
   },
   missionName: {
      marginTop: 1,
      color: 'white',
   },
   rocketName: {
      color: 'white',
      marginTop: 2,
      textTransform: "uppercase"
   },
   launchDate: {
      color: 'white'
   },
   timeAgo: {
      color: 'white',
      marginLeft: 2
   },
   launchButtonContainer: {
      position: "absolute",
      bottom: "10px",
      right: "10px"
   }
})

export default LaunchItem