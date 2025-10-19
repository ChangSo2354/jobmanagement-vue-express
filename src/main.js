import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'

import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"


import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  MdDashboardRound,
  MdWorkhistory,
  MdWorkspacesfilled,
  HiSolidOfficeBuilding,
  BiPinMapFill,
  HiLogout,
  FaUserTie,
  FaLock,
  IoSettings,
  MdWork,
  RiBuildingFill,
  HiSolidTrendingUp,
  BiSearch,
  BiTrash,
  BiEye,
  BiPenFill
} from 'oh-vue-icons/icons';

// Add icons to the library
addIcons(
  MdDashboardRound,
  MdWorkhistory,
  MdWorkspacesfilled,
  HiSolidOfficeBuilding,
  BiPinMapFill,
  HiLogout,
  FaUserTie,
  FaLock,
  IoSettings,
  MdWork,
  RiBuildingFill,
  HiSolidTrendingUp,
  BiSearch,
  BiTrash,
  BiEye,
  BiPenFill
);

const app = createApp(App) 

app.use(Toast, {
  position: "top-right",
  timeout: 3000,
});

app.use(createPinia())
app.use(router) // make your app.vue can use
app.component("v-icon", OhVueIcon)
app.mount('#app')




