
<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';


const authStore = useAuthStore();

onMounted(async () => {
  await authStore.getProfile();
  console.log(authStore.user);
  
})

</script>

<template>
  <!-- header -->
  <div class="flex justify-between items-center border-b-1 border-gray-400 pb-2">
    <p class="text-gray-500">Welcome Back</p>
    <div class="flex items-center font-fira">
      <div class="w-[30px] h-[30px] rounded-full bg-gray-400 mr-2 overflow-hidden">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0387PYFa_P7za0j36PnHU1kuclmFrGrrFg&s" alt="" class="w-full h-full object-cover rounded-lg">
      </div>
      <span class="text-blue-900 font-medium">{{ authStore.user?.name }}</span>
    </div>
  </div>
</template>

