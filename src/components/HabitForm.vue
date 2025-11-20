<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
    <h3 class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
      {{ isEditing ? 'Edit Habit' : 'Add New Habit' }}
    </h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Habit Name *
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          placeholder="e.g., Morning Exercise"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          placeholder="e.g., 30 minutes of cardio every morning"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>

      <div>
        <label for="goal" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Goal (Days)
        </label>
        <input
          id="goal"
          v-model.number="form.goal"
          type="number"
          min="1"
          placeholder="30"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div class="flex gap-3">
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
        >
          {{ isEditing ? 'Update Habit' : 'Add Habit' }}
        </button>
        
        <button
          v-if="isEditing"
          type="button"
          @click="cancelEdit"
          class="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingHabit: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  name: '',
  description: '',
  goal: 30
})

const isEditing = ref(false)

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    goal: 30
  }
}

watch(() => props.editingHabit, (newVal) => {
  if (newVal) {
    isEditing.value = true
    form.value = {
      name: newVal.name,
      description: newVal.description,
      goal: newVal.goal
    }
  } else {
    isEditing.value = false
    resetForm()
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value })
  resetForm()
}

const cancelEdit = () => {
  emit('cancel')
  resetForm()
}
</script>
