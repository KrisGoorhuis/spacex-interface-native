import React from "react"
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
      data-testid={"shipItem"}
      style={styles.container}
    >
      <View>
        <Image
          source={{ uri: props.ship.image }}
          containerStyle={{ height: 200 }}
        />
        {props.ship.active ?
          <View style={styles.badgeContainer}>
            <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.statusBadge} value="Active" status={"primary"} />
          </View>
          :
          <View style={styles.badgeContainer}>
            <Badge badgeStyle={styles.badgeStyle} containerStyle={styles.statusBadge} value="Inactive" status={"warning"} />
          </View>
        }
        <View style={styles.favoriteButtonContainer} >
          <FavoriteShipButton {...props} />
        </View>
      </View>

      <View style={styles.body}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.shipDetail}>{props.ship.ship_name} &bull; </Text>
          <Text style={styles.shipDetail}>{props.ship.ship_type}</Text>
        </View>
        {
          props.ship.roles.length > 0 &&
          <View style={styles.roles}>
            <Text style={styles.roles}>Role(s):</Text>
            {
                <Text style={styles.shipDetail}> {props.ship.roles.join(", ")} </Text>
            }
          </View>
        }

        <View style={{ flexDirection: 'column' }}>
          {
            props.ship.ship_model &&
            <Text style={styles.shipDetail}>Model: {props.ship.ship_model}</Text>
          }
          {
            props.ship.weight_kg &&
            <Text style={styles.shipDetail}>Weight: {props.ship.weight_kg.toLocaleString()} kilograms</Text>
          }
          {
            props.ship.year_built &&
            <Text style={styles.shipDetail}>Built in {props.ship.year_built}</Text>
          }
          {
            props.ship.speed_kn &&
            <Text style={styles.shipDetail}>Speed: {props.ship.speed_kn} knots</Text>
          }
        </View>
      </View>

      {/* name, model */}
      {/* role, active, weight, home port, status,  */}
      {/* url */}
      {/* position map - easy copy/paste */}

      {/* missions */}

      {/* attempted / successful landings - hide if either is null? */}



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
  badgeStyle: {
    borderRadius: 3,
  },
  body: {
    padding: 6,
    color: 'white'
  },
  statusBadge: {
    paddingLeft: 2,
    paddingRight: 2,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 3,
  },
  shipTitle: {
    color: 'white',
    textTransform: "uppercase"
  },
  shipDetail: {
    color: 'white',
  },
  roles: {
    color: 'white',
    flexDirection: 'row',
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