import { defineStore } from "pinia";
import { auth, database } from "@/plugins/firebase.plugin";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, get, child } from "firebase/database";
import { useStore } from '@/stores/store'
import messages from "@/plugins/messages"


export const useAuthStore = defineStore("auth", () => {

    const store = useStore();

    onAuthStateChanged(auth, async(user) => {
        if (user) {
            //console.log('onAuthStateChanged user', user.uid);
            const data = await getUserData('/info');
            if (data) store.setUser(data);

        }
    })

    const a_login = async(obj) => {
        try {
            await signInWithEmailAndPassword(auth, obj.email, obj.password);

            const data = await getUserData('/info');
            //console.log('after getUserData', data);
            //store.setUser(data);


            return data;
        } catch (error) {
            console.log(error.message);
            store.setError(messages[error.code] || messages['errorAuth']);
            throw err;
        }

    };

    const a_logout = async() => {
        await signOut();
        store.setClearUser();
    };

    const a_register = async({ email, password, name }) => { // {email, password , name }

        try {
            //console.log('a_register');
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const uid = getUid();

            const data = {
                bill: 10000,
                name
            };

            addToDB(`users/${uid}/info`, data)
            console.log('a_register');
            store.setUser(data);

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

        //console.log('getUserData', path);

        try {
            const uid = auth.currentUser ? auth.currentUser.uid : null;
            //console.log('uid', uid);
            const p = `/users/${uid+path}`
            const res = await get(child(ref(database), p));
            //console.log('get', res.val());
            return res.val();

        } catch (error) {
            // console.log(error);
            store.setError(messages[error.code] || messages['errorgetFromDB']);
            throw error;
        }

    }



    const getUid = () => {

        //console.log('getUid auth', auth);
        const user = auth.currentUser
            //console.log('getUid after', user);

        return user ? user.uid : null
    }

    return { a_login, a_logout, a_register, addToDB, getUserData, getUid };

});