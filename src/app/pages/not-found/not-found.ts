import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <h1 i18n="@@notFound.heading">Página no encontrada</h1>
    <p><a routerLink="/" i18n="@@notFound.back">Volver al inicio</a></p>
  `,
})
export class NotFound {}
