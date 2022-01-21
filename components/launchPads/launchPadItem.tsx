import React from "react";
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-elements";

import { LaunchPad, LaunchPadProps } from "../../model";
import FavoriteLaunchPadButton from "./favoriteLaunchPadButton";
import { BrowserStackParamList } from "../../model/navTypes";
import { StackNavigationProp } from "@react-navigation/stack";

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
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <View style={{ padding: 6 }}>
        <View style={{ display: 'flex', alignItems: 'baseline' }}>
          <View>
            <View style={styles.favoriteButtonContainer} >
              <FavoriteLaunchPadButton {...props} />
            </View>
            {props.launchPad.status === "active" ? (
              <Badge containerStyle={{ paddingLeft: 2, paddingRight: 2 }} >
                Active
              </Badge>
            ) : (
              <Badge containerStyle={{ paddingLeft: 2, paddingRight: 2 }} >
                Retired
              </Badge>
            )}

          </View>
          <Text style={{ marginTop: 2, textTransform: "uppercase" }}>
            {props.launchPad.attempted_launches} attempted &bull;{" "}
            {props.launchPad.successful_launches} succeeded
          </Text>

        </View>

        <Text
          style={{ marginTop: 1, }}
          numberOfLines={3} // TODO: adjust me. Replacement for isTruncated from chakraUI
        >
          {props.launchPad.location.name}
        </Text>
        <Text style={{ color: 'gray' }}>
          {props.launchPad.vehicles_launched.join(", ")}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  favoriteButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
});

export default LaunchPadItem