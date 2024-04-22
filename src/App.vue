<script lang="ts">
import { type RouteLocationRaw } from 'vue-router'

export default {
  data: () => ({
    activeTab: '',
  }),
  computed: {
    tabs() {
      return [
        { id: 0, name: 'Startseite', icon: "mdi-home", to: this.getTabPath('home') },
        { id: 1, name: 'Sicherheitskoeffizient', icon: "mdi-shield-check", to: this.getTabPath('munich-safety') },
      ]
    },
  },
  methods: {
    getTabPath(name: string) {
      return this.$router.resolve({ name, params: this.$route.params }).href
    },
    updateRouter(path: RouteLocationRaw) {
      this.$router.push(path)
    },
  },
}

</script>

<template>
  <v-app>
    <v-app-bar color="primary">

      <v-toolbar-title>Tools für Sicherheitskonzepte von Großveranstaltungen</v-toolbar-title>

      <template v-slot:extension>
        <v-tabs v-model="activeTab">
          <v-tab v-for="tab in tabs" :key="tab.id" :to="tab.to">
            <v-icon start>{{ tab.icon }}</v-icon> {{ tab.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-window v-model="activeTab" @change="updateRouter($event)">
      <v-window-item v-for="tab in tabs" :key="tab.id" :value="tab.to">
        <router-view />          
      </v-window-item>
      </v-window>
    </v-main>

    <v-footer>
      <v-row justify="center" no-gutters>
      <v-col class="text-center mt-2" cols="12">
        <v-icon icon="mdi-copyright" size="small" /> {{ new Date().getFullYear() }} — <a href="https://github.com/moabits">moabits</a>
      </v-col>
      <v-col class="text-center mt-2" cols="12">
        <small>Keine Gewähr auf Richtigkeit oder Vollständigkeit.</small>
      </v-col>
    </v-row>
    </v-footer>
  </v-app>
</template>



