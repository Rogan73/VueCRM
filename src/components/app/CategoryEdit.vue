<template>
      <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Редактировать</h4>
          </div>

          <form @submit.prevent="submitHendler">
            <div class="input-field" >
              <select>
                <option>Category</option>
              </select>
              <label>Выберите категорию</label>
            </div>

            <div class="input-field">
              <input 
              type="text" 
              id="name"
                  v-model="stateEd.title"
                  class="validate "
                  :class="{invalid: validatorEd.title.$dirty && validatorEd.title.$invalid }"
                  @input="setTitle"              
              
              >
              <label for="name">Название</label>

                <template v-for="error of validatorEd.title.$errors" :key="error.$uid">
                    <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
                </template>

         
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  min="0"
                  v-model.number="stateEd.limit"
                  class="validate "
                  :class="{invalid: validatorEd.limit.$dirty && validatorEd.limit.$invalid }"
                  @input="setlimit"                  
              >
              <label for="limit">Лимит</label>
              
              <template v-for="error of validatorEd.limit.$errors" :key="error.$uid">
                <span> <small class="helper-text invalid">{{ error.$message }}</small> </span>
              </template>

            </div>

            <button class="btn waves-effect waves-light" type="submit">
              Обновить
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script setup>
import {onMounted} from 'vue'
import {stateEd, validatorEd } from "@/validators/CategoriesValidator";
import { useDbStore } from '@/stores/dbStore'

const dbStore = useDbStore();

onMounted( ()=>{
    M.updateTextFields();
})

const setTitle = ()=>{
  validatorEd.value.title.$touch()
}
const setLimit = ()=>{
  validatorEd.value.limit.$touch()
}


const submitHendler = async ()=>{

const result = await validatorEd.value.$validate();

let formData = {
title: stateEd.title,
limit: stateEd.limit
}
if (!result) {
      console.log('No valid');
      return
    } else{
    
       try {
        await dbStore.editCategory(formData);
       } catch (error) { }  
    
    }
}

</script>