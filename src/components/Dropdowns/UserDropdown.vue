<script setup>
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import defaultUserImage from '@/assets/images/anonymous-user.jpg'

const authStore = useAuthStore()

const { currentUser } = storeToRefs(authStore)
</script>

<template>
  <div class="relative inline-flex" data-te-dropdown-ref>
    <button
      id="user-dropdown"
      type="button"
      data-te-dropdown-toggle-ref
      aria-expanded="false"
      class="inline-flex items-center"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-slate-200 inline-flex items-center justify-center rounded-full border border-slate-400 ring-2 ring-slate-300"
        >
          <img
            class="w-full h-full object-cover rounded-full align-middle border-none"
            alt="user-photo"
            :src="currentUser?.avatar ?? defaultUserImage"
          />
        </span>
        <span class="font-semibold text-md ml-2 text-slate-700 hidden md:block">{{
          currentUser?.name
        }}</span>
      </div>
    </button>

    <ul
      class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg bg-white bg-clip-padding text-left text-base shadow-md [&[data-te-dropdown-show]]:block border border-gray-200 p-2 w-[200px]"
      aria-labelledby="user-dropdown"
      data-te-dropdown-menu-ref
    >
      <li>
        <router-link
          :to="{ name: 'my-account', query: { tab: 'personal-information' } }"
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-md"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-user-circle mr-1" />
          My Account
        </router-link>
      </li>

      <li>
        <router-link
          :to="{ name: 'my-orders' }"
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-md"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-bowl-rice mr-1" />
          My Orders
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'wishlists' }"
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-md"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-heart mr-1" />
          Wishlists
        </router-link>
      </li>

      <hr class="my-2" />

      <li>
        <button
          @click="authStore.logout"
          type="button"
          class="block w-full whitespace-nowrap bg-transparent text-left px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-md"
          data-te-dropdown-item-ref
        >
          <i class="fa-solid fa-right-from-bracket mr-1" />
          Logout
        </button>
      </li>
    </ul>
  </div>
</template>
