<script setup>
import AppLayout from '@/layouts/AppLayout.vue'
import BlogCard from '@/components/Cards/BlogCard.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import FilterByCategory from '@/components/Forms/SelectBoxs/FilterByCategory.vue'
import BlogSortBy from '@/components/Forms/SelectBoxs/BlogSortBy.vue'
</script>

<template>
  <AppLayout>
    <section class="background">
      <div class="bg-purpleDark bg-opacity-60">
        <div class="container mx-auto py-24 space-y-5">
          <h1 class="font-bold text-5xl text-white">Our News & Blogs</h1>
          <div class="font-bold text-md space-x-3">
            <span class="text-white">Home</span>
            <span class="text-white"> <i class="fa-solid fa-arrow-right"></i> </span>
            <span class="text-orange-500">Blogs</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 bg-gray-50">
      <div class="container mx-auto space-y-10">
        <div class="bg-white border p-5 rounded-md">
          <div class="flex items-center justify-between">
            <div class="w-[350px]">
              <InputField type="text" name="search" placeholder="Search blog..." />
            </div>
            <div class="space-x-5">
              <FilterByCategory />

              <BlogSortBy />
            </div>
          </div>

          <div></div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.background {
  background-image: url('https://www.highspeedtraining.co.uk/hub/wp-content/uploads/2021/05/how-to-become-a-food-blogger-fi-1.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>