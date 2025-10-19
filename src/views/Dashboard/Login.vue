<script setup lang="ts">
// import NotFoundPage from './component/NotFoundPage.vue';
import NotFoundPage from './component/NotFoundPage.vue';
import LoadingPage from './component/LoadingPage.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted, ref } from 'vue';
// import LoadingPage from './component/LoadingPage.vue';

import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

const identifier = ref("");
const password = ref("");
const isLoading = ref(false);


const handleLogin = async () => {
    try {
        isLoading.value = true;
        await authStore.login(identifier.value,password.value);
        const user = await authStore.getProfile();
        console.log(user);
        // if (authStore.isLogin) {
        //     router.push('/dashboard');
        // }
        if(authStore.user?.role === 'user'){
            router.push('/')
        }else{
            router.push('/dashboard')
        }
    } catch (e) {
        console.error("message:", e);
    } finally {
        isLoading.value = false;
    }
}

onMounted(async () => {
    isLoading.value = true;
    
    // console.log(authStore.user)
    // if(authStore.isAuth || authStore.isLogin){
    //     router.push('/dashboard');
    // }
    // if(authStore.user?.role === 'user'){
    //     router.push('/')
    // }else{
    //     router.push('/dashboard')
    // }
    try{
        await authStore.getProfile();
        if(authStore.user) {
            if(authStore.user.role === 'user') router.push('/');
            else router.push('dashboard');
        }
    }catch(err){
        console.error("Failed to fetch profile:", err);
    }finally{
        isLoading.value = false;
    }
})

</script>
<template>
    <div class="w-full h-[100vh] flex items-center justify-center">
        <LoadingPage :class="isLoading ? 'block' : 'hidden'" />

        <div class="w-[30%] border border-blue-900 rounded-Lg p-10 text-center">
            <h2 class="text-4xl font-bold text-blue-900">Login</h2>
            <p class="mt-3 text-gray-500">Your Info</p>

            <form @submit.prevent="handleLogin" class="mt-5">
                <!-- <p class="text-red-500 bg-red-200 py-2 rounded-sm mb-2">Invalide some filde</p> -->
                 <p v-if="authStore.errorMessage" class="text-red-500 bg-red-200 py-2 rounded-sm mb-2">
                    {{ authStore.errorMessage }}
                 </p>
                <input v-model="identifier" required type="text" name="identifier" id="identifier" placeholder="Your email..." class="w-full border-b border-blue-900 py-2 outline-0 mb-3">
                <input v-model="password" required type="password" name="password" id="password" placeholder="Your Password..." class="w-full border-b border-blue-900 py-2 outline-0 mb-3">

                <button class="w-full border p-2 border-blue-900 text-blue-900 hover:bg-blue-800 hover:text-white transition mt-2 rounded-sm">Login</button>

                <p class="mt-6 text-gray-500">
                    If your don't have an account ?
                    <router-link to="/register" class="text-pink-800 underline hover:text-pink-700 transition">Register</router-link>
                </p>
            </form>
        </div>
        <NotFoundPage/>
    </div>
</template>

