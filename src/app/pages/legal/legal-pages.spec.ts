import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BOOKING } from '../../config/booking';
import { SITE } from '../../config/site';
import { Privacy } from '../privacy/privacy';
import { Legal } from './legal';

async function render(component: Type<unknown>, providers: Provider[] = []): Promise<HTMLElement> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideRouter([]), ...providers],
  }).compileComponents();
  const fixture = TestBed.createComponent(component);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Legal notice', () => {
  it('lists the owner details required by LSSI art. 10, phone included', async () => {
    const el = await render(Legal);
    const terms = [...el.querySelectorAll('dt')].map((dt) => dt.textContent?.trim());
    expect(terms).toEqual([
      'Titular',
      'Nombre comercial',
      'NIF',
      'Domicilio',
      'Email',
      'Teléfono',
      'Actividad',
      'Licencia de actividad',
    ]);
    expect(el.querySelector('a[href^="tel:"]')).not.toBeNull();
  });

  it('states that prices include VAT (LSSI art. 10.1.f)', async () => {
    expect((await render(Legal)).textContent).toContain('incluyen el IVA');
  });
});

describe.each(['dish', 'taulada'] as const)('Privacy policy with %s', (provider) => {
  const renderPrivacy = () =>
    render(Privacy, [{ provide: BOOKING, useValue: { ...SITE.booking, provider } }]);

  it('only describes processing the site really does', async () => {
    const el = await renderPrivacy();
    const text = el.textContent ?? '';
    // No JS analytics beacon is loaded, so the policy must not claim one.
    expect(text).not.toContain('Web Analytics');
    // Free Gmail has no Art. 28 GDPR contract: Google must not be listed as a processor.
    const processors = el.querySelector('h2 + p + ul')?.textContent ?? '';
    expect(processors).not.toContain('Google');
    // Mail to the domain's addresses passes through Cloudflare Email Routing.
    expect(processors).toContain('@dondenakiss.es');
    // Google Maps is the only third-party cookie that needs consent; DISH's is technical
    // and Taulada's booking form sets none.
    expect(text).toContain(
      'Las únicas cookies de terceros que necesitan tu consentimiento son las del mapa de Google Maps',
    );
    if (provider === 'dish') expect(text).toContain('cookie técnica de sesión');
    expect(text).toContain('Configurar cookies');
  });

  it('covers every contact channel: phone, WhatsApp, email, the booking system and Instagram', async () => {
    const el = await renderPrivacy();
    const text = (el.textContent ?? '').replace(/\s+/g, ' ');
    expect(text).toContain(
      provider === 'dish'
        ? 'teléfono, WhatsApp, email o la app de DISH'
        : 'teléfono, WhatsApp o email, reservar desde el formulario de reservas de esta web',
    );
    expect(text).toContain('mensaje privado de Instagram');
    // The booking system keeps the regular-guest and no-show history for the restaurant, so it
    // is a processor, and DISH stays one for the bookings made with it. WhatsApp and Instagram
    // (Meta) act under their own terms, like Gmail, so they are not.
    const processors = el.querySelector('h2 + p + ul')?.textContent ?? '';
    expect(processors).toContain('DISH Digital Solutions GmbH');
    if (provider === 'taulada') expect(processors).toContain('Taulada (taulada.com, España)');
    expect(processors).not.toContain('WhatsApp');
    expect(processors).not.toContain('Instagram');
    // DISH's own policy is linked while its booking form is on the site.
    const dishLink = el.querySelector<HTMLAnchorElement>('a[href*="reservation.dish.co"]');
    if (provider === 'dish') expect(dishLink?.href).toContain('privacy_ES.pdf');
    else expect(dishLink).toBeNull();
  });
});
