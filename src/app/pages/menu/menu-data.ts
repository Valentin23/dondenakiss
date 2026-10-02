import { Locale } from '../../i18n/locales';

/**
 * Dishes are not in the i18n message files: they are data with one text per
 * locale, so they can be managed from the future /admin.
 */
export type Localized = Record<Locale, string>;

export interface MenuItem {
  /** Stable id, used to feature dishes on the home page. */
  id: string;
  name: Localized;
  description?: Localized;
  price: number;
  /** Shown after the price, e.g. "por ración, mín. 2". */
  priceNote?: Localized;
  /**
   * The dish is always prepared gluten-free for everyone. Every other dish has
   * a gluten-free option on request. Not shown on the menu (the owners chose no
   * chips); kept as data for future use.
   */
  alwaysGlutenFree?: boolean;
  /** Codes of the 14 allergens in Regulation (EU) No 1169/2011. */
  allergens?: string[];
  /** Photo in public/photos, without width or extension, e.g. `photos/fideua`. */
  photo?: string;
}

export interface MenuSection {
  id: string;
  title: Localized;
  /** Every dish in the section is always gluten-free (data only, see MenuItem). */
  alwaysGlutenFree?: boolean;
  /** Shown below the title, e.g. "Precio por ración. Mínimo 2 raciones." */
  note?: Localized;
  items: MenuItem[];
  /** Shown after the items, e.g. what every burger comes with. */
  footnote?: Localized;
}

export type MenuKey = 'brunch' | 'tapas';

/** Spanish, English, French, Italian, Polish. */
function t(es: string, en: string, fr: string, it: string, pl: string): Localized {
  return { es, en, fr, it, pl };
}

const HOLLANDAISE = {
  es: 'Huevos poché con salsa holandesa',
  en: 'Poached eggs with hollandaise sauce',
  fr: 'Œufs pochés, sauce hollandaise',
  it: 'Uova in camicia con salsa olandese',
  pl: 'Jajka w koszulce z sosem holenderskim',
};

/** Benedict description: hollandaise eggs + topping, on brioche. */
function benedict(es: string, en: string, fr: string, it: string, pl: string): Localized {
  return t(
    `${HOLLANDAISE.es}, ${es}, sobre pan brioche.`,
    `${HOLLANDAISE.en}, ${en}, on brioche.`,
    `${HOLLANDAISE.fr}, ${fr}, sur pain brioché.`,
    `${HOLLANDAISE.it}, ${it}, su pan brioche.`,
    `${HOLLANDAISE.pl}, ${pl}, na brioszce.`,
  );
}

/**
 * The printed menu (October 2026). Brunch is served in the morning; "tapas"
 * is the rest of the day, desserts included.
 */
