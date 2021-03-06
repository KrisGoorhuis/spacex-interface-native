import React from 'react'
import { Check, X, Star } from "react-native-feather"
import { useDispatch, useSelector } from 'react-redux'
import { Pressable, StyleSheet } from 'react-native'

import { removeFromFavoriteLaunchPads, addToFavoriteLaunchPads } from '../../redux/slices/favoritesSlice'
import { State } from '../../redux'
import { LaunchPad } from '../../model'
import { View } from '../Themed'


interface FavoriteLaunchPadButtonProps {
   launchPad: LaunchPad
   isDrawerFavorite?: boolean
}

const FavoriteLaunchPadButton = (props: FavoriteLaunchPadButtonProps) => {
   const dispatch = useDispatch()
   const [confirming, setConfirming] = React.useState<boolean>(false)

   const favoriteLaunchPads = useSelector((state: State) => state?.favorites?.favoriteLaunchPads)
   const favoriteLaunchPadNumbers = favoriteLaunchPads.map((item: LaunchPad) => item.site_id)
   const isFavorited = favoriteLaunchPadNumbers.includes(props.launchPad.site_id)


   const toggleFavorite = () => {
      if (isFavorited) {
         dispatch(removeFromFavoriteLaunchPads(props.launchPad))
      }
      else {
         dispatch(addToFavoriteLaunchPads(props.launchPad))
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

export default FavoriteLaunchPadButton