import Vue from 'vue'
import Router from 'vue-router'

import AuthComponent from '../views/auth.vue'
import MainComponent from '../views/main.vue'

import MyComponent from '../views/my/index.vue'
import MyTasksComponent from '../views/my/tasks.vue'
import MyPlanningComponent from '../views/my/planning.vue'
import MyProfileComponent from '../views/my/profile.vue'

import ManagerComponent from '../views/manager/index.vue'
import ManagerTasksComponent from '../views/manager/tasks.vue'
import ManagerUsersComponent from '../views/manager/users.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    { name: 'auth', path: '/auth', component: AuthComponent },
    {
      path: '',
      component: MainComponent,
      children: [
        { name: 'home', path: '', redirect: { name: 'my' }},
        {
          path: 'my',
          component: MyComponent,
          children: [
            { name: 'my', path: '', redirect: { name: 'my-tasks' }},
            { name: 'my-tasks', path: 'tasks', component: MyTasksComponent },
            { name: 'my-planning', path: 'planning', component: MyPlanningComponent },
            { name: 'my-profile', path: 'profile', component: MyProfileComponent }
          ]
        },
        {
          path: 'manager',
          component: ManagerComponent,
          children: [
            { name: 'manager', path: '', redirect: { name: 'manager-tasks' }},
            { name: 'manager-tasks', path: 'tasks', component: ManagerTasksComponent },
            { name: 'manager-users', path: 'users', component: ManagerUsersComponent }
          ]
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
