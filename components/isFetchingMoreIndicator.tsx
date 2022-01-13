import React from "react"
import { ActivityIndicator, Text, Pressable, StyleSheet, View } from "react-native"


interface IsFetchingMoreIndicatorProps {
  data: any[] | undefined
  pageSize: number
  isFetchingMore: boolean
}


const IsFetchingMoreIndicator = (props: IsFetchingMoreIndicatorProps) => {
  const isReachingEnd = props.data?.[0]?.length === 0 || (props.data && props.data[props.data.length - 1]?.length < props.pageSize);

  return (
      <View style={styles.container} >
        {
          !isReachingEnd ? (
            <ActivityIndicator color="whitesmoke" size="large" />
          ) : (
            <Text style={styles.text}>That's all!</Text>
          )
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 10,
    color: 'whitesmoke',
  }
})

export default IsFetchingMoreIndicator