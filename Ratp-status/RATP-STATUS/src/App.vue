<template>
  <div id="app">
    <header>
      <h1>Trafic RATP 🚇</h1>
      <p>Informations en temps réel</p>
    </header>
    <main>
      <DisruptionsList />
    </main>
  </div>
</template>

<script lang="ts" setup>
import DisruptionsList from '@/components/DisruptionsList.vue'
</script>

<style scoped>
#app {
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 2rem;
  margin: 0;
  color: #333;
}

header p {
  margin: 5px 0 0 0;
  font-size: 1rem;
  color: #666;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 20px;
}
</style>
