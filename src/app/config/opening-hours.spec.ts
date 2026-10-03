import { dayName, groupDays, hoursByDay } from './opening-hours';
import { SITE } from './site';

describe('opening hours', () => {
  it('lists every weekday, Monday first, with sorted slots', () => {
    const week = hoursByDay(SITE.openingHours);
    expect(week.map((d) => d.day)).toEqual([
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ]);
    expect(week[0].slots).toEqual([]);
    expect(week[5].slots).toEqual([
      { opens: '10:00', closes: '16:00' },
      { opens: '20:00', closes: '23:00' },
    ]);
  });

  it('names weekdays in the given locale', () => {
    expect(dayName('Tuesday', 'es')).toBe('martes');
    expect(dayName('Sunday', 'en')).toBe('Sunday');
  });

  it('groups consecutive days with the same slots, closed days included', () => {
    const groups = groupDays(hoursByDay(SITE.openingHours));
    expect(groups.map(({ from, to }) => [from, to])).toEqual([
      ['Monday', 'Monday'],
      ['Tuesday', 'Thursday'],
      ['Friday', 'Friday'],
      ['Saturday', 'Saturday'],
      ['Sunday', 'Sunday'],
    ]);
    expect(groups[0].slots).toEqual([]);
    expect(groups[2].slots).toEqual([
      { opens: '08:30', closes: '16:00' },
      { opens: '20:00', closes: '23:00' },
    ]);
  });

  it('merges consecutive closed days', () => {
    const groups = groupDays(
      hoursByDay([{ days: ['Wednesday', 'Thursday'], opens: '09:00', closes: '14:00' }]),
    );
    expect(groups.map(({ from, to }) => [from, to])).toEqual([
      ['Monday', 'Tuesday'],
      ['Wednesday', 'Thursday'],
      ['Friday', 'Sunday'],
    ]);
  });
});
