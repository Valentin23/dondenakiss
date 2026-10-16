import { TestBed } from '@angular/core/testing';
import { BOOKING, type BookingConfig } from '../../config/booking';
import { SITE } from '../../config/site';
import { BookingWidget } from './booking-widget';

async function render(booking: Partial<BookingConfig> = {}) {
  await TestBed.configureTestingModule({
    imports: [BookingWidget],
    providers: [{ provide: BOOKING, useValue: { ...SITE.booking, ...booking } }],
  }).compileComponents();
  const fixture = TestBed.createComponent(BookingWidget);
  await fixture.whenStable();
  const iframe = (fixture.nativeElement as HTMLElement).querySelector('iframe')!;
  return { fixture, iframe };
}

/** A message as Taulada's page sends it, from `source`. */
function post(data: unknown, source: Window | null, origin = 'https://taulada.com') {
  window.dispatchEvent(new MessageEvent('message', { data, origin, source }));
}

describe('BookingWidget', () => {
  it("shows DISH's widget in the page's language while DISH takes the bookings", async () => {
    const { iframe } = await render({ provider: 'dish' });
    const src = new URL(iframe.getAttribute('src')!);
    expect(src.origin + src.pathname).toBe(SITE.booking.dishWidgetUrl);
    expect(src.searchParams.get('lang')).toBe('es');
  });

  it("shows Taulada's booking page in embed mode and takes the height it reports", async () => {
    const { fixture, iframe } = await render({ provider: 'taulada' });
    expect(iframe.getAttribute('src')).toBe('https://taulada.com/r/dondenakiss?embed=1&lang=es');

    post({ source: 'taulada', type: 'height', height: 812.4 }, iframe.contentWindow);
    await fixture.whenStable();
    expect(iframe.style.height).toBe('813px');
  });

  it('ignores messages from other sites or other frames', async () => {
    const { fixture, iframe } = await render({ provider: 'taulada' });
    post(
      { source: 'taulada', type: 'height', height: 5000 },
      iframe.contentWindow,
      'https://evil.example',
    );
    post({ source: 'taulada', type: 'height', height: 5000 }, window);
    await fixture.whenStable();
    expect(iframe.style.height).toBe('');
  });
});
