import { ref, onMounted } from 'vue'

export function useDailyQuote() {
  const quote = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchQuote = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('https://api.quotable.io/random')
      if (!response.ok) {
        throw new Error('Failed to fetch quote')
      }
      const data = await response.json()
      quote.value = {
        content: data.content,
        author: data.author
      }
      
      // Cache quote for today
      const today = new Date().toDateString()
      localStorage.setItem('cachedQuote', JSON.stringify({
        quote: quote.value,
        date: today
      }))
    } catch (err) {
      error.value = err.message
      console.error('Error fetching quote:', err)
    } finally {
      loading.value = false
    }
  }

  const loadCachedOrFetchQuote = () => {
    const cached = localStorage.getItem('cachedQuote')
    const today = new Date().toDateString()
    
    if (cached) {
      const { quote: cachedQuote, date } = JSON.parse(cached)
      if (date === today) {
        quote.value = cachedQuote
        return
      }
    }
    
    fetchQuote()
  }

  onMounted(() => {
    loadCachedOrFetchQuote()
  })

  return {
    quote,
    loading,
    error,
    fetchQuote
  }
}
