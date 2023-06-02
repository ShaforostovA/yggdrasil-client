<template>
  <FullScreenLoader v-if="this.createUserProcess"/>
  <div class="chapter-name text-3xl mb-6">
    Создание студента
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5">
      <Loader v-if="this.loading" />
      <div v-if="!this.loading" class="menu-top mb-6 flex justify-between">
        <button @click.prevent="back" class="main-btn py-3 px-5 inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
      </div>
      <form v-if="!this.loading" action="" @submit.prevent="createUser" class="shadow-md rounded-xl border p-5 mb-10">
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Фамилия:</label>
          <input autocomplete="off" v-model.trim="lastname" v-on:input="canCreateCheck" :class="{invalid: (v$.lastname.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Фамилия" title="Введите фамилию">
          <div class="input-errors max-w-xl" v-for="error of v$.lastname.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Имя:</label>
          <input autocomplete="off" v-model.trim="name" v-on:input="canCreateCheck" :class="{invalid: (v$.name.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Имя" title="Введите имя">
          <div class="input-errors max-w-xl" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-5">
          <label for="" class="relative required">Отчество:</label>
          <input autocomplete="off" v-model.trim="patronymic" v-on:input="canCreateCheck" :class="{invalid: (v$.patronymic.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Отчество" title="Введите отчество">
          <div class="input-errors max-w-xl" v-for="error of v$.patronymic.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-5">
          <label for="" class="relative required">Группа студента:</label>
          <input autocomplete="off" v-model.trim="groupName" v-on:input="canCreateCheck" :class="{invalid: (v$.groupName.$errors.length)}" minlength="1" maxlength="20" required type="text" name="" id="" class="input-text" placeholder="Группа студента" title="Введите группу студента">
          <div class="input-errors max-w-xl" v-for="error of v$.groupName.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="user-center-menu mb-5">
          <div class="menu-item">
            <div class="input-field col s12 department-data-input">
              <label for="" class="relative required">Выберите кафедру:</label>
              <select>
                <option value="" disabled>Выберите кафедру</option>
                <option v-for="(option) of this.departments" :key="option" v-bind:value="option.id" :selected="this.departmentId">{{ option.shortName }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="profile-data-group flex gap-5 mb-5">
          <div class="profile-data-input flex-grow">
            <label class="relative required" for="">Год начала обучения:</label>
            <input v-model.trim="startYear" v-on:input="canCreateCheck" type="number" minlength="4" min="1000" :max="this.endYear" maxlength="4" name="" id="" class="input-text" placeholder="Год начала обучения" title="Введите год начала обучения">
          </div>
          <div class="profile-data-input flex-grow">
            <label class="relative required" for="">Год окончания обучения:</label>
            <input v-model.trim="endYear" v-on:input="canCreateCheck" minlength="4" maxlength="4" :min="this.startYear" max="9999" type="number" name="" id="" class="input-text" placeholder="Год окончания обучения" title="Введите год окончания обучения">
          </div>
        </div>
        <div class="profile-data-group flex gap-5 mb-10">
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Email:</label>
            <input v-model.trim="email" type="email" maxlength="100" name="" id="" class="input-text" placeholder="Email" title="Введите Email">
          </div>
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Телефон:</label>
            <input v-model.trim="phone" minlength="11" maxlength="11" type="tel" name="" id="" class="input-text" placeholder="Телефон" title="Введите номер телефона без (+)">
          </div>
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Дата рождения:</label>
            <input v-model.trim="birthday" type="date" name="" id="" class="input-text" placeholder="Дата рождения" title="Введите дату рождения">
          </div>
        </div>
        <div class="bottom-menu flex justify-end gap-5">
          <button class="main-btn px-6 py-4 text-xl inline-flex items-center" type="submit" :disabled="!this.canCreate">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
            Сохранить
          </button>
        </div>
      </form>
      <div id="myModel" class="modal modal-fixed-footer" ref="modal">
        <div class="modal-content flex flex-col">
          <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
          <p class="text-2xl mb-3 text-center">При уходе с этой страницы данные будет потеряны.</p>
        </div>
        <div class="modal-footer flex justify-evenly">
          <button @click.prevent="this.$router.go(-1)" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Уйти</button>
          <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/app/Sidebar.vue'
  import messages from '@/utils/messages'
  import DepartmentService from '@/store/services/department.service'
  import UserService from '@/store/services/user.service'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength, maxLength } from '@vuelidate/validators'
  import { UserRoles } from '@/types/Roles'
  import studentService from '@/store/services/student.service'

  export default {
    name: 'StudentCreateView',
    setup () {
      return { v$: useVuelidate() }
    },
    data: () => ({
      loading: true,
      formSelect: null,

      lastname: '',
      name: '',
      patronymic: '',
      groupName: '',
      birthday: '',
      startYear: '',
      endYear: '',
      phone: '',
      email: '',


      canCreate: false,
      departments: [],
      departmentsMap: {},

      role: UserRoles.SuperAdmin,

      departmentId: '',

      isModer: false,

      createUserProcess: false,

      modal: null,
    }),
    validations() {
      return {
        lastname: {required, minLength: minLength(1), maxLength: maxLength(50)},
        name: {required, minLength: minLength(1), maxLength: maxLength(50)},
        patronymic: {required, minLength: minLength(1), maxLength: maxLength(50)},
        groupName: {required, minLength: minLength(1), maxLength: maxLength(20)},
      }
    },
    async mounted() {
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
      await DepartmentService.getDepartmentsAll().then(
        (response) => {
          this.departments = response.data
          for(let item of this.departments) {
            this.departmentsMap[item.shortName] = item.id
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      setTimeout(() => {
        this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
        this.modal = M.Modal.init(this.$refs.modal);
      }, 0)
      this.loading = false
    },
    methods: {
      async canCreateCheck() {
        this.canCreate = false;
        if (this.groupName === '') {
          return;
        }
        if (this.startYear === '' || this.endYear === '') {
          return;
        }
        this.canCreate = true;
      },
      async createUser() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }
        this.createUserProcess = true;
        
        // if (this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN') {
        //   this.departmentId = this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText]
        // } else {
        //   await UserService.getEmployeeInfo(this.$store.state.auth.user.id).then(
        //     (response) => {
        //       this.departmentId = response.data.department.id;
        //     },
        //     (error) => {
        //       this.message = (error.response && error.response.data && error.response.data.message) ||
        //           error.message ||
        //           error.toString();
        //       this.$error(messages[this.message] || 'Что-то пошло не так');
        //     }
        //   )
        // }

        this.departmentId = this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText];

        await studentService.createStudent(this.lastname, this.name, this.patronymic, this.groupName, this.departmentId, this.startYear, this.endYear, this.email, this.phone, this.birthday).then(
          (response) => {
            this.$message(`Студент №${response.data.id} создан`);
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
        this.lastname = '',
        this.name = '',
        this.patronymic = '',
        this.groupName = '',
        this.birthday = '',
        this.startYear = '',
        this.endYear = '',
        this.phone = '',
        this.email = '',
        this.departmentId = '';
        this.canCreate = false,
        this.createUserProcess = false;
      },
      back() {
        if (this.lastname !== '' || this.name !== '' || this.patronymic !== '' || this.groupName !== '' || this.birthday !== '' || this.startYear !== '' || this.endYear !== '' || this.phone !== '' || this.email !== '') {
          this.modal.open();
        } else {
          this.$router.go(-1);
        }
      }
    },
    computed: {
      
    },
    watch: {

    },
    beforeDestroy() {
      if(this.formSelect && this.formSelect.destroy) {
        this.formSelect.destroy();
      }
      if (this.modal && this.modal.destroy) {
        this.modal.destroy();
      }
    },
    components: {
      Sidebar,
    }
  }
</script>