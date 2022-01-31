import React from "react"
import { Badge } from 'react-native-elements'
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from '@react-navigation/stack'

import { Ship } from "../../model"
import { BrowserStackParamList } from "../../model/navTypes"
import FavoriteShipButton from "./favoriteShipButton"

interface ShipItemProps {
   ship: Ship
}

const ShipItem = (props: ShipItemProps) => {
   const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>()

   return (
      <Pressable
      onPress={() => navigation.navigate('Ship', { ship: props.ship })}
      data-testid={"missionItem"}
      style={styles.container}
    >
      <View style={styles.topLine}>
        {props.mission.status === "active" ? (
          <Badge containerStyle={styles.statusBadge} value="Active" status="success" />
        ) : (
          <Badge containerStyle={styles.statusBadge} value="Retired" status="warning" />
        )}
        <Text style={styles.launchText}>
          {props.launchPad.attempted_launches} attempted &bull;{" "}
          {props.launchPad.successful_launches} succeeded
        </Text>
        <View>
          <FavoriteShipButton {...props} />
        </View>
      </View>

      <Text
        style={{ color: 'whitesmoke' }}
        numberOfLines={3}
      >
        {props.launchPad.location.name}
      </Text>
      <Text style={{ color: 'lightgray' }}>
        {props.launchPad.vehicles_launched.join(", ")}
      </Text>
    </Pressable>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      color: 'white',
    },
    topLine: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('window').width * .8
    },
    launchText: {
      marginLeft: 5,
      marginRight: 5,
      textTransform: "uppercase",
      color: 'whitesmoke'
    },
    badge: {
      paddingLeft: 2,
      paddingRight: 2
    },
    statusBadge: {
      padding: 5,
      paddingLeft: 0,
      display: 'flex',
      alignItems: 'center'
    },
})

export default ShipItem