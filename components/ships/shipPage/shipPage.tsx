import React from "react"
import { View, Text, StyleSheet, Dimensions, FlatList, Linking } from "react-native"
import { ListItem } from "react-native-elements"
import { Activity, Clipboard, PenTool, Trello } from "react-native-feather"
import MapView, { Marker } from "react-native-maps"

import { Ship } from "../../../model"
import { launchPageIconSize } from "../../../model/constants"
import ShipPageHeader from "./shipPageHeader"


interface ShipPageProps {
   ship: Ship,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

const ShipPage = (props: ShipPageProps) => {

   const Header = () => (
      <>
         <ShipPageHeader ship={props.ship} />
         <View style={styles.body}>
            <ListItem containerStyle={styles.listItem}>
               <PenTool color="black" width={launchPageIconSize} height={launchPageIconSize} />
               <ListItem.Content style={styles.content}>
                  <ListItem.Title>
                     {props.ship.ship_name}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                     {props.ship.ship_type}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                     {props.ship.ship_model}
                  </ListItem.Subtitle>
               </ListItem.Content>
            </ListItem>

            <ListItem containerStyle={styles.listItem}>
               <Clipboard color="black" width={launchPageIconSize} height={launchPageIconSize} />
               <ListItem.Content style={styles.content}>
                  {
                     props.ship.ship_model &&
                     <ListItem.Title>
                        Model: {props.ship.ship_model}
                     </ListItem.Title>
                  }
                  {
                     props.ship.weight_kg && props.ship.weight_lbs &&
                     <ListItem.Subtitle>
                        Weight: {props.ship.weight_kg} kgs / {props.ship.weight_lbs} lbs
                     </ListItem.Subtitle>
                  }
                  {
                     props.ship.ship_model &&
                     <ListItem.Subtitle>
                        {props.ship.ship_model}
                     </ListItem.Subtitle>
                  }
                  {
                     props.ship.home_port &&
                     <ListItem.Subtitle>
                        Home port: {props.ship.home_port}
                     </ListItem.Subtitle>
                  }
                  {
                     props.ship.roles.length > 0 &&
                     <ListItem.Subtitle>
                        <View style={styles.roles}>
                           <Text>Role(s):</Text>
                           <Text style={styles.shipDetail}> {props.ship.roles.join(", ")} </Text>
                        </View>
                     </ListItem.Subtitle>
                  }
                  {
                     props.ship.attempted_landings && props.ship.successful_landings &&
                     <ListItem.Subtitle>
                        <Text>{props.ship.attempted_landings}/{props.ship.successful_landings}</Text>
                     </ListItem.Subtitle>
                  }
                  {
                     props.ship.url &&
                     <ListItem.Subtitle style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL(props.ship.url)}>
                        MarineTraffic link
                     </ListItem.Subtitle>
                  }
               </ListItem.Content>
            </ListItem>
         </View>
         <Text style={styles.missionsTitle}>Missions</Text>
      </>
   )

   {/* name, model */ }
   {/* role, active, weight, home port, status,  */ }
   {/* url */ }
   {/* position map - easy copy/paste */ }

   {/* missions */ }

   {/* attempted / successful landings - hide if either is null? */ }

   const Footer = () => (
      <View style={styles.webviewContainer}>
         {
            props.ship.position.latitude !== null && props.ship.position.longitude !== null ?
               <MapView
                  style={styles.map}
                  initialRegion={{
                     latitude: props.ship.position.latitude,
                     longitude: props.ship.position.longitude,
                     latitudeDelta: 10,
                     longitudeDelta: 10,
                  }}
               >
                  <Marker
                     coordinate={{
                        latitude: props.ship.position.latitude,
                        longitude: props.ship.position.longitude
                     }}
                  />
               </MapView>
               :
               <Text>Ship position not available</Text>
         }
      </View>
   )

   return (
      <View style={styles.viewContainer}>
         <FlatList
            ListHeaderComponent={Header}
            ListFooterComponent={Footer}
            data={props.ship.missions}
            numColumns={3}
            columnWrapperStyle={styles.column}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(missionObject) => {
               return (
                  <View>
                     <Text>{missionObject.item.name}</Text>
                     <Text>{missionObject.item.flight}</Text>
                  </View>
               )
            }}
         />
      </View>
   )
}


const styles = StyleSheet.create({
   listItem: {
      paddingTop: 5,
      paddingBottom: 5,
   },
   viewContainer: {
      flex: 1,
      // flexDirection: 'column',
      // margin: 1,
      width: Dimensions.get('window').width
   },
   launchDetails: {
      color: 'darkgray',
      marginTop: 20,
      marginLeft: 8,
      marginRight: 8
   },
   webviewContainer: {
      marginTop: 30,
      marginBottom: 30,
      alignSelf: 'stretch',
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
   },
   missionsTitle: {
      textAlign: 'center'
   },
   webview: {
      borderColor: 'red',
      borderWidth: 1,
      width: Dimensions.get('window').width * .9,
      margin: 'auto',
      height: 300
   },
   map: {
      height: 250,
      width: Dimensions.get('window').width * .9
   },
   column: {
      flex: 1,
      justifyContent: 'space-around'
   },
   image: {
      width: Dimensions.get('window').width * .3,
      height: Dimensions.get('window').width * .3,
      margin: 5
   },
   shipDetail: {
      color: 'black',
   },
   roles: {
      color: 'black',
      flexDirection: 'row',
   },
   body: {
      padding: 6,
      color: 'black'
   },
   content: {
      fontSize: 20,
   }
})

export default ShipPage