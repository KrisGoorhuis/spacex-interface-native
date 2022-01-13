import 'intl'
import 'intl/locale-data/jsonp/en-CA'
import { DateTime } from 'luxon'


export function formatDateSimple(timestamp: string) {
  return DateTime.fromISO(timestamp, { setZone: true }).toFormat('LLL dd yyyy')
}

export function formatDateTargetZone(timestamp: string) {
  return DateTime.fromISO(timestamp, { setZone: true }).toFormat('MMMM dd yyyy, h:mm:ss a ZZ')
}