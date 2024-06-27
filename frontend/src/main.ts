import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './router/axiosconfig'
import { Amplify } from 'aws-amplify'
//@ts-ignore
import awsmobile from './aws-exports.js'

Amplify.configure(awsmobile)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
