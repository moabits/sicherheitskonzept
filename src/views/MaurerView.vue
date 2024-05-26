<script lang="ts">
export enum EventCategory {
  sport = 0,
  exhibition = 1,
  bazaar = 2,
  demo = 3,
  fireworks = 4,
  yardSale = 5,
  airshow = 6,
  karneval = 7,
  karnevalParade = 8,
  funfair = 9,
  congress = 10,
  sportMusic = 11,
  concert = 12,
  rally = 13,
  langlauf = 14,
  parade = 15,
  tradeShow = 16,
  motorSport = 17,
  music = 18,
  opera = 19,
  cycle = 20,
  equestrianism = 21,
  rock = 22,
  rockBoygroup = 23,
  theater = 24,
  marksmen = 25,
  show = 26,
  blockParty = 27,
  streetFair = 28,
  dancing = 29,
  fair = 30,
  hiking = 31,
  xmas = 32,
  soccer = 33,
}

export default {
  data: () => ({
    fg: {
      veranstaltungskategorie: EventCategory.sport,
      indoor: false,
      gewalt: false,
      maxBesucher: 0,
      besucher: 0,
      vips: 0
    },
  }),

  methods: {
    eventCategoryName(eventCategory: EventCategory | number): string {
      var description = [
        'Allgemeine Sportveranstaltung',
        'Ausstellung',
        'Basar',
        'Demonstration',
        'Feuerwerk',
        'Flohmarkt',
        'Flugveranstaltung',
        'Karnevalsveranstaltung',
        'Karnevalsumzug',
        'Kirmes',
        'Kongress',
        'Kombi-Veranstaltung (Sport, Musik, Show)',
        'Konzert',
        'Kundgebung',
        'Langlauf',
        'Martinsumzug',
        'Messe',
        'Motorsportveranstaltung',
        'Musikveranstaltung (Megaparty)',
        'Oper/Operette/Musical',
        'Radrennen',
        'Reitsportveranstaltung',
        'Rockkonzert',
        'Rockkonzert mit Boygroup',
        'Schauspiel/Theater',
        'Schützenfest',
        '(Fernseh-) Show',
        'Stadtteilfest',
        'Straßenfest',
        'Tanzsportveranstaltung',
        'Volksfest',
        'Volkswandern',
        'Weihnachtsmarkt',
        'Fußballspiele/-turniere'
      ]
      return description[eventCategory]
    },

    factor(category: EventCategory): number {
      switch (Number(category)) {
        case EventCategory.sport: // Allgemeine Sportveranstaltung
        case EventCategory.langlauf: // Langlauf
        case EventCategory.cycle: // Radrennen
        case EventCategory.dancing: // Tanzsportveranstaltung
        case EventCategory.exhibition: // Ausstellung
        case EventCategory.bazaar: // Basar
          return 0.3;
        case EventCategory.demo: // Demonstration
        case EventCategory.motorSport: // Motorsportveranstaltungen
          return 0.8;
        case EventCategory.fireworks: // Feuerwerk
        case EventCategory.sportMusic: // Kombiveranstaltungen (Sport, Musik, Show)
        case EventCategory.blockParty: // Stadtteilfest
        case EventCategory.streetFair: // Straßenfest
        case EventCategory.xmas: // Weihnachtsmarkt
        case EventCategory.show: // (Fernseh-)Show
        case EventCategory.soccer: // Fußball
          return 0.4;
        case EventCategory.yardSale: // Flohmarkt
        case EventCategory.parade: // Martinszug
        case EventCategory.equestrianism: // Reitsportveranstaltungen
        case EventCategory.tradeShow: // Kongresse
        case EventCategory.theater: // Schauspiel/Theater
        case EventCategory.opera: // Oper/Operette/Musical
          return 0.2;
        case EventCategory.airshow: // Flugveranstaltungen
          return 0.9;
        case EventCategory.karneval: // Karneval
        case EventCategory.karnevalParade: // Karnevalsumzüge
          return 0.7;
        case EventCategory.fair: // Volksfest
        case EventCategory.rally: // Kundgebung
        case EventCategory.marksmen: // Schützenfeste
        case EventCategory.music: // Musikveranstaltungen (Megapartys)
          return 0.5;
        case EventCategory.rockBoygroup: // Rockkonzerte "Boy Group"
        case EventCategory.rock: // Rockkonzerte
          return 1.2;
        case EventCategory.concert: // Open Air Konzert
          return 1.0;
        case EventCategory.hiking: // Volkswandern
          return 0.1;
        default:
          return 0.2; // Default case
      }
    },

    itemProps(item: EventCategory) {
      return {
        title: this.eventCategoryName(item),
        subtitle: 'Wichtungsfaktor ' + this.factor(item),
        value: Number(item)
      }
    },

    visitorPoints(value: number): number {
      const bounds: [number, number][] = [[500, 1], [1000, 2], [1500, 3], [3000, 4], [6000, 5], [10000, 6], [20000, 7]];
      const found = bounds.find(([max]) => value <= max);
      if (found) {
          return found[1];
      } else {
          return 7 + Math.ceil((value - 20000) / 10000);
      }
    },

    bounds(bounds: [number, number][], value: number): number {
      for (const [max, i] of bounds) {
          if (value <= max) {
              return i;
          }
      }
      return -1;
    }
  },

  computed: {
    maxVisitorStep(): number {
      var steps: { [key: number]: number } = {
        0: 500,
        1000: 500,
        1500: 1500,
        3000: 3000,
        6000: 4000,
        1000000: 10000
      }
      var key: number = Number(
        Object.keys(steps).find((key) => {
          return Number(key) >= this.fg.maxBesucher
        }) ?? 0
      )
      return steps[key]
    },

    eventCategories() {
      return Object.keys(EventCategory).filter((v) => !isNaN(Number(v)))
    },

    visitors(): number {
      let maxBesucherPoints = this.visitorPoints(this.fg.maxBesucher);
      let besucherPoints = this.fg.besucher / 500;
      return maxBesucherPoints * (this.fg.indoor ? 2 : 1) + besucherPoints;
    },

    risk(): number {
      let vipPoints = Math.min((this.fg.vips / 5) * 10, 30);
      let gewalt = (this.fg.gewalt ? 10 : 0);
      return vipPoints + gewalt;
    },

    rg(): number {
      return this.factor(this.fg.veranstaltungskategorie);
    },

    // Punktzahl
    points(): number {
      return Math.round(this.visitors * this.rg + this.risk);
    },

    helfer(): number {
      return this.bounds([[2.0, 0], [4.0, 3], [13.5, 5], [22.0, 10], [40.0, 20], [60.0, 30], [80.0, 40], [100.0, 80], [110.0, 100], [120.0, 120], [Number.POSITIVE_INFINITY, 160]], this.points);
    },

    ktw(): number {
      return this.bounds([[4.0, 0],     [13.0, 1],     [25.0, 2],     [40.0, 3],     [60.0, 4],     [80.0, 5],     [100.0, 6],     [110.0, 7],     [120.0, 8],     [Number.POSITIVE_INFINITY, 10]], this.points);
    },

    rtw(): number {
      return this.bounds([[6.0, 0], [25.5, 1], [45.5, 2], [60.5, 3], [75.5, 4], [100.0, 5], [120.0, 6], [Number.POSITIVE_INFINITY, 7]], this.points);
    },

    na(): number {
      return this.bounds([[13.0, 0], [30.0, 1], [60.0, 2], [90.0, 3], [120.0, 4], [Number.POSITIVE_INFINITY, 5]], this.points);
    },

    grtw(): number {
      return this.bounds([[90.0, 0], [Number.POSITIVE_INFINITY, 1]], this.points);
    },

    el(): string {
      if (this.points > 60) {
        return "voll stabsmäßige Einsatzleitung";
      } else if (this.points > 30) {
        return "reduzierte stabsmäßige Einsatzleitung";
      } else {
        return "keine stabsmäßige Einsatzleitung";
      }
    },

    uhs(): number {
      return this.bounds([[50.0, 0], [80.0, 1], [110.0, 2], [Number.POSITIVE_INFINITY, 3]], this.points);
    },

  }
}
</script>

