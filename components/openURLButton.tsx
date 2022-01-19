import React, { useCallback } from "react";
import { Linking, Alert, Pressable, StyleSheet } from "react-native";

// Via the docs
const OpenURLButton = ({ url, children }: any) => {
  console.log("url")
  console.log(url)

   const handlePress = useCallback(async () => {
     // Checking if the link is supported for links with custom URL scheme.
     const supported = await Linking.canOpenURL(url);
    console.log("supported")
    console.log(supported)

     if (supported) {
       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
       // by some browser in the mobile
       await Linking.openURL(url);
      } else {
       await Linking.openURL(url);
       Alert.alert(`Don't know how to open this URL: ${url}`);
     }
   }, [url]);
 
   return <Pressable style={styles.button} onPress={handlePress}>{children}</Pressable>;
 };


 const styles = StyleSheet.create({
   button: {
     minWidth: 350
   },
 });
 
 export default OpenURLButton