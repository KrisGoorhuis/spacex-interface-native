import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import LaunchItem from '../components/Launches/launchItem';
import LaunchPadItem from '../components/launchPads/launchPadItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../model/navTypes';
import { State } from '../redux';



export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {
  const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
  const favoriteLaunchPads = useSelector((state: State) => state.favorites.favoriteLaunchPads)
  const defaultIndex = useSelector((state: State) => state.favorites.defaultIndex)
  const dispatch = useDispatch()

  const [launchesExpanded, setLaunchesExpanded] = React.useState<boolean>(false)
  const [launchPadsExpanded, setLaunchPadsExpanded] = React.useState<boolean>(false)

  console.log("favoriteLaunches")
  console.log(favoriteLaunches)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <ListItem.Accordion
        content={
          <>
            <Icon name="place" size={30} />
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
      >
        {list2.map((l, i) => (
          <ListItem key={i} onPress={log} bottomDivider>
            <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion> */}

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
            <ListItem>
              <ListItem.Content>

              </ListItem.Content>
              <ListItem.Title>
                <Text style={styles.title} >
                  Favorite Launches
                </Text>
              </ListItem.Title>
              <Text>List</Text>
              {
                favoriteLaunches.map((launch, i) => {
                  return (
                    <ListItem key={launch.flight_number + i + "favorite"}>
                      <LaunchItem launch={launch} isDrawerFavorite />
                      {
                        i < favoriteLaunches.length - 1 && favoriteLaunches.length > 0 &&
                        <Divider style={styles.marginBottom} />
                      }
                    </ListItem>
                  )
                })
              }
              <ListItem.Chevron />
            </ListItem>
            :
            <ListItem.Title>
              No favorite launches yet
            </ListItem.Title>
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
              </ListItem.Content>
              <ListItem.Accordion>
                {
                  favoriteLaunchPads.map((launchPad, i) => {
                    return (
                      <ListItem key={launchPad.site_id + i}>
                        <LaunchPadItem launchPad={launchPad} isDrawerFavorite />
                        {
                          i < favoriteLaunchPads.length - 1 && favoriteLaunchPads.length > 0 &&
                          <Divider style={styles.marginBottom} />
                        }
                      </ListItem>
                    )
                  })
                }
              </ListItem.Accordion>
            </ListItem>
            :
            <ListItem>
              <Text>
                No favorite launch pads yet
              </Text>
            </ListItem>
        }

      </ListItem.Accordion>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accordion: {
    // flex: 1,
  },
  title: {
    flex: 1,
    textAlign: 'left'
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  marginBottom: {
    marginBottom: 24
  },
  icon: {
    paddingRight: 8
  }
});
