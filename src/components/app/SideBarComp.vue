<template>

  <ul 
  class="sidenav app-sidenav open transit" 
  
  :style=" isOpen ? 'transform: translateX(0%)': 'transform: translateX(-105%)' "
  
  >

     <li
     v-for="item, i in links" :key="i"
     class="waves-effect waves-orange pointer w100"
     >
        <router-link 
        activeClass="orange accent-1"
        :to="item.url"
        >
          {{item.title}}
        </router-link>
    </li>
  </ul>

</template>

<script setup>
import {ref} from 'vue'

defineProps({
    isOpen: Boolean
})

 const links= ref([
    { title: 'Счет', url: '/' },
    { title: 'История', url: '/history' },
    { title: 'Планирование', url: '/planning' },
    { title: 'Новая запись', url: '/record' },
    { title: 'Категории', url: '/categories' }

 ]
       
 )

</script>