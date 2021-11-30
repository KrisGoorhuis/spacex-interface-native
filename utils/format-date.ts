import moment from "moment";
// import { format } from 'date-fns'

export function formatDateSimple(timestamp: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTargetZone(timestamp: string | number | Date) {
  return moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss A ZZ')

  // TODO: Try date-fns replacement
  // return format(new Date(timestamp), 'MMMM Do YYYY, h:mm:ss A ZZ')
}


export function formatDateLong(timestamp: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(new Date(timestamp));
}