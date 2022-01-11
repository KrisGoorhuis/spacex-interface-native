import moment from "moment";
import 'intl'
import 'intl/locale-data/jsonp/en-CA'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { DateTime } from 'luxon'

// import { format } from 'date-fns'

export function formatDateSimple(timestamp: string | number | Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(timestamp));
}

export function formatDateTargetZone(timestamp: string) {
  console.log("DateTime.fromISO(timestamp, { setZone: true }).toFormat('MMMM dd yyyy, h:mm:ss a ZZ')");
  console.log(DateTime.fromISO(timestamp, { setZone: true }).toFormat('MMMM dd yyyy, h:mm:ss a ZZ'));
  console.log("moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss A ZZ')");
  console.log(moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss A ZZ'));
console.log("---")
  return
  return moment.parseZone(timestamp).format('MMMM Do YYYY, h:mm:ss A ZZ')

  // TODO: Try date-fns replacement
  // return format(new Date(timestamp), 'MMMM Do YYYY, h:mm:ss A ZZ')
}