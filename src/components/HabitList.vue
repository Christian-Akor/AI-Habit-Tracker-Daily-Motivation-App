<template>
  <div class="space-y-4">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
      Your Habits
    </h2>

    <div v-if="habits.length === 0" class="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-500 dark:text-gray-400">No habits yet. Create your first habit to get started!</p>
    </div>

    <div
      v-for="habit in habits"
      :key="habit.id"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all hover:shadow-xl"
    >
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
            {{ habit.name }}
          </h3>
          <p v-if="habit.description" class="text-gray-600 dark:text-gray-400 text-sm">
            {{ habit.description }}
          </p>
        </div>

        <div class="flex gap-2 ml-4">
          <button
            @click="$emit('edit', habit)"
            class="p-2 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit habit"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          
          <button
            @click="$emit('delete', habit.id)"
            class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Delete habit"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex items-center justify-between text-sm mb-2">
          <span class="text-gray-600 dark:text-gray-400">Progress</span>
          <span class="font-semibold text-primary-600 dark:text-primary-400">
            {{ habit.completedDates.length }} / {{ habit.goal }} days ({{ getProgress(habit) }}%)
          </span>
        </div>
        
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            class="bg-gradient-to-r from-primary-500 to-primary-600 h-full transition-all duration-500 ease-out"
            :style="{ width: `${getProgress(habit)}%` }"
          ></div>
        </div>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div class="flex gap-4 text-sm">
          <div class="text-center">
            <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {{ habit.currentStreak }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">Current Streak</p>
          </div>
          
          <div class="text-center">
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">
              {{ habit.longestStreak }}
            </p>
            <p class="text-gray-600 dark:text-gray-400">Longest Streak</p>
          </div>
        </div>

        <button
          @click="handleToggle(habit.id)"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105',
            isCompletedToday(habit.id)
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          ]"
        >
          <span v-if="isCompletedToday(habit.id)">✓ Completed Today</span>
          <span v-else>Mark as Done</span>
        </button>
      </div>

      <div v-if="getProgress(habit) === 100" class="text-center py-2">
        <span class="inline-block px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full font-semibold text-sm">
          🎉 Goal Achieved!
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  habits: {
    type: Array,
    required: true
  },
  isCompletedToday: {
    type: Function,
    required: true
  },
  getProgress: {
    type: Function,
    required: true
  }
})

const emit = defineEmits(['toggle', 'edit', 'delete'])

const handleToggle = (habitId) => {
  emit('toggle', habitId)
}
</script>
