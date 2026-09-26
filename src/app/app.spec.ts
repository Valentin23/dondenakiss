import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the main navigation with Spanish slugs', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = [...(fixture.nativeElement as HTMLElement).querySelectorAll('header > nav a')];
    expect(links.map((a) => a.getAttribute('href'))).toEqual(['/carta', '/reservas', '/contacto']);
  });

  it('links to every language from the switcher', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const langs = [...(fixture.nativeElement as HTMLElement).querySelectorAll('a[hreflang]')];
    expect(langs.map((a) => a.getAttribute('href'))).toEqual(['/', '/en/', '/fr/', '/it/', '/pl/']);
  });
});
