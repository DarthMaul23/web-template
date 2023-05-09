import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TreninkView from '../views/TreninkView.vue'
import TreninkUserView from '../views/TreninkUserView.vue'
import LoginView from '../views/LoginView.vue'
import DetailView from '../views/DetailView.vue'
import NewUserView from '../views/NewUserView.vue'
import CalendarView from '../views/CalendarView.vue'
import ActivityView from '../views/ActivityView.vue'

const routes = [
  {
    path: '/main',
    name: 'main',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },  
  {
    path: '/',
    name: '',
    component: LoginView
  }, 
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView
  },       
  {
    path: '/trainingWeek/:id',
    name: 'trainingWeek',
    component: TreninkView
  },
  {
    path: '/trainingUserWeek/:id',
    name: 'trainingUserWeek',
    component: TreninkUserView
  },
  {
    path: '/newUser',
    name: 'newUser',
    component: NewUserView
  },
  {
    path: '/activity/:id',
    name: 'activity',
    component: ActivityView
  },
  {
    path: '/calendar/:id',
    name: 'calendar',
    component: CalendarView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
