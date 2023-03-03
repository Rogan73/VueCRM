<template>

<div>
  <div class="page-title">
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small" @click="store.updateCurrencies">
      <i class="material-icons">refresh</i> 
    </button>
  </div>

   <Loader v-if="store.gLoader"/>

  <div v-else class="row">
      <HomeBill />
      <HomeCurrency/>
  </div>

</div>

</template>

<script setup>
import {ref, onMounted} from 'vue'
import HomeBill from '@/components/app/HomeBill.vue'
import HomeCurrency from '@/components/app/HomeCurrency.vue'
import Loader from '@/components/app/LoaderComp.vue'
import { useStore } from '@/stores/store'


const store = useStore()

//let loading = ref(true);
//let currency = ref();

onMounted(async () => {
  //currency = await store.fetchCurrency()
  //loading.value=false;
})

</script>


