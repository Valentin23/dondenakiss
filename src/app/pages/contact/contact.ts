import { Component } from '@angular/core';
import { SITE } from '../../config/site';

@Component({
  selector: 'app-contact',
  template: `
    <h1 i18n="@@contact.heading">Contacto y ubicación</h1>
    <address>
      @if (site.address) {
        <p>{{ site.address }}</p>
      }
      @if (site.phone) {
        <p>
          <a [href]="'tel:' + site.phone">{{ site.phone }}</a>
        </p>
      }
      @if (site.email) {
        <p>
          <a [href]="'mailto:' + site.email">{{ site.email }}</a>
        </p>
      }
    </address>
    @if (site.googleMapsUrl) {
      <p>
        <a [href]="site.googleMapsUrl" rel="noopener" target="_blank" i18n="@@contact.maps"
          >Cómo llegar (Google Maps)</a
        >
      </p>
    }
  `,
})
export class Contact {
  protected readonly site = SITE;
}
