import React from "react";
import { ScrollView, View } from "react-native";
import { useInfiniteQuery } from "react-query";

import Error from "../../components/error";
import LaunchPadItem from "../../components/launchPads/launchPadItem";
import { LaunchPad } from "../../model";
import { queryLaunchPads } from "../../utils/networking";
import LoadMoreButton from "../../components/load-more-button";



export default function LaunchPads(props: { data: LaunchPad[] | undefined }) {
  const [pageSize, setPageSize] = React.useState<number>(12)
  const { isLoading, isError, error, data } = useInfiniteQuery<LaunchPad[], { message: string }>('launchPads', () => queryLaunchPads(pageSize))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error) {
    return <span>Error: {error.message}</span>
  }

  console.log("data?.pages")
  console.log(data?.pages)
  console.log("data?.pages.flat()")
  console.log(data?.pages.flat())

  return (
    <View>
      <ScrollView>
        {props.data &&
          (props.data.flat()).map((item, i) => {
            return (
              <LaunchPadItem launchPad={item} key={item.site_id + i} />
            )
          })
        }
      </ScrollView>
      <LoadMoreButton
        loadMore={() => {console.log("pressed"); setPageSize(pageSize + 1)}}
        data={data?.pages.flat()}
        pageSize={pageSize}
        isLoadingMore={isLoading}
      />
    </View>
  );
}

