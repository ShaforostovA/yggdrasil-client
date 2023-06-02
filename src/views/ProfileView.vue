<template>
  <div class="chapter-name text-3xl mb-6">
    Профиль
  </div>
  <div class="flex gap-x-5 mb-6">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5">
      <Loader v-if="this.loading" />
      <form v-else action="" @submit.prevent="updateProfileModel" class="shadow-md rounded-xl overflow-hidden border p-5">
        <div class="profile-data mb-10">
          <div class="profile-top-data-section flex gap-3">
            <div class="profile-left-data w-1/2 relative">
              <div class="profile-img text-[var(--color-main)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-72 h-72 mx-auto my-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div v-if="this.$store.state.auth.user.roles[0] !== 'ROLE_SUPER_ADMIN' && this.$store.state.auth.user.roles[0] !== 'ROLE_ADMIN'" class="profile-state absolute left-0 top-0 text-[var(--color-main)] text-lg select-none">{{(content.state ? "Штатный": "Совместитель")}} — {{faculty.shortName}} — {{ department.shortName }}</div>
              <div v-else-if="this.$store.state.auth.user.roles[0] === 'ROLE_SUPER_ADMIN'" class="profile-state absolute left-0 top-0 text-[var(--color-main)] text-lg select-none">Технический Администратор</div>
              <div v-else-if="this.$store.state.auth.user.roles[0] === 'ROLE_ADMIN'" class="profile-state absolute left-0 top-0 text-[var(--color-main)] text-lg select-none">Администратор</div>
            </div>
            <div class="profile-right-data profile-data-group flex flex-col w-1/2 justify-between">
              <div class="profile-data-input">
                <label for="" class="relative required">Фамилия:</label>
                <input v-model.trim="lastname" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Фамилия" title="Введите фамилию" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input">
                <label for="" class="relative required">Имя:</label>
                <input v-model.trim="name" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Имя" title="Введите имя" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input">
                <label for="" class="relative required">Отчество:</label>
                <input v-model.trim="patronymic" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Отчество" title="Введите отчество" :disabled="!this.updateMode">
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
              <input v-model.trim="academicTitle" type="text" maxlength="255" name="" id="" class="input-text" placeholder="Ученое звание" title="Введите ученое звание" :disabled="!this.updateMode">
            </div>
            <div class="profile-data-input mb-2">
              <label for="">Ученая степень:</label>
              <input v-model.trim="academicDegree" type="text" maxlength="255" name="" id="" class="input-text" placeholder="Ученая степень" title="Введите ученую степень" :disabled="!this.updateMode">
            </div>
            <div class="profile-data-group flex gap-5">
              <div class="profile-data-input flex-grow">
                <label for="">Email:</label>
                <input v-model.trim="email" type="email" maxlength="100" name="" id="" class="input-text" placeholder="Email" title="Введите Email" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">Телефон:</label>
                <input v-model.trim="phone" minlength="11" maxlength="11" type="tel" name="" id="" class="input-text" placeholder="Телефон" title="Введите номер телефона без (+)" :disabled="!this.updateMode">
              </div>
            </div>
            <div class="profile-data-group flex gap-5">
              <div class="profile-data-input flex-grow">
                <label for="">Должность:</label>
                <input v-model.trim="jobTitle" type="text" maxlength="100" name="" id="" class="input-text" placeholder="Должность" title="Введите должность" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">ORCID:</label>
                <input v-model.trim="orcid" type="text" maxlength="50" name="" id="" class="input-text" placeholder="ORCID" title="Введите ORCID" :disabled="!this.updateMode">
              </div>
              <div class="profile-data-input flex-grow">
                <label for="">Spin Code:</label>
                <input v-model.trim="spinCode" type="text" maxlength="50" name="" id="" class="input-text" placeholder="Spin Code" title="Введите Spin Code" :disabled="!this.updateMode">
              </div>
            </div>
          </div>
        </div>
        <div class="profile-ponel flex justify-end gap-5">
          <button v-if="!this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" @click.prevent="changeOperationMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            Редактировать
          </button>
          <button v-else-if="this.updateMode" class="main-btn-red px-5 py-3 text-xl inline-flex items-center" @click.prevent="rajectChangesModal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Отменить
          </button>
          <button v-if="this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Сохранить
          </button>
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
        <p class="text-2xl mb-3 text-center">Вы действительно хотите измененить данные профиля?</p>
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
        <p class="text-2xl mb-3 text-center">Вы действительно хотите отменить изменения данных профиля?</p>
      </div>
      <div class="modal-footer flex justify-evenly">
        <button class="main-btn-yellow inline-block px-5 py-3 w-[150px] text-center text-xl" @click="rajectChanges">Да</button>
        <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import UserService from '@/store/services/user.service'
import messages from '@/utils/messages'
import userService from '@/store/services/user.service'
import { email, required, minLength, maxLength } from '@vuelidate/validators'

export default {
  name: 'DocumentsView',
  data: () => ({
    loading: true,
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
    imgUrl: ''
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
    await UserService.getUserInfo().then(
      (response) => {
        this.content = response.data;
        this.lastname = this.content.lastname;
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
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    await UserService.getUserFaculty(this.$store.state.auth.user.username).then(
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
    await UserService.getUserDepartment(this.$store.state.auth.user.username).then(
      (response) => {
        this.department = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    ).finally(
      this.loading = false
    ),
    setTimeout(() => {
      this.modalUpdateProfile = M.Modal.init(document.querySelector('.modalUpdateProfile'), {});
      this.modalCancelUpdateProfile = M.Modal.init(document.querySelector('.modalCancelUpdateProfile'), {});
    })
  },
  methods: {
    changeOperationMode() {
      this.updateMode = true,
      this.$message("Включен режим редактирования");
    },
    rajectChanges() {
      this.modalCancelUpdateProfile.close();
      this.updateMode = false;
      this.loading = true;
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
      await userService.updateProfile(this.$store.state.auth.user.id, this.phone, this.email, this.imgUrl, this.lastname, this.name, this.patronymic, this.jobTitle, this.academicTitle, this.academicDegree, this.orcid, this.spinCode, this.birthday, this.content.state, this.department.id);
      await UserService.getUserInfo().then(
        (response) => {
          this.content = response.data;
          this.lastname = this.content.lastname;
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
      this.$message("Профиль обновлен");
    }
  },
  beforeDestroy() {
    if(this.modalUpdateProfile && this.modalUpdateProfile.destroy) {
      this.modalUpdateProfile.destroy()
    }
    if(this.modalCancelUpdateProfile && this.modalCancelUpdateProfile.destroy) {
      this.modalCancelUpdateProfile.destroy()
    }
  },
  components: {
    Sidebar
  }
}
</script>