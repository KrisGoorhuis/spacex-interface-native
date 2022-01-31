import React from "react"
import { View, Pressable, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from '@react-navigation/stack'

import { Mission } from "../../model"
import FavoriteMissionButton from "./favoriteMissionButton"
import { BrowserStackParamList } from "../../model/navTypes"

interface MissionItemProps {
  mission: Mission
}

const MissionItem = (props: MissionItemProps) => {
  const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>()

  return (
    <Pressable
      onPress={() => navigation.navigate('Mission', { mission: props.mission })}
      data-testid={"missionItem"}
      style={styles.container}
    >
      <View style={styles.title}>
        <Text>{props.mission.mission_name} &bull; {props.mission.mission_id}</Text>
      </View>
      <View style={styles.links}>
        
      </View>
      <FavoriteMissionButton mission={props.mission} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    color: 'white',
  },
  title: {

  },
  links: {

  }
})

export default MissionItem