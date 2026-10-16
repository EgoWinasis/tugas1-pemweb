import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Tracking from './views/Tracking.vue'
import Stok from './views/Stok.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/tracking', component: Tracking },
    { path: '/stok', component: Stok }
  ]
})

createApp(App).use(router).mount('#app')