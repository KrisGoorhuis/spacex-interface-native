import React from "react"
import { View, StyleSheet, FlatList, Dimensions } from "react-native"
import { Divider } from 'react-native-elements'
import { useInfiniteQuery } from "react-query"

import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator"
import MissionItem from "../../../components/missions/missionItem"
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
    return <span>Loading...</span>
  }

  if (isError && error) {
    return <span>Error: {error.message}</span>
  }

  const flatPages = data?.pages.flat() || []

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
      />
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