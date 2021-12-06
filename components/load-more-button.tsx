import React from "react";
import { ActivityIndicator, Text, Pressable, View } from "react-native";


interface LoadMoreButtonProps {
  loadMore: () => void
  data: any[] | undefined
  pageSize: number
  isLoadingMore: boolean
}


export default function LoadMoreButton(props: LoadMoreButtonProps) {
  const isReachingEnd = props.data?.[0]?.length === 0 || (props.data && props.data[props.data.length - 1]?.length < props.pageSize);

  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <Pressable onPress={props.loadMore} disabled={isReachingEnd || props.isLoadingMore}>
        {
          props.isLoadingMore ? (
            <ActivityIndicator size="large" />
          ) : isReachingEnd ? (
            <Text>"That's all!"</Text>
          ) : (
            <Text>"Show more..."</Text>
          )
        }
      </Pressable>
    </View>
  );
}
