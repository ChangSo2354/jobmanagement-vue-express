<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import NotFoundPage from './component/NotFoundPage.vue';

const name = ref("");
const email = ref("");
const password = ref("");

const message = ref("");
const errorLength = ref(false);

const isLoading = ref(false);

const authStore = useAuthStore();

const handleRegister = async () => {
  if (password.value.length < 8) {
    errorLength.value = true;
    message.value = "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៨ តួអក្សរ!";
    return;
  }

  try {
    isLoading.value = true;
    await authStore.register(name.value, email.value, password.value);

    name.value = "";
    email.value = "";
    password.value = "";
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full h-[100vh] flex items-center justify-center">
    <div class="w-[30%] hidden lg:block border border-blue-900 rounded-sm p-10 text-center">
      <h2 class="text-4xl font-bold text-blue-900">បង្កើតគណនី</h2>

      <p class="text-sm text-gray-500">បំពេញព័ត៌មានខាងក្រោម</p>

      <form @submit.prevent="handleRegister" class="mt-5">
        <!-- <p class="text-red-500 bg-red-200 py-2 rounded-sm mb-2">Invalid some filed</p> -->

        <input v-model="name" required type="text" name="" id="" placeholder="ឈ្មោះ"
          class="w-full border-b border-blue-900 py-2 outline-0 mb-3">

        <input v-model="email" required type="email" name="" id="" placeholder="example@gmail.com"
          class="w-full border-b border-blue-900 py-2 outline-0 mb-3">

        <input v-model="password" required type="password" name="" id="" placeholder="ពាក្យសម្ងាត់"
          class="w-full border-b border-blue-900 py-2 outline-0 mb-3"
          :class="errorLength ? 'border-red-600 text-red-600':'border-blue-900 text-black' ">

        <p v-if="errorLength" class="text-red-500 mb-3 text-start">
          {{ message }}
        </p>

        <button :disabled="isLoading"
          class="w-full border p-2 border-blue-900 text-blue-900 transition mt-2 hover:bg-blue-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-900 disabled:hover:text-blue-900 disabled:pointer-events-none">
          {{ isLoading ? "កំពុងបង្កើតគណនី..." : "បង្កើតគណនីថ្មីឥឡូវនេះ" }}
        </button>
      </form>

      <p class="mt-6 text-gray-500">
        មានគណនីរួចហើយ?
        <router-link to="/login" class="text-blue-500 underline hover:text-blue-700 transition">
          ចូលប្រើ
        </router-link>
      </p>
    </div>
    <NotFoundPage />
  </div>
</template>
