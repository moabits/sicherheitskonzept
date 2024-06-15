<script lang="ts">
import MunichScore from '@/components/MunichScore.vue'

export enum EventCategory {
  indoorEvent = 0,
  concertCinema = 1,
  parade = 2,
  marathon = 3,
  streetFestival = 4,
  tradeFair = 5,
  sport = 6,
  classicConcert = 7
}

export default {
  components: {
    MunichScore
  },

  data: () => ({
    // Risikogruppe
    fg: {
      veranstaltungskategorie: EventCategory.indoorEvent,
      besucher: 0
    },

    // Einflussfaktoren
    fe: {
      anfahrtsweg: 0,
      zufahrt: 0,
      loeschwasserversorgung: 0,
      fluchtwege: 0,
      kommunikationswege: 0,
      brandszenarien: 0,
      zuschauerverhalten: 0,
      feuergefahr: 0,
      veranstalterbonus: 0
    },
    anfahrtsweg: {
      name: 'Anfahrtswege',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'kurze, ausreichend befestigte, breite und geradlinige Anfahrtswege, unabhängig von Besucher- und Individualverkehr (Hilfeleistungsfristen können deutlich unterboten werden), optimale Nutzung möglich'
        },
        {
          value: 1,
          title: 'normal',
          description: 'Anfahrt ohne Probleme möglich, Hilfsfristen werden eingehalten'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'schwierige Wegeführung, Verzögerungen sind möglich, starke Belastung durch Besucher- und Individualverkehr, gegebenenfalls abgelegene Örtlichkeit, gegebenenfalls unbefestigte Straßen, Anfahrtswege durch mobiles Mobiliar eingeschränkt'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'schwierige, unübersichtliche Wegeführung, Verzögerungen sind zu erwarten, gegebenenfalls abgelegene Örtlichkeit, Hilfsfristen werden überschritten, Belastbarkeit für Großfahrzeuge nicht sichergestellt, kein von den Rettungswegen für Besucher unabhängiger Anfahrtsweg (Überlagerung mit Rettungswegen für Besucher)'
        }
      ]
    },
    zufahrt: {
      name: 'Zu- und Durchfahrten',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'uneingeschränkte Nutzbarkeit, Veranstaltungsbereich und Nachbarbebauung für Einsatzkräfte jederzeit zugänglich, Flächen für Feuerwehr (Bewegungs- und Aufstellflächen) werden eingehalten, mehrere Anfahrtsmöglichkeiten, kurze Wege von den Fahrzeugen zu potentiellen Schadensorten, Zufahrten gekennzeichnet, Einsatzpläne vorhanden'
        },
        {
          value: 1,
          title: 'normal',
          description: 'Zu- und Durchfahrt ohne Probleme möglich'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'Zu- und Durchfahrten schwierig zu nutzen, hohe Personendichte zu erwarten, Verzögerungen möglich, Zugang zur Nachbarbebauung für Einsatzkräfte schwierig, Flächen für Feuerwehr und Rettungsdienst eingeschränkt'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'Zu- und Durchfahrten sehr schwierig zu nutzen, hohe Personendichte bei engen Platzverhältnissen zu erwarten, Verzögerungen zu erwarten, Flächen für Feuerwehr und Rettungsdienst stark eingeschränkt, lange Wege zu potentiellen Schadensorten'
        }
      ]
    },
    loeschwasserversorgung: {
      name: 'Löschwasserversorgung',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'leistungsfähiges Rohrnetz (leistungsfähiger als notwendig) mit zahlreiche Hydranten in engen Abständen und guter Kennzeichnung, freizugänglich / unverbaut, Ringleitungen'
        },
        {
          value: 1,
          title: 'normal',
          description:
            'reguläre Löschwasserversorgung nach dem Deutschen Verein des Gas- und Wasserfaches e.V. (DVGW 405, Abstand bis zu 300 m)'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'große Abstände der Hydranten, schwierig auffindbar, Stichleitungen, geringe Druchmesser'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'keine Hydranten, lange Schlauchstrecken erforderlich, abgelegene Örtlichkeit, Aufstauen von Gewässern erforderlich'
        }
      ]
    },
    fluchtwege: {
      name: 'Flucht- und Rettungswege',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'die Kapazität der Flucht- und Rettungswege übersteigt die Höchstbesucherzahl deutlich (z. B. freies Feld ohne bauliche Begrenzungen), bestenfalls befestigt, eben, falls notwendig ausgeleuchte'
        },
        {
          value: 1,
          title: 'normal',
          description:
            'Flucht- und Rettungswege stehen in ausreichender Anzahl und Breite (analog MVStättVO) für die gesamtzulässige Höchstbesucherzahl zur Verfügung; die Rettungswegführung erfolgt in zwei entgegengesetzten Richtungen, deutliche Kennzeichnung'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'Flucht- und Rettungswege stehen nicht während der kompletten Veranstaltung oder alle Bereiche des Veranstaltungsgeländes in ausreichen- der Anzahl und Breite für die gesamtzulässige Höchstbesucherzahl zur Verfügung; es können nicht zwei entgegengesetzte Richtungen in der Rettungswegführung sichergestellt werden, lange Rettungsweglängen, Rettungswegführung über Stauflächen von beispielsweise WC- oder Gastroeinrichtungen, Rettungswege enden an befahrbaren Straßen, Rettungswege sind für Menschen mit körperlichen Behinderungen nicht nutzbar'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'Flucht- und Rettungswege stehen nicht in ausreichender Anzahl zur Verfügung beziehungsweise die Wegführung in zwei entgegegesetzte Richtungen ist nicht sichergestellt, Ein-/Ausgang nicht unabhängig mit möglicher Staubildung, Trichterbildung im Rettungswegverlauf, nur verzögert und gegebenenfalls nur mit Hilfsmitteln zu öffnen (z. B. bei Verwendung von Kabelbindern, organisatorischen Regelungen etc.) AUSSCHLUSSKRITERIUM FÜR DURCHFÜHRUNG DER VERANSTALTUNG!'
        }
      ]
    },
    kommunikationswege: {
      name: 'Kommunikationswege der Gefahrenabwehr',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'es liegt eine stets aktuelle Kommunikationsliste mit den Ansprechpartnern der Veranstaltung für alle Kommunikationswege vor, die Kommunikation ist über mindestens zwei Wege gesichert (in der Regel Mobil und Funk [eigener Kanal] beziehungsweise Festnetzanschluss; Mobilfunk hat eine hohe Ausfallquote!), alle benannten Mitglieder des Koordinierungskreises sind vor Ort und kennen sich seit längerem, Veranstalter verfügt über einen Festnetzanschluss'
        },
        {
          value: 1,
          title: 'normal',
          description:
            'es liegt eine stets aktuelle Kommunikationsliste mit den Ansprechpartnern der Veranstaltung vor, die Kommunikation ist über mindestens zwei Wege gesichert (in der Regel Mobil und Funk beziehungsweise Festnetzanschluss; Mobilfunk hat eine hohe Ausfallquote!)'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'eine Kommunikation mit dem Veranstalter beziehungsweise dessen Dienstleistern beziehungsweise der Einsatzkräfte untereinander ist erschwert aber möglich (z. B. durch Meldeläufer etc.), nur ein Kommunikationsweg'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'die Erreichbarkeit des Veranstalters und dessen Dienstleistern sowie die Kommunikation der Einsatzkräfte untereinander ist nicht sicherge- stellt, da Verantwortliche nicht benannt sind und keine Kommunikationslisten o.ä. vorliegen'
        }
      ]
    },
    brandszenarien: {
      name: 'Brandszenarien',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'keine Verwendung von offenem Feuer, pyrotechnischen Gegenständen, brennbaren Flüssigkeiten oder Gasen, Prüfzeugnis / Zulassung für Schwerentflammbarkeit der Dekoration und Ausstattung liegt vor, geringe Brandlast, Abstandsflächen zwischen den einzelnen Ständen sowie der vorhandenen Bebauung sind deutlich größer als vorgeschrieben Veranstaltung im Freien (keine Verrauchung möglich)'
        },
        {
          value: 1,
          title: 'normal',
          description:
            'Verwendung von brennbaren Flüssigkeiten und Gasen durch Fachkräfte (an abgenommenen Anlagen und Einrichtungen), Prüfbescheinigungen liegen vor Ausreichende Abstände bei Verwendung von offenem Feuer zu brenn- baren Stoffen, Abstand zu Publikum und Akteuren durch Abschrankung, Bundesanstalt für Materialforschung und -prüfung (BAM) Vorgaben bei Pyrotechnik werden eingehalten genehmigte (d.h. abgenommene) feuergefährliche Handlungen durch Fachkräfte ausreichend Löschgeräte vorhanden'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'kritische Umgebung beispielsweise wegen Waldbrandgefahrenstufe, Verwendung von brennbaren Flüssigkeiten und Gasen, offenem Feuer und / oder Pyrotechnik durch „Amateure“ (an abgenommenen Anlagen und Einrichtungen), geringe Abstände zu brennbaren Stoffen, Verwen- dung von entflammbaren Stoffen, hohe Brandlasten (z. B. viel Holz), enge Belegung des Geländes mit Kompensationsmaßnahmen'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'Verwendung von brennbaren Flüssigkeiten und Gasen, offenem Feuer und / oder Pyrotechnik durch „Amateure“ mit nicht abgenommenen Ein- richtungen, Verwendung leichtentflammbarer Materialien, sehr hohe Brandlasten, Verwendung von brennbaren Stoffen in großen Mengen (z. B. Verpackungsmaterial), enge Belegung des Geländes / geringe Ab- stände der Aufbauten ohne Kompensationsmaßnahmen (z.B. Nichteinhal- tung der Abstände von brandlastfreien Streifen), schwierige Erreichbarkeit'
        }
      ]
    },
    zuschauerverhalten: {
      name: 'Zuschauerverhalten / kriminelle Handlungen',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description: 'keine Störungen / keine Beeinflussung der Veranstaltung zu erwarten'
        },
        {
          value: 1,
          title: 'normal',
          description: 'weitestgehend vernachlässigbar, Störungen zu erwarten, friedlich'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'Störungen nicht ausgeschlossen, aber beherrschbar z. B. hoher Alkoholkonsum, Gewaltpotenzial vorhanden, Gegenveranstaltungen'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'Störungen zu erwarten und schwierig zu beherrschen z. B. sehr hoher Alkoholkonsum, Drogenkonsum, besondere politische Lage, hohes Gewaltpotenzial und hohe Gewaltbereitschaft vorhanden, Hooligans, gewaltbereite, rivalisierende Gruppen'
        }
      ]
    },
    feuergefahr: {
      name: 'Feuergefährliche Handlungen',
      scale: [
        {
          value: 1,
          title: 'günstig',
          description: 'ausgeschlossen (finden nicht statt)'
        },
        {
          value: 1.5,
          title: 'normal',
          description:
            'weitestgehend vernachlässigbar (z. B. einzelne Feuerzeuge im Publikum oder abgenommene, genehmigte feuergefährliche Handlungen durch Fachkräfte)'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'nicht ausgeschlossen, aber beherrschbar (z. B. einzelne Wunderkerzen u. ä., kritische Umgebung beispielsweise aufgrund Waldbrandgefah- renstufen)'
        },
        {
          value: 4,
          title: 'sehr ungünstig',
          description:
            'zu erwarten und schwierig zu beherrschen (Feuerzeuge, Wunderker- zen u. ä. in großer Zahl, hohe Belegungsdichte, schwierige Erreichbar- keit für Einsatzkräfte, hohe Brandlasten, kritische Umgebung)'
        }
      ]
    },
    veranstalterbonus: {
      name: 'Veranstalterbonus',
      scale: [
        {
          value: 0.5,
          title: 'günstig',
          description:
            'bekannter, örtlich erfahrener Veranstalter mit leistungsfähigem Team im Hintergrund; hohes Sicherheitsbewusstsein des Veranstalters und geschultes Sicherheitspersonal in hoher Anzahl; klare Rollen- / Aufgaben- und Kompetenzverteilung im Team'
        },
        {
          value: 1,
          title: 'normal',
          description:
            'erfahrener Veranstalter oder nur eingeschränkt leistungsfähiges Team im Hintergrund; normales Sicherheitsbewusstsein des Veranstalters und geschultes Sicherheitspersonal, Rollen / Aufgaben- und Kompetenzverteilung im Team bekannt'
        },
        {
          value: 2,
          title: 'ungünstig',
          description:
            'unerfahrener Veranstalter und nur eingeschränkt Leistungsfähiges Team im Hintergrund; normales Sicherheitsbewusstsein des Veranstalters und schlecht geschultes Sicherheitspersonal, nicht stark ausgeprägtes Sicherheitsbewusstsein des Veranstalters und geschultes Sicherheitspersonal, unklare Rollen / Aufgaben- und Kompetenzverteilung im Team'
        },
        {
          value: 2,
          title: 'sehr ungünstig',
          description:
            'erstmaliger, unerfahrener Veranstalter ohne Team im Hintergrund; nicht stark ausgeprägtes Sicherheitsbewusstsein des Veranstalters und geschultes Sicherheitspersonal'
        },
        {
          value: 4,
          title: 'nachteilig',
          description:
            'erstmaliger, unerfahrener Veranstalter ohne Team im Hintergrund; nicht stark ausgeprägtes Sicherheitsbewusstsein des Veranstalters und schlecht geschultes Sicherheitspersonal'
        }
      ]
    }
  }),

  methods: {
    eventCategoryName(eventCategory: EventCategory | number): string {
      var description = [
        'Veranstaltungen in Veranstaltungsräumen',
        'Stehplatzkonzerte und Kinovorführungen',
        'Umzüge und Kundgebungen',
        'Sportveranstaltungen auf Streckenabschnitten',
        'Straßenfeste',
        'Messen und Ausstellungen',
        'Sportveranstaltungen',
        'Sitzplatzkonzerte'
      ]
      return description[eventCategory]
    },

    riskGroup(visitorSteps: number[]): number {
      return (
        visitorSteps.length -
        visitorSteps.reverse().findIndex((value) => {
          return value <= this.fg.besucher
        })
      )
    },

    itemProps(item: EventCategory) {
      return {
        title: this.eventCategoryName(item),
        value: Number(item)
      }
    }
  },

  computed: {
    // Sicherheitskoeffizient
    sc(): number {
      return Math.floor(this.fr * this.fs * 10) / 10
    },
    // Risikogruppe (1 bis 5)
    rg(): number {
      switch (Number(this.fg.veranstaltungskategorie)) {
        case EventCategory.indoorEvent:
          return this.riskGroup([0, 1000, 3500, 7000, 10000])
        case EventCategory.concertCinema:
        case EventCategory.parade:
        case EventCategory.marathon:
          return this.riskGroup([0, 1000, 10000, 20000, 30000])
        case EventCategory.streetFestival:
        case EventCategory.tradeFair:
          return this.riskGroup([0, 1000, 10000, 20000, 50000])
        case EventCategory.sport:
        case EventCategory.classicConcert:
          return this.riskGroup([0, 3500, 15000, 30000, 60000])
        default:
          return 0
      }
    },
    // Risikofaktor (1, 1,25, 1,5, 2 oder 2,5)
    fr(): number {
      var factors = [1, 1.25, 1.5, 2, 2.5]
      return factors[Math.max(this.rg - 1, 0)]
    },
    // Sicherheitsfaktor (arithmetisches Mittel aller Einflussfaktoren)
    fs(): number {
      return Object.values(this.fe).reduce((a, b) => a + b, 0) / Object.keys(this.fe).length
    },

    visitorStep(): number {
      var steps: { [key: number]: number } = {
        0: 100,
        5000: 500,
        10000: 1000,
        50000: 5000,
        100000: 10000,
        1000000: 25000
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
            <h1>Münchner Methode</h1>
          </v-card-title>
          <v-card-subtitle class="px-0">
            Für die Beurteilung der Veranstaltungssicherheit (Sicherheitskoeffizient Brandschutz)
          </v-card-subtitle>
          <v-card-text class="px-0 pb-0">
            <p>
              Die Münchener Methode ist ein strukturiertes und transparentes Verfahren zur Bewertung
              der Brandsicherheit von Veranstaltungen. Sie basiert auf wissenschaftlichen
              Erkenntnissen (u.a. von Dipl.-Ing. Fritz Barth, AVBG BW) und ermöglicht es, spezifische Risiken zu identifizieren, erforderliche
              Maßnahmen festzulegen und vorbereitende Schritte für den Brandschutz zu planen. Dabei
              werden sowohl präventive als auch reaktive Brandschutzaspekte berücksichtigt, um die
              Sicherheit von Veranstaltungen zu gewährleisten.
            </p>
            <small class="d-block my-2">
              Quelle: P. Bachmeier, J. Thomann, D. Vosteen et. al.
              "Veranstaltungssicherheit-Leitfaden für Feuerwehr, Sicherheitsbehörde und Polizei sowie Veranstalter und deren Sicherheitsdienstleister."
              München, Juni 2015.
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
          <v-card-title class="text-overline">Sicherheitskoeffizient</v-card-title>
          <v-card-text>
            <div class="text-green-darken-3 text-h3 font-weight-bold">{{ sc }}</div>

            <div class="text-h6 text-medium-emphasis font-weight-regular">
              = {{ Math.floor(fr * 100) / 100 }} Risikofaktor &times;
              {{ Math.floor(fs * 100) / 100 }} Sicherheitsfaktor
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-dialog max-width="500">
            <template v-slot:activator="{ props: activatorProps }">
              <v-list-item
                v-bind="activatorProps"
                append-icon="mdi-chevron-right"
                lines="two"
                subtitle="Einzuleitende Maßnahmen"
                link
              ></v-list-item>
            </template>

            <template v-slot:default>
              <v-card title="Einzuleitende Maßnahmen">
                <v-list>
                  <v-list-item v-show="fe.fluchtwege < 4"
                    >Bearbeitung der Veranstaltung</v-list-item
                  >
                  <v-list-item v-show="fe.fluchtwege >= 4" class="bg-red"
                    >Keine Bearbeitung der Veranstaltung (Ausschlusskriterium
                    Fluchtwege!)</v-list-item
                  >
                  <v-list-item v-show="sc <= 1.5">Keine Einsatzplanung erforderlich</v-list-item>
                  <v-list-item v-show="sc > 1.6">Abnahme der Veranstaltung</v-list-item>
                  <v-list-item v-show="sc > 2.1" class="bg-amber"
                    >Forderung eines Sicherheitskonzepts</v-list-item
                  >
                  <v-list-item v-show="sc > 2.1"
                    >Anwesenheit von vorbeugendem Brand- und Gefahrenschutz und Ordnungsamt während
                    der Veranstaltung mit Kontakt zum Veranstalter, Polizei und
                    Rettungsdienst</v-list-item
                  >
                  <v-list-item v-show="sc > 2.1"
                    >Informationen des Abwehrenden Brandschutzes</v-list-item
                  >
                  <v-list-item v-show="sc > 2.1 && sc < 2.6"
                    >Bei Pyrotechnik oder feuergefährlichen Handlungen wird zusätzlich eine
                    Brandsicherheitswache gestellt (in der Regel in der Stärke 0/1/1/2)</v-list-item
                  >
                  <v-list-item v-show="sc > 2.6 && sc < 4.0"
                    >Eine Brandsicherheitswache wird gestellt, in der Regel in der Personalstärke
                    0/1/5/6 + Hilfeleistungslöschfahrzeug (HLF) oder gemäß
                    Einsatzplanung</v-list-item
                  >
                  <v-list-item v-show="sc > 4.0"
                    >Eine Brandsicherheitswache wird gestellt, in der Regel in der Personalstärke
                    1/3/12/16 + Löschzug (ELW, 2x HLF, DLK, RTW) oder gemäß
                    Einsatzplanung</v-list-item
                  >
                  <v-list-item v-show="sc > 2.1"
                    >Weitergabe der einsatztaktisch relevanten Informationen an die Integrierte
                    Leitstelle (ILS) mit der Empfehlung „Sonderausrückung
                    Großveranstaltung“</v-list-item
                  >
                  <v-list-item v-show="sc > 3.1"
                    >Einweisung des Einsatzführungsdienstes vor Ort</v-list-item
                  >
                  <v-list-item v-show="sc > 4.0"
                    >Information des Kreisbrandrates (KBR) und der
                    Katastrophenschutzbehörde</v-list-item
                  >
                  <v-list-item v-show="sc > 2.1" class="bg-deep-orange">Einsatzplanung</v-list-item>
                </v-list>
              </v-card>
            </template>
          </v-dialog>
        </v-card>
      </v-col>

      <v-col md="7">
        <v-form ref="form">
          <h2>Risikofaktor</h2>
          <v-card class="my-4">
            <v-card-text>
              <v-select
                v-model="fg.veranstaltungskategorie"
                :items="eventCategories"
                :item-props="itemProps"
                item-title="title"
                item-value="value"
                label="Veranstaltungskategorie"
                return-object
              >
              </v-select>

              <div class="text-caption">Besucherzahl</div>
              <v-slider
                v-model="fg.besucher"
                max="100000"
                min="0"
                :step="visitorStep"
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

          <h2>Sicherheitsfaktor</h2>
          <MunichScore :options="anfahrtsweg" v-model:value="fe.anfahrtsweg"></MunichScore>

          <MunichScore :options="zufahrt" v-model:value="fe.zufahrt"></MunichScore>

          <MunichScore
            :options="loeschwasserversorgung"
            v-model:value="fe.loeschwasserversorgung"
          ></MunichScore>

          <MunichScore :options="fluchtwege" v-model:value="fe.fluchtwege"></MunichScore>

          <MunichScore
            :options="kommunikationswege"
            v-model:value="fe.kommunikationswege"
          ></MunichScore>

          <MunichScore :options="brandszenarien" v-model:value="fe.brandszenarien"></MunichScore>

          <MunichScore
            :options="zuschauerverhalten"
            v-model:value="fe.zuschauerverhalten"
          ></MunichScore>

          <MunichScore :options="feuergefahr" v-model:value="fe.feuergefahr"></MunichScore>

          <MunichScore
            :options="veranstalterbonus"
            v-model:value="fe.veranstalterbonus"
          ></MunichScore>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
