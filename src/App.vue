<template>
  <component :is="layout"/>
</template>

<script setup>
import {computed,onMounted} from 'vue'
import { /*RouterLink, RouterView,useRouter,*/ useRoute,useRouter } from "vue-router";

import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

import { useAuthStore } from '@/stores/auth'


    const AuthStore = useAuthStore()
    const router = useRouter()
    const route = useRoute()



onMounted(async () => {
 
})


const layout = computed( () => {
   return route.meta.layout == 'empty'? EmptyLayout: MainLayout  // for others =  main
})

</script>
