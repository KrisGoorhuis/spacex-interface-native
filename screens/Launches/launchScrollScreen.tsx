import React from "react"
import { StyleSheet, ScrollView, View } from 'react-native'
import { useInfiniteQuery, useQuery } from "react-query"

import { Launch } from "../../model"
import LaunchItem from "../../components/Launches/launchItem"
import { queryLaunches } from "../../utils/networking"
import LoadMoreButton from "../../components/load-more-button"


const pageSize = 3
const LaunchScrollScreen = () => {
   const [offset, setOffset] = React.useState<number>(0)
   const { isLoading, isError, error, data, fetchNextPage } = useInfiniteQuery<Launch[], { message: string }>(
      ['launches'],
      (...args) => {console.log(args); return queryLaunches(pageSize, offset)},
      {
         initialData: {pages: [], pageParams: []},
         getNextPageParam: (lastPage: any, allPages: any) => {
            const newOffset = lastPage.length > 0 && lastPage[lastPage.length - 1].flight_number + 1
            return (
               {pageSize: 5, offset: newOffset}
            )
         }
      }
   )

   if (isLoading) {
      return <span>Loading...</span>
   }

   if (isError && error) {
      return <span>Error: {error.message}</span>
   }
   console.log("offset")
   console.log(offset)
   console.log("data")
   console.log(data)
   console.log("data?.pages")
   console.log(data?.pages)
   console.log("data?.pageParams")
   console.log(data?.pageParams)

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
            // loadMore={() => { console.log("pressed"); setOffset(offset + 1) }}
            data={data?.pages.flat()}
            pageSize={offset}
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
   },

});


export default LaunchScrollScreen
