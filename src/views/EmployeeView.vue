<template>
  <div class="chapter-name text-3xl mb-6">
    Сотрудник — №{{ this.userId }}
  </div>
  <div class="flex gap-x-5 mb-6">
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

        <button v-if="!this.updateMode && this.isActive" class="main-btn-yellow px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateEmployeeStatus(false)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
          </svg>
          Деактивировать
        </button>

        <button v-if="!this.updateMode && !this.isActive" class="main-btn px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateEmployeeStatus(true)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
          </svg>
          Активировать
        </button>
      </div>
      <form v-if="!this.loading" action="" @submit.prevent="updateProfileModel" class="shadow-md rounded-xl overflow-hidden border p-5">
        <div class="faculty-data-top-menu flex justify-between mb-5">
          <div class="faculty-data-status ">
            Статус: <span v-if="this.isActive" class=" text-green-600">Активный</span> <span v-else class=" text-red-600">Деактивированный</span>
          </div>
          <div class="faculty-data-dates">
            <div class="faculty-data-dateCreate">Дата создания: {{ this.$normaldate(this.dateCreate) }}</div>
            <div class="faculty-data-dateUpdate">Дата обновления: {{ this.$normaldate(this.dateUpdate) }}</div>
          </div>
        </div>
        <div class="profile-data mb-1">
          <div class="profile-top-data-section flex gap-3">
            <div class="profile-left-data w-1/2 relative">
              <div class="profile-img text-[var(--color-main)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-72 h-72 mx-auto my-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="profile-state absolute left-0 top-0 text-[var(--color-main)] text-lg select-none">{{(content.isState ? "Штатный": "Совместитель")}} — {{faculty.shortName}} — {{ department.shortName }}</div>
              <div class="absolute left-0 bottom-3 text-lg">
                <span class="select-none font-bold">Логин: </span>{{ this.username }}
              </div>
            </div>
            <div class="profile-right-data profile-data-group flex flex-col w-1/2 justify-between relative z-10">
              <div class="profile-data-input">
                <label for="" class="relative required">Фамилия:</label>
                <input v-model.trim="lastname" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Фамилия" title="Введите фамилию" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input">
                <label for="" class="relative required">Имя:</label>
                <input v-model.trim="name" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Имя" title="Введите имя" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input">
                <label for="" class="relative required">Отчество:</label>
                <input v-model.trim="patronymic" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Отчество" title="Введите отчество" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input">
                <label for="">Дата рождения:</label>
                <input v-model.trim="birthday" type="date" name="" id="" class="input-text" placeholder="Дата рождения" title="Введите дату рождения" :disabled="!this.updateMode">
              </div>
            </div>
          </div>
          <div class="profile-bottom-data-section">
            <div class="profile-data-input mb-2">
              <label for="">Ученое звание:</label>
              <input v-model.trim="academicTitle" type="text" name="" id="" class="input-text" placeholder="Ученое звание" title="Введите ученое звание" :disabled="!this.updateMode">
            </div>
            <div class="profile-data-input mb-2">
              <label for="">Ученая степень:</label>
              <input v-model.trim="academicDegree" type="text" name="" id="" class="input-text" placeholder="Ученая степень" title="Введите ученую степень" :disabled="!this.updateMode">
            </div>
            <div class="profile-data-group flex gap-5">
              <div class="profile-data-input flex-grow">
                <label for="">Email:</label>
                <input v-model.trim="email" type="email" name="" id="" class="input-text" placeholder="Email" title="Введите Email" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">Телефон:</label>
                <input v-model.trim="phone" minlength="11" maxlength="11" type="tel" name="" id="" class="input-text" placeholder="Телефон" title="Введите номер телефона без (+)" :disabled="!this.updateMode">
              </div>
            </div>
            <div class="profile-data-group flex gap-5">
              <div class="profile-data-input flex-grow">
                <label for="">Должность:</label>
                <input v-model.trim="jobTitle" type="text" name="" id="" class="input-text" placeholder="Должность" title="Введите должность" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">ORCID:</label>
                <input v-model.trim="orcid" type="text" name="" id="" class="input-text" placeholder="ORCID" title="Введите ORCID" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">Spin Code:</label>
                <input v-model.trim="spinCode" type="text" name="" id="" class="input-text" placeholder="Spin Code" title="Введите Spin Code" :disabled="!this.updateMode">
              </div>
            </div>
          </div>
        </div>
        <div class="user-center-menu">
          <div class="menu-ling w-full h-1 rounded-lg bg-gray-300 block my-3"></div>
          <div class="user-center-menu-body">
            <div class="menu-item flex gap-3 mb-3">
              <div class="profile-data-input menu-header">
                <label for="" class="relative required">Штатный сотрудник:</label>
              </div>
              <div class="form-radio block gap-3 input-field flex">
                <label class="block">
                  <input type="radio" name="isState" :disabled="!this.updateMode" :checked="this.content.isState" id="1" class="form-radio-item with-gap block h-5 w-5">
                  <span>Да</span>
                </label>
                <label class="block">
                  <input type="radio" name="isState" :disabled="!this.updateMode" :checked="!this.content.isState" id="0" class="form-radio-item with-gap block h-5 w-5">
                  <span>Нет</span>
                </label>
              </div>
            </div>
            <div class="menu-item" v-if="this.$store.state.auth.user.roles[0] === role">
              <div class="input-field col s12 department-data-input">
                <label for="" class="relative required">Выберите кафедру:</label>
                <!-- <select :disabled="this.updateMode">
                  <option value="" disabled>Выберите кафедру</option>
                  <option v-for="(option) of this.departments" :key="option" v-bind:value="option.id" :selected="this.department.id === option.id">{{ option.shortName }}</option>
                </select> -->
                <SelectVue :selected="false" :content="this.departmentListShort" :equalId="this.department.shortName " :message="'Выберите кафедру'" :multy="false" :disabled="!this.updateMode" :key="this.keyUpdate"/>
              </div>
            </div>
          </div>
          <div class="menu-ling w-full h-1 rounded-lg bg-gray-300 block my-5"></div>
        </div>
        <div class="profile-ponel flex justify-between gap-5">
          <div v-if="this.updateMode" class=""></div>
          <button v-if="!this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center gap-1" @click.prevent="updatePasswordModal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Изменить пароль
          </button>
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
      
    </div>
    <div id="updateProfile" class="modal modal-fixed-footer modalUpdateProfile">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите измененить данные профиля №{{ this.userId}}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" @click="updateProfile">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
    <div id="cancelUpdateProfile" class="modal modal-fixed-footer modalCancelUpdateProfile">
      <div class="modal-content flex flex-col">
        <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
        <p class="text-2xl mb-3 text-center">Вы действительно хотите отменить изменения данных профиля №{{ this.userId}}?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn-yellow inline-block px-5 py-3 w-[150px] text-center text-xl" @click="rajectChanges">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
  </div>
  <div id="updateUserPasswordModal" class="modal modal-fixed-footer" ref="updateUserPasswordModal">
    <div class="modal-content flex flex-col">
      <div class="profile-data-input mb-3">
        <label for="" class="relative required">Новый пароль:</label>
        <div class="flex gap-3">
          <div class="w-full">
            <input v-model.trim="this.newPassword" minlength="6" maxlength="100" required type="password" name="" id="" class="input-text" placeholder="Введите новый пароль" title="Введите новый пароль">
          </div>
          <div v-if="this.newPassword.length > 0" class="self-center">
            <div class="" v-if="this.newPassword.length > 5" title="Пароль доступен.">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-600">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="" v-else title="Пароль должен быть длиной от 6!">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-700">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer flex justify-evenly">
      <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отменить</a>
      <button @click.prevent="this.updateEmployeePassword" :disabled="!(this.newPassword.length > 5)" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Обновить</button>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import SelectVue from '@/components/app/Select.vue'
