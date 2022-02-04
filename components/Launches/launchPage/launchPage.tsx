import React from "react"
import { View, Text, Image, StyleSheet, Dimensions, FlatList, Pressable, Linking } from "react-native"
import { WebView } from 'react-native-webview'
import { Divider } from "react-native-elements"

import { Launch } from "../../../model"
import RocketInfo from "./rocketInfo"
import TimeAndLocation from "./timeAndLocation"
import LaunchPageHeader from "./launchPageHeader"


interface LaunchPageProps {
   launch: Launch,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}


const LaunchPage = (props: LaunchPageProps) => {

   const Header = () => (
      <>
         <LaunchPageHeader launch={props.launch} />
         <Divider style={{ marginBottom: 10 }} />
         <TimeAndLocation launch={props.launch} />
         <Divider style={{ margin: 10 }} />
         <RocketInfo launch={props.launch} />
         <Text style={styles.launchDetails}>
            {props.launch.details}
         </Text>
         <View style={styles.webviewContainer}>
            <WebView
               androidHardwareAccelerationDisabled={true} // Solves crash without error
               style={styles.webview}
               title={props.launch.mission_name}
               source={{ uri: `https://www.youtube.com/embed/${props.launch.links.youtube_id}` }}
               allowFullScreen
            />
         </View>
      </>
   )

   return (
      <View>
         <FlatList
            ListHeaderComponent={Header}
            data={props.launch.links.flickr_images}
            numColumns={3}
            columnWrapperStyle={styles.column}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(imageObject) => {
               return (
                  <Pressable onPress={() => Linking.openURL(imageObject.item)}>
                     <Image style={styles.image} source={{ uri: imageObject.item.replace("_o.jpg", "_z.jpg") }} />
                  </Pressable>
               )
            }}
         />
      </View>
   )
}


const styles = StyleSheet.create({
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

export default LaunchPage