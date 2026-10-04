import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CookieBanner } from './cookie-banner';
import { Consent } from './consent';

describe('CookieBanner', () => {
  beforeEach(() => localStorage.clear());

  it('offers accept and reject as identical buttons and hides after a choice', async () => {
    await TestBed.configureTestingModule({
      imports: [CookieBanner],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(CookieBanner);
    TestBed.inject(Consent).load();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const buttons = [...el.querySelectorAll('button')];
    expect(buttons.map((b) => b.textContent?.trim())).toEqual(['Rechazar', 'Aceptar']);
    expect(buttons[0].className).toBe(buttons[1].className);
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/privacidad');

    buttons[0].click();
    await fixture.whenStable();
    expect(el.querySelector('.banner')).toBeNull();
    expect(TestBed.inject(Consent).mapsAllowed()).toBe(false);
  });
});
