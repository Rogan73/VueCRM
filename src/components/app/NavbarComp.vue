<template>

      <nav class="navbar orange lighten-1">
        <div class="nav-wrapper">
          <div class="navbar-left">
            <a href="#" @click.prevent="emit('click')">
              <i class="material-icons black-text">dehaze</i>
            </a>
            <span class="black-text">{{date}}</span>
          </div>

          <ul class="right hide-on-small-and-down">
            <li>
              <a 
              class="dropdown-trigger black-text" 
              href="#" 
              data-target="dropdown"
              ref="dropdown1"
              >
               {{store.g_userName}}
                <i class="material-icons right">arrow_drop_down</i>
              </a>

              <ul id="dropdown" class="dropdown-content">
                <li>
                  <router-link to="/profile" class="black-text">
                    <i class="material-icons">account_circle</i>Профиль
                  </router-link>
                </li>
                <li class="divider" tabindex="-1"></li>
                <li>
                  <a 
                  href="#" 
                  class="black-text"
                  @click.prevent="logout"
                   >
                    <i class="material-icons">assignment_return</i>Выйти
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from "vue-router";
import dateFilter from '@/filters/date.filter'
import { useAuthStore } from '@/stores/auth'
import { useStore } from '@/stores/store'

const AuthStore = useAuthStore()

const store = useStore();


const emit = defineEmits(['click']) 

const router = useRouter();

const dropdown1=ref();

let date=ref()

const userName = ref('') 

const logout = async () => {

  await AuthStore.a_logout;

  router.push('/login?message=logout')
}

let timer=null;
let dr=null;

onMounted( ()=>{

  timer=setInterval( ()=>{
    date.value = dateFilter()
  },1000);

  //AuthStore.getUserData('/info'); // await
   
   
 dr = M.Dropdown.init(dropdown1.value,{
  constrainWidth: false
 })

})

onBeforeUnmount( ()=>{
  clearInterval(timer);

 // dr?.destroy?.destroy()

  if (dr && dr.destroy){
  dr.destroy()
  }
  
})

</script>