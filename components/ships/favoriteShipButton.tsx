import React from 'react'
import { Check, X, Star } from "react-native-feather"
import { useDispatch, useSelector } from 'react-redux'
import { Pressable, StyleSheet } from 'react-native'

import { removeFromFavoriteShips, addToFavoriteShips } from '../../redux/slices/favoritesSlice'
import { State } from '../../redux'
import { Ship } from '../../model'
import { View } from '../Themed'


interface FavoriteShipButton {
   ship: Ship
   isDrawerFavorite?: boolean
}

const FavoriteShipButton = (props: FavoriteShipButton) => {
   const dispatch = useDispatch()
   const [confirming, setConfirming] = React.useState<boolean>(false)

   const favoriteShips = useSelector((state: State) => state?.favorites?.favoriteShips)
   const favoriteMissionNumbers = favoriteShips.map((item: Ship) => item.ship_id)
   const isFavorited = favoriteMissionNumbers.includes(props.ship.ship_id)


   const toggleFavorite = () => {
      if (isFavorited) {
         dispatch(removeFromFavoriteShips(props.ship))
      }
      else {
         dispatch(addToFavoriteShips(props.ship))
      }
   }

   const handleToggleFavorite = (e: any) => { // Event typing 
      e.stopPropagation() // Prevent parent's onclick

      if (props.isDrawerFavorite && !confirming) { // Non drawer favorites and confirmation clicks will bypass
         setConfirming(true)
      }
      else toggleFavorite()
   }

   const handleCancel = (e: any) => {
      e.stopPropagation()

      setConfirming(false)
   }

   return (
      <>
         {
            confirming ?
            <View style={{ display: 'flex',  }}> 
               <Pressable onPress={handleToggleFavorite}>
                  <Check color="#1dbf04" />
               </Pressable>
               <Pressable onPress={handleCancel}>
                  <X color='red' />
               </Pressable>
            </View>
            : 
            null
         }
         {
            !confirming ?
            <Pressable onPress={handleToggleFavorite} style={styles.starContainer}>
               <Star color={isFavorited ? 'gold' : 'darkgray'} />
            </Pressable>
            :
            null
         }
      </>
   )
}

const styles = StyleSheet.create({
   starContainer: {
      backgroundColor: 'gray',
      padding: 2,
      borderRadius: 999
   }
})

export default FavoriteShipButton
