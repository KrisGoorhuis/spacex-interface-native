import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { QueryFunctionContext } from "react-query"

import { Launch, LaunchPad, Mission, Roadster, Ship } from "../model"


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


// Launch Pads
export const queryLaunchPads = (context: QueryFunctionContext, pageSize: number): Promise<LaunchPad[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/launchpads?limit=${pageSize}&offset=${offset}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}

export const querySingleLaunchPad = (context: QueryFunctionContext, landingPadId: string): Promise<LaunchPad> => {

   return fetch(`${REACT_APP_SPACEX_API_URL}/launchpads/${landingPadId}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}


// Ships
export const queryShips = (context: QueryFunctionContext, pageSize: number): Promise<Ship[]> => {
   const offset = context.pageParam | 0

   return fetch(`${REACT_APP_SPACEX_API_URL}/ships?limit=${pageSize}&order=desc&offset=${offset}`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}


// Missions
export const queryMissions = (context: QueryFunctionContext, pageSize: number): Promise<Mission[]> => {
   const offset = context.pageParam | 0

   return fetch(`https://api.spacexdata.com/v3/missions`)
      // return fetch(`${REACT_APP_SPACEX_API_URL}/missions/?limit=${pageSize}&order=desc&offset=${offset}`)
      .then((response) => {
         console.log("response.json()")
         console.log(response.json())
         console.log("response")
         console.log(response)
         console.log("after")
         return response.json()
      })
      .catch((error) => console.log(error))
}


// Roadster
export const queryRoadster = (context: QueryFunctionContext): Promise<Roadster> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}/roadster`)
      .then((response) => response.json())
      .catch((error) => console.log(error))
}

