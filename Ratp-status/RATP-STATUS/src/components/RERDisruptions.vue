<template>
  <div>
    <h2>Lignes RER 🚆</h2>
<LineCard
  v-for="line in rerLines"
  :key="line.code"
  :lineName="line.name"
  :message="getDisruptionMessage(line.code)"
  :status="getStatus(line.code)"
  :iconSrc="`/logo-RER/${line.code}.png`">
</LineCard>

  </div>
</template>

<script lang="ts" setup>
import LineCard from './LineCard.vue'

interface Disruption {
  lines?: { name?: string; code?: string }[];
  message?: string;
}

const props = defineProps<{ disruptions: Disruption[] }>()

const rerLines = [
  { code: 'RERA', name: 'RER A' },
  { code: 'RERB', name: 'RER B' },
  { code: 'RERC', name: 'RER C' },
  { code: 'RERD', name: 'RER D' },
  { code: 'RERE', name: 'RER E' }
]

const getDisruptionMessage = (code: string) => {
  const disruption = props.disruptions.find(d => d.lines?.[0]?.code === code)
  return disruption?.message ?? 'Service normal ✅'
}

const getStatus = (code: string) => {
  const disruption = props.disruptions.find(d => d.lines?.[0]?.code === code)
  const msg = disruption?.message?.toLowerCase() ?? ''
  if (!disruption) return 'normal'
  if (msg.includes('aucune perturbation')) return 'normal'
  if (msg.includes('info') || msg.includes('retard')) return 'info'
  return 'alert'
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 15px;
}
</style>
