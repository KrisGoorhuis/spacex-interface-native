import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch, LaunchPad } from "../model"

export const queryLaunches = (): Promise<Launch[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=12&order=desc&sort=launch_date_utc&offset=0`)
      .then((res) => res.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}


export const queryLaunchPads = (launchPadId): Promise<LaunchPad[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launchPads/${launchPadId}/past?limit=3&order="desc"&sort=launch_date_utc&offset=0`)
   .then((res) => res.json())
   .catch(() => {
      // TODO: Handle errors?
   })
}