import React from "react"
import { Text, StyleSheet, View, ActivityIndicator } from "react-native"
import { ListItem } from "react-native-elements"


interface IsFetchingMoreIndicatorProps {
  data: any[] | undefined
  pageSize: number
  isFetching: boolean
}


const IsFetchingMoreIndicator = (props: IsFetchingMoreIndicatorProps) => {

  return (
    <View style={styles.container} >
      {
        props.isFetching ? (
          <ActivityIndicator color="whitesmoke" size="large" />
        ) : (
          <Text style={styles.text}  >That's all!</Text>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 125,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  text: {
    color: 'white'
  }
})

export default IsFetchingMoreIndicator