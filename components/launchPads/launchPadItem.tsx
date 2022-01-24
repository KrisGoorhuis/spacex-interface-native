import React from "react";
import { Pressable, StyleSheet, View, Text, Dimensions } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";

import { LaunchPad, LaunchPadProps } from "../../model";
import FavoriteLaunchPadButton from "./favoriteLaunchPadButton";
import { BrowserStackParamList } from "../../model/navTypes";

interface launchPadItemProps extends LaunchPadProps {
  launchPad: LaunchPad
  isDrawerFavorite?: boolean
}

const LaunchPadItem = (props: launchPadItemProps) => {
  const navigation = useNavigation<StackNavigationProp<BrowserStackParamList>>();

  return (
    <Pressable
      onPress={() => navigation.navigate('Launch Pad', { launchPad: props.launchPad })}
      data-testid={"launchItem"}
      style={styles.container}
    >
      <View style={styles.topLine}>
        {props.launchPad.status === "active" ? (
          <View style={styles.badgeContainer}>
            <Badge containerStyle={styles.statusBadge} value="Active" status="success" />
          </View>
        ) : (
          <View style={styles.badgeContainer}>
            <Badge containerStyle={styles.statusBadge} value="Retired" status="warning" />
          </View>
        )}
        <Text style={styles.launchText}>
          {props.launchPad.attempted_launches} attempted &bull;{" "}
          {props.launchPad.successful_launches} succeeded
        </Text>
        <View style={styles.favoriteButtonContainer} >
          <FavoriteLaunchPadButton {...props} />
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
  );
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
  favoriteButtonContainer: {

  },
  badgeContainer: {

  },
  statusBadge: {
    padding: 5,
    paddingLeft: 0,
    display: 'flex',
    alignItems: 'center'
  },
});

export default LaunchPadItem