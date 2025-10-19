<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

    
    const authStore = useAuthStore()
    const router = useRouter()
    const logout = async () => {
        try{
            const res = await authStore.logout();
            console.log(res.data);
            router.push('/login');
        }catch(e){

        }
    }
</script>

<template>
    <div>
        <h1>Welcome user</h1>
        <button @click="logout" class="px-3 py-1 border rounded bg-red-600 text-white">
            
            Logout
        </button>

    </div>
</template>

