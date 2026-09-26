import { restaurantSchema } from './restaurant-schema';

describe('restaurantSchema', () => {
  it('describes the restaurant with its full name and address', () => {
    const schema = restaurantSchema('es');
    expect(schema['@type']).toBe('Restaurant');
    expect(schema['name']).toBe('Donde Nakiss Brunch & Tapas Sin Gluten');
    expect(schema['address']).toMatchObject({ postalCode: '03002', addressLocality: 'Alicante' });
  });

  it('points to the menu in the requested locale', () => {
    expect(restaurantSchema('fr')['hasMenu']).toBe('https://dondenakiss.es/fr/carte/');
  });
});
