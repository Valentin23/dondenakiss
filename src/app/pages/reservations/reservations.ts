import { Component } from '@angular/core';
import { BookingWidget } from '../../layout/booking-widget/booking-widget';

@Component({
  selector: 'app-reservations',
  imports: [BookingWidget],
  template: `
    <h1 i18n="@@reservations.heading">Reservas</h1>
    <app-booking-widget />
  `,
})
export class Reservations {}
