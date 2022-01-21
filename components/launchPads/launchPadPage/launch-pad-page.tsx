import React from "react";
import { MapPin, Navigation } from "react-native-feather";
import { QueryFunctionContext, useInfiniteQuery, useQuery } from "react-query";
import { InstagramLoader } from "react-native-easy-content-loader";

import Error from "../../error";
import { Launch, LaunchPad, LaunchPad as LaunchPadType, LaunchPadProps } from '../../../model/index'
import LaunchPadHeader from "./launch-pad-header";
import { queryLaunches, queryLaunchPads, queryPastLaunches } from "../../../utils/networking";
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { ListItem } from "react-native-elements";
import { Divider } from "react-native-elements";
import LaunchItem from "../../Launches/launchItem";
import LocationAndVehicles from "./locationAndVehicles";
import WebView from "react-native-webview";


interface LaunchPadPageProps {
   launchPad: LaunchPad,
   [x: string]: any // TODO: how to type the props coming from react-navigation?
}

const pageSize = 3
export default function LaunchPadPage(props: LaunchPadPageProps) {
   // (context: QueryFunctionContext<TQueryKey>) => T | Promise<T>;

   // const LaunchesQuery = { data: [], error: 'temp' }
   const { isLoading, isError, error, data } = useQuery<Launch[], Error>(
      ['pastLaunches'],
      (context) => queryPastLaunches(context, props.launchPad.id, pageSize)
   )
 
   // 

   // if (props.launchPad.error || LaunchesQuery.error) return <Error />;

   // if (!props.launchPad.data || !LaunchesQuery.data) {
   //   return (
   //     <InstagramLoader active />
   //   );
   // }

   // const thisLaunchPad = LaunchesQuery.data.filter((launchPad: LaunchPadType) => launchPad.id === props.launchPadId)[0]

   // const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Launch[], { message: string }>(
   //    ['launches'],
   //    (context) => queryLaunches(context, pageSize),
   //    {
   //       initialData: { pages: [], pageParams: [] },
   //       getNextPageParam: (lastPage: any, allPages: any) => {
   //          if (lastPage) { return allPages.flat().length + 1 }
   //       }
   //    }
   // )

   return (
      <>
         <LaunchPadHeader launchPad={props.launchPad} />
         <Divider />
         <View>
            <LocationAndVehicles launchPad={props.launchPad} />
            <Text style={styles.launchPadDetails}>
               {props.launchPad.details}
            </Text>

            <View style={styles.webviewContainer}>
               <WebView
                  androidHardwareAccelerationDisabled={true} // Solves crash without error
                  style={styles.webview}
                  title={props.launchPad.site_name_long}
                  source={{ uri: `https://maps.google.com/maps?q=${props.launchPad.location.latitude}, ${props.launchPad.location.longitude}&z=15&output=embed` }}
                  allowFullScreen
               />
            </View>

            <Text style={{ fontWeight: 'bold' }}>
               Last launches
            </Text>
            <FlatList
               data={data} // Need to figure out react-query stuff for this
               renderItem={(launchObject) => {
                  return (
                     <LaunchItem launch={launchObject.item} key={launchObject.item.flight_number} />
                  )
               }}
            />
         </View>
      </>
   );
}


const styles = StyleSheet.create({
   launchPadDetails: {
      color: 'darkgray',
      marginLeft: 8,
      marginRight: 8
   },
   container: {
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
});