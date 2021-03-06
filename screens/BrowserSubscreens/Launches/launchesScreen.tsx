import React from "react"
import { StyleSheet, FlatList, View, Dimensions, Text } from 'react-native'
import { useInfiniteQuery } from "react-query"
import { Divider } from "react-native-elements"

import { Launch } from "../../../model"
import LaunchItem from "../../../components/Launches/launchItem"
import { queryLaunches } from "../../../utils/networking"
import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator"
import { launchesPageSize } from "../../../model/constants"

const LaunchScrollScreen = () => {
   const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Launch[], Error>(
      ['launches'],
      (context) => queryLaunches(context, launchesPageSize),
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

   const flatPages = data?.pages.flat() || []

   return (
      <View style={styles.container}>
         <FlatList
            contentContainerStyle={styles.list}
            data={flatPages}
            onEndReachedThreshold={.8}
            onEndReached={(info: { distanceFromEnd: number }) => fetchNextPage()}
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
            keyExtractor={(item) => item.flight_number.toString()}
            ListFooterComponent={(
               <IsFetchingMoreIndicator
                  data={data?.pages.flat()}
                  pageSize={launchesPageSize}
                  isFetching={isLoading || isFetchingNextPage}
               />
            )}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
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
});


export default LaunchScrollScreen
