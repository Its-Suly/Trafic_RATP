<template>
  <div>
    <h2>Lignes Métro 🚇</h2>
<LineCard
  v-for="line in metroLines"
  :key="line.code"
  :lineName="line.name"
  :message="getDisruptionMessage(line.code)"
  :status="getStatus(line.code)"
  :iconSrc="`/logo-Metro/${line.code}.png`">
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

const metroLines = [
  { code: 'M1', name: 'La Défense - Château de Vincennes' },
  { code: 'M2', name: 'Porte Dauphine - Nation' },
  { code: 'M3', name: 'Pont de Levallois - Gallieni' },
  { code: 'M4', name: 'Porte de Clignancourt - Mairie de Montrouge' },
  { code: 'M5', name: "Bobigny - Place d'Italie" },
  { code: 'M6', name: 'Charles de Gaulle-Étoile - Nation' },
  { code: 'M7', name: "La Courneuve - Mairie d'Ivry/Villejuif" },
  { code: 'M8', name: 'Balard - Pointe du Lac' },
  { code: 'M9', name: 'Pont de Sèvres - Mairie de Montreuil' },
  { code: 'M10', name: "Boulogne - Gare d'Austerlitz" },
  { code: 'M11', name: 'Châtelet - Mairie des Lilas' },
  { code: 'M12', name: "Front Populaire - Mairie d'Issy" },
  { code: 'M13', name: 'Asnières-Gennevilliers/Saint-Denis - Châtillon-Montrouge' },
  { code: 'M14', name: 'Saint-Lazare - Olympiades' }
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