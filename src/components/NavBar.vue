<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">Kelyan Ecommerce</router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu">Menu</button>

      <ul class="nav-links" :class="{ 'nav-open': mobileMenuOpen }">
        <li><router-link to="/">Accueil</router-link></li>
        <li v-if="!authStore.isAuthenticated">
          <router-link to="/login">Connexion</router-link>
        </li>
        <li v-if="!authStore.isAuthenticated">
          <router-link to="/register">Inscription</router-link>
        </li>
        <li v-if="authStore.isAuthenticated">
          <router-link to="/cart">Panier</router-link>
        </li>
        <li v-if="authStore.isAuthenticated">
          <a href="#" @click.prevent="logout">Déconnexion</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
nav {
  background-color: #f0f0f0;
  padding: 10px 0;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-links {
  display: flex;
  gap: 20px;
  list-style: none;
}

.menu-toggle {
  display: none;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-links.nav-open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #f0f0f0;
    padding: 10px;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