import UserService from '@/store/services/user.service'
import messages from '@/utils/messages'
import DepartmentService from '@/store/services/department.service'
import { email, required, minLength, maxLength } from '@vuelidate/validators'
import { UserRoles } from '@/types/Roles'

export default {
  name: 'DocumentsView',
  props: ['userId'],
  data: () => ({
    loading: true,
    formSelect: null,
    content: '',
    faculty: '',
    department: '',
    message: '',
    updateMode: false,
    modalUpdateProfile: null,
    modalCancelUpdateProfile: null,
    patronymic: '',
    name: '',
    lastname: '',
    birthday: '',
    academicTitle: '',
    academicDegree: '',
    email: '',
    phone: '',
    jobTitle: '',
    orcid: '',
    spinCode: '',
    imgUrl: '',
    departments: [],
    departmentsMap: {},
    username: '',
    role: UserRoles.SuperAdmin,
    isState: '',
    departmentId: '',
    isActive: false,
    dateCreate: '',
    dateUpdate: '',
    departmentListShort: [],
    keyUpdate: 1,
    newPassword: '',
    updateUserPasswordModal: null,
    canUpdatePassword: false,
  }),
  validations() {
    return {
      patronymic: {required, minLength: minLength(1)},
      name: {required, minLength: minLength(1)},
      lastname: {required, minLength: minLength(1)},
      birthday: {minLength: minLength(0)},
      academicTitle: {minLength: minLength(0)},
      academicDegree: {minLength: minLength(0)},
      email: {email, minLength: minLength(0)},
      phone: {integer, minLength: minLength(11), maxlength: maxLength(11)},
      jobTitle: {minLength: minLength(0)},
      orcid: {integer, minLength: minLength(0)},
      spinCode: {integer, minLength: minLength(0)}
    }
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    await UserService.getEmployeeInfo(this.userId).then(
      (response) => {
        this.content = response.data;
        this.lastname = this.content.lastName;
        this.name = this.content.name;
        this.patronymic = this.content.patronymic;
        this.birthday = this.content.birthday;
        this. academicTitle = this.content.academicTitle;
        this.academicDegree = this.content.academicDegree;
        this.email = this.content.email;
        this.phone = this.content.phone;
        this.jobTitle = this.content.jobTitle;
        this.orcid = this.content.orcid;
        this.spinCode = this.content.spinCode;
        this.department = this.content.department;
        this.username = this.content.username;
        this.isState = this.content.isState;
        this.departmentId = this.content.department.id;
        this.isActive = this.content.isActive;
        this.dateCreate = this.content.dateCreate;
        this.dateUpdate = this.content.dateUpdate;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await DepartmentService.getDepartmentsAll().then(
      (response) => {
        this.departments = response.data
        this.departmentListShort = [];
        for (let item of this.departments) {
          this.departmentListShort.push(item.shortName);
        }
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
    await UserService.getUserFaculty(this.username).then(
      (response) => {
        this.faculty = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    setTimeout(() => {
      this.updateUserPasswordModal = M.Modal.init(this.$refs.updateUserPasswordModal);
      this.modalUpdateProfile = M.Modal.init(document.querySelector('.modalUpdateProfile'), {});
      this.modalCancelUpdateProfile = M.Modal.init(document.querySelector('.modalCancelUpdateProfile'), {});
      this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
    })
    this.loading = false;
  },
  methods: {
    changeOperationMode() {
      this.updateMode = true;
      this.updateKeys();
      this.$message("Включен режим редактирования");
    },
    rajectChanges() {
      this.modalCancelUpdateProfile.close();
      this.updateMode = false;
      this.loading = true;
      this.updateKeys();
      this.$message('Отмена изменений');
      
      setTimeout(() => {
        window.location.reload()
      }, 1300)
    },
    rajectChangesModal() {
      this.modalCancelUpdateProfile.open();
    },
    updateProfileModel() {
      if (this.lastname === "" || this.name === "" || this.patronymic === "") {
        this.$error('Заполните все обязательные поля');
        return;
      }
      this.modalUpdateProfile.open();
    },
    async updateProfile() {
      this.loading = true;
      this.modalUpdateProfile.close();
      let depId = this.departmentId;
      if(this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN') {
        depId = this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText]
      }
      await UserService.updateProfile(this.userId,
                                      this.phone,
                                      this.email,
                                      this.imgUrl,
                                      this.lastname,
                                      this.name,
                                      this.patronymic,
                                      this.jobTitle,
                                      this.academicTitle,
                                      this.academicDegree,
                                      this.orcid,
                                      this.spinCode,
                                      this.birthday,
                                      Boolean(Number(document.querySelector('input[type=radio][name=isState]:checked').id)),
                                      depId);
      await UserService.getEmployeeInfo(this.userId).then(
        (response) => {
          this.content = response.data;
          this.lastname = this.content.lastName;
          this.name = this.content.name;
          this.patronymic = this.content.patronymic;
          this.birthday = this.content.birthday;
          this.academicTitle = this.content.academicTitle;
          this.academicDegree = this.content.academicDegree;
          this.email = this.content.email;
          this.phone = this.content.phone;
          this.jobTitle = this.content.jobTitle;
          this.orcid = this.content.orcid;
          this.spinCode = this.content.spinCode;
          this.department = this.content.department;
          this.username = this.content.username;
          this.isState = this.content.isState;
          this.departmentId = this.content.department.id;
          this.isActive = this.content.isActive;
          this.dateCreate = this.content.dateCreate;
          this.dateUpdate = this.content.dateUpdate;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      await UserService.getUserFaculty(this.username).then(
        (response) => {
          this.faculty = response.data;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      this.updateMode = false;
      this.loading = false;
      this.updateKeys();
      this.$message("Профиль обновлен");
      setTimeout(() => {
        this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
      })
    },
    async updateEmployeeStatus(isActive) {
      await UserService.updateUserStatus(this.userId, isActive).then(
        (response) => {
          if (response.data.isActive) {
            this.$message(`Пользователь №${this.userId} активирован`)
          } else {
            this.$message(`Пользователь №${this.userId} деактивирован`)
          }
          this.isActive = response.data.isActive;
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
    updatePasswordModal() {
      this.newPassword = '';
      this.updateUserPasswordModal.open();
    },
    async updateEmployeePassword() {
      await UserService.updateUserPassword(this.userId, this.newPassword).then(
        (response) => {
          navigator.clipboard.writeText(this.newPassword);
          this.dateUpdate = response.data.dateUpdate;
          this.$message(`Пароль пользователя №${this.userId} обновелн`);
          this.$message(`Новый пароль сохранен в буфер`);
          this.updateUserPasswordModal.close();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },
    updateKeys() {
      this.keyUpdate += 1;
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
  },
  beforeDestroy() {
    if(this.formSelect && this.formSelect.destroy) {
      this.formSelect.destroy()
    }
    if(this.modalUpdateProfile && this.modalUpdateProfile.destroy) {
      this.modalUpdateProfile.destroy()
    }
    if(this.modalCancelUpdateProfile && this.modalCancelUpdateProfile.destroy) {
      this.modalCancelUpdateProfile.destroy()
    }
    if(this.updateUserPasswordModal && this.updateUserPasswordModal.destroy) {
      this.updateUserPasswordModal.destroy()
    }
  },
  components: {
    Sidebar,
    SelectVue
  }
}
</script>