import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useInfiniteQuery } from "react-query";

import LaunchPadItem from "../../../components/launchPads/launchPadItem";
import { LaunchPad } from "../../../model";
import { queryLaunchPads } from "../../../utils/networking";
import LoadMoreButton from "../../../components/load-more-button";


const pageSize = 12
const LaunchPadScrollScreen = (props: { data: LaunchPad[] | undefined }) => {

  const { isLoading, isError, error, data, fetchNextPage } = useInfiniteQuery<LaunchPad[], { message: string }>(
    ['launchPads'],
    (context) => queryLaunchPads(context, pageSize),
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


  return (
    <View>
      <ScrollView>
        {props.data ?
          (props.data.flat()).map((item, i) => {
            return (
              <LaunchPadItem launchPad={item} key={item.site_id + i} />
            )
          })
          :
          null
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

export default LaunchPadScrollScreen