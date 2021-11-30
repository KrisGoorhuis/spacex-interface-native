import React from 'react'
import { Check, X, Star } from "react-feather";
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-native-elements'

import { Launch } from '../../model';
import { removeFromFavoriteLaunches, addToFavoriteLaunches } from '../../redux/slices/favoritesSlice';
import { State } from '../../redux';
import { View } from 'react-native';


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
      e.preventDefault() // Prevent parent's onclick

      if (props.isDrawerFavorite && !confirming) { // Non drawer favorites and confirmation clicks will bypass
         setConfirming(true)
      }
      else toggleFavorite()
   }

   const handleCancel = (e: any) => {
      e.preventDefault()

      setConfirming(false)
   }


   return (
      <Badge containerStyle={{padding: '2px'}}>
         {
            confirming &&
            <View style={{display: 'flex', backgroundColor: 'whitesmoke'}}>
               {/* <View
                  style={{position: 'relative' }}
                  as={}
                  onClick={handleToggleFavorite}
               /> */}
               <Check color="greenyellow" onClick={handleToggleFavorite} />
               {/* <View
                  style={{ color: 'red', position: 'relative' }}
                  as={X}
                  onClick={handleCancel}
               /> */}
               <X color="red" onClick={handleCancel} />
            </View>
         }
         {
            !confirming &&
            // <View
            //    backgroundColor="whitesmoke"
            //    padding="2px"
            //    style={{ color: isFavorited ? 'gold' : 'darkgray', position: 'relative' }}
            //    as={Star}
            //    onClick={handleToggleFavorite}
            // />
            <Star color={isFavorited ? 'gold' : 'darkgray'} onClick={handleToggleFavorite} />

         }
      </Badge>
   )
}

export default FavoriteLaunchButton