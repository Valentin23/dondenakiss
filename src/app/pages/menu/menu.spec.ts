import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Menu } from './menu';

describe('Menu', () => {
  async function configure(fragment: string | null = null): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { fragment: of(fragment) } },
      ],
    }).compileComponents();
  }

  async function render(fragment: string | null = null): Promise<HTMLElement> {
    await configure(fragment);
    const fixture = TestBed.createComponent(Menu);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  const panel = (el: HTMLElement, key: string) => el.querySelector<HTMLElement>(`#panel-${key}`)!;
  const tab = (el: HTMLElement, key: string) => el.querySelector<HTMLButtonElement>(`#tab-${key}`)!;

  it('prerenders both panels and shows Brunch first', async () => {
    const el = await render();
    expect(panel(el, 'brunch').hidden).toBe(false);
    expect(panel(el, 'tapas').hidden).toBe(true);
    expect(panel(el, 'tapas').querySelectorAll('.dish').length).toBeGreaterThan(20);
    expect(tab(el, 'brunch').getAttribute('aria-selected')).toBe('true');
  });

  it('opens the Tapas tab from the #tapas fragment', async () => {
    const el = await render('tapas');
    expect(panel(el, 'tapas').hidden).toBe(false);
    expect(panel(el, 'brunch').hidden).toBe(true);
  });

  it('switches tabs on click and with the arrow keys', async () => {
    await configure();
    const fixture = TestBed.createComponent(Menu);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    document.body.appendChild(el);

    tab(el, 'tapas').click();
    await fixture.whenStable();
    expect(panel(el, 'tapas').hidden).toBe(false);

    tab(el, 'tapas').dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await fixture.whenStable();
    expect(panel(el, 'brunch').hidden).toBe(false);
    expect(document.activeElement).toBe(tab(el, 'brunch'));
    el.remove();
  });

  it('shows no gluten-free chips on dishes or sections', async () => {
    const el = await render();
    expect(el.querySelectorAll('.chip-gf').length).toBe(0);
  });

  it('gives every dish a thumbnail, with a placeholder when there is no photo', async () => {
    const el = await render();
    const dishes = el.querySelectorAll('.dish');
    expect(el.querySelectorAll('.dish .thumb').length).toBe(dishes.length);
    expect(el.querySelectorAll('.dish .thumb img').length).toBeLessThan(dishes.length);
  });
});
