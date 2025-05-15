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
  // ✅ Partie TEST ➡️ décommente pour tester sans API
  
  const data = {
    disruptions: [
      { lines: [{ name: "Métro 8", code: "M8" }], message: "Travaux en cours 🚧" },
      { lines: [{ name: "Métro 3", code: "M3" }], message: "Retard de circulation ℹ️" },
      { lines: [{ name: "RER B", code: "RERB" }], message: "Incident technique ❗" }
    ]
  };
  

  // ✅ PROD : appel API réel
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
