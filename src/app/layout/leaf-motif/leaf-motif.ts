import { Component } from '@angular/core';

/**
 * Line leaf illustration from the printed menu cover. Decorative only: use it on
 * --dn-olive-deep blocks and position it from the parent.
 */
@Component({
  selector: 'app-leaf-motif',
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 560 720" focusable="false">
      <path d="M160 290 A109 109 0 0 1 74 167 A109 109 0 0 1 160 290 Z" />
      <path d="M160 380 A109 109 0 0 1 246 257 A109 109 0 0 1 160 380 Z" />
      <path d="M160 470 A109 109 0 0 1 74 347 A109 109 0 0 1 160 470 Z" />
      <path d="M160 560 A109 109 0 0 1 246 437 A109 109 0 0 1 160 560 Z" />
      <path d="M160 650 A109 109 0 0 1 74 527 A109 109 0 0 1 160 650 Z" />
      <path d="M160 740 A109 109 0 0 1 246 617 A109 109 0 0 1 160 740 Z" />
      <path d="M420 440 A80 80 0 0 1 483 350 A80 80 0 0 1 420 440 Z" />
      <path d="M420 580 A80 80 0 0 1 483 490 A80 80 0 0 1 420 580 Z" />
    </svg>
  `,
  styles: `
    :host {
      display: block;
      pointer-events: none;
    }
    svg {
      width: 100%;
      height: auto;
      fill: var(--dn-olive-leaf);
    }
  `,
})
export class LeafMotif {}
