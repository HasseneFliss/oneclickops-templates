<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Item {
  id: string;
  name: string;
  description?: string;
}

const items = ref<Item[]>([]);
const loading = ref(true);
const API_URL = import.meta.env.VITE_API_URL || '';

onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/items`);
    items.value = await res.json();
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white p-8">
    <h1 class="text-4xl font-bold mb-8">{{DISPLAY_NAME}}</h1>
    <p v-if="loading">Loading...</p>
    <div v-else class="grid gap-4">
      <div v-for="item in items" :key="item.id" class="bg-slate-800 p-4 rounded-lg">
        <h2 class="text-xl font-semibold">{{ item.name }}</h2>
        <p class="text-slate-400">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>
