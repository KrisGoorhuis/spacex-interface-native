import * as React from 'react';
import { StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>

      <ListItem.Accordion>
        <ListItem key={"launchesAccordion"}>
          {
            favoriteLaunches.length > 0 ?
              <ListItem>
                <ListItem.Content>
                  <Text style={styles.title} >
                    Favorite Launches
                  </Text>
                  <ListItem.Chevron />
                </ListItem.Content>
                <ListItem.Accordion>
                  {
                    favoriteLaunches.map((launch, i) => {
                      return (
                        <ListItem key={launch.flight_number + i}>
                          <LaunchItem launch={launch} isDrawerFavorite />
                          {
                            i < favoriteLaunches.length - 1 && favoriteLaunches.length > 0 &&
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
                  No favorite launches yet
                </Text>
              </ListItem>
          }
        </ListItem>

        <Divider style={styles.divider} />

        <ListItem key={"launchPadsAccordion"}>
          {
            favoriteLaunchPads.length > 0 ?
              <ListItem>
                <ListItem.Content>
                  <Text style={styles.title}>
                    Favorite Launch Pads
                  </Text>
                  <ListItem.Chevron />
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

        </ListItem>
      </ListItem.Accordion>

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
    flex: 1,
    textAlign: 'left'
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  },
  marginBottom: {
    marginBottom: 24
  }
});
