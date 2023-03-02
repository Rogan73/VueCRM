<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer " :color="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const color = computed( ()=>{
     const colors = ['spinner-blue-only','spinner-red-only','spinner-geen-only'];
     return colors[ Math.floor( Math.random()*3)];
     
})

</script>
