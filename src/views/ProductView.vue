<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const productId = parseInt(route.params.id)
const quantity = ref(1)
const product = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    product.value = await productStore.getProduct(productId)
  } catch (err) {
    error.value = "Erreur lors chargement du produit"
  } finally {
    loading.value = false
  }
})

function addToCart() {
  if (!authStore.isAuthenticated) {
    alert("Connectez vous svp pour ajouter au panier")
    return
  }

  cartStore.addItem({
    id: product.value.id,
    title: product.value.title,
    price: product.value.price,
    quantity: quantity.value
  })

  alert("Produit ajouté au panier")
}
</script>

<template>
  <div>
    <div v-if="loading">Chargement du produit...</div>

    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="product" class="product-detail">
      <div>
        <img class="image" :src="product.image" :alt="product.name">
      </div>
      <div>
        <h1>{{ product.title }}</h1>
        <p class="price">{{ product.price }} €</p>
        <p>{{ product.description }}</p>
      </div>
      <div class="add-to-cart">
        <label>
          Quantité :
          <input type="number" v-model.number="quantity" min="1" />
        </label>

        <button @click="addToCart">Ajouter au panier</button>
      </div>
    </div>

    <div v-else>Produit non trouvé</div>
   <router-link to="/">Retour aux produits</router-link>
  </div>
</template>

<style>
.product-detail {
  margin: 20px 0;
}

.price {
  font-weight: bold;
  font-size: 1.2em;
}

.add-to-cart {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.image {
  width: 40%;
}

</style>