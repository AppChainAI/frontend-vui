<script setup lang="ts">
import { ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const iconRef = ref<HTMLDivElement>()
const { isOutside } = useMouseInElement(iconRef)

// 动画状态
const isAnimating = ref(false)

// 处理鼠标事件
function handleMouseEnter() {
  isAnimating.value = true
}

function handleMouseLeave() {
  isAnimating.value = false
}
</script>

<template>
  <div ref="iconRef"
    class="cursor-pointer select-none p-2 rounded-md transition-colors duration-200 flex items-center justify-center overflow-hidden"
    @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="[
        'transition-transform duration-1000',
        {
          'animate-search-bounce': isAnimating
        }
      ]">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  </div>
</template>

<style>
@keyframes search-bounce {
  0% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(0, -4px);
  }

  75% {
    transform: translate(-3px, 0);
  }

  100% {
    transform: translate(0, 0);
  }
}

.animate-search-bounce {
  animation: search-bounce 1s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
