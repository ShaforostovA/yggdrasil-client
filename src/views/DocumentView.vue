<template>
  <FullScreenLoader v-if="this.loading" />
  <div class="chapter-name text-3xl mb-6">
    Просмотр документа — №{{ this.documentId }}
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-6">
      <div class="menu-top mb-6 flex justify-between">
        <button v-if="!this.modified" class="main-btn py-3 px-5 inline-flex" @click.prevent="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
        <button v-else class="modal-trigger main-btn py-3 px-5 inline-flex" v-bind:data-target="this.modified ? 'myModel' : ''">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
        <div id="myModel" class="modal modal-fixed-footer">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-center">При уходе с этой страницы измененные поля не будет сохранены!</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <router-link :to="{name: 'documents'}" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Уйти</router-link>
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
          </div>
        </div>
        <button class="modal-trigger flex main-btn-red py-3 px-5" data-target="modelDelete" :disabled="this.canDelete == false || this.$store.state.auth.user.roles[0] === 'ROLE_ADMIN'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Удалить
        </button>
        <div id="modelDelete" class="modal modal-fixed-footer">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-center">Вы действительно хотите удалить документ №{{ this.documentId }}?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <button class="main-btn-red inline-block px-5 py-3 w-[150px] text-center text-xl" @click="deleteDocument">Да</button>
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
          </div>
        </div>
      </div>
      <DocumentGenerator :documentId="this.documentId" @updateParent="onUpdateModified" :key="this.komponentKey"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import DocumentGenerator from '@/components/app/DocumentGenerator.vue'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue';
import documentServive from '@/store/services/document.servive';
import messages from '@/utils/message.plagin'

export default {
  name: 'DocumentView',
  props: ['documentId'],
  data: () => ({
    loading: true,
    content: [],
    modal: null,
    modified: false,
    isDelete: false,
    canDelete: false,
    komponentKey: 0
  }),
  async mounted() {
    await documentServive.getDocument(this.documentId).then(
      (response) => {
      this.canDelete = response.data.documentStatus.id !== 4 ? true : false;
      // this.canDelete = response.data.canChange && response.data.documentStatus.id !== 4 ? true : false;
    },
    (error) => {
      this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      this.$error(messages[this.message] || 'Что-то пошло не так');
      this.$router.go(-1);
    });
    this.modal = M.Modal.init(document.querySelectorAll('.modal'), {});
    this.loading = false;
  },
  methods: {
    onUpdateModified() {
      this.komponentKey += 1;
    },
    async deleteDocument() {
      this.loading = true;
      await documentServive.deleteDocument(this.documentId).then(
      (response) => {
        this.isDelete = response
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
      )
      if (this.isDelete) {
        this.$router.push('/documents?message=deleteDocument')
      } else {
        this.$error(`Не удалось удалить документ №${this.documentId}`)
      }
      this.loading = false;
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  },
  components: {
    Sidebar,
    FullScreenLoader,
    DocumentGenerator
  }
}
</script>