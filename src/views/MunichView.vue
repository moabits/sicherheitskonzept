<script lang="ts">
export enum EventCategory {
  general = 0,
  motorSport = 1,
  cycling = 2,
  inlineSkating = 3,
  airShow = 4,
  soccer = 5,
  exhibitions = 6,
  tradeFairs = 7,
  classicalConcert = 8,
  otherConcertSeated = 9,
  otherConcertStanding = 10,
  carnival = 11,
  theater = 12,
  circus = 13,
  neighborhoodFestival = 14
}

export default {
  data: () => ({
    fg: {
      veranstaltungskategorie: EventCategory.general,
      besucher: 0,
      gewalt: false,
      vip: false,
      erfahrung: false,
      wetter: false,
      alcohol: false,
      fire: false
    }
  }),

  methods: {
    eventCategoryName(eventCategory: EventCategory | number): string {
      var description = [
        'Allgemeine Veranstaltung',
        'Motorsport',
        'Radsport',
        'Inline Skating',
        'Flugveranstaltung',
        'Fußball',
        'Ausstellungen',
        'Messen',
        'Klassikkonzert',
        'Sonstiges Konzert (bestuhlt)',
        'Sonstiges Konzert (unbestuhlt)',
        'Fasching',
        'Theater',
        'Zirkus',
        'Stadtteilfest'
      ]
      return description[eventCategory]
    },

    factor(category: EventCategory): number {
      switch (Number(category)) {
        case EventCategory.general:
          return 1
        case EventCategory.motorSport:
        case EventCategory.cycling:
        case EventCategory.inlineSkating:
          return 1.5
        case EventCategory.airShow:
          return 2
        case EventCategory.soccer:
          return 1.2
        case EventCategory.exhibitions:
          return 0.85 // Average of 0.7 and 1
        case EventCategory.tradeFairs:
          return 0.65 // Average of 0.5 and 0.8
        case EventCategory.classicalConcert:
          return 0.8
        case EventCategory.otherConcertSeated:
          return 1.25 // Average of 1 and 1.5
        case EventCategory.otherConcertStanding:
          return 1.6 // Average of 1.2 and 2
        case EventCategory.carnival:
          return 1.35 // Average of 1.2 and 1.5
        case EventCategory.theater:
          return 1
        case EventCategory.circus:
          return 1.1
        case EventCategory.neighborhoodFestival:
          return 1
        default:
          return 0.2 // Default case
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
      const bounds: [number, number][] = [
        [500, 0],
        [1500, 1],
        [3000, 2],
        [6000, 3],
        [10000, 4],
        [15000, 5],
        [20000, 6],
        [30000, 7],
        [40000, 8],
        [50000, 9],
        [60000, 10],
        [70000, 11],
        [80000, 12],
        [90000, 13],
        [100000, 14]
      ]
      const found = bounds.find(([max]) => value <= max)
      if (found) {
        return found[1]
      } else {
        return 15
      }
    },

    bounds(bounds: [number, number][], value: number): number {
      for (const [max, i] of bounds) {
        if (value <= max) {
          return i
        }
      }
      return -1
    }
  },

  computed: {
    maxVisitorStep(): number {
      var steps: { [key: number]: number } = {
        0: 500,
        1000: 500,
        3000: 500,
        6000: 3000,
        10000: 4000,
        20000: 5000,
        100000: 10000
      }
      var key: number = Number(
        Object.keys(steps).find((key) => {
          return Number(key) >= this.fg.besucher
        }) ?? 0
      )
      return steps[key]
    },

    eventCategories() {
      return Object.keys(EventCategory).filter((v) => !isNaN(Number(v)))
    },

    points(): number {
      return this.visitorPoints(this.fg.besucher)
    },

    risk(): number {
      return this.factor(this.fg.veranstaltungskategorie)
    },

    addRisk(): number {
      return (
        (this.fg.gewalt ? 1 : 0) +
        (this.fg.vip ? 1 : 0) +
        (this.fg.erfahrung ? 1 : 0) +
        (this.fg.wetter ? 1 : 0) +
        (this.fg.alcohol ? 1 : 0) +
        (this.fg.fire ? 1 : 0)
      )
    },

    totalPoints(): number {
      return Math.round(this.points * this.risk + this.addRisk)
    },

    sanitätshelfer(): number {
      return this.bounds(
        [
          [1, 2],
          [2, 3],
          [3, 4],
          [4, 4],
          [5, 6],
          [6, 10],
          [7, 14],
          [8, 18],
          [9, 22],
          [10, 26],
          [11, 30],
          [12, 34],
          [13, 38],
          [14, 42],
          [15, 46],
          [16, 50],
          [17, 54],
          [18, 58],
          [19, 62],
          [20, 66],
          [21, 70],
          [22, 74],
          [23, 78],
          [24, 82],
          [Number.POSITIVE_INFINITY, 86]
        ],
        this.totalPoints
      )
    },

    rettungssanitäter(): number {
      return this.bounds(
        [
          [1, 0],
          [2, 1],
          [3, 1],
          [4, 2],
          [5, 2],
          [6, 3],
          [7, 4],
          [8, 5],
          [9, 6],
          [10, 7],
          [11, 8],
          [12, 9],
          [13, 10],
          [14, 12],
          [15, 13],
          [16, 14],
          [17, 16],
          [18, 17],
          [19, 18],
          [20, 19],
          [21, 20],
          [22, 21],
          [23, 22],
          [24, 23],
          [Number.POSITIVE_INFINITY, 23]
        ],
        this.totalPoints
      )
    },

    ärzte(): number {
      return this.bounds(
        [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 1],
          [6, 1],
          [7, 1],
          [8, 1],
          [9, 2],
          [10, 2],
          [11, 3],
          [12, 3],
          [13, 3],
          [14, 4],
          [15, 4],
          [16, 4],
          [17, 5],
          [18, 5],
          [19, 5],
          [20, 6],
          [21, 6],
          [22, 6],
          [23, 6],
          [24, 7],
          [Number.POSITIVE_INFINITY, 7]
        ],
        this.totalPoints
      )
    },

    notärzte(): number {
      return this.bounds(
        [
          [1, 0],
          [2, 0],
          [3, 0],
          [4, 0],
          [5, 0],
          [6, 1],
          [7, 1],
          [8, 1],
          [9, 1],
          [10, 1],
          [11, 2],
          [12, 2],
          [13, 2],
          [14, 2],
          [15, 3],
          [16, 3],
          [17, 3],
          [18, 3],
          [19, 4],
          [20, 4],
          [21, 4],
          [22, 4],
          [23, 5],
          [24, 5],
          [Number.POSITIVE_INFINITY, 6]
        ],
        this.totalPoints
      )
    },

    telSanitätsdienst(): string {
      return this.totalPoints >= 6 ? 'Ja' : 'Nein'
    },

    sanitätsdienstkonzept(): string {
      return this.totalPoints >= 6 ? 'Ja' : 'Nein'
    },

    sanitätsdienststationen(): number {
      return this.bounds(
        [
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 2],
          [5, 2],
          [6, 3],
          [7, 3],
          [8, 3],
          [9, 4],
          [10, 5],
          [11, 5],
          [12, 5],
          [13, 6],
          [14, 6],
          [15, 6],
          [16, 7],
          [17, 7],
          [18, 8],
          [19, 8],
          [20, 8],
          [21, 9],
          [22, 9],
          [23, 9],
          [24, 10],
          [Number.POSITIVE_INFINITY, 10]
        ],
        this.totalPoints
      )
    },

    aeds(): number {
      return this.bounds(
        [
          [1, 1],
          [2, 1],
          [3, 2],
          [4, 3],
          [5, 3],
          [6, 3],
          [7, 4],
          [8, 4],
          [9, 4],
          [10, 5],
          [11, 5],
          [12, 5],
          [13, 6],
          [14, 6],
          [15, 6],
          [16, 7],
          [17, 7],
          [18, 8],
          [19, 8],
          [20, 8],
          [21, 9],
          [22, 9],
          [23, 9],
          [24, 10],
          [Number.POSITIVE_INFINITY, 10]
        ],
        this.totalPoints
      )
    }
  }
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col md="5">
        <v-card variant="text" class="mb-5">
          <v-card-title class="px-0">
            <h1>Münchner Bemessung</h1>
          </v-card-title>
          <v-card-subtitle class="px-0">
            Zur Festlegung des Kräfteansatzes für Sanitätsdienste auf Veranstaltungen
          </v-card-subtitle>
          <v-card-text class="px-0 pb-0">
            <p>
              Die Münchner Bemessung ist ein von der Landeshauptstadt München üblicherweise
              genutztes Maß für die sanitätsdienstliche Absicherung von Veranstaltungen. Die
              Richtlinie berücksichtigt verschiedene Faktoren wie die erwartete Teilnehmerzahl, die
              Art der Veranstaltung und das Risikopotenzial.
            </p>
            <small class="d-block my-2">
              Quelle: P. Bachmeier, J. Thomann, D. Vosteen et. al.
              "Veranstaltungssicherheit-Leitfaden für Feuerwehr, Sicherheitsbehörde und Polizei
              sowie Veranstalter und deren Sicherheitsdienstleister." München, Juni 2015.
            </small>
          </v-card-text>
          <v-card-actions class="px-0">
            <v-btn
              variant="outlined"
              href="https://stadt.muenchen.de/infos/veranstaltungssicherheit.html"
              target="_blank"
              text="Mehr dazu"
              append-icon="mdi-open-in-new"
            />
          </v-card-actions>
        </v-card>

        <v-card class="mt-5">
          <v-card-title class="text-overline">Gesamtpunktzahl</v-card-title>
          <v-card-text>
            <div class="text-green-darken-3 text-h3 font-weight-bold">{{ totalPoints }}</div>

            <div class="text-h6 text-medium-emphasis font-weight-regular">
              = {{ points }} Punktwert &times; {{ risk }} Risiko + {{ addRisk }} Risikozuschläge
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-table>
            <tbody>
              <tr>
                <td>Anzahl der Sanitätshelfer</td>
                <td>{{ sanitätshelfer }}</td>
              </tr>
              <tr>
                <td>→ davon Rettungssanitäter</td>
                <td>{{ rettungssanitäter }}</td>
              </tr>
              <tr>
                <td>Anzahl der Ärzte</td>
                <td>{{ ärzte }}</td>
              </tr>
              <tr>
                <td>→ davon Notärzte</td>
                <td>{{ notärzte }}</td>
              </tr>
              <tr>
                <td>TEL-Sanitätsdienst</td>
                <td>{{ telSanitätsdienst }}</td>
              </tr>
              <tr>
                <td>Vorlage des Sanitätsdienstkonzeptes</td>
                <td>{{ sanitätsdienstkonzept }}</td>
              </tr>
              <tr>
                <td>
                  Anzahl der Sanitätsdienststationen/-fahrzeuge<br />bzw. Einhaltung einer
                  4-Min-Hilfsfrist
                </td>
                <td>{{ sanitätsdienststationen }}</td>
              </tr>
              <tr>
                <td>Anzahl der AEDs</td>
                <td>{{ aeds }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-col>

      <v-col md="7">
        <v-form ref="form">
          <h2>Punktwert</h2>
          <v-card class="my-4">
            <v-card-text>
              <div class="text-caption">Besucherzahl</div>
              <v-slider
                v-model="fg.besucher"
                max="100000"
                min="0"
                :step="maxVisitorStep"
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
            </v-card-text>
          </v-card>

          <h2>Risikomultiplikator</h2>
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
            </v-card-text>
          </v-card>

          <h2>Risikozuschläge</h2>
          <v-card class="my-4">
            <v-card-text>
              <v-checkbox v-model="fg.gewalt" label="Gewaltbereites Publikum"></v-checkbox>
              <v-checkbox v-model="fg.vip" label="Personen mit Sicherheitsstufe"></v-checkbox>
              <v-checkbox
                v-model="fg.erfahrung"
                label="Schlechte Erfahrungen aus früheren VA"
              ></v-checkbox>
              <v-checkbox v-model="fg.wetter" label="(Erwartetes) Wetterrisiko"></v-checkbox>
              <v-checkbox
                v-model="fg.alcohol"
                label="Starker Alkohol und Drogenkonsum"
              ></v-checkbox>
              <v-checkbox v-model="fg.fire" label="Brandrisiko"></v-checkbox>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
