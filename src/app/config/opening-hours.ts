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

export interface HoursGroup {
  /** First and last day of a run of consecutive days with the same slots. */
  from: DayOfWeek;
  to: DayOfWeek;
  slots: { opens: string; closes: string }[];
}

/**
 * Merges consecutive days that share the same slots, for compact summaries
 * such as "Tuesday–Thursday 08:30–16:00". Closed days (no slots) are grouped
 * the same way.
 */
export function groupDays(week: readonly DayHours[]): HoursGroup[] {
  const groups: HoursGroup[] = [];
  for (const day of week) {
    const last = groups.at(-1);
    if (last && sameSlots(last.slots, day.slots)) {
      last.to = day.day;
    } else {
      groups.push({ from: day.day, to: day.day, slots: day.slots });
    }
  }
  return groups;
}

function sameSlots(a: DayHours['slots'], b: DayHours['slots']): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}
