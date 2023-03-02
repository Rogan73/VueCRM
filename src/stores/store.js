import { ref, computed, getCurrentInstance } from "vue";
import { defineStore } from "pinia";
//import { useAuth } from "firebase/app";

export const useStore = defineStore("store", () => {

    let user = ref({})

    const app = getCurrentInstance();

    const showMessage = (m) => {
        app.appContext.config.globalProperties.$message(m)
    }

    let error = ref()

    const setError = (message) => {
        error.value = message;
        showMessage(message);
    }

    const setUser = (obj) => {
        console.log('setUser', obj);
        user.value = {...obj }
    }


    return { error, setError };

});