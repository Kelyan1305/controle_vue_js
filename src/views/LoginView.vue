<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function login() {
  error.value = ''

  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  loading.value = true

  try {
    await authStore.login(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = 'Email ou mot de passe incorrect'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Connexion</h1>

    <form @submit.prevent="login" class="form">
      <div v-if="error" class="error">{{ error }}</div>

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

      <button type="submit" :disabled="loading">
        {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
      </button>

      <p>
        Pas encore de compte ?
        <router-link to="/register">Créer un compte</router-link>
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