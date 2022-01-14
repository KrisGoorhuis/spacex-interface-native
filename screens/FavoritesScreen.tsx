import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';

import LaunchItem from '../components/Launches/launchItem';
import LaunchPadItem from '../components/launchPads/launchPadItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../model/navTypes';
import { State } from '../redux';



export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {
  const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
  const favoriteLaunchPads = useSelector((state: State) => state.favorites.favoriteLaunchPads)
  // const defaultIndex = useSelector((state: State) => state.favorites.defaultIndex)

  const [launchesExpanded, setLaunchesExpanded] = React.useState<boolean>(false)
  const [launchPadsExpanded, setLaunchPadsExpanded] = React.useState<boolean>(false)

  return (
    <View style={styles.container}>
      <ListItem.Accordion
        content={
          <>
            <AntDesign size={25} style={styles.icon} name="dingding" />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Favorite Launches</ListItem.Title>
            </ListItem.Content>
          </>
        }
        style={styles.accordion}
        isExpanded={launchesExpanded}
        onPress={() => setLaunchesExpanded(!launchesExpanded)}
      >
        {
          favoriteLaunches.length > 0 ?
            <FlatList
              data={favoriteLaunches}
              contentContainerStyle={styles.interiorList}
              renderItem={({ item, index }) => {
                return (
                  <View key={"favoriteLaunch" + index.toString()} style={{ ...styles.item, width: Dimensions.get('window').width }}>
                    <LaunchItem launch={item} />
                    {
                      (index < favoriteLaunches.length - 1 && favoriteLaunches.length > 0) ?
                        <Divider color="white" style={styles.marginBottom} />
                        :
                        null
                    }
                  </View>
                )
              }}
              keyExtractor={(item, index) => "favorite" + index.toString()}
            />
            // {/* <ListItem.Chevron /> */}
            :
            <Text>
              No favorite launches yet
            </Text>
        }
      </ListItem.Accordion>

      <Divider style={styles.divider} />

      <ListItem.Accordion
        content={
          <>
            <AntDesign size={25} style={styles.icon} name="rest" />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Favorite Launch Pads</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={launchPadsExpanded}
        onPress={() => setLaunchPadsExpanded(!launchPadsExpanded)}
      >
        {
          favoriteLaunchPads.length > 0 ?
            <ListItem>
              <ListItem.Content>
                <Text style={styles.title}>
                  Favorite Launch Pads
                </Text>
                <FlatList
                  data={favoriteLaunchPads}
                  contentContainerStyle={styles.interiorList}
                  renderItem={({ item, index }) => (
                    <View key={item.site_id + index}>
                      <LaunchPadItem launchPad={item} isDrawerFavorite />
                      {
                        (index < favoriteLaunchPads.length - 1 && favoriteLaunchPads.length > 0) ?
                          <Divider style={styles.marginBottom} />
                          :
                          null
                      }
                    </View>
                  )}
                />
              </ListItem.Content>
            </ListItem>
            :
            <ListItem>
              <Text>
                No favorite launch pads yet
              </Text>
            </ListItem>
        }
      </ListItem.Accordion>
    </View >
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    backgroundColor: 'red',
  },
  accordion: {
    // maxHeight:
    width: '100%',
  },
  item: {
    padding: 20
  },
  interiorList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
    backgroundColor: 'blue'
  },
  title: {
    flex: 1,
    textAlign: 'left'
  },
  divider: {
    // marginTop: 10,
    // marginBottom: 10
  },
  marginBottom: {
    // marginBottom: 24,
  },
  icon: {
    paddingRight: 8
  }
});
