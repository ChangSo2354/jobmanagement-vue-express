
<script setup>
    import { useAuthStore } from '@/stores/auth';
    import { onMounted } from 'vue';
    import { useRouter } from 'vue-router';

    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(() => {
        console.log(authStore.isAuth);

        if(!authStore.isAuth){
            router.push('/register')
        }
    })
</script>
<template>
    <div>
        <router-view></router-view>
    </div>
</template>

