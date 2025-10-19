
<script setup>

import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const logoutModal = ref(false)
const authStore = useAuthStore();

function openModal() {
  logoutModal.value = true
}

function closeModal() {
  logoutModal.value = false
}

const logout = async () => {
  try{
    const res = await authStore.logout();
    console.log(res.data);
  }catch(e){

  }
}

</script>

<template>
  <div class="w-[15%] h-[100vh] bg-blue-900 sticky top-0 p-5">
    <div class="w-full h-full relative">
        <div class="w-full text-center border-b-1 border-gray-400 py-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0amZ6JYcXM__iA-qeenidfFtXyfeIPaZMw&s" alt="" class="w-[100px] h-[100px] bg-gray-50 mx-auto">
            <h1 class="text-xl text-white font-medium mt-2">Company job</h1>
            <p class="text-sm text-gray-400">Work With Us</p>
        </div>

        <ul class="mt-3">
            <router-link to="/dashboard">
              <li class="hover:bg-blue-950 transition p-2 text-white rounded-lg">
                <v-icon name="md-dashboard-round"/>Dashboard
              </li>
            </router-link>
            <router-link to="/dashboard/job">
              <li class="hover:bg-blue-950 transition p-2 text-white rounded-lg">
                <v-icon name="md-workhistory"/>Jobs
              </li>
            </router-link>
            <router-link to="/dashboard/category">
              <li class="hover:bg-blue-950 transition p-2 text-white rounded-lg">
                <v-icon name="md-workspacesfilled"/>Category
              </li>
            </router-link>
            <router-link to="/dashboard/company">
              <li class="hover:bg-blue-950 transition p-2 text-white rounded-lg">
                <v-icon name="hi-solid-office-building"/>Company
              </li>
            </router-link>
            <router-link to="/dashboard/location">
              <li class="hover:bg-blue-950 transition p-2 text-white rounded-lg">
                <v-icon name="bi-pin-map-fill"/>Location
              </li>
            </router-link>
        </ul>

        <div class="absolute bottom-0 w-full">
          <button @click="openModal" class="bg-red-500 w-full rounded-sm py-1 text-white hover:bg-red-700 transition">
            <v-icon name="hi-logout"/>Logout
          </button>
        </div>
    </div>

     <!-- Modal Logout -->
        <div
            v-if="logoutModal"
            class="fixed inset-0 flex items-center justify-center bg-[#00000034]"
        >
            <div class="bg-white p-5 rounded-lg shadow-lg w-[400px]">

            <h2 class="text-lg font-bold mb-3 text-red-600 border-b border-gray-200 pb-2">ចាកចេញ</h2>
            <form action="" class="flex items-center justify-between">
                <div>
                <p class="mb-4">តើអ្នកប្រាកដថាចាកចេញមែនឬទេ?</p>
                </div>

                <div class="flex justify-end gap-2 mb-4">
                <button @click="closeModal" class="px-3 py-1 border rounded">អត់ទេ</button>
                <button
                  @click="logout"
                    class="px-3 py-1 border rounded bg-red-600 text-white"
                >
                    បាទ
                </button>
                </div>
            </form>
            
            </div>
        </div>
        <!-- Modal Logout -->
  </div>
</template>

