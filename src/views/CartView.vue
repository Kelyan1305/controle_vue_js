<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const cartItems = computed(() => cartStore.items)
const totalAmount = computed(() => cartStore.totalAmount)

function removeItem(itemId) {
  cartStore.removeItem(itemId)
}

function updateQuantity(item, newQuantity) {
  if (newQuantity <= 0) {
    removeItem(item.id)
    return
  }

  cartStore.updateItemQuantity(item.id, newQuantity)
}

function checkout() {
  alert("Paiement réussi!")
}

function continueShopping() {
  router.push('/')
}
</script>

<template>
  <div>
    <h1>Votre panier</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Panier vide</p>
      <button @click="continueShopping">Continuer vos achats</button>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p>{{ item.price }} € par unité</p>
          </div>

          <div class="item-quantity">
            <button @click="updateQuantity(item, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item, item.quantity + 1)">+</button>
          </div>

          <div class="item-total">
            <p>{{ (item.price * item.quantity).toFixed(2) }} €</p>
            <button @click="removeItem(item.id)">Supprimer</button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h3>Total : {{ totalAmount.toFixed(2) }} €</h3>
        <button @click="checkout" class="checkout-btn">Payer</button>
        <button @click="continueShopping" class="continue-btn">Continuer vos achats</button>
      </div>
    </div>
  </div>
</template>

<style>
.empty-cart {
  text-align: center;
  margin: 50px 0;
}

.cart-items {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-summary {
  margin-top: 20px;
  text-align: right;
}

.checkout-btn {
  margin-right: 10px;
  background-color: #4CAF50;
}

.continue-btn {
  background-color: #2196F3;
}
</style>