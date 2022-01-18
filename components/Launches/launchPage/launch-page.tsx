import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
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
  console.log("props.launch.links.flickr_images")
  console.log(props.launch.links.flickr_images)

  return (
    <ScrollView style={styles.viewContainer}>
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
          androidHardwareAccelerationDisabled={true}
          style={styles.webview}
          title={props.launch.mission_name}
          source={{ uri: `https://www.youtube.com/embed/${props.launch.links.youtube_id}` }}
          allowFullScreen
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>

      <View style={styles.gallery}>
        {props.launch.links.flickr_images.map((imageUrl) => {
          console.log("imageUrl")
          console.log(imageUrl)
          return (
            <OpenURLButton url={imageUrl} key={imageUrl}>
              <Image source={{ uri: imageUrl.replace("_o.jpg", "_z.jpg") }} />
            </OpenURLButton>
          )
        }
        )}
      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({
  viewContainer: {

  },
  launchDetails: {
    color: 'darkgray',
    marginTop: 20,
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    minWidth: 350
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
    marginLeft: 6,
    marginRight: 6,
    width: 100,
    height: 100,
    borderColor: 'red'
  }
});

export default LaunchPage