<script setup>
import { computed } from 'vue'

const props = defineProps({
  class: {
    type: String,
    default: 'text-white bg-purpleDark hover:bg-indigo-950 rounded-md w-full'
  },

  processing: {
    type: Boolean,
    default: false
  }
})

const computedClasses = computed(() => props.class)
</script>

<template>
  <button
    type="submit"
    class="text-sm text-white capitalize font-medium py-3 active:animate-press"
    :class="computedClasses"
    :disabled="processing"
  >
    <div v-if="processing" class="flex items-center justify-center">
      <div
        class="animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-white rounded-full mr-2"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <span>Processing...</span>
    </div>
    <div v-else>
      <slot />
    </div>
  </button>
</template>
