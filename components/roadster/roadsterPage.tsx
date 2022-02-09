import React from "react"
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ListItem, Image, Divider } from "react-native-elements"
import { Disc, Truck } from "react-native-feather"
import { format as timeAgo } from "timeago.js"

import { Roadster } from "../../model"
import { iconSize } from "../../model/constants"
import { formatDateTargetZoneShorter } from "../../utils/format-date"
import { formatLargeNumber } from "../../utils/numbers"
import roadster from '../../assets/images/roadster-small.jpg'


interface RoadsterPageProps {
   roadster: Roadster,
}

const RoadsterPage = (props: RoadsterPageProps) => {

   return (
      <ScrollView style={styles.container}>
         <View>
            <Image
               source={roadster}
               containerStyle={{ height: 200 }}
            />
         </View>

         <View>
            <Text style={styles.headline}>
               {timeAgo(props.roadster.launch_date_utc)}, Elon Musk launched his car into space.
            </Text>
            <Text style={styles.headline}>
               Starman now pilots it around the sun.{" "}
               <Text style={styles.wikiLink} onPress={() => Linking.openURL(props.roadster.wikipedia)}>Wikipedia</Text>
            </Text>
         </View>

         <Divider style={{ margin: 10 }} />

         <ListItem containerStyle={styles.listItem}>
            <Truck color="black" height={iconSize} width={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Payload Details
               </ListItem.Title>
               <ListItem.Subtitle>
                  Launched {formatDateTargetZoneShorter(props.roadster.launch_date_utc)}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Mass: {props.roadster.launch_mass_kg.toLocaleString()} kg
                  {/* - {props.roadster.launch_mass_lbs}lbs */}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Speed: {formatLargeNumber(props.roadster.speed_kph)} kph
                  {/* - {formatLargeNumber(props.roadster.speed_mph)} mph */}
               </ListItem.Subtitle>
 
            </ListItem.Content>
         </ListItem>

         <ListItem containerStyle={styles.listItem}>
            <Disc color="black" height={iconSize} width={iconSize} />
            <ListItem.Content>
               <ListItem.Title>
                  Oribital Details
               </ListItem.Title>
               <ListItem.Subtitle>
                  Type: {props.roadster.orbit_type}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Periapsis argument: {props.roadster.periapsis_arg.toLocaleString()}°
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Periapsis distance: {props.roadster.periapsis_au.toLocaleString()} au
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Apoapsis distance: {props.roadster.apoapsis_au.toLocaleString()} au
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Eccentricity: {props.roadster.eccentricity.toLocaleString()}
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Inclination: {props.roadster.inclination.toLocaleString()}°
               </ListItem.Subtitle>
               <ListItem.Subtitle>
                  Longitude: {props.roadster.longitude.toLocaleString()}°
               </ListItem.Subtitle>

            </ListItem.Content>
         </ListItem>

         {/* <Divider style={{ margin: 10 }} /> */}

         <Text style={styles.details}>
            {props.roadster.details}
         </Text>

      </ScrollView>
   )
}


const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white'
   },
   headline: {
      textAlign: 'center',
      marginTop: 5,
      // color: 'darkgray'
   },
   listItem: {
      paddingTop: 5,
      paddingBottom: 5,
   },
   details: {
      color: 'black',
      margin: 20,
      marginLeft: 8,
      marginRight: 8,
   },
   wikiLink: {
      color: 'blue',
      textDecorationLine: 'underline',
   }
})

export default RoadsterPage