export const MENUS: Record<MenuKey, MenuSection[]> = {
  brunch: [
    {
      id: 'tostas',
      title: t('Tostas', 'Toasts', 'Tartines', 'Toast', 'Tosty'),
      items: [
        {
          id: 'tosta-super',
          name: t('Super', 'Super', 'Super', 'Super', 'Super'),
          description: t(
            'Pavo, aguacate y un huevo poché.',
            'Turkey, avocado and a poached egg.',
            'Dinde, avocat et un œuf poché.',
            'Tacchino, avocado e un uovo in camicia.',
            'Indyk, awokado i jajko w koszulce.',
          ),
          price: 6.9,
        },
        {
          id: 'tosta-charlie',
          name: t('Charlie', 'Charlie', 'Charlie', 'Charlie', 'Charlie'),
          description: t(
            'Jamón serrano, tomate en rodaja y revuelto de huevos.',
            'Serrano ham, sliced tomato and scrambled eggs.',
            'Jambon serrano, tomate en tranches et œufs brouillés.',
            'Prosciutto serrano, pomodoro a fette e uova strapazzate.',
            'Szynka serrano, plastry pomidora i jajecznica.',
          ),
          price: 6.9,
        },
        {
          id: 'tosta-light',
          name: t('Light', 'Light', 'Light', 'Light', 'Light'),
          description: t(
            'Salmón ahumado, crema de queso y rúcula, con un huevo poché.',
            'Smoked salmon, cream cheese and rocket, with a poached egg.',
            'Saumon fumé, fromage frais et roquette, avec un œuf poché.',
            'Salmone affumicato, crema di formaggio e rucola, con un uovo in camicia.',
            'Wędzony łosoś, serek śmietankowy i rukola, z jajkiem w koszulce.',
          ),
          price: 8.9,
        },
        {
          id: 'tosta-suprema',
          name: t('Suprema', 'Suprema', 'Suprema', 'Suprema', 'Suprema'),
          description: t(
            'Bacon crujiente, queso de cabra y cebolla caramelizada con rúcula.',
            'Crispy bacon, goat’s cheese and caramelised onion with rocket.',
            'Bacon croustillant, chèvre et oignon caramélisé avec roquette.',
            'Bacon croccante, formaggio di capra e cipolla caramellata con rucola.',
            'Chrupiący bekon, kozi ser i karmelizowana cebula z rukolą.',
          ),
          price: 7.5,
          photo: 'photos/tosta-suprema',
        },
        {
          id: 'tosta-fit',
          name: t('Fit', 'Fit', 'Fit', 'Fit', 'Fit'),
          description: t(
            'Queso cottage con un falso tartar de tomate y aguacate.',
            'Cottage cheese with a mock tomato and avocado tartare.',
            'Cottage cheese avec un faux tartare de tomate et d’avocat.',
            'Fiocchi di latte con un finto tartare di pomodoro e avocado.',
            'Serek wiejski z „tatarem” z pomidora i awokado.',
          ),
          price: 6.9,
        },
      ],
    },
    {
      id: 'benedict',
      title: t(
        'Benedict',
        'Eggs Benedict',
        'Œufs Bénédicte',
        'Uova alla Benedict',
        'Jajka po benedyktyńsku',
      ),
      items: [
        {
          id: 'benedict-serrano',
          name: t(
            'Con jamón serrano',
            'With Serrano ham',
            'Au jambon serrano',
            'Con prosciutto serrano',
            'Z szynką serrano',
          ),
          description: benedict(
            'jamón serrano',
            'Serrano ham',
            'jambon serrano',
            'prosciutto serrano',
            'szynka serrano',
          ),
          price: 11,
        },
        {
          id: 'benedict-salmon',
          name: t(
            'Con salmón y aguacate',
            'With salmon and avocado',
            'Au saumon et à l’avocat',
            'Con salmone e avocado',
            'Z łososiem i awokado',
          ),
          description: benedict(
            'salmón y aguacate',
            'salmon and avocado',
            'saumon et avocat',
            'salmone e avocado',
            'łosoś i awokado',
          ),
          price: 12,
          photo: 'photos/benedict-de-salmon',
        },
        {
          id: 'benedict-bacon',
          name: t(
            'Con bacón y mozzarella',
            'With bacon and mozzarella',
            'Au bacon et à la mozzarella',
            'Con bacon e mozzarella',
            'Z bekonem i mozzarellą',
          ),
          description: benedict(
            'bacón y mozzarella',
            'bacon and mozzarella',
            'bacon et mozzarella',
            'bacon e mozzarella',
            'bekon i mozzarella',
          ),
          price: 12,
        },
        {
          id: 'benedict-trufado',
          name: t('Trufado', 'Truffled', 'À la truffe', 'Al tartufo', 'Z truflą'),
          description: benedict(
            'jamón ahumado y trufa',
            'smoked ham and truffle',
            'jambon fumé et truffe',
            'prosciutto affumicato e tartufo',
            'wędzona szynka i trufla',
          ),
          price: 12.5,
          photo: 'photos/benedict-trufa',
        },
      ],
    },
    {
      id: 'revueltos',
      title: t('Revueltos', 'Scrambled eggs', 'Œufs brouillés', 'Uova strapazzate', 'Jajecznica'),
      items: [
        {
          id: 'revuelto-bacon',
          name: t('Con bacón', 'With bacon', 'Au bacon', 'Con bacon', 'Z bekonem'),
          price: 7.5,
        },
        {
          id: 'revuelto-mozzarella',
          name: t(
            'Con mozzarella',
            'With mozzarella',
            'À la mozzarella',
            'Con mozzarella',
            'Z mozzarellą',
          ),
          price: 7.5,
        },
        {
          id: 'revuelto-bacon-queso',
          name: t(
            'Con bacón y queso',
            'With bacon and cheese',
            'Au bacon et fromage',
            'Con bacon e formaggio',
            'Z bekonem i serem',
          ),
          price: 9,
          photo: 'photos/revuelto-bacon-queso',
        },
        {
          id: 'revuelto-salmon',
          name: t(
            'Con salmón ahumado',
            'With smoked salmon',
            'Au saumon fumé',
            'Con salmone affumicato',
            'Z wędzonym łososiem',
          ),
          price: 9.5,
        },
        {
          id: 'revuelto-verduras',
          name: t(
            'Con tomate, cebolla y champiñones',
            'With tomato, onion and mushrooms',
            'Tomate, oignon et champignons',
            'Con pomodoro, cipolla e funghi',
            'Z pomidorem, cebulą i pieczarkami',
          ),
          price: 9,
        },
      ],
    },
    {
      id: 'campeones',
      title: t(
        'Desayunos de campeones',
        'Breakfast of champions',
        'Petits-déjeuners de champions',
        'Colazioni da campioni',
        'Śniadania mistrzów',
      ),
      items: [
        {
          id: 'english-breakfast',
          name: t(
            'English breakfast',
            'English breakfast',
            'English breakfast',
            'English breakfast',
            'English breakfast',
          ),
          description: t(
            'Alubias, champiñones, tomate, salchichas, bacón y huevos fritos, con tostas con mantequilla.',
            'Beans, mushrooms, tomato, sausages, bacon and fried eggs, with buttered toast.',
            'Haricots, champignons, tomate, saucisses, bacon et œufs au plat, avec tartines beurrées.',
            'Fagioli, funghi, pomodoro, salsicce, bacon e uova fritte, con toast imburrati.',
            'Fasolka, pieczarki, pomidor, kiełbaski, bekon i jajka sadzone, z tostami z masłem.',
          ),
          price: 11.5,
          photo: 'photos/english-breakfast',
        },
        {
          id: 'veget',
          name: t('Veget', 'Veget', 'Veget', 'Veget', 'Veget'),
          description: t(
            'Huevos fritos, alubias, champiñones, tomate y aguacate con timbal de patatas, con tostas con AOVE.',
            'Fried eggs, beans, mushrooms, tomato and avocado with a potato timbale, with toast and extra virgin olive oil.',
            'Œufs au plat, haricots, champignons, tomate et avocat avec timbale de pommes de terre, tartines à l’huile d’olive vierge extra.',
            'Uova fritte, fagioli, funghi, pomodoro e avocado con tortino di patate, toast con olio extravergine.',
            'Jajka sadzone, fasolka, pieczarki, pomidor i awokado z ziemniakami, tosty z oliwą z oliwek.',
          ),
          price: 11.5,
          alwaysGlutenFree: true,
        },
      ],
    },
    {
      id: 'bocata',
      title: t('El bocata', 'Sandwiches', 'Sandwichs', 'Panini', 'Kanapki'),
      items: [
        {
          id: 'bocata-calamares',
          name: t('Calamares', 'Squid', 'Calamars', 'Calamari', 'Z kalmarami'),
          description: t(
            'Nuestro famoso bocadillo de calamar, que no te dejará indiferente. ¡Suculento y delicioso!',
            'Our famous squid sandwich: it won’t leave you indifferent. Juicy and delicious!',
            'Notre célèbre sandwich aux calamars, qui ne vous laissera pas indifférent. Succulent et délicieux !',
            'Il nostro famoso panino con calamari, che non ti lascerà indifferente. Succulento e delizioso!',
            'Nasza słynna kanapka z kalmarami, która nikogo nie zostawi obojętnym. Soczysta i pyszna!',
          ),
          price: 9.9,
          photo: 'photos/bocadillo-calamares',
        },
        {
          id: 'bocata-nakiss',
          name: t('Nakiss', 'Nakiss', 'Nakiss', 'Nakiss', 'Nakiss'),
          description: t(
            'Pollo crujiente y tierno con brotes tiernos y nuestra salsa casera Nakiss. Irresistible.',
            'Crispy, tender chicken with baby leaves and our homemade Nakiss sauce. Irresistible.',
            'Poulet croustillant et tendre, jeunes pousses et notre sauce maison Nakiss. Irrésistible.',
            'Pollo croccante e tenero con germogli e la nostra salsa fatta in casa Nakiss. Irresistibile.',
            'Chrupiący, delikatny kurczak z młodymi listkami i naszym domowym sosem Nakiss. Nie do odparcia.',
          ),
          price: 8.5,
          photo: 'photos/bocadillo-nakiss',
        },
        {
          id: 'bocata-vegetal',
          name: t('Vegetal', 'Vegetal', 'Vegetal', 'Vegetal', 'Vegetal'),
          description: t(
            '«El fit»: atún sobre brotes tiernos con tomate en rodaja, queso manchego, huevo duro y mayonesa.',
            '“The fit one”: tuna on baby leaves with sliced tomato, Manchego cheese, hard-boiled egg and mayonnaise.',
            '« Le fit » : thon sur jeunes pousses, tomate en tranches, manchego, œuf dur et mayonnaise.',
            '«Il fit»: tonno su germogli con pomodoro a fette, formaggio manchego, uovo sodo e maionese.',
            '„Fit”: tuńczyk na młodych listkach z pomidorem, serem manchego, jajkiem na twardo i majonezem.',
          ),
          price: 8.5,
        },
        {
          id: 'sandwich-club',
          name: t(
            'Sándwich club',
            'Club sandwich',
            'Club sandwich',
            'Club sandwich',
            'Club sandwich',
          ),
          description: t(
            'El rascacielos de los bocadillos: pollo, bacon, huevo, queso, lechuga, tomate y mayonesa en varias alturas. Con más capas que una telenovela. Con patatas fritas.',
            'The skyscraper of sandwiches: chicken, bacon, egg, cheese, lettuce, tomato and mayonnaise on several floors. More layers than a soap opera. With chips.',
            'Le gratte-ciel des sandwichs : poulet, bacon, œuf, fromage, salade, tomate et mayonnaise sur plusieurs étages. Plus de rebondissements qu’une telenovela. Avec frites.',
            'Il grattacielo dei panini: pollo, bacon, uovo, formaggio, lattuga, pomodoro e maionese su più piani. Più strati di una telenovela. Con patatine fritte.',
            'Drapacz chmur wśród kanapek: kurczak, bekon, jajko, ser, sałata, pomidor i majonez na kilku piętrach. Więcej warstw niż w telenoweli. Z frytkami.',
          ),
          price: 13.9,
          photo: 'photos/sandwich-club',
        },
      ],
    },
    {
      id: 'cuidate',
      title: t(
        'Cuídate con…',
        'Treat yourself…',
        'Faites-vous plaisir…',
        'Coccolati con…',
        'Rozpieść się…',
      ),
      items: [
        {
          id: 'tortitas-nata',
          name: t(
            'Tortitas con nata',
            'Pancakes with cream',
            'Pancakes à la chantilly',
            'Pancake con panna',
            'Pancakes z bitą śmietaną',
          ),
          description: t(
            'Con chocolate o dulce de leche.',
            'With chocolate or dulce de leche.',
            'Au chocolat ou à la confiture de lait.',
            'Con cioccolato o dulce de leche.',
            'Z czekoladą lub dulce de leche.',
          ),
          price: 7.5,
          alwaysGlutenFree: true,
        },
        {
          id: 'tortitas-platano',
          name: t(
            'Tortitas con plátano',
            'Pancakes with banana',
            'Pancakes à la banane',
            'Pancake con banana',
            'Pancakes z bananem',
          ),
          description: t(
            'Con chocolate o dulce de leche.',
            'With chocolate or dulce de leche.',
            'Au chocolat ou à la confiture de lait.',
            'Con cioccolato o dulce de leche.',
            'Z czekoladą lub dulce de leche.',
          ),
          price: 8.5,
          alwaysGlutenFree: true,
        },
        {
          id: 'tortitas-fresas',
          name: t(
            'Tortitas con fresas',
            'Pancakes with strawberries',
            'Pancakes aux fraises',
            'Pancake con fragole',
            'Pancakes z truskawkami',
          ),
          description: t(
            'Con chocolate o dulce de leche.',
            'With chocolate or dulce de leche.',
            'Au chocolat ou à la confiture de lait.',
            'Con cioccolato o dulce de leche.',
            'Z czekoladą lub dulce de leche.',
          ),
          price: 9.5,
          alwaysGlutenFree: true,
        },
        {
          id: 'tortitas-arce',
          name: t(
            'Tortitas con mantequilla y sirope de arce',
            'Pancakes with butter and maple syrup',
            'Pancakes beurre et sirop d’érable',
            'Pancake con burro e sciroppo d’acero',
            'Pancakes z masłem i syropem klonowym',
          ),
          price: 12.5,
          alwaysGlutenFree: true,
        },
        {
          id: 'yogur-uva',
          name: t(
            'Bol de yogur con miel, chía y uva',
            'Yoghurt bowl with honey, chia and grapes',
            'Bol de yaourt, miel, chia et raisin',
            'Bowl di yogurt con miele, chia e uva',
            'Miska jogurtu z miodem, chia i winogronami',
          ),
          price: 6.5,
          alwaysGlutenFree: true,
        },
        {
          id: 'yogur-fresa',
          name: t(
            'Bol de yogur con miel, chía, fresa y plátano',
            'Yoghurt bowl with honey, chia, strawberry and banana',
            'Bol de yaourt, miel, chia, fraise et banane',
            'Bowl di yogurt con miele, chia, fragola e banana',
            'Miska jogurtu z miodem, chia, truskawką i bananem',
          ),
          price: 8.5,
          alwaysGlutenFree: true,
        },
      ],
    },
    {
      id: 'completo',
      title: t('Un completo', 'The Completo', 'Le Completo', 'Il Completo', 'Zestaw Completo'),
      items: [
        {
          id: 'completo',
          name: t('Un completo', 'The Completo', 'Le Completo', 'Il Completo', 'Zestaw Completo'),
          description: t(
            'Una tosta o un revuelto a elegir + zumo de naranja + café + tortitas (chocolate o dulce de leche y nata) o bol de yogur.',
            'Any toast or scrambled eggs + orange juice + coffee + pancakes (chocolate or dulce de leche, and cream) or a yoghurt bowl.',
            'Une tartine ou des œufs brouillés au choix + jus d’orange + café + pancakes (chocolat ou confiture de lait, et chantilly) ou bol de yaourt.',
            'Un toast o uova strapazzate a scelta + spremuta d’arancia + caffè + pancake (cioccolato o dulce de leche e panna) o bowl di yogurt.',
            'Dowolny tost lub jajecznica + sok pomarańczowy + kawa + pancakes (czekolada lub dulce de leche i bita śmietana) albo miska jogurtu.',
          ),
          price: 20,
        },
      ],
    },
  ],
  tapas: [
    {
      id: 'entradas',
      alwaysGlutenFree: true,
      title: t(
        'Entradas frías',
        'Cold starters',
        'Entrées froides',
        'Antipasti freddi',
        'Przystawki na zimno',
      ),
      items: [
        {
          id: 'ensalada-salazones',
          name: t(
            'Ensalada de salazones',
            'Salt-cured fish salad',
            'Salade de salaisons',
            'Insalata di salagioni',
            'Sałatka z solonych ryb',
          ),
          description: t(
            'Salazones tradicionales con huevo duro, tomate, alcaparras y piparras, aliñada con AOVE.',
            'Traditional salt-cured fish with hard-boiled egg, tomato, capers and guindilla peppers, dressed with extra virgin olive oil.',
            'Salaisons traditionnelles avec œuf dur, tomate, câpres et piments guindilla, à l’huile d’olive vierge extra.',
            'Salagioni tradizionali con uovo sodo, pomodoro, capperi e peperoncini piparras, condita con olio extravergine.',
            'Tradycyjne solone ryby z jajkiem na twardo, pomidorem, kaparami i papryczkami piparras, z oliwą z oliwek.',
          ),
          price: 16,
          photo: 'photos/ensalada-de-salazones',
        },
        {
          id: 'ensalada-cesar',
          name: t(
            'Ensalada César',
            'Caesar salad',
            'Salade César',
            'Insalata Caesar',
            'Sałatka Cezar',
          ),
          description: t(
            'Lechuga romana, pollo crujiente, lascas de parmesano, salsa César y tomatitos cherry.',
            'Romaine lettuce, crispy chicken, Parmesan shavings, Caesar dressing and cherry tomatoes.',
            'Laitue romaine, poulet croustillant, copeaux de parmesan, sauce César et tomates cerises.',
            'Lattuga romana, pollo croccante, scaglie di parmigiano, salsa Caesar e pomodorini.',
            'Sałata rzymska, chrupiący kurczak, płatki parmezanu, sos Cezar i pomidorki koktajlowe.',
          ),
          price: 13,
          photo: 'photos/ensalada-cesar',
        },
        {
          id: 'ensalada-chester',
          name: t(
            'Ensalada Chester',
            'Chester salad',
            'Salade Chester',
            'Insalata Chester',
            'Sałatka Chester',
          ),
          description: t(
            'Queso de cabra caramelizado sobre brotes tiernos, con tomatitos cherry, nueces caramelizadas, jamón serrano y crema balsámica.',
            'Caramelised goat’s cheese on baby leaves, with cherry tomatoes, caramelised walnuts, Serrano ham and balsamic glaze.',
            'Chèvre caramélisé sur jeunes pousses, tomates cerises, noix caramélisées, jambon serrano et crème balsamique.',
            'Formaggio di capra caramellato su germogli, con pomodorini, noci caramellate, prosciutto serrano e crema di balsamico.',
            'Karmelizowany kozi ser na młodych listkach, z pomidorkami, karmelizowanymi orzechami, szynką serrano i kremem balsamicznym.',
          ),
          price: 12.9,
        },
        {
          id: 'gazpacho',
          name: t(
            'Gazpacho andaluz',
            'Andalusian gazpacho',
            'Gaspacho andalou',
            'Gazpacho andaluso',
            'Gazpacho andaluzyjskie',
          ),
          description: t(
            'Sopa fría y refrescante de tomate, pimiento y pepino con AOVE. El emblema del verano andaluz.',
            'Cold, refreshing tomato, pepper and cucumber soup with extra virgin olive oil. The emblem of Andalusian summer.',
            'Soupe froide et rafraîchissante de tomate, poivron et concombre à l’huile d’olive. L’emblème de l’été andalou.',
            'Zuppa fredda e rinfrescante di pomodoro, peperone e cetriolo con olio extravergine. Il simbolo dell’estate andalusa.',
            'Zimna, orzeźwiająca zupa z pomidorów, papryki i ogórka z oliwą z oliwek. Symbol andaluzyjskiego lata.',
          ),
          price: 7.5,
        },
        {
          id: 'ensaladilla',
          name: t(
            'Ensaladilla rusa',
            'Russian salad',
            'Salade russe',
            'Insalata russa',
            'Sałatka jarzynowa',
          ),
          description: t(
            'Un clásico: patata, zanahoria y atún con suave mayonesa. Cremosa, sabrosa y siempre apetecible.',
            'A classic: potato, carrot and tuna in a light mayonnaise. Creamy, tasty and always tempting.',
            'Un classique : pomme de terre, carotte et thon à la mayonnaise douce. Crémeuse et toujours appétissante.',
            'Un classico: patate, carote e tonno con maionese delicata. Cremosa, saporita e sempre invitante.',
            'Klasyk: ziemniaki, marchewka i tuńczyk w delikatnym majonezie. Kremowa i zawsze apetyczna.',
          ),
          price: 6.5,
          photo: 'photos/ensaladilla-rusa',
        },
      ],
    },
    {
      id: 'tapeo',
      alwaysGlutenFree: true,
      title: t('Tapeo', 'Tapas', 'Tapas', 'Tapas', 'Tapas'),
      items: [
        {
          id: 'bravas',
          name: t(
            'Patatas bravas',
            'Patatas bravas',
            'Patatas bravas',
            'Patatas bravas',
            'Patatas bravas',
          ),
          description: t(
            'Crujientes por fuera, tiernas por dentro, con una salsa picante que despierta el paladar.',
            'Crispy outside, tender inside, with a spicy sauce that wakes up your palate.',
            'Croustillantes dehors, fondantes dedans, avec une sauce piquante qui réveille les papilles.',
            'Croccanti fuori, tenere dentro, con una salsa piccante che risveglia il palato.',
            'Chrupiące z zewnątrz, miękkie w środku, z pikantnym sosem, który budzi kubki smakowe.',
          ),
          price: 8.5,
          photo: 'photos/patatas-bravas',
        },
        {
          id: 'calamares-andaluza',
          name: t(
            'Calamares a la andaluza',
            'Andalusian-style fried squid',
            'Calamars à l’andalouse',
            'Calamari all’andalusa',
            'Kalmary po andaluzyjsku',
          ),
          description: t(
            'Los calamares que se visten de fiesta: nuestra gran especialidad. Crujientes, sabrosos… ¡y con acento del sur!',
            'Squid dressed up for a party: our great speciality. Crispy, tasty… and with a southern accent!',
            'Des calamars sur leur trente-et-un : notre grande spécialité. Croustillants, savoureux… et avec l’accent du sud !',
            'Calamari vestiti a festa: la nostra grande specialità. Croccanti, saporiti… e con l’accento del sud!',
            'Kalmary w odświętnym wydaniu: nasza wielka specjalność. Chrupiące, pyszne… i z południowym akcentem!',
          ),
          price: 14.9,
        },
        {
          id: 'calamar-plancha',
          name: t(
            'Calamar nacional a la plancha',
            'Grilled local squid',
            'Calamar local à la plancha',
            'Calamaro nostrano alla piastra',
            'Grillowany kalmar z hiszpańskich wód',
          ),
          description: t(
            'Calamar fresco, dorado en la plancha con ajo y perejil. Sabe a verano y mar.',
            'Fresh squid, golden on the griddle with garlic and parsley. It tastes of summer and the sea.',
            'Calamar frais, doré à la plancha avec ail et persil. Un goût d’été et de mer.',
            'Calamaro fresco, dorato alla piastra con aglio e prezzemolo. Sa d’estate e di mare.',
            'Świeży kalmar z grilla z czosnkiem i natką pietruszki. Smakuje latem i morzem.',
          ),
          price: 21,
          photo: 'photos/calamar-nacional-plancha',
        },
        {
          id: 'gambas-gabardina',
          name: t(
            'Gambas a la gabardina',
            'Battered prawns',
            'Crevettes en beignet',
            'Gamberi in pastella',
            'Krewetki w cieście',
          ),
          description: t(
            'Gambas crujientes envueltas en su abrigo dorado. Un clásico de barra… ¡no te comes solo una!',
            'Crispy prawns in a golden coat. A bar classic… you won’t stop at one!',
            'Des crevettes croustillantes dans leur manteau doré. Un classique du comptoir… impossible d’en manger une seule !',
            'Gamberi croccanti nel loro cappotto dorato. Un classico da bancone… non ne mangi solo uno!',
            'Chrupiące krewetki w złocistym płaszczyku. Barowy klasyk… na jednej się nie skończy!',
          ),
          price: 14,
        },
        {
          id: 'tiras-pollo',
          name: t(
            'Tiras de pollo crujiente',
            'Crispy chicken strips',
            'Aiguillettes de poulet croustillant',
            'Straccetti di pollo croccante',
            'Chrupiące paski kurczaka',
          ),
          description: t(
            'Jugosas por dentro, doradas por fuera. Perfectas para mojar, picar… ¡y repetir!',
            'Juicy inside, golden outside. Perfect for dipping, sharing… and ordering again!',
            'Juteuses dedans, dorées dehors. Parfaites à tremper, à partager… et à recommander !',
            'Succosi dentro, dorati fuori. Perfetti da intingere, stuzzicare… e ripetere!',
            'Soczyste w środku, złociste z zewnątrz. Idealne do maczania, podjadania… i na dokładkę!',
          ),
          price: 10.5,
          photo: 'photos/tiras-pollo-crujientes',
        },
        {
          id: 'boquerones',
          name: t(
            'Boquerones fritos',
            'Fried anchovies',
            'Anchois frits',
            'Alici fritte',
            'Smażone sardele',
          ),
          description: t(
            'Pequeños tesoros del mar, rebozados y fritos hasta quedar crujientes.',
            'Little treasures of the sea, coated and fried until crispy.',
            'Petits trésors de la mer, enrobés et frits jusqu’à être croustillants.',
            'Piccoli tesori del mare, infarinati e fritti fino a diventare croccanti.',
            'Małe skarby morza, obtoczone i usmażone na chrupko.',
          ),
          price: 11,
        },
        {
          id: 'croquetas',
          name: t(
            'Croquetas caseras',
            'Homemade croquettes',
            'Croquettes maison',
            'Crocchette fatte in casa',
            'Domowe krokiety',
          ),
          description: t(
            'De bacalao, berenjena con queso, jamón, seta trufada con queso o sepia. Con el secreto de la abuela: crujientes por fuera, irresistibles por dentro.',
            'Cod, aubergine and cheese, ham, truffled mushroom and cheese, or cuttlefish. Grandma’s secret: crispy outside, irresistible inside.',
            'Morue, aubergine et fromage, jambon, champignon truffé et fromage, ou seiche. Le secret de grand-mère : croustillantes dehors, irrésistibles dedans.',
            'Baccalà, melanzane e formaggio, prosciutto, funghi tartufati e formaggio, o seppia. Il segreto della nonna: croccanti fuori, irresistibili dentro.',
            'Z dorszem, bakłażanem i serem, szynką, truflowymi grzybami i serem albo mątwą. Sekret babci: chrupiące z zewnątrz, nieodparte w środku.',
          ),
          price: 2.5,
          photo: 'photos/croquetas-setas-trufada',
        },
        {
          id: 'provolone',
          name: t(
            'Provolone al horno',
            'Baked provolone',
            'Provolone au four',
            'Provola al forno',
            'Zapiekany provolone',
          ),
          description: t(
            'Queso provolone fundido, calentito y cremoso, listo para untar.',
            'Melted provolone, warm and creamy, ready to spread.',
            'Provolone fondu, chaud et crémeux, prêt à tartiner.',
            'Provola fusa, calda e cremosa, pronta da spalmare.',
            'Roztopiony ser provolone, ciepły i kremowy, gotowy do smarowania.',
          ),
          price: 10.5,
        },
        {
          id: 'huevos-rotos',
          name: t(
            'Huevos rotos con jamón',
            'Broken eggs with ham',
            'Œufs cassés au jambon',
            'Uova rotte con prosciutto',
            'Rozbite jajka z szynką',
          ),
          description: t(
            'Huevos fritos con la yema en su punto sobre patatas caseras, con pimientos de Padrón. Y alguno que pica.',
            'Fried eggs with runny yolks on homemade chips, with Padrón peppers. Some of them are hot.',
            'Œufs au plat, jaune coulant, sur frites maison, avec piments de Padrón. Certains piquent.',
            'Uova fritte con il tuorlo al punto giusto su patate fatte in casa, con peperoni di Padrón. Qualcuno pizzica.',
            'Jajka sadzone z płynnym żółtkiem na domowych frytkach, z papryczkami z Padrón. Niektóre są ostre.',
          ),
          price: 12,
          photo: 'photos/huevos-rotos',
        },
      ],
    },
    {
      id: 'arroces',
      alwaysGlutenFree: true,
      title: t(
        'Arroces y fideuá',
        'Rice dishes and fideuà',
        'Riz et fideuà',
        'Risi e fideuà',
        'Dania z ryżu i fideuà',
      ),
      note: t(
        'Todos se pueden pedir también en fideuá. Precio por ración, mínimo 2 raciones.',
        'All of them are also available as fideuà (noodle paella). Price per serving, minimum 2 servings.',
        'Tous existent aussi en fideuà (paella de vermicelles). Prix par portion, minimum 2 portions.',
        'Tutti si possono ordinare anche come fideuà (paella di spaghettini). Prezzo a porzione, minimo 2 porzioni.',
        'Każde danie można zamówić także jako fideuà (paella z makaronem). Cena za porcję, minimum 2 porcje.',
      ),
      items: [
        {
          id: 'senyoret',
          name: t(
            'Senyoret, arroz negro o arroz a banda',
            'Senyoret, black rice or arroz a banda',
            'Senyoret, riz noir ou arroz a banda',
            'Senyoret, riso nero o arroz a banda',
            'Senyoret, czarny ryż lub arroz a banda',
          ),
          description: t(
            'Arroz seco o meloso con marisco pelado y pescado limpio, para que comas como un señor: mucho sabor, cero trabajo.',
            'Dry or creamy rice with peeled seafood and boned fish, so you can eat like a lord: lots of flavour, zero work.',
            'Riz sec ou crémeux aux fruits de mer décortiqués et poisson sans arêtes, pour manger comme un seigneur : beaucoup de goût, zéro effort.',
            'Riso asciutto o cremoso con frutti di mare sgusciati e pesce pulito, per mangiare come un signore: tanto sapore, zero fatica.',
            'Ryż na sucho lub kremowy z obranymi owocami morza i rybą bez ości, żeby jeść jak pan: dużo smaku, zero wysiłku.',
          ),
          price: 14.9,
          photo: 'photos/arroz-negro',
        },
        {
          id: 'arroz-solomillo-boletus',
          name: t(
            'Solomillo ibérico con boletus',
            'Iberian pork tenderloin with porcini',
            'Filet de porc ibérique aux cèpes',
            'Filetto di maiale iberico con porcini',
            'Polędwiczka iberyjska z borowikami',
          ),
          description: t(
            'Arroz meloso con trocitos de solomillo tierno y el aroma irresistible de los boletus.',
            'Creamy rice with tender pieces of tenderloin and the irresistible aroma of porcini.',
            'Riz crémeux aux morceaux de filet tendre et au parfum irrésistible des cèpes.',
            'Riso cremoso con bocconcini di filetto tenero e il profumo irresistibile dei porcini.',
            'Kremowy ryż z kawałkami delikatnej polędwiczki i niezwykłym aromatem borowików.',
          ),
          price: 15,
        },
        {
          id: 'arroz-verduras',
          name: t('Verduras', 'Vegetables', 'Légumes', 'Verdure', 'Z warzywami'),
          description: t(
            'Arroz con verduras de temporada al punto justo. Ligero, sano… y nada aburrido.',
            'Rice with seasonal vegetables cooked just right. Light, healthy… and anything but boring.',
            'Riz aux légumes de saison cuits à point. Léger, sain… et pas du tout ennuyeux.',
            'Riso con verdure di stagione cotte al punto giusto. Leggero, sano… e per niente noioso.',
            'Ryż z sezonowymi warzywami ugotowanymi w punkt. Lekki, zdrowy… i wcale nie nudny.',
          ),
          price: 13.9,
        },
      ],
    },
    {
      id: 'platazo',
      alwaysGlutenFree: true,
      title: t('Platazo', 'Mains', 'Plats', 'Piatti forti', 'Dania główne'),
      items: [
        {
          id: 'fish-and-chips',
          name: t(
            'Fish and chips',
            'Fish and chips',
            'Fish and chips',
            'Fish and chips',
            'Fish and chips',
          ),
          description: t(
            'Filete de pescado rebozado con patatas fritas al estilo inglés. Un clásico de pub que nunca falla… ni con vinagre.',
            'Battered fish fillet with chips, English style. A pub classic that never fails… vinegar included.',
            'Filet de poisson pané et frites à l’anglaise. Un classique de pub qui ne déçoit jamais… même au vinaigre.',
            'Filetto di pesce in pastella con patatine all’inglese. Un classico da pub che non delude mai… nemmeno con l’aceto.',
            'Ryba w cieście z frytkami po angielsku. Pubowy klasyk, który nigdy nie zawodzi… nawet z octem.',
          ),
          price: 14.9,
        },
        {
          id: 'solomillo-ajetes',
          name: t(
            'Solomillo ibérico trinchado con ajetes',
            'Sliced Iberian pork tenderloin with young garlic',
            'Filet de porc ibérique tranché aux aillets',
            'Filetto di maiale iberico a fette con aglio fresco',
            'Plastry polędwiczki iberyjskiej z młodym czosnkiem',
          ),
          description: t(
            'Jugoso solomillo ibérico en lonchas, salteado con ajetes tiernos. Pura gloria en cada bocado.',
            'Juicy Iberian tenderloin, sliced and sautéed with tender young garlic. Pure glory in every bite.',
            'Filet ibérique juteux en tranches, sauté aux aillets tendres. Un pur bonheur à chaque bouchée.',
            'Succoso filetto iberico a fette, saltato con aglio fresco. Pura gloria a ogni boccone.',
            'Soczysta polędwiczka iberyjska w plastrach, smażona z młodym czosnkiem. Czysta rozkosz w każdym kęsie.',
          ),
          price: 14.9,
        },
        {
          id: 'entrecot',
          name: t('Entrecot', 'Entrecôte steak', 'Entrecôte', 'Entrecôte', 'Antrykot'),
          description: t(
            'Corte noble, jugoso y sabroso, marcado al punto justo. Puro placer carnívoro.',
            'A noble cut, juicy and tasty, seared just right. Pure carnivore pleasure.',
            'Une pièce noble, juteuse et savoureuse, saisie à point. Un pur plaisir carnivore.',
            'Un taglio nobile, succoso e saporito, scottato al punto giusto. Puro piacere carnivoro.',
            'Szlachetny, soczysty kawałek mięsa, wysmażony w punkt. Czysta przyjemność dla mięsożerców.',
          ),
          price: 24,
        },
      ],
    },
    {
      id: 'hamburguesas',
      title: t('Hamburguesas', 'Burgers', 'Burgers', 'Hamburger', 'Burgery'),
      items: [
        {
          id: 'hamburguesa-nakiss',
          name: t('Nakiss', 'Nakiss', 'Nakiss', 'Nakiss', 'Nakiss'),
          description: t(
            'Bacon crujiente, queso fundido, lechuga, tomate, cebolla crispy, huevo y carne 100 % ternera casera. Una torre de sabor para valientes.',
            'Crispy bacon, melted cheese, lettuce, tomato, crispy onion, egg and a homemade 100% beef patty. A tower of flavour for the brave.',
            'Bacon croustillant, fromage fondu, salade, tomate, oignon frit, œuf et steak maison 100 % bœuf. Une tour de saveurs pour les courageux.',
            'Bacon croccante, formaggio fuso, lattuga, pomodoro, cipolla croccante, uovo e carne 100% manzo fatta in casa. Una torre di sapore per i coraggiosi.',
            'Chrupiący bekon, roztopiony ser, sałata, pomidor, chrupiąca cebulka, jajko i domowy kotlet ze 100% wołowiny. Wieża smaku dla odważnych.',
          ),
          price: 15.5,
          photo: 'photos/hamburguesa-nakiss',
        },
        {
          id: 'hamburguesa-gourmet',
          name: t('Gourmet', 'Gourmet', 'Gourmet', 'Gourmet', 'Gourmet'),
          description: t(
            'Queso de cabra caramelizado, rúcula fresca, cebolla crujiente y bacon dorado sobre carne 100 % ternera. Dulce, salada y crujiente.',
            'Caramelised goat’s cheese, fresh rocket, crispy onion and golden bacon on a 100% beef patty. Sweet, salty and crunchy.',
            'Chèvre caramélisé, roquette fraîche, oignon croustillant et bacon doré sur steak 100 % bœuf. Sucré, salé et croquant.',
            'Formaggio di capra caramellato, rucola fresca, cipolla croccante e bacon dorato su carne 100% manzo. Dolce, salata e croccante.',
            'Karmelizowany kozi ser, świeża rukola, chrupiąca cebulka i złocisty bekon na kotlecie ze 100% wołowiny. Słodki, słony i chrupiący.',
          ),
          price: 15.9,
          photo: 'photos/hamburguesa-gourmet',
        },
        {
          id: 'hamburguesa-americana',
          name: t('Americana', 'American', 'Américain', 'Americana', 'Amerykański'),
          description: t(
            'Doble de carne 100 % ternera, doble de queso cheddar, pepinillo, bacon y lechuga. Para los que no se andan con tonterías.',
            'Double 100% beef patty, double cheddar, pickles, bacon and lettuce. For those who mean business.',
            'Double steak 100 % bœuf, double cheddar, cornichons, bacon et salade. Pour ceux qui ne font pas dans la dentelle.',
            'Doppia carne 100% manzo, doppio cheddar, cetriolini, bacon e lattuga. Per chi non scherza.',
            'Podwójny kotlet ze 100% wołowiny, podwójny cheddar, ogórek konserwowy, bekon i sałata. Dla tych, którzy nie żartują.',
          ),
          price: 18.9,
          photo: 'photos/hamburguesa-americana',
        },
      ],
      footnote: t(
        'Todas nuestras hamburguesas vienen con patatas fritas y nuestra salsa casera Chiri. ¡Una delicia!',
        'All our burgers come with chips and our homemade Chiri sauce. Delicious!',
        'Tous nos burgers sont servis avec des frites et notre sauce maison Chiri. Un délice !',
        'Tutti i nostri hamburger sono serviti con patatine fritte e la nostra salsa fatta in casa Chiri. Una delizia!',
        'Wszystkie nasze burgery podajemy z frytkami i domowym sosem Chiri. Pycha!',
      ),
    },
    {
      id: 'postres',
      alwaysGlutenFree: true,
      title: t('Postres', 'Desserts', 'Desserts', 'Dolci', 'Desery'),
      items: [
        {
          id: 'pan-calatrava',
          name: t(
            'Pan de Calatrava',
            'Pan de Calatrava',
            'Pan de Calatrava',
            'Pan de Calatrava',
            'Pan de Calatrava',
          ),
          description: t(
            'Tradición dulce con final caramelizado.',
            'A sweet Murcian tradition with a caramelised finish.',
            'Une douceur traditionnelle au final caramélisé.',
            'Una dolce tradizione con finale caramellato.',
            'Słodka tradycja z karmelizowanym wykończeniem.',
          ),
          price: 5.9,
        },
        {
          id: 'tiramisu',
          name: t('Tiramisú', 'Tiramisu', 'Tiramisu', 'Tiramisù', 'Tiramisu'),
          description: t(
            'Capas suaves de mascarpone y bizcocho bañadas en café, coronadas con cacao.',
            'Soft layers of mascarpone and sponge soaked in coffee, topped with cocoa.',
            'Couches moelleuses de mascarpone et de biscuit imbibé de café, saupoudrées de cacao.',
            'Morbidi strati di mascarpone e pan di Spagna bagnati nel caffè, con una spolverata di cacao.',
            'Delikatne warstwy mascarpone i biszkoptu nasączonego kawą, posypane kakao.',
          ),
          price: 5.9,
        },
        {
          id: 'panna-cotta',
          name: t('Panna cotta', 'Panna cotta', 'Panna cotta', 'Panna cotta', 'Panna cotta'),
          description: t(
            'Cremosidad italiana con fresas frescas y un toque de caramelo hecho en casa.',
            'Italian creaminess with fresh strawberries and a touch of homemade caramel.',
            'Onctuosité italienne aux fraises fraîches et une touche de caramel maison.',
            'Cremosità italiana con fragole fresche e un tocco di caramello fatto in casa.',
            'Włoska kremowość ze świeżymi truskawkami i odrobiną domowego karmelu.',
          ),
          price: 5.9,
        },
        {
          id: 'brownie',
          name: t(
            'Brownie de chocolate',
            'Chocolate brownie',
            'Brownie au chocolat',
            'Brownie al cioccolato',
            'Brownie czekoladowe',
          ),
          description: t(
            'Intenso y jugoso, servido caliente con helado de vainilla y sirope de dulce de leche.',
            'Rich and moist, served warm with vanilla ice cream and dulce de leche syrup.',
            'Intense et fondant, servi chaud avec glace vanille et sirop de confiture de lait.',
            'Intenso e umido, servito caldo con gelato alla vaniglia e sciroppo di dulce de leche.',
            'Intensywne i wilgotne, podawane na ciepło z lodami waniliowymi i syropem dulce de leche.',
          ),
          price: 5.9,
        },
        {
          id: 'tarta-toblerone',
          name: t(
            'Tarta Toblerone',
            'Toblerone cake',
            'Gâteau Toblerone',
            'Torta Toblerone',
            'Tort Toblerone',
          ),
          description: t(
            'Un homenaje al chocolate más icónico, en versión tarta.',
            'A tribute to the most iconic chocolate, as a cake.',
            'Un hommage au chocolat le plus iconique, version gâteau.',
            'Un omaggio al cioccolato più iconico, in versione torta.',
            'Hołd dla najbardziej kultowej czekolady, w wersji tortu.',
          ),
          price: 4.9,
        },
      ],
    },
  ],
};

