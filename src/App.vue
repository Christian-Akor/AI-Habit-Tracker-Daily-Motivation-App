<template>
  <div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Habit Tracker
            </h1>
            <p class="text-gray-600 dark:text-gray-400">
              Build better habits, one day at a time
            </p>
          </div>
          
          <button
            @click="toggleDarkMode"
            class="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="isDark" class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </header>

      <!-- Daily Quote -->
      <DailyQuote />

      <!-- Habit Form -->
      <HabitForm
        :editing-habit="editingHabit"
        @submit="handleHabitSubmit"
        @cancel="editingHabit = null"
      />

      <!-- Habit List -->
      <HabitList
        :habits="habits"
        :is-completed-today="isCompletedToday"
        :get-progress="getProgress"
        @toggle="handleToggleHabit"
        @edit="handleEditHabit"
        @delete="handleDeleteHabit"
      />

      <!-- Confetti Effect -->
      <ConfettiEffect :active="showConfetti" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DailyQuote from './components/DailyQuote.vue'
import HabitForm from './components/HabitForm.vue'
import HabitList from './components/HabitList.vue'
import ConfettiEffect from './components/ConfettiEffect.vue'
import { useHabits } from './composables/useHabits'
import { useDarkMode } from './composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
const { 
  habits, 
  addHabit, 
  updateHabit, 
  deleteHabit, 
  toggleHabitToday, 
  isCompletedToday,
  getProgress
} = useHabits()

const editingHabit = ref(null)
const showConfetti = ref(false)

const handleHabitSubmit = (habitData) => {
  if (editingHabit.value) {
    updateHabit(editingHabit.value.id, habitData)
    editingHabit.value = null
  } else {
    addHabit(habitData)
  }
}

const handleToggleHabit = (habitId) => {
  const wasCompleted = isCompletedToday(habitId)
  toggleHabitToday(habitId)
  
  // Show confetti when completing a habit
  if (!wasCompleted) {
    const habit = habits.value.find(h => h.id === habitId)
    if (habit && habit.currentStreak > 0 && habit.currentStreak % 7 === 0) {
      // Show confetti on milestone streaks (every 7 days)
      showConfetti.value = true
      setTimeout(() => {
        showConfetti.value = false
      }, 100)
    }
    
    // Always show confetti when reaching goal
    if (habit && getProgress(habit) === 100) {
      showConfetti.value = true
      setTimeout(() => {
        showConfetti.value = false
      }, 100)
    }
  }
}

const handleEditHabit = (habit) => {
  editingHabit.value = habit
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleDeleteHabit = (habitId) => {
  if (confirm('Are you sure you want to delete this habit?')) {
    deleteHabit(habitId)
    if (editingHabit.value?.id === habitId) {
      editingHabit.value = null
    }
  }
}
</script>
