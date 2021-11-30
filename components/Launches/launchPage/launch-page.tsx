import React from "react";
import { useQuery } from "react-query";
import { InstagramLoader } from "react-native-easy-content-loader";
import { View, Text, Image, StyleSheet } from "react-native";

import Error from "../../error";
import { Launch as LaunchType } from "../../../model";
import RocketInfo from "./rocket-info";
import LaunchPageHeader from "./launch-page-header";
import TimeAndLocation from "./time-and-location";
import { queryLaunches } from "../../../utils/networking";
import OpenURLButton from "../../openURLButton";


interface LaunchScreenProps {
  flight_number: number,
  [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPage(props: LaunchScreenProps) {
  const { isLoading, isError, error, data } = useQuery<LaunchType[], Error>('launches', queryLaunches)


  if (error) return <Error />;

  if (!data) {
    return (
      <InstagramLoader active />
    );
  }

  const thisLaunch = data.filter((datum) => datum.flight_number === props.flight_number)[0]

  return (
    <View>
      {/* TODO: delete? */}
      {/* <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Launches", to: ".." },
          { label: `#${thisLaunch.flight_number}` },
        ]}
      /> */}
      <LaunchPageHeader launch={thisLaunch} />
      <View style={{ margin: 3 }}>
        <TimeAndLocation launch={thisLaunch} />
        <RocketInfo launch={thisLaunch} />
        <Text style={styles.launchDetails}>
          {thisLaunch.details}
        </Text>
        <iframe
          style={{ maxHeight: 400, aspectRatio: '1.7' }} // Aspect ratio as string doesn't play nicely with stylesheet. TODO: is it working here?
          title={props.launch.mission_name}
          src={`https://www.youtube.com/embed/${props.launch.links.youtube_id}`}
          allowFullScreen
        />

        {/* Image gallery */}
        <View style={{ marginLeft: 6, marginRight: 6 }}>
          {/* spacing="4" */}
          {thisLaunch.links.flickr_images.map((imageUrl) => (
            <OpenURLButton url={imageUrl} key={imageUrl}>
              <Image source={require(imageUrl.replace("_o.jpg", "_z.jpg"))} />
            </OpenURLButton>
          ))}
        </View>

      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  launchDetails: {
    color: 'gray.700',
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    minWidth: '350px'
  },
});
