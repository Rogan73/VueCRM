import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { auth, database } from "@/plugins/firebase.plugin";
import { ref as DBref, set, get, push, child, update } from "firebase/database";
import messages from "@/plugins/messages"
import { useStore } from '@/stores/store'
import { clearState } from "@/validators/CategoriesValidator";

export const useDbStore = defineStore("useDbStore", () => {

    const store = useStore();

    let category = ref({
        title: '',
        limit: 1
    })

    let categoryEd = ref({
        title: '',
        limit: 1
    })

    const gCategory = computed(() => {
        return category.value
    })

    const setCategory = (obj) => {
        category.value = obj
    }

    const gCategoryEd = computed(() => {
        return category.value
    })

    const setCategoryEd = (obj) => {
        category.value = obj
    }


    const createCategory = async(obj) => {

        const uid = auth.currentUser ? auth.currentUser.uid : null;
        const path = `users/${uid}/categories`;

        // console.log('uid', uid);
        // console.log('database', database);
        // console.log('path', path);

        if (!uid) {
            console.log('uid is null');
            return;
        }


        try {
            //await se(DBref(database, path), obj); // insert / update

            const id = push(child(DBref(database), path)).key;
            const updates = {};
            updates[path + '/' + id] = obj; // можно добавить массив с данными
            await update(DBref(database), updates)


            clearState();

            return {...obj, id }
            //return {}

        } catch (error) {
            console.log(error);
            store.setError(messages[error.code] || messages['erroraddToDB']);
            throw error;
        }

    }

    const editCategory = (obj) => {

    }

    return { gCategory, setCategory, createCategory, gCategoryEd, setCategoryEd, editCategory };
})