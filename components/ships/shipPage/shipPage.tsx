import React from "react"
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native"
import { Divider, ListItem } from "react-native-elements"
import MapView, { Marker } from "react-native-maps"
import { ChevronsUp } from "react-native-feather"

import { Ship } from "../../../model"
import PrimaryDetails from "./primaryDetails"
import SecondaryDetails from "./secondaryDetails"
import ShipPageHeader from "./shipPageHeader"
import { iconSize } from "../../../model/constants"


interface ShipPageProps {
   ship: Ship,
   [x: string]: any
}

const ShipPage = (props: ShipPageProps) => {
   const Header = () => (
      <>
         <ShipPageHeader ship={props.ship} />
         <Divider style={{ marginBottom: 10 }} />
         <View style={styles.body}>
            <PrimaryDetails ship={props.ship} />
            <SecondaryDetails ship={props.ship} />
         </View>
         <Divider style={{ margin: 10 }} />
         <ListItem>
            <ChevronsUp color="black" width={iconSize} height={iconSize} />
            {
               props.ship.missions.length > 0 ?
                  <ListItem.Title style={styles.missionsTitle}>Missions</ListItem.Title>
                  :
                  <ListItem.Title style={styles.missionsTitle}>No mission data</ListItem.Title>
            }
         </ListItem>
      </>
   )

   const Footer = () => (
      <View style={styles.webviewContainer}>
         <Divider style={{ marginBottom: 20, width: '100%'}} />
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
               <Text style={styles.noPosition}>Ship position not available</Text>
         }
      </View>
   )

   console.log("props.ship.mission")
   console.log(props.ship.missions)

   return (
      <View style={styles.viewContainer}>
         <FlatList
            ListHeaderComponent={Header}
            ListFooterComponent={Footer}
            data={props.ship.missions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(missionObject) => {
               return (
                  <Text style={styles.missionItem}>{missionObject.item.name} - Flight {missionObject.item.flight}</Text>
               )
            }}
         />
      </View>
   )
}


const styles = StyleSheet.create({
   viewContainer: {
      flex: 1,
      width: Dimensions.get('window').width
   },
   webviewContainer: {
      marginTop: 30,
      marginBottom: 30,
      alignSelf: 'stretch',
      flex: 1,
      alignItems: 'center',
   },
   missionsTitle: {
      fontSize: 16,
   },
   webview: {
      borderColor: 'red',
      borderWidth: 1,
      width: Dimensions.get('window').width * .9,
      margin: 'auto',
      height: 300,
   },
   map: {
      height: 250,
      width: Dimensions.get('window').width * .9,
   },
   columnWrapper: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      marginTop: -20,
      padding: 0,
   },
   body: {
      color: 'black',
      margin: 0,
   },
   content: {
      fontSize: 20,
   },
   noPosition: {
      color: 'rgba(0, 0, 0, 0.54)'
   },
   missionItem: {
      color: 'rgba(0, 0, 0, 0.54)',
      marginLeft: 53,
      height: 20
   }
})

export default ShipPage