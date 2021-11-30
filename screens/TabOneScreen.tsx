import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch } from '../model';
import LaunchItem from '../components/Launches/launchItem';



export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const { isLoading, isError, error, data } = useQuery<Launch[], {message: string}>('launches', () => fetch(`${REACT_APP_SPACEX_API_URL}`).then((res) => res.json()))

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError && error) {
    return <span>Error: {error.message}</span>
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        {
          data &&
          data.map((launchItem: Launch) => {
            return <LaunchItem key={launchItem.flight_number} launch={launchItem} />
          })
        }
      </View>
      <Text style={styles.title}>Tab One</Text>
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
