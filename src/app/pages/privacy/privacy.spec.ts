import { TestBed } from '@angular/core/testing';
import { BOOKING } from '../../config/booking';
import { SITE } from '../../config/site';
import { Privacy } from './privacy';

async function text(provider: 'dish' | 'taulada') {
  await TestBed.configureTestingModule({
    imports: [Privacy],
    providers: [{ provide: BOOKING, useValue: { ...SITE.booking, provider } }],
  }).compileComponents();
  const fixture = TestBed.createComponent(Privacy);
  await fixture.whenStable();
  return (fixture.nativeElement as HTMLElement).textContent!.replace(/\s+/g, ' ');
}

describe('Privacy', () => {
  it("describes DISH's booking form while DISH takes the bookings", async () => {
    const page = await text('dish');
    expect(page).toContain('Ese formulario es de DISH');
    expect(page).not.toContain('Taulada');
  });

  it('describes Taulada once it takes the bookings, and keeps DISH for the history', async () => {
    const page = await text('taulada');
    expect(page).toContain('Gestionamos las reservas con Taulada');
    expect(page).toContain('historial de las reservas que hicimos con DISH');
    expect(page).not.toContain('Ese formulario es de DISH');
    expect(page).not.toContain('app de DISH');
  });
});
