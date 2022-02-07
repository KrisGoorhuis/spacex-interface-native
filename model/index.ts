import { exampleLaunch } from "./Examples/example-launch";
import { exampleLaunchPad } from "./Examples/example-launch-pad";
import { exampleMission } from "./Examples/example-mission"
import { exampleRoadster } from "./Examples/example-roadster";
import { exampleShip } from "./Examples/example-ship";

export interface BreadcrumbObject {
   label: string
   to?: string
}

export interface LaunchPadProps {
   launchPad: LaunchPad
}

export interface LaunchProps {
   launch: Launch
}

// Our type cheat doesn't work with empty arrays, so we'll replace 'never[]'
interface UpdatedLinks extends Omit<typeof exampleLaunch.links, 'flickr_images'> {
   flickr_images: string[]
}

export interface Launch extends Omit<typeof exampleLaunch, 'links'> { 'links': UpdatedLinks }
export type LaunchPad = typeof exampleLaunchPad
export type Mission = typeof exampleMission
export type Ship = typeof exampleShip
export type Roadster = typeof exampleRoadster