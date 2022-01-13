import React from "react"
import { StyleSheet, FlatList, View, Dimensions, Text } from 'react-native'
import { useInfiniteQuery } from "react-query"

import { Launch } from "../../../model"
import LaunchItem from "../../../components/Launches/launchItem"
import { queryLaunches } from "../../../utils/networking"
import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator"
import { Divider } from "react-native-elements"

const pageSize = 3
const LaunchScrollScreen = () => {
   const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Launch[], { message: string }>(
      ['launches'],
      (context) => queryLaunches(context, pageSize),
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

   console.log("isFetchingNextPage")
   console.log(isFetchingNextPage)

   return (
      <View style={styles.container}>
         <FlatList
            contentContainerStyle={styles.list}
            data={flatPages}
            onEndReachedThreshold={1}
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
   );
}

const styles = StyleSheet.create({
   container: {
      // paddingBottom: 30
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
});


export default LaunchScrollScreen
