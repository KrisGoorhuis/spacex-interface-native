import React from "react"
import { Pressable, StyleSheet, View, Text, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import { Badge } from "react-native-elements"
import { StackNavigationProp } from "@react-navigation/stack"

import { LaunchPad, LaunchPadProps } from "../../model"
import FavoriteLaunchPadButton from "./favoriteLaunchPadButton"
import { BrowserStackParamList } from "../../model/navTypes"

interface launchPadItemProps extends LaunchPadProps {
  launchPad: LaunchPad
  isDark?: boolean
}

const LaunchPadItem = (props: launchPadItemProps) => {
  const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>()

  return (
    <Pressable
      onPress={() => navigation.navigate('Launch Pad', { launchPad: props.launchPad })}
      data-testid={"launchItem"}
      style={styles.container}
    >
      <View style={styles.topLine}>
        <Text
          style={{...styles.name, color: props.isDark ? 'black' : 'whitesmoke', }}
          numberOfLines={3}
        >
          {props.launchPad.location.name}
        </Text>
        {props.launchPad.status === "active" ? (
          <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.statusBadge} value="Active" status="success" />
        ) : (
          <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.statusBadge} value="Retired" status="warning" />
        )}

        <View>
          <FavoriteLaunchPadButton {...props} />
        </View>
      </View>

      <Text style={{...styles.launchText, color: props.isDark ? 'darkgray' : 'whitesmoke',}}>
        {props.launchPad.attempted_launches} attempted &bull;{" "}
        {props.launchPad.successful_launches} succeeded
      </Text>

      <Text style={{ color: props.isDark ? 'darkgray' : 'lightgray' }}>
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
  name: {
    width: 200,
    overflow: 'hidden'
  },
  launchText: {
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
  badgeStyle: {
    borderRadius: 3,
  },
})

export default LaunchPadItem