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
import { onMounted, reactive, ref, watch } from 'vue'
import { useCouponStore } from '@/stores/dashboard/coupon'
import { storeToRefs } from 'pinia'

useTitle('Create Coupon - Restaurant Food Ordering')

const store = useCouponStore()
const isCreateAnother = ref(false)
const { products } = storeToRefs(store)
const form = reactive({
  code: '',
  description: '',
  type: '',
  discount_amount: '',
  minimum_order_amount: '',
  usage_limit: '',
  free_item_id: '',
  validity_period: '',
  start_date: '',
  end_date: '',
  status: ''
})

onMounted(async () => await store.getResources())

const handleCreateCoupon = async () => {
  await store.createCoupon({ ...form }, isCreateAnother.value)
  if (isCreateAnother.value && !store.errors) {
    form.code = ''
    form.description = ''
    form.type = ''
    form.discount_amount = ''
    form.minimum_order_amount = ''
    form.usage_limit = ''
    form.free_item_id = ''
    form.validity_period = ''
    form.start_date = ''
    form.end_date = ''
    form.status = ''

    store.getResources()
  }
}

watch(
  () => form.type,
  (newType) => {
    if (newType === 'percentage' || newType === 'fixed') {
      form.free_item_id = ''
    } else if (newType === 'free_item') {
      form.discount_amount = ''
    }
  }
)

watch(
  () => form.validity_period,
  (newPeriod) => {
    if (newPeriod === 'once' || newPeriod === 'forever') form.usage_limit = ''
  }
)
</script>

<template>
  <DashboardLayout>
    <div class="min-h-screen py-10">
      <div
        class="flex flex-col items-start md:flex-row md:items-center md:justify-between mb-4 md:mb-8"
      >
        <Breadcrumb to="admin.coupons.index" icon="fa-ticket" label="Coupons">
          <BreadcrumbItem label="Create" />
        </Breadcrumb>

        <div class="w-full flex items-center justify-end">
          <GoBackButton />
        </div>
      </div>

      <!-- Form Start -->
      <div class="border p-10 bg-white rounded-md">
        <form @submit.prevent="handleCreateCoupon" class="space-y-4 md:space-y-6">
          <div>
            <InputLabel label="Coupon Code" required />

            <InputField
              type="text"
              name="coupon-code"
              placeholder="Enter Coupon code ( Eg. SUMMER10 )"
              required
              v-model="form.code"
            />

            <InputError :message="store.errors?.code" />
          </div>

          <div>
            <InputLabel label="Description" required />

            <InputField
              type="text"
              name="coupon-description"
              placeholder="Enter Coupon Description ( Eg. Summer Discount - 10% off )"
              required
              v-model="form.description"
            />

            <InputError :message="store.errors?.description" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Coupon Type" required />

              <SelectBox
                name="type"
                :options="[
                  {
                    label: 'Percentage',
                    value: 'percentage'
                  },
                  {
                    label: 'Fixed',
                    value: 'fixed'
                  },
                  {
                    label: 'Free Item',
                    value: 'free_item'
                  }
                ]"
                required
                v-model="form.type"
              />

              <InputError :message="store.errors?.type" />
            </div>

            <div>
              <InputLabel label="Validity Period" required />

              <SelectBox
                name="validity-period"
                :options="[
                  {
                    label: 'Once',
                    value: 'once'
                  },
                  {
                    label: 'Multiple',
                    value: 'multiple'
                  },
                  {
                    label: 'Forever',
                    value: 'forever'
                  }
                ]"
                required
                v-model="form.validity_period"
              />

              <InputError :message="store.errors?.validity_period" />
            </div>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-5"
            :class="{ 'md:grid-cols-3': form.validity_period === 'multiple' }"
          >
            <div v-if="form.validity_period === 'multiple'">
              <InputLabel label="Usage Limit" required />

              <InputField
                type="number"
                name="limit"
                placeholder="Enter Minimum Order Amount"
                required
                v-model="form.usage_limit"
              />

              <InputError :message="store.errors?.usage_limit" />
            </div>

            <div>
              <InputLabel label="Minimum Order Amount" required />

              <InputField
                type="text"
                name="order-amount"
                placeholder="Enter Minimum Order Amount"
                required
                v-model="form.minimum_order_amount"
              />

              <InputError :message="store.errors?.minimum_order_amount" />
            </div>

            <div v-if="form.type !== 'free_item'">
              <InputLabel label="Discount Amount" required />

              <InputField
                type="text"
                name="discount-amount"
                placeholder="Enter Coupon Discount Amount"
                required
                v-model="form.discount_amount"
              />

              <InputError :message="store.errors?.discount_amount" />
            </div>

            <div v-if="form.type === 'free_item'">
              <InputLabel label="Free Item" required />

              <SelectBox
                name="free-item"
                :options="products ?? {}"
                required
                v-model="form.free_item_id"
              />

              <InputError :message="store.errors?.free_item_id" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <InputLabel label="Coupon Start Date" required />

              <VueDatePicker
                v-model="form.start_date"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Coupon Start Date"
              />

              <InputError :message="store.errors?.start_date" />
            </div>

            <div>
              <InputLabel label="Coupon End Date" required />

              <VueDatePicker
                v-model="form.end_date"
                text-input
                required
                :enable-time-picker="false"
                placeholder="Select Coupon Start Date"
              />

              <InputError :message="store.errors?.end_date" />
            </div>
          </div>

          <div>
            <InputLabel label="Status" required />

            <SelectBox
              name="status"
              :options="[
                {
                  label: 'Active',
                  value: 'active'
                },
                {
                  label: 'Inactive',
                  value: 'inactive'
                }
              ]"
              required
              v-model="form.status"
            />

            <InputError :message="store.errors?.status" />
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