export interface FeaturedDish {
  id: string;
  /** Overrides for the home page, where the dish appears out of its section. */
  name?: Localized;
  description?: Localized;
  priceNote?: Localized;
  photo?: string;
}

/** "Los que más se piden" on the home page, in order. */
const FEATURED: FeaturedDish[] = [
  {
    id: 'benedict-trufado',
    name: t(
      'Benedict trufado',
      'Truffled eggs Benedict',
      'Œufs Bénédicte à la truffe',
      'Uova alla Benedict al tartufo',
      'Jajka po benedyktyńsku z truflą',
    ),
  },
  {
    // The seafood rice ("Senyoret") made with noodles: same section and price.
    id: 'senyoret',
    name: t(
      'Fideuá de marisco',
      'Seafood fideuà',
      'Fideuà aux fruits de mer',
      'Fideuà di mare',
      'Fideuà z owocami morza',
    ),
    description: t(
      'Fideos finos con marisco pelado y pescado limpio, para que comas como un señor: mucho sabor, cero trabajo.',
      'Thin noodles with peeled seafood and boned fish, so you can eat like a lord: lots of flavour, zero work.',
      'Vermicelles aux fruits de mer décortiqués et poisson sans arêtes, pour manger comme un seigneur : beaucoup de goût, zéro effort.',
      'Spaghettini con frutti di mare sgusciati e pesce pulito, per mangiare come un signore: tanto sapore, zero fatica.',
      'Cienki makaron z obranymi owocami morza i rybą bez ości, żeby jeść jak pan: dużo smaku, zero wysiłku.',
    ),
    priceNote: t(
      'por ración, mín. 2',
      'per serving, min. 2',
      'par portion, min. 2',
      'a porzione, min. 2',
      'za porcję, min. 2',
    ),
    photo: 'photos/fideua',
  },
  { id: 'calamares-andaluza' },
  {
    id: 'croquetas',
    name: t(
      'Croquetas caseras de berenjena con queso',
      'Homemade aubergine and cheese croquettes',
      'Croquettes maison aubergine et fromage',
      'Crocchette fatte in casa di melanzane e formaggio',
      'Domowe krokiety z bakłażanem i serem',
    ),
    description: t(
      'Bocados cremosos hechos con cariño y el secreto de la abuela. Crujientes por fuera, irresistibles por dentro.',
      'Creamy bites made with love and grandma’s secret. Crispy outside, irresistible inside.',
      'Des bouchées crémeuses faites avec amour et le secret de grand-mère. Croustillantes dehors, irrésistibles dedans.',
      'Bocconi cremosi fatti con amore e il segreto della nonna. Croccanti fuori, irresistibili dentro.',
      'Kremowe kąski robione z miłością według sekretu babci. Chrupiące z zewnątrz, nieodparte w środku.',
    ),
    photo: 'photos/croqueta-berenjena-queso',
  },
];

/** Every dish, with `alwaysGlutenFree` also set when its whole section is. */
const ALL_ITEMS: MenuItem[] = Object.values(MENUS).flatMap((sections) =>
  sections.flatMap((section) =>
    section.items.map((item) =>
      section.alwaysGlutenFree ? { ...item, alwaysGlutenFree: true } : item,
    ),
  ),
);

/** Featured dishes with their price taken from the menu, so it is defined once. */
export const FEATURED_DISHES: MenuItem[] = FEATURED.map(({ id, ...overrides }) => {
  const item = ALL_ITEMS.find((i) => i.id === id);
  if (!item) {
    throw new Error(`Featured dish "${id}" is not in MENUS`);
  }
  const defined = Object.fromEntries(Object.entries(overrides).filter(([, v]) => v !== undefined));
  return { ...item, ...defined };
});
