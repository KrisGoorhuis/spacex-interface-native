import React from "react"
import { format as timeAgo } from "timeago.js"
import { View, Text, Pressable, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from '@react-navigation/stack'
import { Image, Badge } from 'react-native-elements'

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
      <View>
        <Image
          source={{ uri: props.ship.image }}
          containerStyle={{ height: 300 }}
          // resizeMode={props.launch.links.flickr_images[0] ? "cover" : "contain"}
        />
        {props.ship.launch_success ?
          <View style={styles.badgeContainer}>
            <Badge containerStyle={styles.statusBadge} value="Successful" status={"success"} />
          </View>
          :
          <View style={styles.badgeContainer}>
            <Badge containerStyle={styles.statusBadge} value="Failed" status={"warning"} badgeStyle={{ borderRadius: 3 }} />
          </View>
        }
        {
          props.launch.links.flickr_images[0] ?
            <View style={styles.patchContainer}>
              <Image
                source={{ uri: props.launch.links.mission_patch_small }}
                style={styles.patch}
                resizeMode="contain"
              />
            </View>
            :
            null
        }
        <View style={styles.favoriteButtonContainer} >
          <FavoriteShipButton {...props} />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.rocketName}>
          {props.launch.rocket.rocket_name} &bull; {props.launch.launch_site.site_name}
        </Text>
        <Text style={styles.missionName}>
          {props.launch.mission_name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.launchDate}>{formatDateSimple(props.launch.launch_date_utc)} </Text>
          <Text style={styles.timeAgo}>
            {timeAgo(props.launch.launch_date_utc)}
          </Text>
        </View>
      </View>

    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    position: "relative",
    backgroundColor: 'black',
  },
  patchContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    height: 50,
    width: 50,
  },
  patch: {
    // position: 'relative',
    height: 50,
    width: 50,
    zIndex: 20
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  body: {
    padding: 6,
  },
  statusBadge: {
    paddingLeft: 2,
    paddingRight: 2,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1,
  },
  missionName: {
    marginTop: 1,
    color: 'white',
  },
  rocketName: {
    color: 'white',
    marginTop: 2,
    textTransform: "uppercase"
  },
  launchDate: {
    color: 'white'
  },
  timeAgo: {
    color: 'white',
    marginLeft: 2
  },
  favoriteButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
})

export default ShipItem