import React from "react";
// import { Link } from "react-router-dom";
import { format as timeAgo } from "timeago.js";
import { Image, Badge } from 'react-native-elements'

import { formatDateSimple } from "../../utils/format-date";
import { Launch } from "../../model";
import FavoriteLaunchButton from "./favoriteLaunchButton";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


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
         // as={Link}
         // to={`/launches/${props.launch.flight_number.toString()}`}
         style={{
            // boxShadow: "md",
            // borderWidth: {props.isDrawerFavorite ? 0 : "1px"},
            // rounded: "lg",
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
               // alt={`${props.launch.mission_name} launch`}
               containerStyle={{
                  height: props.isDrawerFavorite ? 100 : 300,
                  width: "100%",
                  // objectPosition={props.isDrawerFavorite ? "center" : "bottom"}
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
                     // objectPosition="bottom"
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
                     <Badge containerStyle={{ paddingLeft: 2, paddingRight: 2, display: 'flex', alignItems: 'center' }}>
                        Successful
                     </Badge>
                  ) : (
                     <Badge containerStyle={{ paddingLeft: 2, paddingRight: 2 }}>
                        Failed
                     </Badge>
                  )}
                  {/* // color="gray.500"
                     letterSpacing="wide"
                     fontSize="xs"
                     textTransform="uppercase"
                     ml="2" */}
                  <Text style={{ marginTop: 2, textTransform: "uppercase" }}>
                     {props.launch.rocket.rocket_name} &bull; {props.launch.launch_site.site_name}
                  </Text>
               </View>
               {
                  !props.isDrawerFavorite &&
                  <FavoriteLaunchButton {...props} />
               }
            </View>
            <Text
               style={{ marginTop: 1, }}
               numberOfLines={3} // TODO: adjust me. Replacement for isTruncated from chakraUI
            >
               {props.launch.mission_name}
            </Text>
            <View style={{ flexDirection: props.isDrawerFavorite ? 'column' : 'row' }}>
               <Text>{formatDateSimple(props.launch.launch_date_utc)} </Text>
               <Text style={{ color: 'gray.500', marginLeft: 2 }}>
                  {timeAgo(props.launch.launch_date_utc)}
               </Text>
            </View>
         </View>
      </Pressable>
   );
}

export default LaunchItem