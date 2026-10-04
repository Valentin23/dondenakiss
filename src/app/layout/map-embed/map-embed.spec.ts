import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MapEmbed } from './map-embed';

describe('MapEmbed', () => {
  beforeEach(() => localStorage.clear());

  it('does not load Google Maps without consent; clicking the button accepts', async () => {
    await TestBed.configureTestingModule({
      imports: [MapEmbed],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(MapEmbed);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    // No request to Google before consent (LSSI art. 22.2): no iframe at all.
    expect(el.querySelector('iframe')).toBeNull();
    expect(el.querySelector('.notice a')?.getAttribute('href')).toBe('/privacidad');

    el.querySelector<HTMLButtonElement>('button')!.click();
    await fixture.whenStable();
    expect(el.querySelector('iframe')?.getAttribute('src')).toContain('google.com/maps/embed');
  });
});
