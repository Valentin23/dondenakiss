import { Service, computed, signal } from '@angular/core';

/** What the visitor decided about the only non-essential cookies: Google Maps. */
export interface ConsentDecision {
  maps: boolean;
  /** ISO date of the decision. */
  at: string;
}

export const CONSENT_STORAGE_KEY = 'dn-consent';
/** The AEPD guide allows up to 24 months; we ask again after 12. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

/**
 * Cookie consent (LSSI art. 22.2). Until `load()` runs in the browser the
 * decision is unknown, so the prerendered HTML shows neither the banner nor
 * the map, and hydration matches it. Storing the decision itself is a
 * technical use of local storage, exempt from consent.
 */
@Service()
export class Consent {
  /** `undefined`: not read yet (server, before hydration); `null`: no decision. */
  private readonly decision = signal<ConsentDecision | null | undefined>(undefined);

  readonly mapsAllowed = computed(() => this.decision()?.maps === true);
  readonly bannerVisible = computed(() => this.decision() === null);

  /** Reads the stored decision. Call it in the browser only, after hydration. */
  load(now = Date.now()): void {
    this.decision.set(readDecision(now));
  }

  accept(): void {
    this.save({ maps: true, at: new Date().toISOString() });
  }

  reject(): void {
    this.save({ maps: false, at: new Date().toISOString() });
  }

  /** Shows the banner again so the visitor can change their decision. */
  reopen(): void {
    this.decision.set(null);
  }

  private save(decision: ConsentDecision): void {
    this.decision.set(decision);
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(decision));
    } catch {
      // Storage blocked (private mode): the decision lasts for this visit only.
    }
  }
}

function readDecision(now: number): ConsentDecision | null {
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const decision = JSON.parse(raw) as Partial<ConsentDecision>;
    const at = Date.parse(decision.at ?? '');
    if (typeof decision.maps !== 'boolean' || Number.isNaN(at) || now - at > CONSENT_MAX_AGE_MS) {
      return null;
    }
    return { maps: decision.maps, at: decision.at! };
  } catch {
    return null;
  }
}
