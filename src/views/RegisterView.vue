<template>

<form class="card auth-card" @submit.prevent="submitHendler">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
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
          @input="setPassword"
          autocomplete="true" 
          v-model="state.password" 
      >
      <label for="password">Пароль</label>

        <template v-for="error of validator.password.$errors" :key="error.$uid">
          <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
        </template>

    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          class="validate"
          :class="{invalid: validator.name.$dirty && validator.name.$invalid }"
          v-model="state.name" 
          @input="setName"  
      >
      <label for="name">Имя</label>
        <template v-for="error of validator.name.$errors" :key="error.$uid">
          <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
        </template>
    </div>
    <p>
      <label>
        <input type="checkbox"
        :class="{invalid:  validator.agree.$invalid }"
        v-model="state.agree" 
         />
        <span>С правилами согласен</span>
      </label>

      <div v-if="validator.agree.$error">
          <span> <small class="helper-text invalid">Необходимо отметить</small> </span>
      </div>

      <!-- <template v-for="error of validator.agree.$errors" :key="error.$uid">
          <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
        </template> -->


    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>

</template>

<script setup>
import {state, validator } from "@/validators/RegisterValidator.js";
import {useRouter } from "vue-router";
import { useAuthStore } from '@/stores/auth'

const AuthStore = useAuthStore()

const router = useRouter();

const setEmail = ()=>{
  validator.value.email.$touch()
}
const setPassword = ()=>{
  validator.value.password.$touch()
}

const setName = ()=>{
  validator.value.name.$touch()
}


const submitHendler = async ()=>{

const result = await validator.value.$validate();
//const result = !validator.value.$invalid;

let formData = {
email: state.email,
password: state.password,
name: state.name,
agree: state.agree
}



if (!result) {
      // notify user form is invalid
     // alert('No')
     console.log('Result: No');
      return
    } else{
    // perform async actions
    console.log('Result: Yes');
    
   try {

     await AuthStore.a_register(formData);
     router.push('/');
    
   } catch (error) {}


  }

//router.push('/')
}

</script>