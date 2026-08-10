/** Hero copy on the home lens — keyed by ISO 639-1 locale. */
export type HomeHeroCopy = {
  lensHint: string;
  line1: string;
  line2: string;
  uploadAria: string;
  back: string;
};

export const HOME_HERO_LOCALES = [
  "fr",
  "de",
  "it",
  "es",
  "pt",
  "nl",
  "pl",
  "en",
  "sv",
  "da",
  "fi",
  "cs",
  "ro",
  "el",
  "hu",
  "bg",
  "hr",
  "sk",
  "sl",
  "et",
  "lv",
  "lt",
  "ga",
  "mt",
  "no",
  "is",
] as const;

export type HomeHeroLocale = (typeof HOME_HERO_LOCALES)[number];

const COPY: Record<HomeHeroLocale, HomeHeroCopy> = {
  fr: {
    lensHint: "Envoyez la photo de ce que vous cherchez.",
    line1: "Vous savez ce que vous voulez.",
    line2: "On vous trouve les vendeurs.",
    uploadAria: "Choisir une photo",
    back: "Retour",
  },
  de: {
    lensHint: "Senden Sie ein Foto von dem, was Sie suchen.",
    line1: "Sie wissen, was Sie wollen.",
    line2: "Wir finden die Verkäufer für Sie.",
    uploadAria: "Foto auswählen",
    back: "Zurück",
  },
  it: {
    lensHint: "Invia la foto di ciò che cerchi.",
    line1: "Sai cosa vuoi.",
    line2: "Troviamo i venditori per te.",
    uploadAria: "Scegli una foto",
    back: "Indietro",
  },
  es: {
    lensHint: "Envía la foto de lo que buscas.",
    line1: "Sabes lo que quieres.",
    line2: "Te encontramos los vendedores.",
    uploadAria: "Elegir una foto",
    back: "Volver",
  },
  pt: {
    lensHint: "Envie a foto do que procura.",
    line1: "Sabe o que quer.",
    line2: "Encontramos os vendedores por si.",
    uploadAria: "Escolher uma foto",
    back: "Voltar",
  },
  nl: {
    lensHint: "Stuur de foto van wat u zoekt.",
    line1: "U weet wat u wilt.",
    line2: "Wij vinden de verkopers voor u.",
    uploadAria: "Kies een foto",
    back: "Terug",
  },
  pl: {
    lensHint: "Wyślij zdjęcie tego, czego szukasz.",
    line1: "Wiesz, czego chcesz.",
    line2: "Znajdziemy dla Ciebie sprzedawców.",
    uploadAria: "Wybierz zdjęcie",
    back: "Wstecz",
  },
  en: {
    lensHint: "Send a photo of what you're looking for.",
    line1: "You know what you want.",
    line2: "We'll find the sellers for you.",
    uploadAria: "Choose a photo",
    back: "Back",
  },
  sv: {
    lensHint: "Skicka en bild på det du letar efter.",
    line1: "Du vet vad du vill ha.",
    line2: "Vi hittar säljarna åt dig.",
    uploadAria: "Välj en bild",
    back: "Tillbaka",
  },
  da: {
    lensHint: "Send et billede af det, du leder efter.",
    line1: "Du ved, hvad du vil have.",
    line2: "Vi finder sælgerne for dig.",
    uploadAria: "Vælg et billede",
    back: "Tilbage",
  },
  fi: {
    lensHint: "Lähetä kuva siitä, mitä etsit.",
    line1: "Tiedät, mitä haluat.",
    line2: "Löydämme myyjät puolestasi.",
    uploadAria: "Valitse kuva",
    back: "Takaisin",
  },
  cs: {
    lensHint: "Pošlete fotku toho, co hledáte.",
    line1: "Víte, co chcete.",
    line2: "Najdeme pro vás prodejce.",
    uploadAria: "Vybrat fotku",
    back: "Zpět",
  },
  ro: {
    lensHint: "Trimiteți fotografia a ceea ce căutați.",
    line1: "Știți ce doriți.",
    line2: "Vă găsim vânzătorii.",
    uploadAria: "Alegeți o fotografie",
    back: "Înapoi",
  },
  el: {
    lensHint: "Στείλτε τη φωτογραφία αυτού που ψάχνετε.",
    line1: "Ξέρετε τι θέλετε.",
    line2: "Βρίσκουμε τους πωλητές για εσάς.",
    uploadAria: "Επιλέξτε φωτογραφία",
    back: "Πίσω",
  },
  hu: {
    lensHint: "Küldje el annak a fotóját, amit keres.",
    line1: "Tudja, mit szeretne.",
    line2: "Megtaláljuk az eladókat.",
    uploadAria: "Fotó kiválasztása",
    back: "Vissza",
  },
  bg: {
    lensHint: "Изпратете снимка на това, което търсите.",
    line1: "Знаете какво искате.",
    line2: "Ще намерим продавачите за вас.",
    uploadAria: "Изберете снимка",
    back: "Назад",
  },
  hr: {
    lensHint: "Pošaljite fotografiju onoga što tražite.",
    line1: "Znate što želite.",
    line2: "Pronalazimo prodavače za vas.",
    uploadAria: "Odaberite fotografiju",
    back: "Natrag",
  },
  sk: {
    lensHint: "Pošlite fotku toho, čo hľadáte.",
    line1: "Viete, čo chcete.",
    line2: "Nájdeme pre vás predajcov.",
    uploadAria: "Vybrať fotku",
    back: "Späť",
  },
  sl: {
    lensHint: "Pošljite fotografijo tega, kar iščete.",
    line1: "Veste, kaj želite.",
    line2: "Najdemo prodajalce za vas.",
    uploadAria: "Izberite fotografijo",
    back: "Nazaj",
  },
  et: {
    lensHint: "Saatke foto sellest, mida otsite.",
    line1: "Te teate, mida soovite.",
    line2: "Leiame teile müüjad.",
    uploadAria: "Vali foto",
    back: "Tagasi",
  },
  lv: {
    lensHint: "Nosūtiet fotoattēlu tam, ko meklējat.",
    line1: "Jūs zināt, ko vēlaties.",
    line2: "Mēs atradīsim pārdevējus jums.",
    uploadAria: "Izvēlēties fotoattēlu",
    back: "Atpakaļ",
  },
  lt: {
    lensHint: "Siųskite to, ko ieškote, nuotrauką.",
    line1: "Žinote, ko norite.",
    line2: "Surasime pardavėjus jums.",
    uploadAria: "Pasirinkti nuotrauką",
    back: "Atgal",
  },
  ga: {
    lensHint: "Seol grianghraf den rud atá uait.",
    line1: "Tá a fhios agat cad is mian leat.",
    line2: "Faighimid na díoltóirí duit.",
    uploadAria: "Roghnaigh grianghraf",
    back: "Ar ais",
  },
  mt: {
    lensHint: "Ibgħat ir-ritratt ta' dak li qed tfittex.",
    line1: "Taf x'tixtieq.",
    line2: "Insibu l-bejjiegħa għalik.",
    uploadAria: "Agħżel ritratt",
    back: "Lura",
  },
  no: {
    lensHint: "Send et bilde av det du leter etter.",
    line1: "Du vet hva du vil ha.",
    line2: "Vi finner selgerne for deg.",
    uploadAria: "Velg et bilde",
    back: "Tilbake",
  },
  is: {
    lensHint: "Sendu mynd af því sem þú ert að leita að.",
    line1: "Þú veist hvað þú vilt.",
    line2: "Við finnum seljendurna fyrir þig.",
    uploadAria: "Velja mynd",
    back: "Til baka",
  },
};

export function isHomeHeroLocale(code: string): code is HomeHeroLocale {
  return (HOME_HERO_LOCALES as readonly string[]).includes(code);
}

export function getHomeHeroCopy(locale: string): HomeHeroCopy {
  const base = locale.split("-")[0]?.toLowerCase() ?? "fr";
  if (isHomeHeroLocale(base)) return COPY[base];
  return COPY.fr;
}
