<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup>
import {  RouterView} from "vue-router";
import {computed, watch,inject} from 'vue'
import {useStore} from '@/stores/store'
import messages from "@/plugins/messages"


const store = useStore();

const error = computed( ()=>{
    return store.error
});

watch( error , (fbError)=>{
  console.log('fbError',fbError);  // показывает только при изменении , нет смысла
});


</script>



