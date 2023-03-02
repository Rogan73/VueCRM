import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: "/",
            name: "home",
            component: () =>
                import ('@/views/HomeView.vue'),
        },
        {
            path: "/login",
            name: 'login',
            meta: { layout: 'empty' },
            component: () =>
                import ('@/views/LoginView.vue'),


        },
        {
            path: "/register",
            name: 'register',
            meta: { layout: 'empty' },
            component: () =>
                import ('@/views/RegisterView.vue'),
        },
        {
            path: "/categories",
            name: 'categories',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/CategoriesView.vue'),

        },
        {
            path: "/detailrecord",
            name: 'detailrecord',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/DetailRecordView.vue'),

        },
        {
            path: "/history",
            name: 'history',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/HistoryView.vue'),

        },
        {
            path: "/planning",
            name: 'planning',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/PlanningView.vue'),

        },
        {
            path: "/profile",
            name: 'profile',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/ProfileView.vue'),

        },
        {
            path: "/record",
            name: 'record',
            meta: { layout: 'main' },
            component: () =>
                import ('@/views/RecordView.vue'),

        }







        // {
        //     path: "/about",
        //     name: "about",
        //     //lazy-loaded when the route is visited.
        //     component: () =>
        //         import ("../views/AboutView.vue"),
        // },
    ],
});


export default router;