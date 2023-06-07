<template>
  <ul class="shadow-md rounded-xl overflow-hidden border">
    <li v-for="link in links" :key="link.url">
      <router-link v-if="link.roles.includes(this.currentUser.roles[0])" active-class="active" :to="link.url" class="hover:bg-gray-200 pl-5 py-2 block select-none"
      >{{link.title}}</router-link>
    </li>
  </ul>
</template>
<script>
import { UserRoles } from "@/types/Roles"
export default {
  data: () => ({
    links: [
    {title: 'Документы', url: '/documents', roles: [UserRoles.User, UserRoles.Admin, UserRoles.Moderator]},
    {title: 'Отчеты', url: '/reports', roles: [UserRoles.Admin, UserRoles.Moderator]},
    {title: 'Факультеты', url: '/facultets', roles: [UserRoles.SuperAdmin]},
    {title: 'Кафедры', url: '/departments', roles: [UserRoles.SuperAdmin]},
    {title: 'Сотрудники', url: '/employees', roles: [UserRoles.SuperAdmin, UserRoles.Moderator]},
    {title: 'Студенты', url: '/students', roles: [UserRoles.User, UserRoles.SuperAdmin, UserRoles.Moderator]},
    {title: 'Конструктор шаблонов', url: '/constructors', roles: [UserRoles.SuperAdmin]},
    {title: 'Статистика', url: '/statistics', roles: [UserRoles.User, UserRoles.Admin, UserRoles.Moderator]},
    {title: 'Разное', url: '/different', roles: [UserRoles.SuperAdmin]}
    ]
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
}
</script>