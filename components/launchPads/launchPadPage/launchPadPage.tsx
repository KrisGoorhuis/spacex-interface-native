import React from "react"
import { useInfiniteQuery } from "react-query"
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import { Divider } from "react-native-elements"
import MapView, { Marker } from 'react-native-maps'

import { Launch, LaunchPad } from '../../../model/index'
import LaunchPadHeader from "./launchPadHeader"
import { queryPastLaunches } from "../../../utils/networking"
import LaunchItem from "../../Launches/launchItem"
import LocationAndVehicles from "./locationAndVehicles"
import { launchesPageSize, launchPadPageSize } from "../../../model/constants"
import IsFetchingMoreIndicator from "../../isFetchingMoreIndicator"


interface LaunchPadPageProps {
   launchPad: LaunchPad,
}

export default function LaunchPadPage(props: LaunchPadPageProps) {

   const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Launch[], Error>(
      ['pastLaunches'],
      (context) => queryPastLaunches(context, launchPadPageSize, props.launchPad.site_id),
      {
         initialData: { pages: [], pageParams: [] },
         getNextPageParam: (lastPage: any, allPages: any) => {
            if (lastPage) { return allPages.flat().length + 1 }
         }
      }
   )


   if (isLoading) {
      return <Text>Loading...</Text>
   }

   if (isError && error) {
      return <Text>Error: {error.message}</Text>
   }

   // if (props.launchPad.error || LaunchesQuery.error) return <Error />

   // if (!props.launchPad.data || !LaunchesQuery.data) {
   //   return (
   //     <InstagramLoader active />
   //   )
   // }


   const flatPages = data?.pages.flat() || []

   const Header = () => (
      <>
         <LaunchPadHeader launchPad={props.launchPad} />
         <Divider />
         <View>
            <LocationAndVehicles launchPad={props.launchPad} />
            <Text style={styles.launchPadDetails}>{props.launchPad.details}</Text>
            <View style={styles.webviewContainer}>
               <MapView
                  style={{ height: 250, width: Dimensions.get('window').width * .9 }}
                  initialRegion={{
                     latitude: props.launchPad.location.latitude,
                     longitude: props.launchPad.location.longitude,
                     latitudeDelta: 10,
                     longitudeDelta: 10,
                  }}
               >
                  <Marker
                     coordinate={{
                        latitude: props.launchPad.location.latitude,
                        longitude: props.launchPad.location.longitude
                     }}
                  />
               </MapView>
            </View>
            {
               flatPages.length > 0 ?
                  <Text style={styles.lastLaunches}>Last launches</Text>
                  :
                  <Text style={styles.lastLaunches}>No previous launches</Text>
            }
         </View>
      </>
   )

   return (
      <View style={styles.container}>
         <FlatList
            // contentContainerStyle={styles.list}
            data={flatPages}
            onEndReachedThreshold={.5}
            onEndReached={(info: { distanceFromEnd: number }) => fetchNextPage()}
            ListHeaderComponent={Header}
            renderItem={({ item, index }) => {
               return (
                  <View style={{ ...styles.item, width: Dimensions.get('window').width }}>
                     <LaunchItem key={item.flight_number} launch={item} />
                     {
                        (index < flatPages.length - 1 && flatPages.length > 0) ?
                           <Divider color="white" style={styles.divider} />
                           :
                           null
                     }
                  </View>
               )
            }}
            ListFooterComponent={(
               <View style={styles.listFooter}>
                  {
                     isFetchingNextPage &&
                     <IsFetchingMoreIndicator
                        data={data?.pages.flat()}
                        pageSize={launchesPageSize}
                        isFetching={isLoading}
                     />
                  }
               </View>
            )}
         />
      </View >
   )
}


const styles = StyleSheet.create({
   launchPadDetails: {
      color: 'darkgray',
      marginLeft: 8,
      marginRight: 8,
      marginTop: 16,
   },
   container: {
      marginTop: 4,
      padding: 4,
      borderRadius: 5,
   },
   listItemTitle: {
      display: 'flex',
   },
   titleText: {
      marginLeft: 2,
   },
   content: {
      fontSize: 20,
   },
   recentLaunchesContainer: {
      display: 'flex',
      marginLeft: 8,
      marginRight: 8,
   },
   recentLaunchesItem: {
      minWidth: 350,
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
      height: 300,
   },
   item: {
      padding: 20,
      paddingBottom: 0,
   },
   listFooter: {
      height: 50
   },
   divider: {
      marginTop: 10,
   },
   lastLaunches: {
      // fontWeight: 'bold',
      marginLeft: 10
   }
})