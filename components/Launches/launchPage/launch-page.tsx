import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { Launch } from "../../../model";
import RocketInfo from "./rocket-info";
import TimeAndLocation from "./time-and-location";
import OpenURLButton from "../../openURLButton";


interface LaunchPageProps {
  launch: Launch,
  [x: string]: any // TODO: how to type the props coming from react-navigation?
}

const LaunchPage = (props: LaunchPageProps) => {

  return (
    <View>
      <View style={{ margin: 3 }}>
        <TimeAndLocation launch={props.launch} />
        <RocketInfo launch={props.launch} />
        <Text style={styles.launchDetails}>
          {props.launch.details}
        </Text>
        <iframe
          style={{ maxHeight: 400, aspectRatio: '1.7' }} // Aspect ratio as string doesn't play nicely with stylesheet. TODO: is it working here?
          title={props.launch.mission_name}
          src={`https://www.youtube.com/embed/${props.launch.links.youtube_id}`}
          allowFullScreen
        />

        <View style={{ marginLeft: 6, marginRight: 6 }}>
          {props.launch.links.flickr_images.map((imageUrl) => (
            <OpenURLButton url={imageUrl} key={imageUrl}>
              <Image source={{ uri: imageUrl.replace("_o.jpg", "_z.jpg") }} />
            </OpenURLButton>
          ))}
        </View>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  launchDetails: {
    color: 'darkgray',
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    minWidth: '350px'
  },
});

export default LaunchPage