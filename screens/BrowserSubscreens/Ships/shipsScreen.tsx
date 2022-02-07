import React from "react"
import { View, StyleSheet, FlatList, Dimensions, Text } from "react-native"
import { Divider } from 'react-native-elements'
import { useInfiniteQuery } from "react-query"

import IsFetchingMoreIndicator from "../../../components/isFetchingMoreIndicator"
import ShipItem from "../../../components/ships/shipItem"
import { Ship } from "../../../model"
import { shipPageSize } from '../../../model/constants'
import { queryShips } from "../../../utils/networking"


interface ShipScrollScreenProps {

}

const ShipScrollScreen = (props: ShipScrollScreenProps) => {

  const { isLoading, isError, error, data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<Ship[], Error>(
    ['ships'],
    (context) => queryShips(context, shipPageSize),
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
        onEndReachedThreshold={.5}
        onEndReached={(info: { distanceFromEnd: number }) => fetchNextPage()}
        renderItem={({ item, index }) => {
          return (
            <View style={{ ...styles.item, width: Dimensions.get('window').width }}>
              <ShipItem key={item.ship_id + index} ship={item} />
              {
                (index < flatPages.length - 1 && flatPages.length > 0) ?
                  <Divider color="white" style={styles.divider} />
                  :
                  null
              }
            </View>
          )
        }}
        keyExtractor={(item, index) => item.ship_id.toString() + index}
        ListFooterComponent={(
          <IsFetchingMoreIndicator
            data={data?.pages.flat()}
            pageSize={shipPageSize}
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


export default ShipScrollScreen