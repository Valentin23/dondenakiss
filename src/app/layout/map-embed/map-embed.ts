import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SITE } from '../../config/site';
import { Consent } from '../../consent/consent';
import { CURRENT_LOCALE, PAGE_SLUGS } from '../../i18n/locales';
import { LeafMotif } from '../leaf-motif/leaf-motif';

/**
 * Google Maps. Google receives the visitor's IP and may set cookies, so the
 * map loads only with consent (LSSI art. 22.2): accepted in the cookie banner,
 * or by clicking "Ver el mapa", which counts as accepting. Until then: a
 * placeholder with a notice. The privacy policy describes this.
 */
@Component({
  selector: 'app-map-embed',
  imports: [RouterLink, LeafMotif],
  template: `
    @if (consent.mapsAllowed()) {
      <iframe
        [src]="embedUrl"
        title="Mapa de Donde Nakiss en Google Maps"
        i18n-title="@@map.iframeTitle"
        allowfullscreen
      ></iframe>
    } @else {
      <div class="placeholder">
        <app-leaf-motif class="leaf" />
        <svg class="pin" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
        <button type="button" class="btn btn-primary" (click)="consent.accept()" i18n="@@map.load">
          Ver el mapa
        </button>
        <p class="notice" i18n="@@map.notice">
          Al cargar el mapa, Google recibirá tu dirección IP y puede instalar cookies. Más
          información en la <a [routerLink]="privacyPath">política de privacidad</a>.
        </p>
      </div>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: var(--dn-radius-md);
      background: var(--dn-surface-carta);
    }
    iframe {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .placeholder {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: var(--dn-space-4);
      height: 100%;
      padding: var(--dn-space-6);
      text-align: center;
    }
    .leaf {
      position: absolute;
      right: -12%;
      bottom: -30%;
      width: 55%;
      max-width: 280px;
      rotate: 18deg;
      --dn-olive-leaf: rgb(from var(--dn-ink-muted) r g b / 12%);
    }
    .pin {
      position: relative;
      fill: none;
      stroke: var(--dn-olive-deep);
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .btn {
      position: relative;
    }
    .notice {
      position: relative;
      max-width: 22rem;
      margin: 0;
      font: var(--dn-text-small);
      color: var(--dn-ink-muted);
    }
  `,
})
export class MapEmbed {
  protected readonly consent = inject(Consent);
  protected readonly privacyPath = `/${PAGE_SLUGS.privacy[inject(CURRENT_LOCALE)]}`;
  protected readonly embedUrl = inject(DomSanitizer).bypassSecurityTrustResourceUrl(
    SITE.googleMapsEmbedUrl,
  );
}
