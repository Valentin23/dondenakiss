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

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  function hrefs(root: ParentNode, selector: string): (string | null)[] {
    return [...root.querySelectorAll(selector)].map((a) => a.getAttribute('href'));
  }

  it('renders the desktop navigation with Spanish slugs and the booking CTA', async () => {
    const header = (await render()).querySelector('header')!;
    expect(hrefs(header, '.desktop-nav > nav a')).toEqual(['/carta', '/contacto']);
    expect(hrefs(header, '.desktop-nav .btn-primary')).toEqual(['/reservas']);
  });

  it('renders the mobile navigation inside a closed dialog', async () => {
    const dialog = (await render()).querySelector('dialog#mobile-nav')!;
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(hrefs(dialog, '.mobile-links a')).toEqual(['/', '/carta', '/contacto']);
    expect(hrefs(dialog, '.mobile-ctas a')).toEqual(['/reservas', 'tel:+34624303646']);
  });

  it('links to every language from the footer switcher', async () => {
    const footer = (await render()).querySelector('footer')!;
    expect(hrefs(footer, 'a[hreflang]')).toEqual(['/', '/en/', '/fr/', '/it/', '/pl/']);
  });

  it('links the legal pages from the footer', async () => {
    const footer = (await render()).querySelector('footer')!;
    expect(hrefs(footer, '.columns nav a[href^="/"]')).toEqual(['/aviso-legal', '/privacidad']);
  });

  it('opens the header language dropdown and closes it with Escape', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const header = (fixture.nativeElement as HTMLElement).querySelector('header')!;
    const button = header.querySelector<HTMLButtonElement>('app-language-switcher .trigger')!;
    const menu = header.querySelector<HTMLUListElement>('app-language-switcher .menu')!;
    expect(menu.hidden).toBe(true);

    button.click();
    await fixture.whenStable();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(menu.hidden).toBe(false);
    expect(hrefs(menu, 'a')).toEqual(['/', '/en/', '/fr/', '/it/', '/pl/']);

    menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
  });
});
