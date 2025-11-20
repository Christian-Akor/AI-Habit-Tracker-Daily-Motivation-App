<template>
  <Teleport to="body">
    <div
      v-if="isActive"
      class="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref="canvas" class="w-full h-full"></canvas>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

const canvas = ref(null)
const isActive = ref(false)
let animationFrame = null
let particles = []

class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 8 + 4
    this.speedX = Math.random() * 6 - 3
    this.speedY = Math.random() * -15 - 10
    this.gravity = 0.6
    this.opacity = 1
    this.color = this.getRandomColor()
  }

  getRandomColor() {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
      '#98D8C8', '#FFD93D', '#6BCB77', '#4D96FF'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  update() {
    this.speedY += this.gravity
    this.x += this.speedX
    this.y += this.speedY
    this.opacity -= 0.01
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
    ctx.restore()
  }
}

const createConfetti = () => {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  const centerX = canvas.value.width / 2
  const centerY = canvas.value.height / 2

  // Create particles
  particles = []
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle(centerX, centerY))
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    particles = particles.filter(particle => particle.opacity > 0)

    particles.forEach(particle => {
      particle.update()
      particle.draw(ctx)
    })

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animate)
    } else {
      isActive.value = false
    }
  }

  animate()
}

const resizeCanvas = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

watch(() => props.active, (newVal) => {
  if (newVal) {
    isActive.value = true
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    setTimeout(() => {
      createConfetti()
    }, 100)
  }
})

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
})
</script>
