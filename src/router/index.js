import {createRouter, createWebHistory} from "vue-router"

import DashboardLayout from "@/views/Dashboard/DashboardLayout.vue"
import Home from "@/views/Dashboard/page/Home.vue"
import job from "@/views/Dashboard/page/job.vue"
import Category from "@/views/Dashboard/page/Category.vue"
import Company from "@/views/Dashboard/page/Company.vue"
import Location from "@/views/Dashboard/page/Location.vue"
import Login from "@/views/Dashboard/Login.vue"
import Reigster from "@/views/Dashboard/Reigster.vue"
import FrontLeyout from "@/views/Fronepage/frontLeyout.vue"
import FrontHome from "@/views/Fronepage/page/FrontHome.vue"



// make route for project
const routes = [
    {
        path:'/dashboard',
        component: DashboardLayout,
        children:[
            { path:'',component:Home },
            { path:'job',component:job },
            { path:'category',component:Category },
            { path:'location',component:Location },
            { path:'company',component:Company },
        ]
       
    },
    {
         path:'/',
        component: FrontLeyout,
        children:[
            {path:'',component:FrontHome},
        ]
    },

    {
        path:'/login',
        component: Login
    },
    {
        path:'/register',
        component: Reigster
    }
]

// create router for project
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router