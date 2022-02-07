import React from "react"
import { Watch, MapPin } from "react-native-feather"
import { format as timeAgo } from "timeago.js"
import { View, StyleSheet, Text, Pressable, Dimensions } from "react-native"
import { Button, ListItem, Overlay } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useQuery } from "react-query"

import { LaunchPad, LaunchProps } from "../../../model"
import { formatDateTargetZone } from "../../../utils/format-date"
import { BrowserStackParamList } from "../../../model/navTypes"
import { iconSize } from "../../../model/constants"
import { querySingleLaunchPad } from "../../../utils/networking"



function TimeAndLocation(props: LaunchProps) {
   const [visible, setVisible] = React.useState<boolean>(false)
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>()


   const { isLoading, isError, error, data } = useQuery<LaunchPad, Error>(
      ['launchPads', props.launch.launch_site.site_id],
      (context) => querySingleLaunchPad(context, props.launch.launch_site.site_id),
   )

   // Still changes the page, just lets users know why it might take a moment
   const navigateToPad = async () => {
      if (isLoading) {
         setVisible(true)
      }

      await data

      if (!isLoading && data) {
         setVisible(false)
         navigation.navigate('Launch Pad', { launchPad: data })
      }
   }


   // if (isLoading) {
   //    return <Text>Loading...</Text>
   // }

   // if (isError && error) {
   //    return <Text>Error: {error.message}</Text>
   // }


   return (
      <View>
         <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
            <Text>Awaiting launch pad data</Text>
            <Button
               title="Close"
               onPress={() => setVisible(false)}
            />
         </Overlay>

         <ListItem containerStyle={styles.listItem}>
            <Watch color="black" width={iconSize} height={iconSize} />
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
            <MapPin color="black" width={iconSize} height={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Launch Site
               </ListItem.Title>
               <ListItem.Subtitle >
                  <Pressable
                     onPress={() => navigateToPad()}
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