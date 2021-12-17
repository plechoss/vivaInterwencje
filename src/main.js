import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { initializeApp } from "firebase/app";

/* eslint-disable */
const firebaseConfig = {
  apiKey: "AIzaSyA95CzEqVArdNhGczR_bBr80rTv77HNgrE",
  authDomain: "vivainterwencje-4ee8c.firebaseapp.com",
  projectId: "vivainterwencje-4ee8c",
  storageBucket: "vivainterwencje-4ee8c.appspot.com",
  messagingSenderId: "961235762641",
  appId: "1:961235762641:web:22214a18b33b9106b5b4f0",
  measurementId: "G-XK0Q9PFZ46"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
