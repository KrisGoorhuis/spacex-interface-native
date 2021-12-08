import React from 'react'
import { Check, X, Star } from "react-feather";
import { useDispatch, useSelector } from 'react-redux';

import { removeFromFavoriteLaunchPads, addToFavoriteLaunchPads } from '../../redux/slices/favoritesSlice';
import { State } from '../../redux';
import { LaunchPad } from '../../model';
import { Badge } from 'react-native-elements';
import { View } from '../Themed';
import { Pressable } from 'react-native';


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
      <View style={{ padding: 2 }}>
         {
            confirming &&
            <View style={{ display: 'flex', backgroundColor: 'whitesmoke' }}>
               <Pressable onPress={handleToggleFavorite}>
                  <Check style={{ color: '#1dbf04', position: 'relative' }} />
               </Pressable>
               <Pressable onPress={handleCancel}>
                  <X style={{ color: 'red', position: 'relative' }} />
               </Pressable>
            </View>
         }
         {
            !confirming &&
            <Pressable onPress={handleToggleFavorite}>
               <Star style={{ color: isFavorited ? 'gold' : 'darkgray', position: 'relative', backgroundColor: 'whitesmoke' }} />
            </Pressable>
         }
      </View>
   )
}

export default FavoriteLaunchPadButton