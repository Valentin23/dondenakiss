import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Privacy } from '../privacy/privacy';
import { Legal } from './legal';

async function render(component: Type<unknown>): Promise<HTMLElement> {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [provideRouter([])],
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
    ]);
    expect(el.querySelector('a[href^="tel:"]')).not.toBeNull();
  });

  it('states that prices include VAT (LSSI art. 10.1.f)', async () => {
    expect((await render(Legal)).textContent).toContain('incluyen el IVA');
  });
});

describe('Privacy policy', () => {
  it('only describes processing the site really does', async () => {
    const el = await render(Privacy);
    const text = el.textContent ?? '';
    // No JS analytics beacon is loaded, so the policy must not claim one.
    expect(text).not.toContain('Web Analytics');
    // Free Gmail has no Art. 28 GDPR contract: Google must not be listed as a processor.
    const processors = el.querySelector('h2 + p + ul')?.textContent ?? '';
    expect(processors).not.toContain('Google');
    // Google Maps is the only source of third-party cookies, and only with consent.
    expect(text).toContain('solo usa cookies de terceros para el mapa de Google Maps');
    expect(text).toContain('Configurar cookies');
  });
});
