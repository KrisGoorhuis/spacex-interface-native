import React from "react";
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native";
import { Divider } from 'react-native-elements';
import { useInfiniteQuery } from "react-query";
import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator";

import LaunchPadItem from "../../../components/launchPads/launchPadItem";
import { LaunchPad } from "../../../model";
import { launchPadPageSize } from '../../../model/constants';
import { queryLaunchPads } from "../../../utils/networking";


interface LaunchPadScrollScreenProps {

}

const LaunchPadScrollScreen = (props: LaunchPadScrollScreenProps) => {

  const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<LaunchPad[], Error>(
    ['launchPads'],
    (context) => queryLaunchPads(context, launchPadPageSize),
    {
      initialData: { pages: [], pageParams: [] },
      getNextPageParam: (lastPage: any, allPages: any) => {
        if (lastPage) { return allPages.flat().length + 1 }
      }
    }
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error) {
    return <span>Error: {error.message}</span>
  }

  const flatPages = data?.pages.flat() || []

  console.log("isLoading")
  console.log(isLoading)

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={flatPages}
        onEndReachedThreshold={.5}
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
          <IsFetchingMoreIndicator
            data={data?.pages.flat()}
            pageSize={launchPadPageSize}
            isFetchingMore={isFetchingNextPage}
          />
        )}
      />
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
    padding: 20,
    paddingBottom: 0,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  divider: {
    marginTop: 10,
  },
})


export default LaunchPadScrollScreen