import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet } from 'react-native';
import { Divider, ListItem } from 'react-native-elements';
import { Droplet } from 'react-native-feather';
import { useSelector } from 'react-redux';

import LaunchItem from '../components/Launches/launchItem';
import LaunchPadItem from '../components/launchPads/launchPadItem';
import ShipItem from '../components/ships/shipItem';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../model/navTypes';
import { State } from '../redux';



export default function FavoritesScreen({ navigation }: RootTabScreenProps<'Favorites'>) {
   const favoriteLaunches = useSelector((state: State) => state.favorites.favoriteLaunches)
   const favoriteLaunchPads = useSelector((state: State) => state.favorites.favoriteLaunchPads)
   const favoriteShips = useSelector((state: State) => state.favorites.favoriteShips)
   // const defaultIndex = useSelector((state: State) => state.favorites.defaultIndex)

   const [launchesExpanded, setLaunchesExpanded] = React.useState<boolean>(false)
   const [launchPadsExpanded, setLaunchPadsExpanded] = React.useState<boolean>(false)
   const [shipsExpanded, setShipsExpanded] = React.useState<boolean>(false)

   return (
      <ScrollView style={styles.container}>
         <ListItem.Accordion
            content={
               <>
                  <AntDesign size={25} style={styles.icon} name="rocket1" />
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
                  <View style={styles.interiorList}>
                     {
                        favoriteLaunches.map((item, index) => {

                           return (
                              <View key={"favoriteLaunch" + index.toString()} style={{ ...styles.item, width: Dimensions.get('window').width }}>
                                 <LaunchItem launch={item} />
                                 {
                                    (index < favoriteLaunches.length - 1 && favoriteLaunches.length > 0) ?
                                       <Divider color="white" />
                                       :
                                       null
                                 }
                              </View>
                           )
                        })
                     }
                  </View>
                  // <FlatList
                  //    data={favoriteLaunches}
                  //    contentContainerStyle={styles.interiorList}
                  //    renderItem={({ item, index }) => {
                  //       return (
                  //          <View key={"favoriteLaunch" + index.toString()} style={{ ...styles.item, width: Dimensions.get('window').width }}>
                  //             <LaunchItem launch={item} />
                  //             {
                  //                (index < favoriteLaunches.length - 1 && favoriteLaunches.length > 0) ?
                  //                   <Divider color="white" />
                  //                   :
                  //                   null
                  //             }
                  //          </View>
                  //       )
                  //    }}
                  //    keyExtractor={(item, index) => "favorite" + index.toString()}
                  // />
                  :
                  <Text style={styles.noItems}>
                     No favorite launches yet
                  </Text>
            }
         </ListItem.Accordion>

         <Divider />

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
                  <View style={styles.interiorList}>
                     {
                        favoriteLaunchPads.map((item, index) => {
                           return (
                              <View key={item.site_id + index}>
                                 <LaunchPadItem launchPad={item} isDark />
                                 {
                                    (index < favoriteLaunchPads.length - 1 && favoriteLaunchPads.length > 0) ?
                                       <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                                       :
                                       null
                                 }
                              </View>
                           )
                        })
                     }
                  </View>
                  :
                  <Text style={styles.noItems}>
                     No favorite launch pads yet
                  </Text>
            }
         </ListItem.Accordion>

         <Divider />

         <ListItem.Accordion
            content={
               <>
                  <Droplet style={{ ...styles.icon, marginRight: 10 }} color="black" />
                  <ListItem.Content>
                     <ListItem.Title style={styles.title}>Favorite Ships</ListItem.Title>
                  </ListItem.Content>
               </>
            }
            style={styles.accordion}
            isExpanded={shipsExpanded}
            onPress={() => setShipsExpanded(!shipsExpanded)}
         >
            {
               favoriteShips && favoriteShips.length > 0 ?
                  favoriteShips.map((ship, index) => {

                     return (
                        <View key={"favoriteShip" + index.toString()} style={{ ...styles.item, width: Dimensions.get('window').width }}>
                           <ShipItem ship={ship} />
                           {
                              (index < favoriteShips.length - 1 && favoriteShips.length > 0) ?
                                 <Divider color="white" />
                                 :
                                 null
                           }
                        </View>
                     )
                  })
                  :
                  <Text style={styles.noItems}>
                     No favorite ships yet
                  </Text>
            }
         </ListItem.Accordion>

      </ScrollView>
   );
}


const styles = StyleSheet.create({
   container: {
      width: '100%',
   },
   accordion: {
      width: '100%',
   },
   item: {
      padding: 20
   },
   noItems: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
      height: 30,
      backgroundColor: 'white',
   },
   interiorList: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingBottom: 20
   },
   title: {
      flex: 1,
      textAlign: 'left'
   },
   icon: {
      paddingRight: 8
   }
});
