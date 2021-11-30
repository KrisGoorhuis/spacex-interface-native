import { REACT_APP_SPACEX_API_URL } from "react-native-dotenv"
import { Launch } from "../model"

export const queryLaunches = (): Promise<Launch[]> => {
   return fetch(`${REACT_APP_SPACEX_API_URL}`)
      .then((res) => res.json())
      .catch(() => {
         // TODO: Handle errors?
      })
}
