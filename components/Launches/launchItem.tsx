import React from "react";
import { format as timeAgo } from "timeago.js";
import { Image, Badge } from 'react-native-elements'
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { formatDateSimple } from "../../utils/format-date";
import { Launch } from "../../model";
import FavoriteLaunchButton from "./favoriteLaunchButton";


interface LaunchItemProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

const LaunchItem = (props: LaunchItemProps) => {
   const navigation = useNavigation();


   return (
      <Pressable
         onPress={() => navigation.navigate('Launch', { launch: props.launch })}
         data-testid={"launchItem"}
         style={{
            overflow: "hidden",
            position: "relative",
         }}
      >
         <View style={{ position: "relative" }} >
            <Image
               source={{
                  uri:
                     props.launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
                     props.launch.links.mission_patch_small
               }}
               containerStyle={{
                  height: props.isDrawerFavorite ? 100 : 300,
                  width: "100%",
               }}
               resizeMode="cover"
            />

            {
               !props.isDrawerFavorite &&
               <Image
                  source={{ uri: props.launch.links.mission_patch_small }}
                  style={{
                     position: "absolute",
                     top: "5",
                     right: "5",
                     height: "75px"
                  }}
                  resizeMode="contain"
               />
            }
            {
               props.isDrawerFavorite &&
               <View style={{ position: "absolute", bottom: "10px", right: "10px" }} >

                  <FavoriteLaunchButton {...props} />
               </View>
            }
         </View>

         <View style={{ padding: 6 }}>
            <View style={{ display: 'flex', alignItems: 'baseline' }}>
               <View style={{ width: '100%', display: 'flex' }}>
                  {props.launch.launch_success ? (
                     <Badge containerStyle={styles.launchSuccessBadge}>
                        Successful
                     </Badge>
                  ) : (
                     <Badge containerStyle={styles.launchSuccessBadge}>
                        Failed
                     </Badge>
                  )}
                  <Text>
                     {props.launch.rocket.rocket_name} &bull; {props.launch.launch_site.site_name}
                  </Text>
               </View>
               {
                  !props.isDrawerFavorite &&
                  <View>
                     <FavoriteLaunchButton {...props} />
                  </View>
               }
            </View>
            <Text
               style={{ marginTop: 1, }}
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
   launchSuccess: {

   },
   launchSuccessBadge: {
      paddingLeft: 2,
      paddingRight: 2,
      display: 'flex',
      alignItems: 'center'
   },
   rocketName: {
      marginTop: 2,
      textTransform: "uppercase"
   },
   launchDate: {
      color: 'white'
   },
   timeAgo: {
      color: 'white',
      marginLeft: 2
   }
})

export default LaunchItem