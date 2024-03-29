<script setup>
import StarRating from '@/components/Ratings/StarRating.vue'
import { computed } from 'vue'
import { useFormatFunctions } from '@/Composables/useFormatFunctions'

const props = defineProps({ product: Object })

const { formatAmount } = useFormatFunctions()

const avgRating = computed(() => {
  const rawAvgRating = props.product?.product_reviews_avg_rating

  const avgRatingValue = parseFloat(rawAvgRating)

  if (!Number.isNaN(avgRatingValue)) {
    return avgRatingValue.toFixed(1)
  }

  return null
})

const discountPercentage = computed(() => {
  const discountPercentage =
    ((props.product?.base_price - props.product?.discount_price) / props.product?.base_price) * 100

  return Math.round(discountPercentage)
})
</script>

<template>
  <div
    class="group rounded-[5px] bg-white border border-gray-200 shadow-sm text-center flex flex-col items-center justify-start w-[300px] max-w-[300px] h-[400px] overflow-hidden"
  >
    <router-link
      :to="{ name: 'menus.show', params: { slug: product?.slug }, query: { tab: 'description' } }"
      class="relative w-full h-[220px] overflow-hidden"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      <img
        class="rounded-t-[5px] w-full h-full object-cover group-hover:scale-110 duration-300 transition-all"
        :src="product?.image"
        :alt="product?.name"
      />
      <span
        v-show="product?.discount_price"
        class="absolute top-0 end-0 rounded-se-[5px] rounded-es-xl text-xs font-medium bg-orange-500 text-white py-1.5 px-3"
      >
        {{ discountPercentage }}% OFF
      </span>
    </router-link>

    <div class="p-5">
      <router-link
        :to="{ name: 'menus.show', params: { slug: product?.slug }, query: { tab: 'description' } }"
        class="text-lg font-bold leading-tight text-slate-900 line-clamp-2 mb-2 hover:text-orange-500 duration-150 cursor-pointer"
      >
        {{ product?.name }}
      </router-link>

      <p class="text-slate-600 text-xs font-semibold mb-4">
        {{ product?.ingredients }}
      </p>

      <div v-show="avgRating" class="flex items-center justify-center space-x-3 text-sm mb-4">
        <StarRating :rating="avgRating" />
        <span class="font-semibold text-slate-600 text-sm">
          ({{ product?.product_reviews_count }})
        </span>
      </div>

      <div v-if="product?.discount_price" class="text-lg space-x-3">
        <span class="text-orange-500 font-bold">$ {{ formatAmount(product?.discount_price) }}</span>
        <span class="text-slate-600 line-through text-sm font-medium">
          $ {{ formatAmount(product?.base_price) }}
        </span>
      </div>
      <div v-else class="text-lg space-x-3">
        <span class="text-orange-500 font-bold">$ {{ formatAmount(product?.base_price) }}</span>
      </div>
    </div>
  </div>
</template>
