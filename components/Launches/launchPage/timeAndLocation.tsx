import React from "react"
import { Watch, MapPin } from "react-native-feather"
import { format as timeAgo } from "timeago.js"
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native"
import { Button, ListItem, Overlay } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { LaunchPad, LaunchProps } from "../../../model"
import { formatDateTargetZone } from "../../../utils/format-date"
import { BrowserStackParamList } from "../../../model/navTypes"
import { launchPadPageSize, launchPageIconSize } from "../../../model/constants"
import { useInfiniteQuery } from "react-query"
import { queryLaunchPads } from "../../../utils/networking"



function TimeAndLocation(props: LaunchProps) {
   const [visible, setVisible] = React.useState<boolean>(false)
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>()


   const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<LaunchPad[], Error>(
      ['launchPads'],
      (context) => queryLaunchPads(context, launchPadPageSize),
   )

   const navigateToPad = (launchPads: LaunchPad[] | undefined) => {
      if (launchPads) {
         const ourPad = launchPads.filter(pad => pad.id.toString() === props.launch.launch_site.site_id)[0]
         navigation.navigate('Launch Pad', { launchPad: ourPad })
      }
      else {
         // This should never be reached, assuming our 
         setVisible(true)
      }
   }

   const NoPadOverlay = () => (
      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
         <Text>Launch pad not found</Text>
         <Button
            title="Close"
            onPress={() => setVisible(false)}
         />
      </Overlay>
   )

   return (
      <View>
         <NoPadOverlay />
         
         <ListItem containerStyle={styles.listItem}>
            <Watch color="black" width={launchPageIconSize} height={launchPageIconSize} />
            <ListItem.Content style={styles.content}>
               <ListItem.Title>
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

         <ListItem containerStyle={styles.listItem}>
            <MapPin color="black" width={launchPageIconSize} height={launchPageIconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Launch Site
               </ListItem.Title>
               <ListItem.Subtitle >
                  <Pressable
                     onPress={() => navigateToPad(data?.pages.flat())}
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
   listItem: {
      paddingTop: 5,
      paddingBottom: 5,
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
   content: {
      fontSize: 20,
   }
});


export default TimeAndLocation