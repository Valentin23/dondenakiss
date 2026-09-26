import { Component } from '@angular/core';

// TODO: texto legal (LSSI-CE): titular, NIF, domicilio, contacto, datos registrales.
@Component({
  selector: 'app-legal',
  template: `
    <h1 i18n="@@legal.heading">Aviso legal</h1>
    <p i18n="@@legal.pending">Contenido pendiente.</p>
  `,
})
export class Legal {}
