<template>
  <div class="maintenance-page">
    <div class="content-wrapper">
      <div class="maintenance-container">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="wrench-icon">
            <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1>We'll Be Back Soon!</h1>
        <p class="maintenance-message">
          Our website is currently undergoing scheduled maintenance. 
          We apologize for any inconvenience and will be back online shortly.
        </p>
        <div class="countdown" v-if="showCountdown">
          <h3>Estimated time until launch:</h3>
          <div class="time-units">
            <div class="time-unit">
              <span class="number">{{ days }}</span>
              <span class="label">Days</span>
            </div>
            <div class="time-unit">
              <span class="number">{{ hours }}</span>
              <span class="label">Hours</span>
            </div>
            <div class="time-unit">
              <span class="number">{{ minutes }}</span>
              <span class="label">Minutes</span>
            </div>
            <div class="time-unit">
              <span class="number">{{ seconds }}</span>
              <span class="label">Seconds</span>
            </div>
          </div>
        </div>
        <div class="contact-info">
          <p>Need urgent assistance?</p>
          <a href="mailto:support@example.com" class="contact-link">support@example.com</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  countdownTo?: Date
  showCountdown?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  countdownTo: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default: 1 week from now
  showCountdown: true
})

const now = ref(new Date())
let intervalId: number | null = null

const timeDifference = computed(() => {
  return props.countdownTo.getTime() - now.value.getTime()
})

const days = computed(() => {
  return Math.floor(timeDifference.value / (1000 * 60 * 60 * 24))
})

const hours = computed(() => {
  return Math.floor((timeDifference.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
})

const minutes = computed(() => {
  return Math.floor((timeDifference.value % (1000 * 60 * 60)) / (1000 * 60))
})

const seconds = computed(() => {
  return Math.floor((timeDifference.value % (1000 * 60)) / 1000)
})

const updateTimer = () => {
  now.value = new Date()
}

onMounted(() => {
  if (props.showCountdown) {
    intervalId = window.setInterval(updateTimer, 1000)
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.maintenance-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.maintenance-container {
  padding: 3rem 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background-color: #ffc107;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrench-icon {
  width: 40px;
  height: 40px;
  color: white;
}

h1 {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1rem;
}

.maintenance-message {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.countdown h3 {
  font-size: 1.2rem;
  color: #495057;
  margin-bottom: 1.5rem;
}

.time-units {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.number {
  font-size: 2rem;
  font-weight: 700;
  color: #007bff;
  background-color: #e7f1ff;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.label {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6c757d;
  text-transform: uppercase;
}

.contact-info {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.contact-info p {
  margin-bottom: 0.5rem;
  color: #6c757d;
}

.contact-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.contact-link:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .time-units {
    gap: 0.5rem;
  }
  
  .number {
    font-size: 1.5rem;
    width: 50px;
    height: 50px;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  .maintenance-message {
    font-size: 1rem;
  }
}
</style>