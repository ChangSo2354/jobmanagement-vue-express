
<script setup>
import SideBar from './component/SideBar.vue';
import Header from './component/Header.vue';
import NotFoundPage from './component/NotFoundPage.vue';


import { useAuthStore } from '@/stores/auth';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(() => {

        if(!authStore.user || authStore.user.role !== 'admin'){
            router.push('/login')
        }
    })

</script>

<template>
  <div>
    <div class="hidden lg:flex">
    <SideBar />
    <main class="lg:w-[85%] px-12 p-4">
      <Header/>
      <!-- <Home/> -->
      <router-view></router-view>
      
    </main>

  </div>
  <NotFoundPage/>
  </div>

</template>

