import { restaurantSchema } from './restaurant-schema';

describe('restaurantSchema', () => {
  it('describes the restaurant with its full name and address', () => {
    const schema = restaurantSchema('es');
    expect(schema['@type']).toBe('Restaurant');
    expect(schema['name']).toBe('Donde Nakiss Brunch & Tapas Sin Gluten');
    expect(schema['address']).toMatchObject({ postalCode: '03002', addressLocality: 'Alicante' });
  });

  it('includes opening hours and profiles', () => {
    const schema = restaurantSchema('es');
    expect(schema['openingHoursSpecification']).toContainEqual({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '20:00',
      closes: '23:00',
    });
    expect(schema['sameAs']).toContain('https://www.instagram.com/dondenakiss12/');
  });

  it('points to the menu in the requested locale', () => {
    expect(restaurantSchema('fr')['hasMenu']).toBe('https://dondenakiss.es/fr/carte/');
  });

  it('lists both coeliac associations', () => {
    expect(restaurantSchema('es')['memberOf']).toEqual([
      { '@type': 'Organization', name: 'ACECOVA', url: 'https://www.acecova.org' },
      { '@type': 'Organization', name: 'Viviendo Sin Gluten' },
    ]);
  });
});
