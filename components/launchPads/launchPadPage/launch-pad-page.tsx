import React from "react";
import { MapPin, Navigation } from "react-native-feather";
import { QueryFunctionContext, useQuery } from "react-query";
import { InstagramLoader } from "react-native-easy-content-loader";

import Error from "../../error";
import { Launch, Launch as LaunchType, LaunchPad, LaunchPad as LaunchPadType, LaunchPadProps } from '../../../model/index'
import LaunchPadHeader from "./launch-pad-header";
import { queryLaunches, queryLaunchPads } from "../../../utils/networking";
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from "react-native-elements";
import { Divider } from "react-native-elements";
import LaunchItem from "../../Launches/launchItem";


interface LaunchPadPageProps {
  launchPadId: string,
  [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPadPage(props: LaunchPadPageProps) {
// (context: QueryFunctionContext<TQueryKey>) => T | Promise<T>;

  const LaunchesQuery = {data: [], error: 'temp'}
  // const LaunchesQuery = useQuery<LaunchType[], Error>('launches', queryPastLaunches)

// 

  // if (props.launchPad.error || LaunchesQuery.error) return <Error />;

  // if (!props.launchPad.data || !LaunchesQuery.data) {
  //   return (
  //     <InstagramLoader active />
  //   );
  // }

  // const thisLaunchPad = LaunchesQuery.data.filter((launchPad: LaunchPadType) => launchPad.id === props.launchPadId)[0]
  const thisLaunchPad = props.launchPad


  return (
    <>
      <LaunchPadHeader launchPad={thisLaunchPad} />
      <View>
        <LocationAndVehicles launchPad={thisLaunchPad} />
        <Text style={styles.launchPadDetails}>
          {thisLaunchPad.details}
        </Text>

        <iframe
          style={{ maxHeight: 400, aspectRatio: '16 / 5' }} // Aspect ratio as string doesn't play nicely with stylesheet. TODO: is it working here?
          title={thisLaunchPad.site_name_long}
          src={`https://maps.google.com/maps?q=${thisLaunchPad.location.latitude}, ${thisLaunchPad.location.longitude}&z=15&output=embed`}
          allowFullScreen
        />
        <RecentLaunches launches={LaunchesQuery.data || []} />
      </View>
    </>
  );
}


function LocationAndVehicles(props: LaunchPadProps) {
  return (
    <View style={styles.container}>
      <ListItem>
        <ListItem.Title style={styles.listItemTitle}>
          <MapPin />{" "}
          <Text style={styles.titleText}>
            Location
          </Text>
        </ListItem.Title>

        <ListItem.Content style={styles.content}>
          <Text>
            {props.launchPad.location.name}
          </Text>
          <Divider />
        </ListItem.Content>
        <Text>
          {props.launchPad.location.region}
        </Text>


      </ListItem>
      <ListItem>
        <ListItem.Title style={styles.listItemTitle}>
          <Navigation />{" "}
          <Text style={styles.titleText}>
            Vehicles
          </Text>
        </ListItem.Title>
        <ListItem.Content>
          {props.launchPad.vehicles_launched.join(", ")}
        </ListItem.Content>
      </ListItem>
    </View>
  );
}


function RecentLaunches(props: { launches: Launch[] }) {
  if (!props.launches?.length) {
    return null;
  }
  return (
    <View style={styles.recentLaunchesContainer}>
      <Text style={{ fontWeight: 'bold' }}>
        Last launches
      </Text>
      <View>
        {props.launches.map((launch) => (
          <View style={styles.recentLaunchesItem}>
            <LaunchItem launch={launch} key={launch.flight_number} />
          </View>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  launchPadDetails: {
    color: 'darkgray',
    marginLeft: 8,
    marginRight: 8
  },
  container: {
    // borderWidth: '1px',
    marginTop: 4,
    padding: 4,
    borderRadius: 5, // 'md'
  },
  listItemTitle: {
    display: 'flex',
  },
  titleText: {
    marginLeft: 2
  },
  content: {
    fontSize: 20, // Replaces 'md' | 'xl'
  },
  recentLaunchesContainer: {
    display: 'flex',
    marginLeft: 8,
    marginRight: 8,
  },
  recentLaunchesItem: {
    minWidth: 350
  }
});