import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const loading = ref(false)
    const error = ref(null)

    const demoProducts = [
        {
            id: 1,
            title: 'Smartphone',
            image: '/images/smartphone.png',
            price: 599.99,
            description: 'Un smartphone bluetooth de 256Go '
        },
        {
            id: 2,
            title: 'Ordinateur portable',
            image: '/images/ordi.png',
            price: 899.99,
            description: 'Ordinateur portable haut de gamme'
        },
        {
            id: 3,
            title: 'Casque sans fil',
            image: '/images/casque.png',
            price: 129.99,
            description: 'Casque sans fil avec réduction de bruit.'
        },
        {
            id: 4,
            title: 'Montre connectée',
            image: '/images/montre.png',
            price: 199.99,
            description: 'Montre intelligente.'
        },
        {
            id: 5,
            title: 'Ecran PC',
            image: '/images/ecran_pc.png',
            price: 99.99,
            description: 'Ecran de 27 pouces FULL HD.'
        },
    ]

    async function fetchProducts() {
        loading.value = true
        error.value = null

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            products.value = demoProducts
        } catch (err) {
            error.value = "Erreur lors du chargement des produits"
            console.error(err)
        } finally {
            loading.value = false
        }
    }

    async function getProduct(id) {
        if (products.value.length === 0) {
            await fetchProducts()
        }

        const product = products.value.find(p => p.id === id)

        if (!product) {
            throw new Error('Produit non trouvé')
        }

        return product
    }

    return {
        products,
        loading,
        error,
        fetchProducts,
        getProduct
    }
})