import React from "react"
import { StyleSheet, ScrollView, View } from 'react-native'
import { useInfiniteQuery } from "react-query"

import { Launch } from "../../model"
import LaunchItem from "../../components/Launches/launchItem"
import { queryLaunches } from "../../utils/networking"
import LoadMoreButton from "../../components/load-more-button"


const pageSize = 3
const LaunchScrollScreen = () => {
   const { isLoading, isError, error, data, fetchNextPage } = useInfiniteQuery<Launch[], { message: string }>(
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


   return (
      <View>
         <ScrollView contentContainerStyle={styles.container}>
            {
               data &&
               data.pages.flat().map((launchItem: Launch) => {
                  return <LaunchItem key={launchItem.flight_number} launch={launchItem} />
               })
            }
         </ScrollView>
         <LoadMoreButton
            loadMore={() => fetchNextPage()}
            data={data?.pages.flat()}
            pageSize={pageSize}
            isLoadingMore={isLoading}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
   },
});


export default LaunchScrollScreen