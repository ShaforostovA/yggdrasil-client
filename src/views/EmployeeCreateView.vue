<template>
  <FullScreenLoader v-if="this.createUserProcess"/>
  <div class="chapter-name text-3xl mb-6">
    Создание сотрудника
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
          <input autocomplete="off" v-model.trim="lastname" @blur="canCreateCheck" :class="{invalid: (v$.lastname.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Фамилия" title="Введите фамилию">
          <div class="input-errors max-w-xl" v-for="error of v$.lastname.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Имя:</label>
          <input autocomplete="off" v-model.trim="name" @blur="canCreateCheck" :class="{invalid: (v$.name.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Имя" title="Введите имя">
          <div class="input-errors max-w-xl" v-for="error of v$.name.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="profile-data-input mb-5">
          <label for="" class="relative required">Отчество:</label>
          <input autocomplete="off" v-model.trim="patronymic" @blur="canCreateCheck" :class="{invalid: (v$.patronymic.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Отчество" title="Введите отчество">
          <div class="input-errors max-w-xl" v-for="error of v$.patronymic.$errors" :key="error.$uid">
            <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
          </div>
        </div>
        <div class="user-center-menu mb-5">
          <div class="menu-item flex gap-3 mb-5">
            <div class="profile-data-input menu-header">
              <label for="" class="relative required">Штатный сотрудник:</label>
            </div>
            <div class="form-radio block gap-3 input-field flex">
              <label class="block">
                <input type="radio" name="isState" checked id="1" class="form-radio-item with-gap block h-5 w-5">
                <span>Да</span>
              </label>
              <label class="block">
                <input type="radio" name="isState" id="0" class="form-radio-item with-gap block h-5 w-5">
                <span>Нет</span>
              </label>
            </div>
          </div>
          <div class="menu-item" v-if="this.$store.state.auth.user.roles[0] === role">
            <div class="input-field col s12 department-data-input">
              <label for="" class="relative required">Выберите кафедру:</label>
              <select @blur="canCreateCheck">
                <option value="" disabled selected>Выберите кафедру</option>
                <option v-for="(option) of this.departments" :key="option" v-bind:value="option.id">{{ option.shortName }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="menu-item flex gap-3 mb-5">
          <div class="profile-data-input menu-header">
            <label for="" class="relative required">Роль:</label>
          </div>
          <div class="form-radio block gap-3 input-field flex">
            <label class="block">
              <input type="radio" name="isModer" id="1" :disabled="this.$store.state.auth.user.roles[0] !== 'ROLE_SUPER_ADMIN'" class="form-radio-item with-gap block h-5 w-5">
              <span>Зав. кафедрой</span>
            </label>
            <label class="block">
              <input type="radio" name="isModer" checked id="0" :disabled="this.$store.state.auth.user.roles[0] !== 'ROLE_SUPER_ADMIN'" class="form-radio-item with-gap block h-5 w-5">
              <span>Преподаватель</span>
            </label>
          </div>
        </div>
        <div class="profile-data-input mb-3">
          <label for="" class="relative required">Логин:</label>
          <div class="flex gap-3">
            <div class="w-full">
              <input v-model.trim="username" v-on:input="canCreateCheck(), checkInputUsername()" :class="{invalid: (v$.username.$errors.length)}" minlength="6" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Логин" title="Введите логин" autocomplete="off">
              <div class="input-errors max-w-xl" v-for="error of v$.username.$errors" :key="error.$uid">
                <div class="helper-text">{{  error.$message === "This field should be at least 6 characters long" ? "Длина этого поля должна составлять не менее 6 символов" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
              </div>
            </div>
            <div v-if="this.inputUsername" class="validUsername self-center">
              <div class="" v-if="this.validUsername" title="Логин свободен.">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-600">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="" v-else title="Пользователь с таким логином уже существует!">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-700">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-data-input mb-6">
          <label for="" class="relative">Пароль:</label>
          <input v-model.trim="password" @blur="canCreateCheck" :class="{invalid: (v$.password.$errors.length)}" minlength="6" maxlength="50" type="password" name="" id="" class="input-text" placeholder="Пароль" title="Введите пароль" autocomplete="off">
          <div class=" text-gray-500">Длина пароля не меньше 6 символов, если поле пустое, пароль будет автоматически сформирован.</div>
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
      <div v-if="!this.loading && this.showUserListData" class="new-users">
        <MainTable
          :header="this.header" :content="this.newUserList" :noDataMessage="this.noDataMessage"
        />
      </div>
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
  import MainTable from '@/components/app/MainTable.vue'
  import messages from '@/utils/messages'
  import DepartmentService from '@/store/services/department.service'
  import UserService from '@/store/services/user.service'
  import generatePassword from "omgopass";
  import { useVuelidate } from '@vuelidate/core'
  import { required, minLength, maxLength } from '@vuelidate/validators'
  import { UserRoles } from '@/types/Roles'

  export default {
    name: 'EmployeeCreateView',
    setup () {
      return { v$: useVuelidate() }
    },
    data: () => ({
      loading: true,
      formSelect: null,
      username: '',
      lastname: '',
      name: '',
      patronymic: '',
      password: '',
      isState: true,
      canCreate: false,
      departments: [],
      departmentsMap: {},
      role: UserRoles.SuperAdmin,
      validUsername: false,
      inputUsername: false,
      departmentId: '',
      isModer: false,
      createUserProcess: false,

      newUserList: [],
      showUserListData: false,

      header: ["№ пользователя", "ФИО", "Кафедра", "Роль", "Логин", "Пароль", ""],
      noDataMessage: "",

      modal: null,
    }),
    validations() {
      return {
        lastname: {required, minLength: minLength(1), maxLength: maxLength(50)},
        name: {required, minLength: minLength(1), maxLength: maxLength(50)},
        patronymic: {required, minLength: minLength(1), maxLength: maxLength(50)},
        username: {required, minLength: minLength(6), maxLength: maxLength(50)},
        password: {minLength: minLength(6), maxLength: maxLength(50)}
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
      async checkInputUsername() {
        if (this.username !== '') {
          this.inputUsername = true;
        } else {
          this.inputUsername = false;
        }
      },
      async checkUsername() {
        if (this.username !== '') {
          await UserService.checkValidUsername(this.username).then(
            (response) => {
              this.validUsername = response.data;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }
      },
      async canCreateCheck() {
        this.canCreate = false;
        await this.checkUsername(this.username);
        if (this.username === '' || this.lastname === '' || this.name === '' || this.patronymic === '' || !this.validUsername) {
          return;
        }
        if(this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN') {
          if (this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText] === undefined) {
            return;
          }
        }
        this.canCreate = true;
      },
      async createUser() {
        if (this.v$.$invalid) {
          this.v$.$touch()
          return
        }
        this.createUserProcess = true;
        if (this.password === '') {
          this.password = 'Nt' + generatePassword({
            syllablesCount: 4,
            minSyllableLength: 2,
            maxSyllableLength: 2,
          }) + '!'
        }
        if (this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN') {
          this.departmentId = this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText]
        } else {
          await UserService.getEmployeeInfo(this.$store.state.auth.user.id).then(
            (response) => {
              this.departmentId = response.data.department.id;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }

        this.isState = Boolean(Number(document.querySelector('input[type=radio][name=isState]:checked').id));
        if (this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN') {
          this.isModer = Boolean(Number(document.querySelector('input[type=radio][name=isModer]:checked').id));
        }
        
        let userRole = this.isModer ? 'moder' : 'user';

        await UserService.createUser(this.lastname, this.name, this.patronymic, this.isState, this.departmentId, this.username, this.password, userRole).then(
          (response) => {
            let newObj = response.data;
            newObj.password = this.password;
            // this.newUserList.push(newObj);
            this.newUserList.push([
              {
                'type': 'id',
                'text': newObj.id
              },
              {
                'type': 'text',
                'text': newObj.lastName + ' ' + newObj.name + ' ' + newObj.patronymic,
                'shortTest': newObj.lastName + ' ' + newObj.name[0] + '. ' + newObj.patronymic[0] + '.'
              },
              {
                'type': 'text',
                'text': newObj.department.name,
                'shortTest': newObj.department.shortName
              },
              {
                'type': 'onlyText',
                'text': newObj.roles[0].name === "ROLE_MODERATOR" ? 'Зав. кафедрой' : 'Преподаватель',
              },
              {
                'type': 'onlyText',
                'text': newObj.username,
              },
              {
                'type': 'onlyText',
                'text': newObj.password,
              },
              {
                'type': 'copy',
                'text': `№: ${newObj.id}, ФИО: ${newObj.lastName + ' ' + newObj.name + ' ' + newObj.patronymic}, Кафедра: ${newObj.department.shortName}, Роль: ${newObj.roles[0].name === "ROLE_MODERATOR" ? 'Зав. кафедрой' : 'Преподаватель'}, Логин: ${newObj.username}, Пароль: ${newObj.password}`,
              },
            ]),
            this.showUserListData = true;
            this.$message(`Пользователь №${response.data.id} создан`);
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
        this.lastname = '';
        this.name = '';
        this.patronymic = '';
        this.username = '';
        this.password = '';
        this.createUserProcess = false;
        this.inputUsername = false;
        this.canCreate = false;
        // this.departmentsMap[document.querySelector('.select-wrapper li.selected').innerText]
        // Boolean(Number(document.querySelector('input[type=radio][name=isState]:checked').id))
      },
      back() {
        if (this.lastname !== '' || this.name !== '' || this.patronymic !== '' || this.username !== '' || this.password !== '') {
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
      MainTable
    }
  }
</script>