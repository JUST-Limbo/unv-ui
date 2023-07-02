import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/area',
        name: 'area',
        component: () => import('../views/UseArea.vue'),
    },
    {
        path: '/select',
        name: 'select',
        component: () => import('../views/select'),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
