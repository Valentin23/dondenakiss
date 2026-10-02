import { NgOptimizedImage } from '@angular/common';
import { Component, booleanAttribute, input } from '@angular/core';
import { LeafMotif } from '../leaf-motif/leaf-motif';

/**
 * A photo with the design system's radius. Until real photos exist (no `src`),
 * it renders a decorative leaf panel instead, so the layout already looks
 * finished. The parent sets the size (height or aspect-ratio).
 */
@Component({
  selector: 'app-photo-slot',
  imports: [NgOptimizedImage, LeafMotif],
  host: { '[class]': 'tone()' },
  template: `
    @if (src(); as src) {
      <img [ngSrc]="src" [alt]="alt()" fill [priority]="priority()" [sizes]="sizes()" />
    } @else {
      <app-leaf-motif class="leaf" />
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      border-radius: var(--dn-radius-md);
      container-type: size;
    }
    :host(.dark) {
      background: var(--dn-olive-leaf);
      --leaf: var(--dn-olive-deep);
    }
    :host(.light) {
      background: var(--dn-surface-carta);
      --leaf: rgb(from var(--dn-ink-muted) r g b / 12%);
    }
    :host(.bone) {
      background: var(--dn-surface);
      --leaf: rgb(from var(--dn-ink-muted) r g b / 10%);
    }
    img {
      object-fit: cover;
    }
    .leaf {
      position: absolute;
      right: -12%;
      bottom: -30%;
      width: 55%;
      max-width: 280px;
      rotate: 18deg;
      --dn-olive-leaf: var(--leaf);
    }
    /* Thumbnails: a centred, stronger sprig, so it reads as an illustration. */
    @container (max-width: 160px) {
      .leaf {
        top: 50%;
        right: auto;
        bottom: auto;
        left: 50%;
        width: 62%;
        translate: -50% -50%;
        rotate: 24deg;
      }
      :host(.bone) .leaf {
        --leaf: rgb(from var(--dn-ink-muted) r g b / 22%);
      }
    }
  `,
})
export class PhotoSlot {
  readonly src = input<string>();
  readonly alt = input('');
  readonly sizes = input('100vw');
  /** For the largest above-the-fold photo (LCP): loads eagerly with high priority. */
  readonly priority = input(false, { transform: booleanAttribute });
  /** Placeholder colour, matching the block the slot sits on. */
  readonly tone = input<'dark' | 'light' | 'bone'>('light');
}
