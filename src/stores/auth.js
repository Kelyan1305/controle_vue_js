
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'user@example.com' && password === 'password') {
                    const userData = {
                        id: 1,
                        name: 'Utilisateur Test',
                        email: email
                    }

                    user.value = userData
                    const authToken = 'fake-token-' + Math.random().toString(36).substring(2)
                    token.value = authToken
                    localStorage.setItem('token', authToken)
                    resolve(userData)
                } else {
                    reject(new Error('Email ou mot de passe incorrect'))
                }
            }, 1000)
        })
    }

    async function register(name, email, password) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = {
                    id: Date.now(),
                    name: name,
                    email: email
                }

                user.value = userData
                const authToken = 'fake-token-' + Math.random().toString(36).substring(2)
                token.value = authToken
                localStorage.setItem('token', authToken)
                resolve(userData)
            }, 1000)
        })
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        register,
        logout
    }
})