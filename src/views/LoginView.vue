<template>
  <form class="card auth-card" @submit.prevent="submitHendler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input 
        id="email" 
        type="text" 
        class="validate " 
        :class="{invalid: validator.email.$dirty && validator.email.$invalid }"
        v-model="state.email"  
        @input="setEmail"/>
        <label for="email">Email</label>
        
        <template v-for="error of validator.email.$errors" :key="error.$uid">
          <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
        </template>
        

        
      </div>
      <div class="input-field">
        <input 
        id="password" 
        type="password" 
        class="validate" 
        :class="{invalid: validator.password.$dirty && validator.password.$invalid }"
        autocomplete="true" 
        v-model="state.password" 
        @input="setPassword" />
        <label for="password">Пароль</label>

        <template v-for="error of validator.password.$errors" :key="error.$uid">
          <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
        </template>

      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script setup>
import {onMounted,inject,getCurrentInstance } from 'vue'
import {useRouter, useRoute } from "vue-router";
import {state, validator } from "@/validators/LoginValidator.js";
import messages from '@/plugins/messages.js'
import { useAuthStore } from '@/stores/auth'



const router = useRouter();
const route = useRoute();

const AuthStore = useAuthStore()



const setEmail = ()=>{
  validator.value.email.$touch()
}
const setPassword = ()=>{
  validator.value.password.$touch()
}

const submitHendler = async ()=>{

  const result = await validator.value.$validate();

  let formData = {
  email: state.email,
  password: state.password
  }


  //console.log(formData);

  if (!result) {
        // notify user form is invalid
       // alert('No')
        return
      } else{
      // perform async actions
      try {
        
        await AuthStore.a_login(formData);
        
        router.push('/');

      } catch (error) { }  
      

      //console.log('End submitHendler');


    }

  //router.push('/')
}

onMounted( ()=>{

//   console.log(route.path); // /login

 route.query.message? inject('message')( messages[route.query.message] ): null;


  // const app = getCurrentInstance();
  // const gl_mes = app.appContext.config.globalProperties.$mes
  // inject('message')('gl_mes: '+gl_mes);

  // const gl_mes2 = app.appContext.config.globalProperties.$message;
  // gl_mes2('MESSAGE2');

})


</script>
