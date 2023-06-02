import { createRouter, createWebHistory } from 'vue-router'
import { UserRoles } from '@/types/Roles'
import userService from '@/store/services/user.service'
import authService from '@/store/services/auth.service'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Иггдрасиль — вход', 
      layout: 'empty'
    },
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Иггдрасиль — главная страница',
      layout: 'main',
      userRoles: []
    },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/documents',
    name: 'documents',
    meta: {
      title: 'Иггдрасиль — документы',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.Admin]
    },
    component: () => import('../views/DocumentsView.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    meta: {
      title: 'Иггдрасиль — отчеты',
      layout: 'main',
      userRoles: [UserRoles.Admin, UserRoles.SuperAdmin, UserRoles.Moderator]
    },
    component: () => import('../views/ReportsView.vue')
  },
  {
    path: '/facultets',
    name: 'facultets',
    meta: {
      title: 'Иггдрасиль — факультеты',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/FacultetsView.vue')
  },
  {
    path: '/departments',
    name: 'departments',
    meta: {
      title: 'Иггдрасиль — кафедры',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/DepartmentsView.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    meta: {
      title: 'Иггдрасиль — сотрудники',
      layout: 'main',
      userRoles: [UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    component: () => import('../views/EmployeesView.vue')
  },
  {
    path: '/students',
    name: 'students',
    meta: {
      title: 'Иггдрасиль — студенты',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    component: () => import('../views/StudentsView.vue')
  },
  {
    path: '/constructors',
    name: 'constructors',
    meta: {
      title: 'Иггдрасиль — конструторы',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/ConstructorsView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Иггдрасиль — профиль',
      layout: 'main',
      userRoles: []
    },
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/document/structure/select',
    name: 'documentStructure',
    meta: {
      title: 'Документ — выбор структуры',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator]
    },
    component: () => import('../views/DocumentStructureView.vue')
  },
  {
    path: '/document/create/:structureId',
    name: 'documentCreate',
    meta: {
      title: 'Документ — создание',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator]
    },
    props: true,
    component: () => import('../views/DocumentCreateView.vue')
  },
  {
    path: '/document/:documentId',
    name: 'document',
    meta: {
      title: 'Документ — просмотр',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.Admin]
    },
    props: true,
    component: () => import('../views/DocumentView.vue')
  },
  {
    path: '/employee/create',
    name: 'employeeCreate',
    meta: {
      title: 'Сотрудник — создание',
      layout: 'main',
      userRoles: [UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    component: () => import('../views/EmployeeCreateView.vue')
  },
  {
    path: '/employees/:userId',
    name: 'employee',
    meta: {
      title: 'Сотрудник — просмотр',
      layout: 'main',
      userRoles: [UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/EmployeeView.vue')
  },
  {
    path: '/faculty/:facultyId',
    name: 'faculty',
    meta: {
      title: 'Факультет — просмотр',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/FacultyView.vue')
  },
  {
    path: '/faculty/create',
    name: 'facultyCreate',
    meta: {
      title: 'Факультет — создание',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/FacultyCreateView.vue')
  },
  {
    path: '/department/create',
    name: 'departmentCreate',
    meta: {
      title: 'Кафедра — создание',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/DepartmentCreateView.vue')
  },
  {
    path: '/department/:departmentId',
    name: 'department',
    meta: {
      title: 'Кафедра — просмотр',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/DepartmentView.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    meta: {
      title: 'Статистика',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.Admin]
    },
    component: () => import('../views/StatisticsView.vue')
  },
  {
    path: '/constructors/document/create',
    name: 'constructorDocument',
    meta: {
      title: 'Конструктор шаблона документов',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/ConstructorDocumentsView.vue')
  },
  {
    path: '/constructors/report/create',
    name: 'constructorReport',
    meta: {
      title: 'Конструктор шаблона отчетов',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/ConstructorReportsView.vue')
  },
  {
    path: '/report',
    name: 'report',
    meta: {
      title: 'Иггдрасиль — Отчет',
      layout: 'main',
      userRoles: [UserRoles.Admin, UserRoles.Moderator]
    },
    component: () => import('../views/ReportView.vue')
  },
  {
    path: '/student/create',
    name: 'studentCreate',
    meta: {
      title: 'Студенты — создание',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    component: () => import('../views/StudentCreateView.vue')
  },
  {
    path: '/student/:studentId',
    name: 'student',
    meta: {
      title: 'Студенты — просмотр',
      layout: 'main',
      userRoles: [UserRoles.User, UserRoles.Moderator, UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/StudentView.vue')
  },
  {
    path: '/different',
    name: 'different',
    meta: {
      title: 'Разное',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    component: () => import('../views/DifferentView.vue')
  },
  {
    path: '/keyword/:keyWordId',
    name: 'keyword',
    meta: {
      title: 'Ключевое слово — просмотр',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/KeyWordView.vue')
  },
  {
    path: '/document/type/:documentTypeId',
    name: 'documentType',
    meta: {
      title: 'Тип документов — просмотр',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/DocumentTypeView.vue')
  },
  {
    path: '/report/type/:reportTypeId',
    name: 'reportType',
    meta: {
      title: 'Тип отчета — просмотр',
      layout: 'main',
      userRoles: [UserRoles.SuperAdmin]
    },
    props: true,
    component: () => import('../views/ReportTypeView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const requireAuth = to.meta.userRoles || []
  if (authRequired && !loggedIn) {
    return next('/login?message=login');
  } else {
    if (publicPages.includes(to.path)) {
      return next();
    } else if (!!loggedIn && (requireAuth.includes(JSON.parse(loggedIn).roles[0]) || requireAuth.length === 0)) {
        authService.checkToken().then(
          (response)=>{
            if (response.data.isValid && response.data.isActive) {
              return next();
            } else if (!response.data.isActive) {
              return next('/login?message=noActive')
            } else if (!response.data.isValid) {
              return next('/login?message=tokenExpired');
            }  else {
              return next('/login')
            }
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
      
    } else {
      return next('/?message=noAuthority');
    }
    
  }
})

export default router
