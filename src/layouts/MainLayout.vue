<template>


  <div>
    <div class="app-main-layout">
 
    <NavbarComp @click="isOpen=!isOpen"/>
    <SideBarComp
    :isOpen="isOpen"
    />



      <main 
      class="app-content "
      :class=" isOpen ? '':'full' "
      >
        <div class="app-page">

            <router-view >
            </router-view>


        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link  class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>



</template>

<script setup>
import {onMounted} from 'vue'
import NavbarComp from '../components/app/NavbarComp.vue'
import SideBarComp from '../components/app/SideBarComp.vue'
import { useAuthStore } from '@/stores/auth'

import {ref, computed} from 'vue'
// import { RouterLink, RouterView,useRouter, useRoute } from "vue-router";

const AuthStore = useAuthStore()

let isOpen=ref(true)
let wd=computed( ()=>{
  return isOpen ? '':'full'
})

onMounted( ()=>{
  // AuthStore.getUserData('/info/name')
})

</script>
