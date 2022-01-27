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


export const queryPastLaunches = async (context: QueryFunctionContext, pageSize: number, site_id: string): Promise<Launch[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/launches/past?limit=${pageSize}&order=desc&sort=launch_date_utc&offset=${offset}&site_id=${site_id}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}


export const queryLaunchPads = (context: QueryFunctionContext, pageSize: number): Promise<LaunchPad[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/launchpads?limit=${pageSize}&offset=${offset}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}


export const queryShips = (context: QueryFunctionContext, pageSize: number): Promise<Launch[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/ships/past?limit=${pageSize}&order=desc&sort=launch_date_utc&offset=${offset}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}

export const queryRoadster = (context: QueryFunctionContext): Promise<Launch[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/roadster`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}

