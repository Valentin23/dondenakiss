import { Locale } from '../../i18n/locales';

/**
 * Dishes are not in the i18n message files: they are data with one text per
 * locale, so they can be managed from the future /admin.
 */
export type Localized = Record<Locale, string>;

export interface MenuItem {
  name: Localized;
  description?: Localized;
  price: number;
  /** Shown after the price, e.g. "por ración, mín. 2". */
  priceNote?: Localized;
  /**
   * The dish is always prepared gluten-free for everyone (squid, croquettes,
   * pancakes...). Every other dish has a gluten-free option on request.
   */
  alwaysGlutenFree?: boolean;
  /** Codes of the 14 allergens in Regulation (EU) No 1169/2011. */
  allergens?: string[];
  /** Photo in public/photos, without width or extension, e.g. `photos/fideua`. */
  photo?: string;
}

export interface MenuSection {
  title: Localized;
  items: MenuItem[];
}

// TODO: add the real menu.
export const MENU: MenuSection[] = [];

/**
 * "Los que más se piden" on the home page. Names, prices and descriptions come
 * from the printed menu (October 2026).
 * TODO: once MENU holds the full menu, mark these items there and derive this list.
 */
export const FEATURED_DISHES: MenuItem[] = [
  {
    name: {
      es: 'Benedict trufado',
      en: 'Truffled eggs Benedict',
      fr: 'Œufs Bénédicte à la truffe',
      it: 'Uova alla Benedict al tartufo',
      pl: 'Jajka po benedyktyńsku z truflą',
    },
    description: {
      es: 'Huevos poché con salsa holandesa, jamón ahumado y trufa sobre pan brioche.',
      en: 'Poached eggs with hollandaise sauce, smoked ham and truffle on brioche.',
      fr: 'Œufs pochés, sauce hollandaise, jambon fumé et truffe sur pain brioché.',
      it: 'Uova in camicia con salsa olandese, prosciutto affumicato e tartufo su pan brioche.',
      pl: 'Jajka w koszulce z sosem holenderskim, wędzoną szynką i truflą na brioszce.',
    },
    price: 12.5,
    photo: 'photos/benedict-trufa',
  },
  {
    name: {
      es: 'Arroz de solomillo ibérico con boletus',
      en: 'Iberian pork tenderloin rice with porcini',
      fr: 'Riz au filet de porc ibérique et aux cèpes',
      it: 'Riso con filetto di maiale iberico e porcini',
      pl: 'Ryż z polędwiczką iberyjską i borowikami',
    },
    description: {
      es: 'Arroz meloso con trocitos de solomillo tierno y el aroma irresistible de los boletus.',
      en: 'Creamy rice with tender pieces of tenderloin and the irresistible aroma of porcini.',
      fr: 'Riz crémeux aux morceaux de filet tendre et au parfum irrésistible des cèpes.',
      it: 'Riso cremoso con bocconcini di filetto tenero e il profumo irresistibile dei porcini.',
      pl: 'Kremowy ryż z kawałkami delikatnej polędwiczki i niezwykłym aromatem borowików.',
    },
    price: 15,
    priceNote: {
      es: 'por ración, mín. 2',
      en: 'per serving, min. 2',
      fr: 'par portion, min. 2',
      it: 'a porzione, min. 2',
      pl: 'za porcję, min. 2',
    },
  },
  {
    name: {
      es: 'Calamares a la andaluza',
      en: 'Andalusian-style fried squid',
      fr: 'Calamars à l’andalouse',
      it: 'Calamari all’andalusa',
      pl: 'Kalmary po andaluzyjsku',
    },
    description: {
      es: 'Los calamares que se visten de fiesta: nuestra gran especialidad. Crujientes, sabrosos… ¡y con acento del sur!',
      en: 'Squid dressed up for a party: our great speciality. Crispy, tasty… and with a southern accent!',
      fr: 'Des calamars sur leur trente-et-un : notre grande spécialité. Croustillants, savoureux… et avec l’accent du sud !',
      it: 'Calamari vestiti a festa: la nostra grande specialità. Croccanti, saporiti… e con l’accento del sud!',
      pl: 'Kalmary w odświętnym wydaniu: nasza wielka specjalność. Chrupiące, pyszne… i z południowym akcentem!',
    },
    price: 14.9,
    alwaysGlutenFree: true,
  },
  {
    name: {
      es: 'Croquetas caseras de berenjena con queso',
      en: 'Homemade aubergine and cheese croquettes',
      fr: 'Croquettes maison aubergine et fromage',
      it: 'Crocchette fatte in casa di melanzane e formaggio',
      pl: 'Domowe krokiety z bakłażanem i serem',
    },
    description: {
      es: 'Bocados cremosos hechos con cariño y el secreto de la abuela. Crujientes por fuera, irresistibles por dentro.',
      en: 'Creamy bites made with love and grandma’s secret. Crispy outside, irresistible inside.',
      fr: 'Des bouchées crémeuses faites avec amour et le secret de grand-mère. Croustillantes dehors, irrésistibles dedans.',
      it: 'Bocconi cremosi fatti con amore e il segreto della nonna. Croccanti fuori, irresistibili dentro.',
      pl: 'Kremowe kąski robione z miłością według sekretu babci. Chrupiące z zewnątrz, nieodparte w środku.',
    },
    price: 2.5,
    alwaysGlutenFree: true,
    photo: 'photos/croqueta-berenjena-queso',
  },
];
