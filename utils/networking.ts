import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { QueryFunctionContext } from "react-query"
import { Launch, LaunchPad } from "../model"


export const queryLaunches = async (context: QueryFunctionContext, pageSize: number): Promise<Launch[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=${pageSize}&order=desc&sort=launch_date_utc&offset=${offset}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}

export const queryLaunch = (context: QueryFunctionContext, launchId: number): Promise<Launch> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/${launchId}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}


export const queryPastLaunches = (context: QueryFunctionContext, launchPadId: number, pageSize: number, order: string = 'desc'): Promise<Launch[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launchPads/${launchPadId}/past?limit=${pageSize}&order="${order}"&sort=launch_date_utc&offset=0`)
      .then((response) => response.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}


export const queryLaunchPads = (context: QueryFunctionContext, pageSize: number): Promise<LaunchPad[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/launchpads?limit=${pageSize}&offset=0`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}
