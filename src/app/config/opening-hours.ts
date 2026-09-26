import { DayOfWeek, OpeningHours } from './site';

export const WEEK: readonly DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export interface DayHours {
  day: DayOfWeek;
  /** Time slots sorted by opening time; empty when closed. */
  slots: { opens: string; closes: string }[];
}

/** Groups the opening hours by weekday, Monday first. */
export function hoursByDay(hours: readonly OpeningHours[]): DayHours[] {
  return WEEK.map((day) => ({
    day,
    slots: hours
      .filter((h) => h.days.includes(day))
      .map(({ opens, closes }) => ({ opens, closes }))
      .sort((a, b) => a.opens.localeCompare(b.opens)),
  }));
}

/** Localised weekday name, e.g. `martes` for `('Tuesday', 'es')`. */
export function dayName(day: DayOfWeek, locale: string): string {
  // 2024-01-01 was a Monday.
  const date = new Date(Date.UTC(2024, 0, 1 + WEEK.indexOf(day)));
  return new Intl.DateTimeFormat(locale, { weekday: 'long', timeZone: 'UTC' }).format(date);
}
