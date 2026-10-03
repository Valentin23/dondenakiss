import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Contact } from './contact';

describe('Contact', () => {
  it('shows the whole week, Monday first, with closed days', async () => {
    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const rows = [...el.querySelectorAll('.hours tr')];
    expect(rows.map((r) => r.querySelector('th')?.textContent?.trim())).toEqual([
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
      'domingo',
    ]);
    expect(rows.filter((r) => r.classList.contains('closed')).length).toBe(2);
    expect(el.querySelector('a[href^="tel:"]')?.getAttribute('href')).toBe('tel:+34624303646');
  });
});
