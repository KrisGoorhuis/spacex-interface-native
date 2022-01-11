import React from "react"
import { StyleSheet, ScrollView, FlatList, View } from 'react-native'
import { useInfiniteQuery } from "react-query"

import { Launch } from "../../../model"
import LaunchItem from "../../../components/Launches/launchItem"
import { queryLaunches } from "../../../utils/networking"
import LoadMoreButton from "../../../components/load-more-button"
import { ListItem, Divider } from "react-native-elements"


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


   const flatPages = data?.pages.flat() || []

   return (
      <View>
         <FlatList
            contentContainerStyle={styles.list}
            data={flatPages}
            renderItem={({ item, index }) => {

               return (
                  <View style={styles.item}>
                     <LaunchItem key={item.flight_number} launch={item}  />
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
         />
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
   item: {
      padding: 20
   },
   list: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
   },
   divider: {
      marginTop: 10,
    },
});


export default LaunchScrollScreen
