import React from "react"
import { ListItem } from "react-native-elements"
import { Bookmark } from "react-native-feather"
import { StyleSheet } from 'react-native'

import { Ship } from "../../../model"
import { iconSize } from "../../../model/constants"



interface PrimaryDetailsProps {
   ship: Ship
}

const PrimaryDetails = (props: PrimaryDetailsProps) => {

   return (
      <ListItem containerStyle={styles.listItem}>
         <Bookmark color="black" width={iconSize} height={iconSize} />
         <ListItem.Content style={styles.content}>
            <ListItem.Title>
               {props.ship.ship_name}
            </ListItem.Title>
            <ListItem.Subtitle>
               {props.ship.ship_type}
            </ListItem.Subtitle>
            {
               props.ship.ship_model &&
               <ListItem.Subtitle>
                  {props.ship.ship_model}
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
   }
})

export default PrimaryDetails