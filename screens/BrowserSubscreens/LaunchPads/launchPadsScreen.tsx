import { StatusBar } from 'expo-status-bar'
import React from "react";
import { ScrollView, View, Text, Platform, StyleSheet, FlatList, Dimensions } from "react-native";
import { Divider } from 'react-native-elements';
import { useInfiniteQuery } from "react-query";
import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator";

import LaunchPadItem from "../../../components/launchPads/launchPadItem";
import LaunchPadPage from "../../../components/launchPads/launchPadPage/launch-pad-page";
import { LaunchPad } from "../../../model";
import { queryLaunchPads } from "../../../utils/networking";


interface LaunchPadScrollScreenProps {
  [x: string]: any // TODO: how to type the props coming from react-navigation?
}

const pageSize = 3
const LaunchPadScrollScreen = (props: LaunchPadScrollScreenProps) => {
  // const launchPad = props.route.params.launchPad
  console.log("plural")
  const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<LaunchPad[], Error>(
    ['launchPads'],
    (context) => queryLaunchPads(context, pageSize),
    {
      initialData: { pages: [], pageParams: [] },
      getNextPageParam: (lastPage: any, allPages: any) => {
        if (lastPage) { return allPages.flat().length + 1 }
      }
    }
  )

  // if (isLoading) {
  //   return <Text>Loading...</Text>
  // }

  // if (isError && error) {
  //   return <Text>Error: {error.message}</Text>
  // }

  const flatPages = data?.pages.flat() || []

  return (
    <View style={styles.container}>



      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={flatPages}
          onEndReachedThreshold={1}
          onEndReached={(info: { distanceFromEnd: number }) => fetchNextPage()}
          renderItem={({ item, index }) => {
            return (
              <View style={{ ...styles.item, width: Dimensions.get('window').width }}>
                <LaunchPadItem key={item.site_id + index} launchPad={item} />
                {
                  (index < flatPages.length - 1 && flatPages.length > 0) ?
                    <Divider color="white" style={styles.divider} />
                    :
                    null
                }
              </View>
            )
          }}
          keyExtractor={(item, index) => item.site_id.toString() + index}
          ListFooterComponent={(
            <View style={styles.listFooter}>
              {
                isFetchingNextPage &&
                <IsFetchingMoreIndicator
                  data={data?.pages.flat()}
                  pageSize={pageSize}
                  isFetchingMore={isLoading}
                />
              }
            </View>
          )}
        />
      </View>
      {/* {
        launchPad ?
          <LaunchPadPage launchPad={launchPad} />
          :
          null
      } */}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      {/* <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 20
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  listFooter: {
    height: 50
  },
  divider: {
    marginTop: 10,
  },
})


export default LaunchPadScrollScreen