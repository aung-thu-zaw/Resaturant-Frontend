<script setup>
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Breadcrumb from '@/components/Breadcrumbs/MainBreadcrumb.vue'
import BreadcrumbItem from '@/components/Breadcrumbs/BreadcrumbItem.vue'
import InputLabel from '@/components/Forms/Fields/InputLabel.vue'
import InputError from '@/components/Forms/Fields/InputError.vue'
import InputField from '@/components/Forms/Fields/InputField.vue'
import SelectBox from '@/components/Forms/Fields/SelectBox.vue'
import FormButton from '@/components/Buttons/FormButton.vue'
import GoBackButton from '@/components/Buttons/GoBackButton.vue'
import { useTitle } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useCategoryStore } from '@/stores/category'

useTitle('Create - Restaurant Food Ordering')

const isCreateAnother = ref(false)
const categoryStore = useCategoryStore()
const form = reactive({ name: '', status: '' })

const handleCreateCategory = async () => {
  await categoryStore.createCategory({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !categoryStore.errors) {
    form.name = ''
    form.status = ''
  }
}
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.categories.index" icon="fa-list" label="Categories">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-auto flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleCreateCategory" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Category Name" required />

            <InputField
              type="text"
              name="category-name"
              placeholder="Enter Category Name"
              required
              v-model="form.name"
            />

            <InputError :message="categoryStore.errors?.name" />
          </div>

          <div>
            <InputLabel label="Status" required />

            <SelectBox
              name="status"
              :options="[
                {
                  label: 'Show',
                  value: 1
                },
                {
                  label: 'Hide',
                  value: 0
                }
              ]"
              required
              v-model="form.status"
            />

            <InputError :message="categoryStore.errors?.status" />
          </div>

          <div class="flex items-center justify-end w-full space-x-5">
            <FormButton
              @click="isCreateAnother = true"
              class="w-[200px] text-white bg-slate-600 hover:bg-slate-700 rounded-md"
            >
              Save And Create Another
            </FormButton>

            <FormButton
              @click="isCreateAnother = false"
              class="w-[100px] text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              <i class="fa-solid fa-save"></i>
              Save
            </FormButton>
          </div>
        </form>
      </div>
      <!-- Form End -->
    </div>
  </DashboardLayout>
</template>