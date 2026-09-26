import { Component } from '@angular/core';

// TODO: política de privacidad (RGPD/LOPDGDD), incluyendo DISH como encargado del tratamiento.
@Component({
  selector: 'app-privacy',
  template: `
    <h1 i18n="@@privacy.heading">Política de privacidad</h1>
    <p i18n="@@privacy.pending">Contenido pendiente.</p>
  `,
})
export class Privacy {}
