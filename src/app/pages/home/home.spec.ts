import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Home } from './home';

describe('Home', () => {
  async function render(): Promise<HTMLElement> {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the approved headline as the only h1', async () => {
    const headings = (await render()).querySelectorAll('h1');
    expect(headings.length).toBe(1);
    expect(headings[0].textContent?.trim()).toBe(
      'Aquí se come como en casa. Y sin gluten, también.',
    );
  });

  it('lists the featured dishes in Spanish with their prices', async () => {
    const dishes = [...(await render()).querySelectorAll('.dish')];
    expect(dishes.map((d) => d.querySelector('h3')?.textContent?.trim())).toEqual([
      'Benedict trufado',
      'Fideuá de marisco',
      'Calamares a la andaluza',
      'Croquetas caseras de berenjena con queso',
    ]);
    expect(dishes.some((d) => d.querySelector('.chip-gf'))).toBe(false);
  });

  it('points both CTAs at the booking and menu pages', async () => {
    const ctas = [...(await render()).querySelectorAll('.hero-ctas a')];
    expect(ctas.map((a) => a.getAttribute('href'))).toEqual(['/reservas', '/carta']);
  });
});
