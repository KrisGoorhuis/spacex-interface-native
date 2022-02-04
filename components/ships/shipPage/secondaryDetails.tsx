import React from "react"
import { ListItem } from "react-native-elements"
import { Clipboard } from "react-native-feather"
import { Linking, StyleSheet, Text } from 'react-native'

import { Ship } from "../../../model"
import { iconSize } from "../../../model/constants"



interface SecondaryDetailsProps {
   ship: Ship
}

const SecondaryDetails = (props: SecondaryDetailsProps) => {

   return (
      <ListItem containerStyle={styles.listItem}>
         <Clipboard color="black" width={iconSize} height={iconSize} />
         <ListItem.Content style={styles.content}>
            {/* <ListItem.Title>
               Mixed available data
            </ListItem.Title> */}
            {
               props.ship.ship_model &&
               <ListItem.Subtitle>
                  Model: {props.ship.ship_model}
               </ListItem.Subtitle>
            }
            {
               props.ship.weight_kg && props.ship.weight_lbs &&
               <ListItem.Subtitle>
                  Weight: {props.ship.weight_kg} kgs / {props.ship.weight_lbs} lbs
               </ListItem.Subtitle>
            }
            {
               props.ship.ship_model &&
               <ListItem.Subtitle>
                  {props.ship.ship_model}
               </ListItem.Subtitle>
            }
            {
               props.ship.home_port &&
               <ListItem.Subtitle>
                  Home port: {props.ship.home_port}
               </ListItem.Subtitle>
            }
            {
               props.ship.roles.length > 0 &&
               <ListItem.Subtitle style={styles.roles}>
                  <Text>Role(s):</Text>
                  <Text style={styles.shipDetail}> {props.ship.roles.join(", ")} </Text>
               </ListItem.Subtitle>
            }
            {
               props.ship.attempted_landings && props.ship.attempted_landings > 0 &&
               <ListItem.Subtitle>
                  <Text>Landing successes: {props.ship.successful_landings}/{props.ship.attempted_landings}</Text>
               </ListItem.Subtitle>
            }
            {
               props.ship.url &&
               <ListItem.Subtitle style={{ textDecorationLine: 'underline' }} onPress={() => Linking.openURL(props.ship.url)}>
                  MarineTraffic.com link
               </ListItem.Subtitle>
            }
         </ListItem.Content>
      </ListItem>
   )
}

const styles = StyleSheet.create({
   listItem: {
      paddingTop: 5,
      paddingBottom: 5,
   },
   content: {
      fontSize: 20,
   },
   shipDetail: {
      color: 'rgba(0, 0, 0, 0.54)',
   },
   roles: {
      color: 'rgba(0, 0, 0, 0.54)',
      flexDirection: 'row',
   },
})

export default SecondaryDetails