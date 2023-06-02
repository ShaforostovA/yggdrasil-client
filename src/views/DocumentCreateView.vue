<template>
  <div class="chapter-name text-3xl mb-6">
    Создание документа — Шаблон №{{ this.structureId }}
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-6">
      <div class="menu-top mb-6">
        <button class="modal-trigger main-btn py-3 px-5 inline-flex" data-target="myModel">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
        <div id="myModel" class="modal modal-fixed-footer" ref="modal">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-center">При уходе с этой страницы данные будет потеряны!</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <router-link :to="{name: 'documentStructure'}" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Уйти</router-link>
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
          </div>
        </div>
      </div>
      <FormGenerator :structureId="this.structureId"/>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import FormGenerator from '@/components/app/FormGenerator.vue'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue';

export default {
  name: 'DocumentCreateView',
  props: ['structureId'],
  data: () => ({
    loading: true,
    content: [],
    modal: null
  }),
  async mounted() {
    // this.modal = M.Modal.init(document.querySelectorAll('.modal'), {});
    setTimeout(() => {
      this.modal = M.Modal.init(this.$refs.modal);
    }, 0)
    this.loading = false
  },
  methods: {
    
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  },
  components: {
    Sidebar,
    FormGenerator,
    FullScreenLoader
}
}
</script>
