import {
   addDays,
   addBusinessDays,
   addMonths,
   format,
   getUnixTime,
   isBefore,
   isValid,
   lastDayOfMonth,
   parseISO,
   startOfDay,
   startOfMonth,
   subHours,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { TZDate } from '@date-fns/tz'
import { CalendarDate, Time, type DateValue } from '@internationalized/date'

import { setStringToCapital } from './format-utils'

const MILLISECONDS_PER_SECOND = 1000
const MINUTES_PER_DAY = 24 * 60
const SECONDS_PER_DAY = 24 * 60 * 60
const SECONDS_PER_MINUTE = 60

const weekdayIds = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

const openclawDatetimeFormatter = new Intl.DateTimeFormat('en-US', {
   day: '2-digit',
   hour: '2-digit',
   hour12: false,
   minute: '2-digit',
   month: '2-digit',
   weekday: 'short',
   year: 'numeric',
})

function getNowDate(): Date {
   return new TZDate(new Date(), 'America/Sao_Paulo')
}

function getNowSeconds() {
   return getUnixTime(getNowDate())
}

function getNowMinutes() {
   return Math.floor(getNowSeconds() / 60)
}

function getNowMilliseconds(): number {
   return getNowSeconds() * 1000
}

function getNowSupabase(): string {
   return formatDate(getNowDate(), "yyyy-MM-dd'T'HH:mm:ss.SSS")
}

function getCurrentYear(): number {
   return getNowDate().getFullYear()
}

function getDateFromUnixSeconds(unixSeconds: number): Date {
   return new TZDate(unixSeconds * MILLISECONDS_PER_SECOND, 'America/Sao_Paulo')
}

function getUnixSeconds(date: Date): number {
   return getUnixTime(date)
}

function getUnixMidnightOfDay(unixSeconds: number): number {
   return getUnixTime(startOfDay(getDateFromUnixSeconds(unixSeconds)))
}

function getUnixMidnightOfToday(): number {
   return getUnixTime(startOfDay(getNowDate()))
}

function getUnixMidnightWithOffset(offset: number): number {
   return getUnixTime(addDays(startOfDay(getNowDate()), offset))
}

function getNextDayUnixMidnight(unixSeconds: number): number {
   return getUnixTime(startOfDay(addDays(getDateFromUnixSeconds(unixSeconds), 1)))
}

function getUnixEndOfDay(unixSeconds: number): number {
   return getUnixMidnightOfDay(unixSeconds) + SECONDS_PER_DAY - 1
}

function getUnixWeekdayNumber(unixSeconds: number): number {
   return getDateFromUnixSeconds(unixSeconds).getDay()
}

function getUnixNumberDay(unixSeconds: number): number {
   return getDateFromUnixSeconds(unixSeconds).getDay()
}

function addBusinessDaysToUnixSeconds(
   unixSeconds: number,
   businessDays: number,
): number {
   return getUnixSeconds(
      addBusinessDays(getDateFromUnixSeconds(unixSeconds), businessDays),
   )
}

function getMinutesOfDay(unixSeconds: number): number {
   return Math.floor(
      (unixSeconds - getUnixMidnightOfDay(unixSeconds)) / SECONDS_PER_MINUTE,
   )
}

function getUnixDayKey(unixSeconds: number): string {
   return formatDate(
      getDateFromUnixSeconds(getUnixMidnightOfDay(unixSeconds)),
      'yyyy_MM_dd',
   )
}

function getTodayUnixDayKey(): string {
   return getUnixDayKey(getNowSeconds())
}

function getDateFromDateValue(date: DateValue): Date {
   return new Date(date.year, date.month - 1, date.day)
}

function getDateValueUnixSeconds(date: DateValue): number {
   return getUnixSeconds(getDateFromDateValue(date))
}

function getCalendarDate(date: Date): CalendarDate {
   return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

function getNowCalendarDate(): CalendarDate {
   return getCalendarDate(getNowDate())
}

function getCalendarMonthStart(date: Date): CalendarDate {
   return getCalendarDate(startOfMonth(date))
}

function getNextCalendarMonthEnd(date: Date): CalendarDate {
   return getCalendarDate(lastDayOfMonth(addMonths(date, 1)))
}

function isDateValueBeforeToday(date: DateValue): boolean {
   return isBefore(getDateFromDateValue(date), startOfDay(getNowDate()))
}

function parseShortHourToMinutes(HHmm: string): number {
   if (HHmm === '24:00') {
      return MINUTES_PER_DAY
   }

   const parts = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(HHmm)
   if (!parts) {
      throw new Error(`Invalid HH:mm string: ${HHmm}`)
   }
   return Number(parts[1]) * 60 + Number(parts[2])
}

function formatMinutesToTime(minutes: number): Time {
   const hour = Math.floor(minutes / 60) % 24
   const minute = minutes % 60
   return new Time(hour, minute)
}

function formatTimeToMinutes(time: Time): number {
   return time.hour * 60 + time.minute
}

function formatMinutesToShortHour(minutesOfDay: number): string {
   if (
      !Number.isInteger(minutesOfDay) ||
      minutesOfDay < 0 ||
      minutesOfDay > MINUTES_PER_DAY
   ) {
      throw new Error(`Invalid minutesOfDay: ${minutesOfDay}`)
   }

   if (minutesOfDay === MINUTES_PER_DAY) {
      return '24:00'
   }

   const hh = String(Math.floor(minutesOfDay / 60)).padStart(2, '0')
   const mm = String(minutesOfDay % 60).padStart(2, '0')
   return `${hh}:${mm}h`
}

function formatDateToWeekdayId(date: Date): (typeof weekdayIds)[number] {
   if (!isValid(date)) {
      throw new Error('Invalid date')
   }

   return weekdayIds[date.getDay()]!
}

function formatDateToBotDate(date: Date, includeTime = false): string {
   if (!isValid(date)) {
      throw new Error('Invalid date')
   }

   const dow = formatDateToWeekdayId(date)
   const y = date.getFullYear()
   const m = String(date.getMonth() + 1).padStart(2, '0')
   const d = String(date.getDate()).padStart(2, '0')

   if (includeTime) {
      const hh = String(date.getHours()).padStart(2, '0')
      const mm = String(date.getMinutes()).padStart(2, '0')
      return `[${dow} ${y}-${m}-${d} ${hh}:${mm}]`
   }

   return `[${dow} ${y}-${m}-${d}]`
}

function formatDate(date: Date, pattern: string): string {
   if (!isValid(date)) {
      throw new Error('Invalid date')
   }
   return format(date, pattern, { locale: ptBR })
}

function formatDateValueToShortDate(date: DateValue): string {
   return formatDate(getDateFromDateValue(date), 'dd/MM/yyyy')
}

function formatUnixToShortHour(unixSeconds: number): string {
   return formatDate(getDateFromUnixSeconds(unixSeconds), 'HH:mm')
}

function formatUnixToShortDate(unixSeconds: number): string {
   return formatDate(getDateFromUnixSeconds(unixSeconds), 'dd/MMM')
}

function formatUnixToDate(unixSeconds: number): string {
   return formatDate(getDateFromUnixSeconds(unixSeconds), 'dd/MMM/yy')
}

function formatUnixToDateWithWeekday(unixSeconds: number): string {
   return setStringToCapital(
      formatDate(getDateFromUnixSeconds(unixSeconds), "EEE, dd 'de' MMMM 'de' yyyy"),
   )
}

function formatUnixToDateAndHour(unixSeconds: number): string {
   return formatDate(getDateFromUnixSeconds(unixSeconds), 'dd/MM HH:mm')
}

function formatUnixToDateTimeKey(unixSeconds: number): string {
   const timeKey = formatDate(
      getDateFromUnixSeconds(unixSeconds),
      'yyyy_MM_dd_HH_mm',
   )
   return timeKey
}

function parseDateTimeKeyToUnix(dateTimeKey: string): number {
   const parts = /^(\d{4})_(\d{2})_(\d{2})_(\d{2})_(\d{2})$/.exec(dateTimeKey)
   if (!parts) {
      throw new Error(`Invalid dateTimeKey: ${dateTimeKey}`)
   }

   const year = Number(parts[1])
   const month = Number(parts[2])
   const day = Number(parts[3])
   const hour = Number(parts[4])
   const minute = Number(parts[5])

   return getUnixTime(
      new TZDate(year, month - 1, day, hour, minute, 0, 'America/Sao_Paulo'),
   )
}

function formatUnixToDayId(unixSeconds: number): string {
   return formatDate(getDateFromUnixSeconds(unixSeconds), 'yyyy_MM_dd')
}

function formatUnixToOpenclawDatetime(unixSeconds: number): string {
   return formatOpenclawDate(getDateFromUnixSeconds(unixSeconds))
}

function formatIsoToShortHour(isoString: string): string {
   return formatDate(parseISO(isoString), 'HH:mm')
}

function formatIsoToShortDate(isoString: string): string {
   return formatDate(parseISO(isoString), 'dd/MM')
}

function formatIsoToDate(isoString: string): string {
   return formatDate(parseISO(isoString), 'dd/MMM/yy')
}

function formatIsoToLongDate(isoString: string): string {
   return formatDate(parseISO(isoString), "dd 'de' MMMM 'de' yyyy")
}

function formatIsoToDateAndHour(isoString: string): string {
   return formatDate(parseISO(isoString), 'dd/MM HH:mm')
}

function formatIsoToDateAndHourSeconds(isoString: string): string {
   return formatDate(parseISO(isoString), 'dd/MM HH:mm:ss')
}

function formatIsoWithSubtractedHoursToDateAndHourSeconds(
   isoString: string,
   hours: number,
): string {
   return formatDate(subHours(parseISO(isoString), hours), 'dd/MM HH:mm:ss')
}

function formatIsoToDayId(isoString: string): string {
   return formatDate(parseISO(isoString), 'yyyy_MM_dd')
}

function getNowOpenclawDatetime(): string {
   return formatOpenclawDate(getNowDate())
}

function formatOpenclawDate(date: Date): string {
   const parts = openclawDatetimeFormatter.formatToParts(date)
   const weekday = getDatePart(parts, 'weekday')
   const year = getDatePart(parts, 'year')
   const month = getDatePart(parts, 'month')
   const day = getDatePart(parts, 'day')
   const hour = getDatePart(parts, 'hour')
   const minute = getDatePart(parts, 'minute')

   return `${weekday} ${year}-${month}-${day} ${hour}:${minute}`
}

function getDatePart(
   parts: Intl.DateTimeFormatPart[],
   type: Intl.DateTimeFormatPartTypes,
) {
   return parts.find((part) => {
      return part.type === type
   })?.value
}

function compareUnixSecondsDesc(aUnixSeconds: number, bUnixSeconds: number): number {
   return bUnixSeconds - aUnixSeconds
}

export {
   addBusinessDaysToUnixSeconds,
   compareUnixSecondsDesc,
   formatDate,
   formatDateToBotDate,
   formatDateToWeekdayId,
   formatDateValueToShortDate,
   formatIsoToDate,
   formatIsoToDateAndHour,
   formatIsoToDateAndHourSeconds,
   formatIsoToDayId,
   formatIsoToLongDate,
   formatIsoToShortDate,
   formatIsoToShortHour,
   formatIsoWithSubtractedHoursToDateAndHourSeconds,
   formatMinutesToShortHour,
   formatMinutesToTime,
   formatTimeToMinutes,
   formatUnixToDate,
   formatUnixToDateAndHour,
   formatUnixToDateTimeKey,
   formatUnixToDateWithWeekday,
   formatUnixToDayId,
   formatUnixToOpenclawDatetime,
   formatUnixToShortDate,
   formatUnixToShortHour,
   getCalendarDate,
   getCalendarMonthStart,
   getCurrentYear,
   getDateFromDateValue,
   getDateFromUnixSeconds,
   getDateValueUnixSeconds,
   getMinutesOfDay,
   getNextCalendarMonthEnd,
   getNextDayUnixMidnight,
   getNowCalendarDate,
   getNowDate,
   getNowMilliseconds,
   getNowMinutes,
   getNowOpenclawDatetime,
   getNowSeconds,
   getNowSupabase,
   getTodayUnixDayKey,
   getUnixDayKey,
   getUnixEndOfDay,
   getUnixMidnightOfDay,
   getUnixMidnightOfToday,
   getUnixMidnightWithOffset,
   getUnixSeconds,
   getUnixWeekdayNumber,
   getUnixNumberDay,
   isDateValueBeforeToday,
   parseDateTimeKeyToUnix,
   parseShortHourToMinutes,
}
