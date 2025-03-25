<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div>
    <h1>Bienvenue dans notre boutique</h1>

    <div v-if="productStore.loading">Chargement des produits...</div>
    <div v-else-if="productStore.error">
      Une erreur est survenue: {{ productStore.error }}
    </div>

    <div class="products" v-else>
      <div v-for="product in productStore.products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image">
        <div class="product-info">
          <h3>{{ product.title }}</h3>
          <p class="product-price">{{ product.price.toFixed(2) }}€</p>
        </div>
        <router-link :to="`/product/${product.id}`">Voir détails</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.add-to-cart {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

</style>