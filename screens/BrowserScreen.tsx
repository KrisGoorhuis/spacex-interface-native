import * as React from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { BrowserScreenProps } from '../model/navTypes';


export default function BrowserScreen({ navigation }: BrowserScreenProps<'Browser Screen'>) {

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Launches')}>
        <Text>
          Browse Launches
        </Text>
      </Pressable>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Pressable onPress={() => navigation.navigate('Launch Pads')}>
        <Text>
          Browse Launch Pads
        </Text>
      </Pressable>
    </View>
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
