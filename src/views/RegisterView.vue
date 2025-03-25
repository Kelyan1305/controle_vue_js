<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

async function register() {
  error.value = ''

  if (!name.value || !email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Les mots de passe ne correspondent pas'
    return
  }

  loading.value = true

  try {
    await authStore.register(name.value, email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = "Erreur lors de l'inscription"
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Créer un compte</h1>

    <form @submit.prevent="register" class="form">
      <div v-if="error" class="error">{{ error }}</div>

      <div class="form-group">
        <label for="name">Nom</label>
        <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Votre nom"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="exemple@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Votre mot de passe"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe</label>
        <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirmez votre mot de passe"
        />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Inscription en cours...' : "S'inscrire" }}
      </button>

      <p>
        Déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </form>
  </div>
</template>

<style>
.form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
}
</style>