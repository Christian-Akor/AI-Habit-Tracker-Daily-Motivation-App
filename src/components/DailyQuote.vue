<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-primary-600 dark:text-primary-400">
        Daily Motivation
      </h2>
      <button 
        @click="fetchQuote" 
        :disabled="loading"
        class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>New Quote</span>
      </button>
    </div>
    
    <div v-if="quote" class="text-center">
      <p class="text-lg italic text-gray-700 dark:text-gray-300 mb-3">
        "{{ quote.content }}"
      </p>
      <p class="text-sm font-semibold text-primary-600 dark:text-primary-400">
        — {{ quote.author }}
      </p>
    </div>
    
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    
    <div v-else class="text-center text-gray-500">
      <p>Loading inspirational quote...</p>
    </div>
  </div>
</template>

<script setup>
import { useDailyQuote } from '../composables/useDailyQuote'

const { quote, loading, error, fetchQuote } = useDailyQuote()
</script>
