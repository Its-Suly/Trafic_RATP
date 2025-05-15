<template>
  <div class="dashboard">
    <div class="dashboard-cards">
      <div class="card info-card">
        <h3>{{ activeTab === 'metro' ? 'Métro' : 'RER' }}</h3>
        <div class="status-number">
          {{ normalLinesCount }}/{{ totalLinesCount }}
        </div>
        <div class="status-text">
          {{ disruptedLinesCount > 0 ? 'Lignes perturbées' : 'Lignes normales' }}
        </div>
      </div>

      <div class="card update-card">
        <h3>Mise à jour</h3>
        <div class="update-time">{{ lastUpdate }}</div>
        <div class="status-text">Actualisé automatiquement</div>
      </div>
    </div>

    <div class="tabs">
      <button :class="{ active: activeTab === 'metro' }" @click="activeTab = 'metro'">Métro</button>
      <button :class="{ active: activeTab === 'rer' }" @click="activeTab = 'rer'">RER</button>
    </div>

    <MetroDisruptions v-if="activeTab === 'metro'" :disruptions="metroDisruptions" />
    <RERDisruptions v-else :disruptions="rerDisruptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api'
import MetroDisruptions from '@/components/MetroDisruptions.vue'
import RERDisruptions from '@/components/RERDisruptions.vue'

interface Disruption {
  lines?: { name?: string; code?: string }[];
  message?: string;
}

const activeTab = ref<'metro' | 'rer'>('metro')
const metroDisruptions = ref<Disruption[]>([])
const rerDisruptions = ref<Disruption[]>([])

const metroLines = [
  { code: 'M1', name: 'Ligne 1' }, { code: 'M2', name: 'Ligne 2' },
  { code: 'M3', name: 'Ligne 3' }, { code: 'M4', name: 'Ligne 4' },
  { code: 'M5', name: 'Ligne 5' }, { code: 'M6', name: 'Ligne 6' },
  { code: 'M7', name: 'Ligne 7' }, { code: 'M8', name: 'Ligne 8' },
  { code: 'M9', name: 'Ligne 9' }, { code: 'M10', name: 'Ligne 10' },
  { code: 'M11', name: 'Ligne 11' }, { code: 'M12', name: 'Ligne 12' },
  { code: 'M13', name: 'Ligne 13' }, { code: 'M14', name: 'Ligne 14' }
]

const rerLines = [
  { code: 'RERA', name: 'RER A' }, { code: 'RERB', name: 'RER B' },
  { code: 'RERC', name: 'RER C' }, { code: 'RERD', name: 'RER D' },
  { code: 'RERE', name: 'RER E' }
]

const fetchDisruptions = async () => {
  const data = await api.getDisruptions()
  metroDisruptions.value = data.disruptions.filter((d: Disruption) => {
    const line = d.lines?.[0]?.code?.toLowerCase() || ''
    return line.startsWith('m')
  })

  rerDisruptions.value = data.disruptions.filter((d: Disruption) => {
    const line = d.lines?.[0]?.code?.toLowerCase() || ''
    return line.startsWith('rer')
  })
}

const lastUpdate = new Date().toLocaleString('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit'
})

const disruptedLinesCount = computed(() => {
  const disruptions = activeTab.value === 'metro' ? metroDisruptions.value : rerDisruptions.value
  return disruptions.filter((d: Disruption) => {
    const msg = d.message?.toLowerCase() ?? ''
    return msg && !msg.includes('aucune perturbation')
  }).length
})

const normalLinesCount = computed(() => {
  const total = activeTab.value === 'metro' ? metroLines.length : rerLines.length
  return total - disruptedLinesCount.value
})

const totalLinesCount = computed(() => activeTab.value === 'metro' ? metroLines.length : rerLines.length)

onMounted(() => {
  fetchDisruptions()
  setInterval(fetchDisruptions, 2 * 60 * 1000)
})
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 16px;
}

.dashboard-cards {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 18px;
  width: 160px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-number {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 8px 0;
}

.status-text {
  color: #777;
  font-size: 0.9rem;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px 20px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.tabs button.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.tabs button:not(:last-child) {
  border-right: none;
}
</style>
