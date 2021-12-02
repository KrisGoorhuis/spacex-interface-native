import React from "react";
import { StyleSheet, View } from 'react-native';

import FavoriteLaunchPadButton from "../favoriteLaunchPadButton";
import { LaunchPad as LaunchPadType } from '../../../model/index'


function LaunchPadHeader(props: { launchPad: LaunchPadType }) {

   const randomColor = (start = 200, end = 250) =>
      `hsl(${start + end * Math.random()}, 80%, 90%)`;
   const styles = StyleSheet.create({
      container: {
         background
      }
   })


   // withbackground component. Wraps the rest. Used it elsewhere. 
   return (
      <View
         background={`linear-gradient(${randomColor()}, ${randomColor()})`}
         bgPos="center"
         bgSize="cover"
         bgRepeat="no-repeat"
         minHeight="15vh"
         position="relative"
         flexDirection={["column", "row"]}
         p={[2, 6]}
         alignItems="flex-end"
         justifyContent="space-between"
      >
         <Heading
            color="gray.900"
            display="inline"
            mx={[2, 4]}
            my="2"
            fontSize={["md", "3xl"]}
            borderRadius="lg"
         >
            {props.launchPad.site_name_long}
         </Heading>
         <Stack isInline spacing="3" display="flex" alignItems="center" justifyContent="center">
            <FavoriteLaunchPadButton {...props} />
            <Badge colorScheme="purple" fontSize={["sm", "md"]}>
               {props.launchPad.successful_launches}/{props.launchPad.attempted_launches}{" "}
               successful
            </Badge>
            {props.launchPad.status === "active" ? (
               <Badge colorScheme="green" fontSize={["sm", "md"]}>
                  Active
               </Badge>
            ) : (
               <Badge colorScheme="red" fontSize={["sm", "md"]}>
                  Retired
               </Badge>
            )}
         </Stack>
      </View>
   );
}



export default LaunchPadHeader