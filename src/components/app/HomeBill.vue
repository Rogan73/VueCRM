<template>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p 
          class="currency-line"
          v-for="cur,i in store.gArrCurr"
          :key="i"
          >
            <span>{{cur}} грн</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useStore } from '@/stores/store'
const store = useStore();
</script>