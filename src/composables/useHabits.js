import { ref, computed, onMounted } from 'vue'

export function useHabits() {
  const habits = ref([])

  const loadHabits = () => {
    const stored = localStorage.getItem('habits')
    if (stored) {
      habits.value = JSON.parse(stored)
    }
  }

  const saveHabits = () => {
    localStorage.setItem('habits', JSON.stringify(habits.value))
  }

  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now(),
      name: habit.name,
      description: habit.description || '',
      goal: habit.goal || 30,
      currentStreak: 0,
      longestStreak: 0,
      completedDates: [],
      createdAt: new Date().toISOString()
    }
    habits.value.push(newHabit)
    saveHabits()
  }

  const updateHabit = (id, updates) => {
    const index = habits.value.findIndex(h => h.id === id)
    if (index !== -1) {
      habits.value[index] = {
        ...habits.value[index],
        ...updates
      }
      saveHabits()
    }
  }

  const deleteHabit = (id) => {
    habits.value = habits.value.filter(h => h.id !== id)
    saveHabits()
  }

  const toggleHabitToday = (id) => {
    const habit = habits.value.find(h => h.id === id)
    if (!habit) return

    const today = new Date().toDateString()
    const index = habit.completedDates.indexOf(today)

    if (index > -1) {
      // Remove today's completion
      habit.completedDates.splice(index, 1)
    } else {
      // Add today's completion
      habit.completedDates.push(today)
    }

    // Calculate streak
    updateStreaks(habit)
    saveHabits()
  }

  const updateStreaks = (habit) => {
    if (habit.completedDates.length === 0) {
      habit.currentStreak = 0
      return
    }

    // Sort dates in descending order
    const sortedDates = habit.completedDates
      .map(d => new Date(d))
      .sort((a, b) => b - a)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const mostRecent = new Date(sortedDates[0])
    mostRecent.setHours(0, 0, 0, 0)

    // Check if streak is still active (completed today or yesterday)
    if (mostRecent.getTime() !== today.getTime() && 
        mostRecent.getTime() !== yesterday.getTime()) {
      habit.currentStreak = 0
      return
    }

    // Count consecutive days
    let streak = 0
    let currentDate = new Date(mostRecent)
    
    for (const date of sortedDates) {
      const checkDate = new Date(date)
      checkDate.setHours(0, 0, 0, 0)
      
      if (checkDate.getTime() === currentDate.getTime()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } else {
        break
      }
    }

    habit.currentStreak = streak
    if (streak > habit.longestStreak) {
      habit.longestStreak = streak
    }
  }

  const isCompletedToday = (habitId) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (!habit) return false

    const today = new Date().toDateString()
    return habit.completedDates.includes(today)
  }

  const getProgress = (habit) => {
    return Math.min(100, Math.round((habit.completedDates.length / habit.goal) * 100))
  }

  onMounted(() => {
    loadHabits()
    // Update streaks on mount
    habits.value.forEach(habit => updateStreaks(habit))
    saveHabits()
  })

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitToday,
    isCompletedToday,
    getProgress
  }
}
