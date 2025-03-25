<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="app">
    <NavBar />
    <main>
      <RouterView />
    </main>
    <footer>
      <p>© {{ new Date().getFullYear() }} - Kelyan KARAOUNI</p>
    </footer>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 20px;
}

footer {
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
}
</style>