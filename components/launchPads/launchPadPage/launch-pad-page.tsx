import React from "react";
import { MapPin, Navigation } from "react-feather";
import { useQuery } from "react-query";
import { InstagramLoader } from "react-native-easy-content-loader";

import Error from "../../error";
import { Launch as LaunchType, LaunchPad as LaunchPadType, LaunchPadProps } from '../../../model/index'
import LaunchPadHeader from "./launch-pad-header";
import { queryLaunches, queryLaunchPads } from "../../../utils/networking";
import { StyleSheet, Text, View } from 'react-native'
import { ListItem } from "react-native-elements/dist/list/ListItem";
import { Divider } from "react-native-elements";
import LaunchItem from "../../Launches/launchItem";


interface LaunchPadPageProps {
  launchPadId: number | undefined,
  [x: string]: any // TODO: how to type the props coming from react-navigation?
}

export default function LaunchPadPage(props: LaunchPadPageProps) {

  const LaunchPadQuery = useQuery<LaunchPadType[], Error>('launchPads', (args:) => queryLaunchPads(...args, props.launchPadId))

  const LaunchesQuery = useQuery<LaunchType[], Error>('launches', queryLaunches)


  if (LaunchPadQuery.error || LaunchesQuery.error) return <Error />;

  if (!LaunchPadQuery.data || !LaunchesQuery.data) {
    return (
      <InstagramLoader active />
    );
  }

  const thisLaunchPad = LaunchPadQuery.data.filter((launchPad: LaunchPadType) => launchPad.id === props.launchPadId)[0]


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
    color: 'gray.700',
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
    minWidth: '350px'
  }
});