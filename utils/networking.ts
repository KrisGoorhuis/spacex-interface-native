import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch, LaunchPad } from "../model"




export const queryLaunches = async (limit: number, offset: number = 0): Promise<any> => {
   console.log("Querying launches")
   const result = await fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=${limit}&order=desc&sort=launch_date_utc&offset=${offset * limit}`)
   const data = await result.json()
   return data
   return {data: data, nextPage: offset + 1}
   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=${limit}&order=desc&sort=launch_date_utc&offset=${offset * limit}`)
      .then((res) => {
         return {
            data: res.json(),
            nextPage: offset + 1
         }
         return res.json()
      })
      .catch(() => {
         // TODO: Handle errors?
      })
}

export const queryLaunch = (launchId: number): Promise<Launch[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/${launchId}`)
      .then((res) => res.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}


export const queryPastLaunches = (launchPadId: number, limit: number, order: string = 'desc'): Promise<LaunchPad[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launchPads/${launchPadId}/past?limit=${limit}&order="${order}"&sort=launch_date_utc&offset=0`)
      .then((res) => res.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}


export const queryLaunchPads = (limit: number): Promise<LaunchPad[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launchpads?limit=${limit}&offset=0`)
      .then((res) => res.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}
