<script setup lang="ts"></script>

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
  
        </v-col>
  
        <v-col md="7">
          t.b.d.
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <style></style>
