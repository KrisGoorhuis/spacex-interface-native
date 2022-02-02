import React from "react"
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native"
import MapView, { Marker } from "react-native-maps"

import { Ship } from "../../../model"
import ShipPageHeader from "./shipPageHeader"


interface ShipPageProps {
   ship: Ship,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}


const ShipPage = (props: ShipPageProps) => {

   const Header = () => (
      <>
         <ShipPageHeader ship={props.ship} />
         <Text style={styles.launchDetails}>
            {/* {props.ship.} */}
         </Text>
         <Text>Missions</Text>
      </>
   )

   const Footer = () => (
      <View style={styles.webviewContainer}>
         {
            props.ship.position.latitude !== null && props.ship.position.longitude !== null ?
               <MapView
                  style={{ height: 250, width: Dimensions.get('window').width * .9 }}
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
   viewContainer: {
      flex: 1,
      flexDirection: 'column',
      margin: 1,
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
      alignItems: 'center',
   },
   webview: {
      borderColor: 'red',
      borderWidth: 1,
      width: Dimensions.get('window').width * .9,
      margin: 'auto',
      height: 300
   },
   column: {
      flex: 1,
      justifyContent: 'space-around'
   },
   image: {
      width: Dimensions.get('window').width * .3,
      height: Dimensions.get('window').width * .3,
      margin: 5
   }
})

export default ShipPage