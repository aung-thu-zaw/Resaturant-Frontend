<script setup>
defineProps({ relatedBlogs: Object })
</script>

<template>
  <div
    class="p-5 border border-gray-300 rounded-md bg-white flex flex-col w-full items-center space-y-5"
  >
    <h1 class="font-bold text-orange-500 text-lg pb-3 border-b-2 border-b-orange-400 w-full">
      - Related Blogs
    </h1>

    <div class="space-y-3 w-full">
      <div
        v-for="relatedBlog in relatedBlogs"
        :key="relatedBlog.id"
        class="bg-gray-50 p-3 round-md border border-gray-200 w-full font-semibold text-sm text-slate-700 rounded-md flex items-start justify-between hover:scale-105 duration-150 space-x-3"
      >
        <img
          :src="relatedBlog?.thumbnail"
          :alt="relatedBlog.title"
          class="w-16 h-16 rounded-md object-cover"
        />
        <div class="space-y-1.5">
          <router-link :to="{ name: 'blogs.show', params: { slug: relatedBlog?.slug } }">
            <h3 class="font-bold text-md line-clamp-2">
              {{ relatedBlog?.title }}
            </h3>
          </router-link>

          <div class="text-xs font-medium space-x-1.5">
            <span class="text-orange-500">
              <i class="fa-solid fa-calendar"></i>
            </span>
            <span class="font-medium"> {{ relatedBlog?.published_at }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
