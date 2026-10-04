import { TestBed } from '@angular/core/testing';
import { CONSENT_MAX_AGE_MS, CONSENT_STORAGE_KEY, Consent } from './consent';

describe('Consent', () => {
  let consent: Consent;

  beforeEach(() => {
    localStorage.clear();
    consent = TestBed.inject(Consent);
  });

  it('shows nothing until the stored decision has been read', () => {
    expect(consent.bannerVisible()).toBe(false);
    expect(consent.mapsAllowed()).toBe(false);
    consent.load();
    expect(consent.bannerVisible()).toBe(true);
  });

  it('remembers acceptance and rejection', () => {
    consent.load();
    consent.accept();
    expect(consent.mapsAllowed()).toBe(true);
    expect(consent.bannerVisible()).toBe(false);
    expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).maps).toBe(true);

    consent.reject();
    TestBed.resetTestingModule();
    const again = TestBed.inject(Consent);
    again.load();
    expect(again.mapsAllowed()).toBe(false);
    expect(again.bannerVisible()).toBe(false);
  });

  it('asks again after 12 months', () => {
    const at = '2026-01-01T00:00:00.000Z';
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ maps: true, at }));
    consent.load(Date.parse(at) + CONSENT_MAX_AGE_MS + 1);
    expect(consent.mapsAllowed()).toBe(false);
    expect(consent.bannerVisible()).toBe(true);
  });

  it('ignores a corrupted stored value', () => {
    localStorage.setItem(CONSENT_STORAGE_KEY, '{not json');
    consent.load();
    expect(consent.bannerVisible()).toBe(true);
  });

  it('lets the visitor reopen the banner to change their mind', () => {
    consent.load();
    consent.accept();
    consent.reopen();
    expect(consent.bannerVisible()).toBe(true);
  });
});
