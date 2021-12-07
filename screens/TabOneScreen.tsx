import * as React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch } from '../model';
import LaunchItem from '../components/Launches/launchItem';
import { SpaceXSections } from '../model/constants';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Pressable
          onPress={() => navigation.navigate('LaunchScrollScreen')}

        >
          <Text>
            Browse Launches
          </Text>
        </Pressable>
        {/* <Pressable 
          onPress={() => navigation.navigate('LaunchPageScroll')}

        >
          Launch Pads!
        </Pressable> */}
        {/* {
          presentlyNavigating === SpaceXSections.launches &&

        } */}
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
