<template>
      <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Создать</h4>
          </div>

          <form @submit.prevent="submitHendler">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="state.title"
                  class="validate "
                  :class="{invalid: validator.title.$dirty && validator.title.$invalid }"
                  @input="setTitle"
                  />
              <label for="name">Название</label>
              

                <template v-for="error of validator.title.$errors" :key="error.$uid">
                    <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
                </template>

            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  min="0"
                  v-model.number="state.limit"
                  class="validate "
                  :class="{invalid: validator.limit.$dirty && validator.limit.$invalid }"
                  @input="setlimit"
              />
              <label for="limit">Лимит</label>
              
              <template v-for="error of validator.limit.$errors" :key="error.$uid">
                <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
              </template>

            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Создать
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {state, validator } from "@/validators/CategoriesValidator";
import { useDbStore } from '@/stores/dbStore'

const dbStore = useDbStore();

onMounted( ()=>{
    M.updateTextFields();
})

const setTitle = ()=>{
  validator.value.title.$touch()
}
const setLimit = ()=>{
  validator.value.limit.$touch()
}


const submitHendler = async ()=>{

    const result = await validator.value.$validate();

    let formData = {
    title: state.title,
    limit: state.limit
    }
    if (!result) {
          console.log('No valid');
          return
        } else{
        
           try {
            const res =  await dbStore.createCategory(formData);
            console.log('createCategory',res);
           } catch (error) { }  
        
        }
}


</script>