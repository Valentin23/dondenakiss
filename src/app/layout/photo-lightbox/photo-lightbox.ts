import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';

interface LightboxPhoto {
  /** Photo in public/photos, without width or extension. */
  src: string;
  caption: string;
}

/**
 * Shows one photo full screen in a modal <dialog>: Esc, the close button or a
 * click outside the photo closes it, and the browser handles the focus trap
 * and returns focus to the thumbnail. The large file is only requested when
 * the dialog opens.
 */
@Component({
  selector: 'app-photo-lightbox',
  imports: [NgOptimizedImage],
  template: `
    <dialog #dialog [attr.aria-label]="photo()?.caption" (close)="photo.set(null)">
      <button type="button" class="close" (click)="close()">
        <span class="visually-hidden" i18n="@@lightbox.close">Cerrar foto</span>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      @if (photo(); as photo) {
        <figure>
          <!-- The frame takes the photo's own shape once it loads, so the rounded
               corners sit on the photo itself; until then it stays invisible. -->
          <div class="frame" [class.ready]="ratio()" [style.--ratio]="ratio() ?? 1">
            <img
              [ngSrc]="photo.src"
              [alt]="photo.caption"
              fill
              sizes="100vw"
              priority
              (load)="onLoad($event)"
            />
          </div>
          <figcaption>{{ photo.caption }}</figcaption>
        </figure>
      }
    </dialog>
  `,
  styles: `
    dialog {
      width: 100%;
      max-width: none;
      height: 100dvh;
      max-height: none;
      margin: 0;
      padding: var(--dn-space-4);
      border: 0;
      background: transparent;
      color: var(--dn-on-facade);
      opacity: 0;
      transition:
        opacity var(--dn-duration) var(--dn-ease-out),
        overlay var(--dn-duration) allow-discrete,
        display var(--dn-duration) allow-discrete;
    }
    dialog[open] {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
    }
    @starting-style {
      dialog[open] {
        opacity: 0;
      }
    }
    dialog::backdrop {
      background: rgb(from var(--dn-olive-deep) r g b / 94%);
    }
    figure {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--dn-space-4);
      width: 100%;
      margin: 0;
    }
    .frame {
      position: relative;
      width: min(100%, 1100px, calc(78dvh * var(--ratio)));
      aspect-ratio: var(--ratio);
      overflow: hidden;
      border-radius: var(--dn-radius-md);
      opacity: 0;
      transition: opacity var(--dn-duration) var(--dn-ease-out);
    }
    .frame.ready {
      opacity: 1;
    }
    img {
      object-fit: cover;
    }
    figcaption {
      font: var(--dn-text-dish);
      text-align: center;
    }
    .close {
      position: fixed;
      top: var(--dn-space-4);
      right: var(--dn-space-4);
      z-index: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--dn-target-min);
      height: var(--dn-target-min);
      border: 0;
      border-radius: var(--dn-radius-pill);
      background: rgb(from var(--dn-olive-deep) r g b / 70%);
      color: var(--dn-on-facade);
      cursor: pointer;
    }
    .close svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
    }
    :focus-visible {
      outline-color: var(--dn-on-facade);
    }
  `,
})
export class PhotoLightbox {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly photo = signal<LightboxPhoto | null>(null);
  /** Width / height of the open photo, known once it has loaded. */
  protected readonly ratio = signal<number | null>(null);

  constructor() {
    // A click anywhere but on the photo itself closes it (backdrop, caption, margins).
    afterNextRender(() =>
      this.dialog().nativeElement.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLImageElement)) {
          this.close();
        }
      }),
    );
  }

  open(src: string, caption: string): void {
    this.ratio.set(null);
    this.photo.set({ src, caption });
    this.dialog().nativeElement.showModal();
  }

  protected onLoad(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img.naturalWidth && img.naturalHeight) {
      this.ratio.set(img.naturalWidth / img.naturalHeight);
    }
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }
}
