import { createApp } from "vue";
import { createPinia } from "pinia";
//import { useV}

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
//import "./assets/materialize.min";
import dateFilter from '@/filters/date.filter'

import messagePlugin from '@/plugins/message.plugin'
import i18nPlugin from '@/plugins/i18n'
import TranslateObject from './assets/translate.json'

//import { auth } from '@/plugins/firebase.plugin'

//import { firebaseApp } from './firebase'
//import { VueFire, VueFireAuth } from 'vuefire'



const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(messagePlugin);
//app.use(firebasePlugin);
app.use(i18nPlugin, TranslateObject)
app.config.globalProperties.$filters = dateFilter
    //app.config.globalProperties.telegram = { token: "qweqweqweqweqwe", chatid: "rty564564564" }

// app.use(VueFire, {
//     // imported above but could also just be created here
//     firebaseApp,
//     modules: [
//         // we will see other modules later on
//         VueFireAuth(),
//     ],
// })




app.mount("#app");






// onAuthStateChanged(auth, (v) => {

//     if (!app) initApp();

// });
//const aa = getAuth(firebaseApp);
//console.log(aa);



// onAuthStateChanged(auth).then(() => {
//     if (!app) {
//         initApp();
//     }
// })

//const app = createApp(App);

// app.provide('token', 'QWEEWERQWQWRQWTQTETQE')