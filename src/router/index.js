import {createRouter, createWebHistory} from "vue-router"

import DashboardLayout from "@/views/Dashboard/DashboardLayout.vue"
import Home from "@/views/Dashboard/page/Home.vue"
import job from "@/views/Dashboard/page/job.vue"
import Category from "@/views/Dashboard/page/Category.vue"
import Company from "@/views/Dashboard/page/Company.vue"
import Location from "@/views/Dashboard/page/Location.vue"


// make route for project
const routes = [
    {
        path:'/dashboard',
        component: DashboardLayout,
        Children:[
            { path:'',component:Home },
            { path:'/job',component:job },
            { path:'/category',component:Category },
            { path:'/location',component:Location },
            { path:'/company',component:Company },
        ]
    }
]

// create router for project
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router