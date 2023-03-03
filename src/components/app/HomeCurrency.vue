<template>
    <div class="col s12 m6 l8">
      <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
          <div class="card-header">
            <span class="card-title">Курс валют</span>
          </div>
          <table>
            <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
            </thead>

            <tbody>
            <tr
            v-for="item,i in store.gArrCurr"
            :key="i"
            >
              <td>{{item.name}}</td>
              <td>{{item.value2}}</td>
              <td>{{item.date}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useStore } from '@/stores/store'
const store = useStore();
</script>