import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView, FlatList, Pressable, Linking } from "react-native";
import { WebView } from 'react-native-webview';

import { Launch } from "../../../model";
import RocketInfo from "./rocket-info";
import TimeAndLocation from "./time-and-location";
import OpenURLButton from "../../openURLButton";
import LaunchPageHeader from "./launch-page-header";
import { Divider } from "react-native-elements";


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
    <View style={styles.viewContainer}>
      <FlatList 
        style={styles.gallery}
        contentContainerStyle={{justifyContent: 'space-between', display: 'flex', width: '100%'}}
        ListHeaderComponent={Header}
        data={props.launch.links.flickr_images}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(imageObject) => {
          return (
            <Pressable style={styles.imageContainer} onPress={() => Linking.openURL(imageObject.item)}>
              <Image style={styles.image} source={{ uri: imageObject.item.replace("_o.jpg", "_z.jpg") }} />
            </Pressable>
          )
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  viewContainer: {
    // flex: 1,
    // flexDirection: 'column',
    // margin: 1,
  },
  launchDetails: {
    color: 'darkgray',
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8
  },
  imageContainer: {

  },
  webviewContainer: {
    marginTop: 30,
    alignSelf: 'stretch',
    flex: 1,
    alignItems: 'center',
  },
  webview: {
    borderColor: 'red',
    borderWidth: 1,
    width: Dimensions.get('window').width * .9,
    margin: 'auto',
    // width: 300,
    height: 300
  },
  gallery: {
    // margin: 1,
    // marginLeft: 6,
    // marginRight: 6,
    // // width: 100,
    // // height: 100,
    // flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'space-between'
  },
  image: {
    width: Dimensions.get('window').width * .3,
    height: Dimensions.get('window').width * .3
    // width: '100%',
    // height: '100%'
  }
});

export default LaunchPage