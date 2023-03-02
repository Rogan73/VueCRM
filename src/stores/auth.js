import { defineStore } from "pinia";
import { auth, database } from "@/plugins/firebase.plugin";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, get, child } from "firebase/database";
import { useStore } from '@/stores/store'
import messages from "@/plugins/messages"


export const useAuthStore = defineStore("auth", () => {

    const store = useStore();

    const a_login = async(obj) => {
        try {
            const res = await signInWithEmailAndPassword(auth, obj.email, obj.password);

            const data = getUserData('/info');
            console.log('after getUserData');
            //store.setUser(data)

            console.log('user', res.user);

            return res.user;
        } catch (error) {
            console.log(error.message);
            store.setError(messages[error.code] || messages['errorAuth']);
            throw err;
        }

    };

    const a_logout = async() => {
        await signOut();
    };

    const a_register = async({ email, password, name }) => { // {email, password , name }

        try {
            //console.log('a_register');
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const uid = getUid();

            addToDB(`users/${uid}/info`, {
                bill: 10000,
                name
            })

            return res.user;

        } catch (error) {
            store.setError(messages[error.code] || messages['errorReg']);
            throw error;
        }

    };

    const addToDB = (path, obj) => {
        try {
            set(ref(database, path), obj); // insert / update
        } catch (error) {
            store.setError(messages[error.code] || messages['erroraddToDB']);
            throw error;
        }

    }

    const getUserData = async(path) => { //    /info/name
        try {

            const uid = auth.currentUser ? auth.currentUser.uid : null;
            const p = `/users/${uid+path}`
            console.log('getUserData', p);
            const res = await get(child(database, p));
            console.log('get', res.val());

            return '';

        } catch (error) {
            // console.log(error);
            store.setError(messages[error.code] || messages['errorgetFromDB']);
            throw error;
        }

    }



    const getUid = () => {
        const user = auth.currentUser
        return user ? user.uid : null
    }

    return { a_login, a_logout, a_register, addToDB, getUserData };

});