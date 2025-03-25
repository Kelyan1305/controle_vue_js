import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    const itemCount = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    const totalAmount = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    function addItem(newItem) {
        const existingItem = items.value.find(item => item.id === newItem.id)

        if (existingItem) {
            existingItem.quantity += newItem.quantity
        } else {
            items.value.push(newItem)
        }
    }

    function removeItem(itemId) {
        const index = items.value.findIndex(item => item.id === itemId)
        if (index !== -1) {
            items.value.splice(index, 1)
        }
    }

    function updateItemQuantity(itemId, newQuantity) {
        const item = items.value.find(item => item.id === itemId)
        if (item) {
            item.quantity = newQuantity
        }
    }

    function clearCart() {
        items.value = []
    }

    return {
        items,
        itemCount,
        totalAmount,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart
    }
})