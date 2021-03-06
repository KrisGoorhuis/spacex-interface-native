import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { useInfiniteQuery } from "react-query"

import { Mission } from "../../../model"
import { missionPageSize } from '../../../model/constants'
import { queryMissions } from "../../../utils/networking"


interface MissionScrollScreenProps {

}

const MissionScrollScreen = (props: MissionScrollScreenProps) => {

  const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Mission[], Error>(
    ['missions'],
    (context) => queryMissions(context, missionPageSize),
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

  console.log("data")
  console.log(data)
  console.log("flatPages")
  console.log(flatPages)

  return (
    <View style={styles.container}>
      {/* <FlatList
        contentContainerStyle={styles.list}
        data={flatPages}
        onEndReachedThreshold={.5}
        onEndReached={(info: { distanceFromEnd: number }) => fetchNextPage()}
        renderItem={({ item, index }) => {
          console.log("item")
          console.log(item)
          return (
            <View style={{ ...styles.item, width: Dimensions.get('window').width }}>
              <MissionItem key={item.mission_id + index} mission={item} />
              {
                (index < flatPages.length - 1 && flatPages.length > 0) ?
                  <Divider color="white" style={styles.divider} />
                  :
                  null
              }
            </View>
          )
        }}
        keyExtractor={(item, index) => item.mission_id.toString() + index}
        ListFooterComponent={(
          <IsFetchingMoreIndicator
            data={data?.pages.flat()}
            pageSize={missionPageSize}
            isFetchingMore={isFetchingNextPage}
          />
        )}
      /> */}
    </View>
  )
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


export default MissionScrollScreen