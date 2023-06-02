<template>
  <FullScreenLoader v-if="this.updateStudentProcess"/>
  <div class="chapter-name text-3xl mb-6">
    Студент — №{{ this.studentId }}
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

        <button v-if="!this.updateMode && this.isTrained" class="main-btn-yellow px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateStudentStatus(false)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
          </svg>
          Деактивировать
        </button>

        <button v-if="!this.updateMode && !this.isTrained" class="main-btn px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateStudentStatus(true)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          Активировать
        </button>
      </div>
      <form v-if="!this.loading" action="" @submit.prevent="updateStudent" class="shadow-md rounded-xl border p-5 mb-10">
        <div class="faculty-data-top-menu flex justify-between mb-5">
          <div class="faculty-data-status ">
            Статус: <span v-if="this.isTrained" class=" text-green-600">Учится</span> <span v-else class=" text-red-600">Не учится</span>
          </div>
          <div class="faculty-data-dates">
            <div class="faculty-data-dateCreate">Дата создания: {{ this.$normaldate(this.dateCreate) }}</div>
            <div class="faculty-data-dateUpdate">Дата обновления: {{ this.$normaldate(this.dateUpdate) }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Фамилия:</label>
          <input :disabled="!this.updateMode" autocomplete="off" v-model.trim="lastname" v-on:input="canUpdateCheck" :class="{invalid: (v$.lastname.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Фамилия" title="Введите фамилию">
          <div class="input-errors max-w-xl" v-for="error of v$.lastname.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Имя:</label>
          <input :disabled="!this.updateMode" autocomplete="off" v-model.trim="name" v-on:input="canUpdateCheck" :class="{invalid: (v$.name.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Имя" title="Введите имя">
          <div class="input-errors max-w-xl" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-5">
          <label for="" class="relative required">Отчество:</label>
          <input :disabled="!this.updateMode" autocomplete="off" v-model.trim="patronymic" v-on:input="canUpdateCheck" :class="{invalid: (v$.patronymic.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Отчество" title="Введите отчество">
          <div class="input-errors max-w-xl" v-for="error of v$.patronymic.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-5">
          <label for="" class="relative required">Группа студента:</label>
          <input :disabled="!this.updateMode" autocomplete="off" v-model.trim="groupName" v-on:input="canUpdateCheck" :class="{invalid: (v$.groupName.$errors.length)}" minlength="1" maxlength="20" required type="text" name="" id="" class="input-text" placeholder="Группа студента" title="Введите группу студента">
          <div class="input-errors max-w-xl" v-for="error of v$.groupName.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="user-center-menu mb-5">
          <div class="menu-item">
            <div class="input-field col s12 department-data-input">
              <label for="" class="relative required">Выберите кафедру:</label>
              <!-- <select :disabled="!this.updateMode">
                <option value="" disabled>Выберите кафедру</option>
                <option v-for="(option) of this.departments" :key="option" v-bind:value="option.id">{{ option.shortName }}</option>
              </select> -->
              <SelectVue :disabled="!this.updateMode" class="search-field" :selected="false" :message="'Выберите кафедру'" :content="this.departments" :equalId="this.selectedDepartment" :key="this.resetKey"/>
            </div>
          </div>
        </div>
        <div class="profile-data-group flex gap-5 mb-5">
          <div class="profile-data-input flex-grow">
            <label class="relative required" for="">Год начала обучения:</label>
            <input :disabled="!this.updateMode" v-model.trim="startYear" v-on:input="canUpdateCheck" type="number" minlength="4" min="1000" :max="this.endYear" maxlength="4" name="" id="" class="input-text" placeholder="Год начала обучения" title="Введите год начала обучения">
          </div>
          <div class="profile-data-input flex-grow">
            <label class="relative required" for="">Год окончания обучения:</label>
            <input :disabled="!this.updateMode" v-model.trim="endYear" v-on:input="canUpdateCheck" minlength="4" maxlength="4" :min="this.startYear" max="9999" type="number" name="" id="" class="input-text" placeholder="Год окончания обучения" title="Введите год окончания обучения">
          </div>
        </div>
        <div class="profile-data-group flex gap-5 mb-10">
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Email:</label>
            <input :disabled="!this.updateMode" v-model.trim="email" type="email" maxlength="100" name="" id="" class="input-text" placeholder="Email" title="Введите Email">
          </div>
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Телефон:</label>
            <input :disabled="!this.updateMode" v-model.trim="phone" minlength="11" maxlength="11" type="tel" name="" id="" class="input-text" placeholder="Телефон" title="Введите номер телефона без (+)">
          </div>
          <div class="profile-data-input flex-grow w-1/3">
            <label for="">Дата рождения:</label>
            <input :disabled="!this.updateMode" v-model.trim="birthday" type="date" name="" id="" class="input-text" placeholder="Дата рождения" title="Введите дату рождения">
          </div>
        </div>
        <div class="bottom-menu flex justify-end gap-5">
          <button v-if="!this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" @click.prevent="changeOperationMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Редактировать
          </button>
          <div v-if="this.updateMode" class="inline-flex gap-5 items-end">
            <button class="main-btn-red px-5 py-3 text-xl inline-flex items-center" @click.prevent="rajectChangesModal">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              Отменить
            </button>
            <button class="main-btn px-5 py-3 text-xl inline-flex items-center" type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Сохранить
            </button>
          </div>
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
  import SelectVue from '@/components/app/Select.vue'
  import messages from '@/utils/messages'
  import DepartmentService from '@/store/services/department.service'
  import UserService from '@/store/services/user.service'
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength, maxLength } from '@vuelidate/validators'
  import { UserRoles } from '@/types/Roles'
  import studentService from '@/store/services/student.service'

  export default {
    name: 'StudentView',
    setup () {
      return { v$: useVuelidate() }
    },
    props: ['studentId'],
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

      updateStudentProcess: false,

      modal: null,

      resetKey: 1,

      updateMode: false,

      dateCreate: '',
      dateUpdate: '',
      isTrained: false,
      selectedDepartment: '',
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
      await this.loadStudent();
      await DepartmentService.getDepartmentsAll().then(
        (response) => {
          this.departments = []
          for (let item of response.data) {
            this.departments.push(item.shortName);
          }
          for(let item of response.data) {
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
        this.resetKey += 1;
      }, 0)
      this.loading = false;
    },
    methods: {
      async canUpdateCheck() {
        this.canCreate = false;
        if (this.groupName === '') {
          return;
        }
        if (this.startYear === '' || this.endYear === '') {
          return;
        }
        this.canCreate = true;
      },
      async updateStudent() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }
        this.updateStudentProcess = true;
        
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
        this.departmentId = this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText]

        await studentService.updateStudent(this.studentId, this.lastname, this.name, this.patronymic, this.groupName, this.departmentId, this.startYear, this.endYear, this.email, this.phone, this.birthday).then(
          (response) => {
            this.$message(`Студент №${response.data.id} обновлен`);
            this.dateUpdate = response.data.dateUpdate;
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
        this.updateMode = false;
        this.updateStudentProcess = false;
      },
      async rajectChangesModal() {
        this.$message('Изменения отменены');
        await this.loadStudent();
        this.updateMode = false;
      },
      async updateStudentStatus(isTrained) {
        await studentService.updateStudentStatus(this.studentId, isTrained).then(
          (response) => {
            if (response.data.isTrained) {
              this.$message(`Студент №${this.studentId} активирован`)
            } else {
              this.$message(`Студент №${this.studentId} деактивирован`)
            }
            this.isTrained = response.data.isTrained;
            this.dateUpdate = response.data.dateUpdate;
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
      },
      async loadStudent() {
        await studentService.getStudent(this.studentId).then(
          (response) => {
            this.lastname = response.data.lastName,
            this.name = response.data.name,
            this.patronymic = response.data.patronymic,
            this.groupName = response.data.groupName,
            this.birthday = response.data.birthday,
            this.startYear = response.data.yearStart,
            this.endYear = response.data.yearEnd,
            this.phone = response.data.phone,
            this.email = response.data.email,
            this.departmentId = response.data.department.id;
            this.selectedDepartment = response.data.department.shortName;
            this.isTrained = response.data.isTrained;
            this.dateCreate = response.data.dateCreate;
            this.dateUpdate = response.data.dateUpdate;
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
      },
      changeOperationMode() {
        this.updateMode = true;
        this.resetKey += 1;
        this.$message('Включен режим редактирования');
      },
      back() {
        if (this.updateMode) {
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
      SelectVue
    }
  }
</script>