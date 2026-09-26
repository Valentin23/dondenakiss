import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1 i18n="@@home.heading">Brunch y tapas sin gluten en Alicante</h1>
    <p class="lead" i18n="@@home.intro">Todos nuestros platos tienen opción sin gluten.</p>
    <p i18n="@@home.alwaysGlutenFree">
      Los calamares rebozados, las croquetas y las tortitas son sin gluten para todo el mundo. Para
      las hamburguesas y los desayunos tenemos pan con y sin gluten: solo tienes que pedirlo.
    </p>
    <p i18n="@@home.crossContamination">
      Controlamos la contaminación cruzada: todo lo que pasa por nuestra freidora es sin gluten, y
      usamos tostadores distintos para el pan con gluten y el pan sin gluten.
    </p>
    <p i18n="@@home.association">
      Somos establecimiento miembro de
      <a [href]="association.url" rel="noopener" target="_blank">{{ association.name }}</a
      >, la Asociación de Celíacos de la Comunitat Valenciana.
    </p>
    <p>
      <a [routerLink]="reservationsPath" i18n="@@home.cta">Reserva tu mesa</a>
    </p>
  `,
})
export class Home {
  protected readonly association = SITE.celiacAssociation;
  protected readonly reservationsPath = `/${PAGE_SLUGS.reservations[inject(CURRENT_LOCALE)]}`;
}
