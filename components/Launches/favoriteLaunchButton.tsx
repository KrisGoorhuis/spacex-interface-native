import React from 'react'
import { Check, X, Star } from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import { Launch } from '../../model';
import { removeFromFavoriteLaunches, addToFavoriteLaunches } from '../../redux/slices/favoritesSlice';
import { State } from '../../redux';


interface FavoriteLaunchButtonProps {
   launch: Launch
   isDrawerFavorite?: boolean
}

const FavoriteLaunchButton = (props: FavoriteLaunchButtonProps) => {
   const dispatch = useDispatch()
   const [confirming, setConfirming] = React.useState<boolean>(false)

   const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
   const favoriteLaunchNumbers = favoriteLaunches.map((item: Launch) => item.flight_number)
   const isFavorited = favoriteLaunchNumbers.includes(props.launch.flight_number)


   const toggleFavorite = () => {
      if (isFavorited) {
         dispatch(removeFromFavoriteLaunches(props.launch))
      }
      else {
         dispatch(addToFavoriteLaunches(props.launch))
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
      <View>
         {
            confirming ?
            <View style={{ display: 'flex', backgroundColor: 'whitesmoke' }}>
               <Pressable onPress={handleToggleFavorite}>
                  <Check color="greenyellow" />
               </Pressable>
               <Pressable onPress={handleCancel}>
                  <X color="red" />
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
      </View>
   )
}

const styles = StyleSheet.create({
   starContainer: {
      backgroundColor: 'gray',
      padding: 2,
      borderRadius: 999
   }
})

export default FavoriteLaunchButton