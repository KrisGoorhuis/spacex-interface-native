import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch, LaunchPad } from "../model"




export const queryLaunches = async (context: any, pageSize: number): Promise<any> => {
   console.log("fetching?")
   console.log("context")
   console.log(context)
   console.log("context.pageParams")
   console.log(context.pageParam)

   const offset = context.pageParam | 0

   console.log('offset')
   console.log(offset)
   const result = fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=${pageSize}&order=desc&sort=launch_date_utc&offset=${offset}`)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      return result
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
