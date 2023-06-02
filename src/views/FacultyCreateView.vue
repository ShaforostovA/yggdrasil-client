<template>
  <FullScreenLoader v-if="this.fullScreenLoading"/>
  <div class="chapter-name text-3xl mb-6">
    Факультет — Создание
  </div>
  <div class="flex gap-x-5">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 ">
      <Loader v-if="this.loading" />
      <div v-if="!this.loading" class="menu-top mb-6 flex justify-between">
        <button @click.prevent="back" class="main-btn py-3 px-5 inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
      </div>
      <div v-if="!this.loading" class="faculty-body shadow-md rounded-xl overflow-hidden border p-5 mb-10">
        <form action="" class="faculty-form" @submit.prevent="createFaculty">
          <div class="faculty-data-input">
            <label for="" class="relative required">Короткое название факультета:</label>
            <input v-model.trim="facultyShortName" minlength="1" maxlength="25" required type="text" name="" id="" class="input-text" placeholder="Короткое название факультета" title="Введите короткое название факультета">
          </div>
          <div class="faculty-data-input">
            <label for="" class="relative required">Полное название факультета:</label>
            <input v-model.trim="facultyName" minlength="1" maxlength="255" required type="text" name="" id="" class="input-text" placeholder="Полное название факультета" title="Введите полное название факультета">
          </div>
          <div class="faculty-data-input">
            <label for="" class="relative">Описание факультета:</label>
            <textarea v-model.trim="facultyDescrition" name="" id="" class="input-text h-36" placeholder="Описание факультета" maxlength="255" title="Введите описание факультета"></textarea>
          </div>
          <div class="faculty-bottom-menu flex justify-end gap-5">
          <button class="main-btn px-6 py-4 text-xl inline-flex items-center" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Сохранить
          </button>
        </div>
        </form>
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
import messages from '@/utils/messages'
import FacultyService from '@/store/services/faculty.service'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue';
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  name: 'FacultyCreate',
  data: () => ({
    loading: true,
    facultyShortName: '',
    facultyName: '',
    facultyDescrition: '',
    message: '',
    newFaculty: null,
    fullScreenLoading: false,
    modal: null,
  }),
  validations() {
    return {
      facultyShortName: {required, minLength: minLength(1)},
      facultyName: {required, minLength: minLength(1)},
      facultyDescrition: {minLength: minLength(0), maxLength: maxLength(255)},
    }
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    setTimeout(() => {
      this.modal = M.Modal.init(this.$refs.modal);
    }, 0)
    this.loading = false
  },
  methods: {
    createFaculty() {
      if (this.facultyShortName === "" || this.facultyName === "") {
        this.$error('Заполните все обязательные поля');
        return;
      }
      this.fullScreenLoading = true;
      FacultyService.createFaculty(this.facultyShortName, this.facultyName, this.facultyDescrition).then(
        (response) => {
          this.newFaculty = response.data;
          this.$message(`Факультет №${this.newFaculty.id} создан`)
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.facultyName = '';
      this.facultyShortName = '';
      this.facultyDescrition = '';
      this.fullScreenLoading = false;
    },
    back() {
      if (this.facultyName !== '' || this.facultyShortName !== '' || this.facultyDescrition !== '') {
        this.modal.open();
      } else {
        this.$router.go(-1);
      }
    }
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  },
  components: {
    Sidebar,
    FullScreenLoader
  }
}
</script>
