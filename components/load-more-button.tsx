import React from "react"
import { ActivityIndicator, Text, Pressable, StyleSheet } from "react-native"


interface LoadMoreButtonProps {
  loadMore: () => void
  data: any[] | undefined
  pageSize: number
  isLoadingMore: boolean
}


const LoadMoreButton = (props: LoadMoreButtonProps) => {
  const isReachingEnd = props.data?.[0]?.length === 0 || (props.data && props.data[props.data.length - 1]?.length < props.pageSize);

  return (
      <Pressable style={styles.container} onPress={props.loadMore} disabled={isReachingEnd || props.isLoadingMore}>
        {
          props.isLoadingMore ? (
            <ActivityIndicator size="large" />
          ) : isReachingEnd ? (
            <Text style={styles.text}>That's all!</Text>
          ) : (
            <Text style={styles.text}>Show more...</Text>
          )
        }
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    padding: 10
  }
})

export default LoadMoreButton