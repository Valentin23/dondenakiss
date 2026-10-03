import { photoLoader } from './photo-loader';

describe('photoLoader', () => {
  it('picks the smallest generated width that covers the request', () => {
    expect(photoLoader({ src: 'photos/fideua', width: 300 })).toBe('/photos/fideua-480.webp');
    expect(photoLoader({ src: 'photos/fideua', width: 961 })).toBe('/photos/fideua-1600.webp');
    expect(photoLoader({ src: 'photos/fideua', width: 3000 })).toBe('/photos/fideua-1600.webp');
  });

  it('defaults to the medium width', () => {
    expect(photoLoader({ src: 'photos/fideua' })).toBe('/photos/fideua-960.webp');
  });

  it('leaves other images untouched', () => {
    expect(photoLoader({ src: 'brand/logo-dark-192.png', width: 192 })).toBe(
      'brand/logo-dark-192.png',
    );
  });
});
