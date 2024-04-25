<script lang="ts">
import type { PropType } from 'vue'

// Einflussfaktoren
type InfluencingFactors = {
  name?: string
  scale?: [
    {
      value: number
      title: string
      description: string
    }
  ]
  score?: number
}

export default {
  props: {
    options: Object as PropType<InfluencingFactors>, // the possible options on the scale
    value: Number // the chosen value on the scale (usually 0.5 - 4)
  },

  emits: ['update:value'],

  data() {
    return {
      index: 0, // the selected index on the slider
      tickColor: ['green', 'light-green', 'lime', 'yellow', 'amber']
    }
  },

  created() {
    this.$emit('update:value', this.score)
  },

  computed: {
    name(): string {
      return this.options?.name ?? ''
    },
    description(): string {
      return this.options?.scale?.[this.index]?.description ?? ''
    },
    score(): number {
      // Get the score based on the selected index on the scale
      return this.options?.scale?.[this.index]?.value ?? 0
    },
    maxIndex(): number {
      // Get the number of items on the scale minus one
      return Object.keys(this.tickLabels).length - 1
    },
    tickLabels(): Record<number, string> {
      var labels: Record<number, string> = {}
      this.options?.scale?.forEach((item, idx) => {
        return (labels[idx] = item.title)
      })
      return labels
    }
  }
}
</script>

<template>
  <v-card class="my-4">
    <v-card-title
      ><div class="text-caption">{{ name }}</div></v-card-title
    >

    <v-card-text>
      <v-slider
        v-model="index"
        v-on:update:model-value="$emit('update:value', score)"
        :max="maxIndex"
        :ticks="tickLabels"
        :color="tickColor[Math.min(Math.floor(index), maxIndex)]"
        class="mt-5 mx-4"
        thumb-label="always"
        show-ticks="always"
        step="1"
        tick-size="4"
      >
        <template v-slot:thumb-label>
          {{ score }}
        </template>
      </v-slider>

      <p class="bg-surface-light pa-2">{{ description }}</p>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
