import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const AuthenticatedLayout = () => import('@/components/layouts/AuthenticatedLayout.vue')
const BlankLayout = () => import('@/components/layouts/BlankLayout.vue')
const LoginView = () => import('@/views/authentication/LoginView.vue')
const RegisterView = () => import('@/views/authentication/RegisterView.vue')
const EmailVerifyView = () => import('@/views/authentication/EmailVerifyView.vue')
const ForgotPasswordView = () => import('@/views/authentication/ForgotPasswordView.vue')
const NewPasswordView = () => import('@/views/authentication/NewPasswordView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/user',
      name: 'user',
      redirect: '/user/login',
      component: BlankLayout,
      meta: {
        boycotCookie: true
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView
        },
        {
          path: 'register',
          name: 'register',
          component: RegisterView
        },
        {
          path: 'verify',
          name: 'verify',
          component: EmailVerifyView
        },
        {
          path: 'forgot',
          name: 'forgot',
          component: ForgotPasswordView
        },
        {
          path: 'resetpassword',
          name: 'reset',
          component: NewPasswordView
        }
      ]
    }
  ]
})

export default router
