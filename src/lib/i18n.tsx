import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "mk" | "en";

const dict = {
  mk: {
    brand: "Дион Центар",
    open: "Отворено",
    closed: "Затворено",
    heroTitle: "Добредојдовте во Дион Центар",
    hours: "Нед – Чет · 09:00 – 24:00  |  Пет – Саб · 09:00 – 01:00",
    hoursTitle: "Работно време",
    menuBtn: "Мени",
    findUs: "Најдете нè лесно",
    todaySpecials: "Специјалитети",
    specialsIntro:
      "Секој ден нешто ново од скарата и од шпоретот на баба — избор на нашиот готвач, подготвен со намирници од локални производители.",
    dishName: "Јадење",
    price: "600 ден",
    content: "Содржина",
    ingredients: "Намирници",
    quantity: "Количина",
    close: "Затвори",
    menuTitle: "Мени",
    menuIntro: "Сите категории",
    category: "Категорија",
    browse: "Прегледај",
    back: "Назад",
    categoryDishes: "Јадења од категоријата",
    reservations: "Резервации",
    reservationsIntro: "Резервирајте маса за вашата вечер во Дион Центар.",
    orders: "Нарачки",
    ordersIntro: "Нарачајте за дома или за понесување.",
    name: "Име и презиме",
    phone: "Телефон",
    date: "Датум",
    time: "Време",
    people: "Број на гости",
    orderNote: "Забелешка",
    address: "Адреса за достава",
    order: "Нарачка",
    pickDishes: "Изберете јадења",
    chooseCategory: "Категорија",
    addItem: "Додади",
    yourOrder: "Вашата нарачка",
    emptyOrder: "Сè уште немате избрано јадења.",
    total: "Вкупно",
    note: "Забелешка",
    send: "Испрати",
    sendError: "Настана грешка. Обидете се повторно или јавете се на телефон.",
    sent: "Ви благодариме! Ќе ве контактираме наскоро.",
    gallery: "Галерија",
    galleryIntro: "Атмосферата на Дион Центар",
    events: "Календар на настани",
    eventsIntro: "Живa музика, резервни денови за свадби, прослави и празници.",
    visitUs: "Посетете нè",
    contactUs: "Контактирајте нè",
    followUs: "Следете нè",
    rights: "Сите права задржани.",
    upcoming: "Претстојно",
    schedule: "Настани",
    reserveTable: "Резервирај маса",
    orderNow: "Нарачај сега",
    eventDetails: "Детали за настанот",
    eventIntro: "Повеќе информации за овој настан во Дион Центар.",
    backToHome: "Кон почетната",
    aboutNav: "За нас",
    aboutTitle: "За нас",
    aboutLead: "Добредојдовте во срцето на Скопје",
    aboutLeadText:
      "Од нашето отворање па сè до денес, мисијата ни е едноставна: да создадеме простор каде секој гостин ќе се чувствува како дома, но со допир на луксуз и врвна услуга. Со години го градиме нашето име преку посветеност на квалитетот, внимателно одбрани состојки и страст кон кулинарската уметност.",
    aboutS1Title: "Тераса покрај реката",
    aboutS1Text:
      "Нашата тераса на Кеј 13-ти Ноември ви овозможува да уживате во преубави речни пејзажи, во непосредна близина на главните градски обележја.",
    aboutS2Title: "Традиција и современ вкус",
    aboutS2Text:
      "Спојуваме традиционални македонски рецепти со модерни меѓународни специјалитети, подготвени од врвни мајстори на кујната.",
    aboutS3Title: "Атмосфера за секоја прилика",
    aboutS3Text:
      "Без разлика дали доаѓате на утринско кафе, деловен ручек, романтична вечера или вечерно дружење со пијалок, нашиот модерен и топол ентериер нуди совршена атмосфера за секоја прилика.",
  },
  en: {
    brand: "Dion Centar",
    open: "Open",
    closed: "Closed",
    heroTitle: "Welcome to Dion Centar",
    hours: "Sun – Thu · 09:00 – 24:00  |  Fri – Sat · 09:00 – 01:00",
    hoursTitle: "Working hours",
    menuBtn: "Menu",
    findUs: "Find us easily",
    todaySpecials: "Specialties",
    specialsIntro:
      "Something new every day from the grill and grandma's stove — our chef's picks, made with produce from local farmers.",
    dishName: "Dish",
    price: "600 MKD",
    content: "Content",
    ingredients: "Ingredients",
    quantity: "Quantity",
    close: "Close",
    menuTitle: "Menu",
    menuIntro: "All categories",
    category: "Category",
    browse: "Browse",
    back: "Back",
    categoryDishes: "Dishes in this category",
    reservations: "Reservations",
    reservationsIntro: "Book a table for your evening at Dion Centar.",
    orders: "Orders",
    ordersIntro: "Order for delivery or takeaway.",
    name: "Full name",
    phone: "Phone",
    date: "Date",
    time: "Time",
    people: "Guests",
    orderNote: "Note",
    address: "Delivery address",
    order: "Order",
    pickDishes: "Choose dishes",
    chooseCategory: "Category",
    addItem: "Add",
    yourOrder: "Your order",
    emptyOrder: "No dishes selected yet.",
    total: "Total",
    note: "Note",
    send: "Send",
    sendError: "Something went wrong. Please try again or call us.",
    sent: "Thank you! We will contact you shortly.",
    gallery: "Gallery",
    galleryIntro: "The atmosphere of Dion Centar",
    events: "Events calendar",
    eventsIntro: "Live music, reserved days for weddings, celebrations and holidays.",
    visitUs: "Visit us",
    contactUs: "Contact us",
    followUs: "Follow us",
    rights: "All rights reserved.",
    upcoming: "Upcoming",
    schedule: "Events",
    reserveTable: "Reserve a table",
    orderNow: "Order now",
    eventDetails: "Event details",
    eventIntro: "More information about this event at Dion Centar.",
    backToHome: "Back to home",
    aboutNav: "About us",
    aboutTitle: "About us",
    aboutLead: "Welcome to the heart of Skopje",
    aboutLeadText:
      "Since the day we first opened our doors, our mission has been simple: to create a space where every guest feels at home, with a touch of luxury and first-class service. Over the years we have built our name through dedication to quality, carefully selected ingredients and a passion for the culinary arts.",
    aboutS1Title: "A terrace by the river",
    aboutS1Text:
      "Our terrace on Kej 13-ti Noemvri lets you enjoy beautiful river views, right next to the city's main landmarks.",
    aboutS2Title: "Tradition meets modern taste",
    aboutS2Text:
      "We blend traditional Macedonian recipes with modern international specialties, prepared by master chefs at the top of their craft.",
    aboutS3Title: "An atmosphere for every occasion",
    aboutS3Text:
      "Whether you join us for morning coffee, a business lunch, a romantic dinner or an evening get-together with a drink, our modern and warm interior offers the perfect setting for every occasion.",
  },
} as const;

export type Key = keyof (typeof dict)["mk"];

const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: Key) => string;
}>({ lang: "mk", setLang: () => {}, t: (k) => dict.mk[k] });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("mk");
  const t = (k: Key) => dict[lang][k];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
