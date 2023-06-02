<template>
  <FullScreenLoader v-if="this.createDocumentProcess"/>
  <div class="chapter-name text-3xl mb-6">
    Создание документа — Выбор шаблона
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-6">
      <div class="menu-top mb-6">
        <router-link to="/documents" class="main-btn py-3 px-5 inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </router-link>
      </div>
      <!-- <div class="search flex gap-x-5 mb-6">
        <form action="" method="get" class="shadow-md rounded-xl flex items-stretch w-full border">
          <input type="text" name="search-text" id="" placeholder="Поиск" class="rounded-l-xl py-3 pl-5 block flex-grow shrink focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]">
          <button type="submit" class="main-btn-invers block shrink px-7 rounded-r-xl">Найти</button>
        </form>
      </div>
      <div class="main-table-menu mb-6">
        <ul class="main-table-list flex flex-row-reverse">
          <li class="main-table-item">
            <button class="main-btn py-3 px-5 flex" @click="refresh">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Обновить
            </button>
          </li>
        </ul>
      </div> -->
      <MainTable :header="this.header" :content="this.content" :noDataMessage="this.noDataMessage" @updateParent="onUpdateRadioValue" ref="mainTable"/>
      <div class="flex gap-6" v-if="!this.loading">
        <div class="left-item flex-grow">
          <!-- Пагинация -->
        </div>
        <div class="right-item">
          <!-- <router-link :to="{name: 'documentCreate', params: {structureId: this.radioValue}}" class="main-btn py-3 px-5 inline-flex items-center" v-bind:disabled="this.radioValue === 0">
            <div>Продолжить</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </router-link> -->
          <button class="main-btn py-3 px-5 inline-flex items-center" v-bind:disabled="this.radioValue === 0" @click.prevent="createDraftDocument">
            <div>Продолжить</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-1 block">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import MainTable from '@/components/app/MainTable.vue'
import DocumentService from '@/store/services/document.servive'
import messages from '@/utils/messages'
import { DocumentStatus } from '@/types/DocumentStatus'

export default {
  name: 'DocumentsStructuresView',
  data: () => ({
    loading: true,
    content: [],
    header: ["","№ шаблона", "Наименование структуры", "Описание", "Дата создания"],
    noDataMessage: "По вашему запросу структуры документов не найдены",
    radioValue: 0,
    message: '',
    createDocumentProcess: false,
    documentData: { data: {}}
  }),
  async mounted() {
    await DocumentService.getDocumentStructures().then(
      (response) => {
        for(const item of response.data) {
          this.content.push([
            {
              'type': 'radio',
              'id': item.id
            },
            {
              'type': 'lable',
              'text': item.id
            },
            {
              'type': 'lable',
              'text': item.name
            }
            ,
            {
              'type': 'lable',
              'text': item.description
            }
            ,
            {
              'type': 'lable',
              'text': this.$normaldate(item.dateCreate)
            }
          ])
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    ).finally(
      this.loading = false
    )
  },
  methods: {
    onUpdateRadioValue(data) {
      this.radioValue = data;
    },
    async createDraftDocument() {
      this.createDocumentProcess = true;
      let structureData;
      let intermediateData = {userResponse:[]};
      await DocumentService.getDocumentStructure(this.radioValue).then(
      (response) => {
        structureData = response.data.structure;
        while (typeof structureData === 'string') {
          structureData = JSON.parse(structureData);
        }
        
        for(let dataItem of structureData.data) {
          let obj = {};
          obj[dataItem.id] = typeof dataItem.defaultValue === undefined ? "" : dataItem.defaultValue === undefined ? "" : dataItem.defaultValue;
          intermediateData.userResponse.push(obj);
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      });
      await DocumentService.createDocument(this.$store.state.auth.user.username, this.radioValue, DocumentStatus.Draft, intermediateData).then(
      (response) => {
        this.documentData = response.data;
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      })
      this.$router.push({name: 'document', params: {documentId: this.documentData.id}})
    },
    async refresh() {
      this.loading = true;
      this.content = [];
      this.radioValue = 0;
      this.$refs.mainTable.clearRadioButton();
      await DocumentService.getDocumentStructures().then(
        (response) => {
          for(const item of response.data) {
            this.content.push([
              {
                'type': 'radio',
                'id': item.id
              },
              {
                'type': 'lable',
                'text': item.id
              },
              {
                'type': 'lable',
                'text': item.name
              }
              ,
              {
                'type': 'lable',
                'text': item.description
              }
              ,
              {
                'type': 'lable',
                'text': this.$normaldate(item.dateCreate)
              }
            ])
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      ).finally(
        this.loading = false,
      )
    }
  },
  
  components: {
    Sidebar,
    MainTable
  }
}
</script>
