<template>
  <div class="card" :class="statusClass">
    <div class="line-info">
      <img :src="iconSrc" alt="Icon ligne" class="line-icon" />

      <div class="line-details">
        <div class="line-header">
          <span class="line-name">{{ lineName }}</span>
          <span v-if="status !== 'normal'" class="badge">{{ badgeText }}</span>
        </div>
        <div class="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  lineName: string
  message: string
  status: string
  iconSrc: string
}>()

const statusClass = {
  normal: status === 'normal',
  info: status === 'info',
  alert: status === 'alert',
}

const badgeText = status === 'normal'
  ? '✅ OK'
  : status === 'info'
    ? 'ℹ️ Info'
    : '❌ Perturbé'
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.08);
}

.line-info {
  display: flex;
  align-items: center;
}

.line-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 15px;
}

.line-details {
  flex: 1;
}

.line-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.line-name {
  font-weight: 700;
  font-size: 1.1rem;
}

/* ✅ CORRIGÉ : aucune couleur par défaut */
.badge {
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* ✅ COULEURS PAR STATUT */
.normal .badge {
  background-color: #4caf50; /* vert */
  color: white;
}

.info .badge {
  background-color: #ff9800; /* orange */
  color: black;
}

.alert .badge {
  background-color: #f44336; /* rouge */
  color: black;
}

.message {
  margin-top: 5px;
  font-size: 0.95rem;
  color: #333;
}
</style>
