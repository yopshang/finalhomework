import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/components/Home';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/pages/Login.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import Products from '@/components/pages/Products.vue';

Vue.use(VueRouter);


export default new VueRouter ({
    routes:[
        {
            path:'/',
            name:'HelloWorld',
            component:HelloWorld,
            meta:{requiresAuth:true}
        },
        {
            path:'/home',
            name:'Home',
            component:Home,
        },
        {
            path:'/login',
            name:'Login',
            component:Login,  
        },
        {
            path:'/dashboard',
            name:'Dashboard',
            component:Dashboard,
            children:[
                {
                    path:'products',
                    name:'Products',
                    component:Products,
                    // meta:{requiresAuth:true}  
                }
            ]
        },
    ]
})
