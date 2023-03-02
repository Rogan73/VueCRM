<template>
    <div class="col s12 m6 l4">
      <div class="card light-blue bill-card">
        <div class="card-content white-text">
          <span class="card-title">Счет в валюте</span>

          <p 
          class="currency-line"
          v-for="item,i in store.gArrCurr"
          :key="i"
          >
            <span>{{item}}</span>
          </p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useStore } from '@/stores/store'
//import dateFilter from '@/filters/currency.filter'
const store = useStore();
</script>