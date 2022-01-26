import { exampleLaunch } from '../../model/Examples/example-launch'
import { exampleLaunchPad } from '../../model/Examples/example-launch-pad'
import slice, { addToFavoriteLaunches, addToFavoriteLaunchPads, FavoritesDataSlice, initialFavoritesState } from './favoritesSlice'


test('should return the initial state', () => {
   expect(slice.reducer(undefined, { type: '' })).toEqual(initialFavoritesState)
})

test('should handle a launch being added to an empty list', () => {
   const previousState: FavoritesDataSlice = initialFavoritesState
   expect(slice.reducer(previousState, addToFavoriteLaunches(exampleLaunch)).favoriteLaunches).toEqual([
      exampleLaunch
   ])
})

test('should handle a launch being added to an existing list', () => {
   const previousState: FavoritesDataSlice = { ...initialFavoritesState, favoriteLaunches: [exampleLaunch] }
   expect(slice.reducer(previousState, addToFavoriteLaunches(exampleLaunch)).favoriteLaunches).toEqual([
      exampleLaunch,
      exampleLaunch
   ])
})

test('should handle a launch pad being added to an empty list', () => {
   const previousState: FavoritesDataSlice = initialFavoritesState
   expect(slice.reducer(previousState, addToFavoriteLaunchPads(exampleLaunchPad)).favoriteLaunchPads).toEqual([
      exampleLaunchPad
   ])
})
test('should handle a launch pad being added to an existing list', () => {
   const previousState: FavoritesDataSlice = { ...initialFavoritesState, favoriteLaunchPads: [exampleLaunchPad] }
   expect(slice.reducer(previousState, addToFavoriteLaunchPads(exampleLaunchPad)).favoriteLaunchPads).toEqual([
      exampleLaunchPad,
      exampleLaunchPad
   ])
})