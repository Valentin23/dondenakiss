import { TestBed } from '@angular/core/testing';
import { BOOKING, type BookingConfig } from '../../config/booking';
import { SITE } from '../../config/site';
import { BookingWidget } from './booking-widget';

const WIDGET_SCRIPT = 'https://taulada.com/widget.js';

async function render(booking: Partial<BookingConfig>) {
  await TestBed.configureTestingModule({
    imports: [BookingWidget],
    providers: [{ provide: BOOKING, useValue: { ...SITE.booking, ...booking } }],
  }).compileComponents();
  const fixture = TestBed.createComponent(BookingWidget);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

type WithTaulada = Window & { Taulada?: { mount(element: Element): void } };

describe('BookingWidget', () => {
  afterEach(() => {
    document.querySelectorAll(`script[src="${WIDGET_SCRIPT}"]`).forEach((s) => s.remove());
    delete (window as WithTaulada).Taulada;
  });

  it("shows DISH's widget in the page's language while DISH takes the bookings", async () => {
    const el = await render({ provider: 'dish' });
    const src = new URL(el.querySelector('iframe')!.getAttribute('src')!);
    expect(src.origin + src.pathname).toBe(SITE.booking.dishWidgetUrl);
    expect(src.searchParams.get('lang')).toBe('es');
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)).toBeNull();
  });

  it("uses Taulada's widget script, with a link for visitors without JavaScript", async () => {
    const el = await render({ provider: 'taulada' });
    const slot = el.querySelector('[data-taulada-booking]')!;
    expect(slot.getAttribute('data-taulada-booking')).toBe('dondenakiss');
    expect(slot.getAttribute('data-lang')).toBe('es');
    expect(slot.querySelector('a')?.getAttribute('href')).toBe('https://taulada.com/r/dondenakiss');
    expect(el.querySelector('iframe')).toBeNull();
    expect(document.querySelectorAll(`script[src="${WIDGET_SCRIPT}"]`)).toHaveLength(1);
  });

  it('mounts on its own when the script is already loaded (moving between pages)', async () => {
    const mount = vi.fn();
    (window as WithTaulada).Taulada = { mount };
    const el = await render({ provider: 'taulada' });
    expect(mount).toHaveBeenCalledWith(el.querySelector('[data-taulada-booking]'));
    expect(document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)).toBeNull();
  });
});