<template>
    <v-container fluid>
      <v-row>
        <v-col md="5">
          <v-card variant="text" class="mb-5">
            <v-card-title class="px-0">
              <h1>Maurer Schema</h1>
            </v-card-title>
            <v-card-subtitle class="px-0">
              Für die Ermittlung der Personalstärke und Qualifikation beim Sanitätswachdienst
            </v-card-subtitle>
            <v-card-text class="px-0 pb-0">
              <p>
                Das Maurer-Schema ist ein von Klaus Maurer entwickeltes Verfahren zur Risikobewertung bei Großveranstaltungen.
                Mithilfe eines Algorithmus kann ermittelt werden, welches Gefahrenpotenzial von einer Veranstaltung ausgeht und wie viele Einsatzkräfte des Sanitätswachdienstes vorgehalten werden sollten.
                Dem Algorithmus liegen Erfahrungswerte zugrunde, die gegebenenfalls noch an die örtlichen Gegebenheiten angepasst werden müssen.
              </p>
              <small class="d-block my-2">
                Quelle: K. Maurer, H. Peter (Hrsg.)
                "Gefahrenabwehr bei Großveranstaltungen"
                Wien, 2005.
              </small>
            </v-card-text>
            <v-card-actions class="px-0">
              <v-btn
                variant="outlined"
                href="https://de.wikipedia.org/wiki/Maurer-Schema"
                target="_blank"
                text="Mehr dazu"
                append-icon="mdi-open-in-new"
              />
            </v-card-actions>
          </v-card>
  

          <v-card class="mt-5">
          <v-card-title class="text-overline">Punktwert</v-card-title>
          <v-card-text>
            <div class="text-green-darken-3 text-h3 font-weight-bold">{{ points }}</div>

            <div class="text-h6 text-medium-emphasis font-weight-regular">
              =  {{ visitors }} Punktwert Besucher &times; {{ rg }} Faktor + {{ risk }} Punktwert Risiko
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-table>
                  <tbody>
                    <tr>
                      <td>SanitätshelferInnen</td>
                      <td>{{ helfer }}</td>
                    </tr>
                    <tr>
                      <td>KTW (zzgl. Besatzung)</td>
                      <td>{{ ktw }}</td>
                    </tr>
                    <tr>
                      <td>RTW (zzgl. Besatzung)</td>
                      <td>{{ rtw }}</td>
                    </tr>
                    <tr>
                      <td>Notärztinnen/Notärzte</td>
                      <td>{{ na }}</td>
                    </tr>
                    <tr>
                      <td>GRTW (zzgl. Besatzung)</td>
                      <td>{{ grtw }}</td>
                    </tr>
                    <tr>
                      <td>Einsatzleitung</td>
                      <td>{{ el }}</td>
                    </tr>
                    <tr>
                      <td>Unfallhilfstelle (zzgl. Personal)</td>
                      <td>UHS {{ uhs }}</td>
                    </tr>
                  </tbody>
                </v-table>
        </v-card>
        </v-col>
  
        <v-col md="7">
          <v-form ref="form">
          <h2>Veranstaltung</h2>
          <v-card class="my-4">
            <v-card-text>
              <v-autocomplete
                v-model="fg.veranstaltungskategorie"
                :items="eventCategories"
                :item-props="itemProps"
                item-title="title"
                item-value="value"
                label="Veranstaltungskategorie"
                return-object
                :hint="`${itemProps(fg.veranstaltungskategorie).subtitle}`"
                persistent-hint
              >
              </v-autocomplete>

              <v-checkbox v-model="fg.indoor" label="Veranstaltung in geschlossenen Räumen"></v-checkbox>
            </v-card-text>
          </v-card>
          
          <h2>BesucherInnen</h2>
          <v-card class="my-4">
            <v-card-text>
              <div class="text-caption">Maximal zulässige Besucherzahl (Veranstaltungsfläche)</div>
              <v-slider
                v-model="fg.maxBesucher"
                max="50000"
                min="0"
                :step="maxVisitorStep"
                class="align-center mt-6 ms-4"
                thumb-label="always"
                hide-details
              >
                <template v-slot:thumb-label>
                  {{ fg.maxBesucher.toLocaleString() }}
                </template>
                <template v-slot:append>
                  <v-text-field
                    v-model="fg.maxBesucher"
                    density="compact"
                    style="width: 120px"
                    type="number"
                    hide-details
                    single-line
                  ></v-text-field>
                </template>
              </v-slider>

              <div class="text-caption">Erwartete bzw. tatsächliche Besucherzahl</div>
              <v-slider
                v-model="fg.besucher"
                max="50000"
                min="0"
                step="500"
                class="align-center mt-6 ms-4"
                thumb-label="always"
                hide-details
              >
                <template v-slot:thumb-label>
                  {{ fg.besucher.toLocaleString() }}
                </template>
                <template v-slot:append>
                  <v-text-field
                    v-model="fg.besucher"
                    density="compact"
                    style="width: 120px"
                    type="number"
                    hide-details
                    single-line
                  ></v-text-field>
                </template>
              </v-slider>

              <v-checkbox v-model="fg.gewalt" label="Gewaltbereitschaft vorhanden"></v-checkbox>

              <div class="text-caption">Erwartete VIPs (i.d.R. Polizeischutz)</div>
              <v-slider
                v-model="fg.vips"
                step="1"
                max="15"
                min="0"
                class="align-center mt-6 ms-4"
                thumb-label="always"
                hide-details
              >
                <template v-slot:thumb-label>
                  {{ fg.vips.toLocaleString() }}
                </template>
                <template v-slot:append>
                  <v-text-field
                    v-model="fg.vips"
                    density="compact"
                    style="width: 120px"
                    type="number"
                    hide-details
                    single-line
                  ></v-text-field>
                </template>
              </v-slider>
            </v-card-text>
          </v-card>

          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style></style>
