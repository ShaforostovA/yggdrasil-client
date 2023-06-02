<template>
  <div class="chapter-name text-3xl mb-6">
    Документы
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-5">
      <div class="search flex gap-x-5 mb-6 items-start">
        <form action="" method="get" class="search-text shadow-md rounded-xl flex items-stretch w-10/12 border">
          <div class="w-full relative input-field">
            <!-- <input autocomplete="off" v-model="parameter" type="text" id="autocomplete-input" name="search-text" placeholder="Поиск" class="autocomplete w-full rounded-l-xl py-3 pl-5 pr-9 block flex-grow shrink focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]"> -->
            <input placeholder="Введите ключевые слова для поиска" class="autocomplete w-full rounded-l-xl py-[1.7px] pl-1 pr-9 block flex-grow shrink focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]" >
            <button @click.prevent="clearSearch" class="px-2 py-3 absolute right-0 top-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button @click.prevent="refresh" type="submit" class="main-btn-invers block shrink px-7 rounded-r-xl">Найти</button>
        </form>
        <button @click.prevent="this.showFilter = !this.showFilter" class="w-2/12 main-btn-invers rounded-xl text-center py-3 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Фильтры
        </button>
      </div>
      <div class="filter shadow-md rounded-xl p-5 mb-6 border" ref="filter" :style="this.style">
        <div class="clear-filter mb-5 flex justify-end">
          <button @click.prevent="this.minValueDatePole = ''; this.maxValueDatePole = ''; this.resetKey += 1; this.doucmentTypeKey += 1;" class="main-btn px-3 py-2 flex">
            <svg class="w-6 h-6 mr-1" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / Filter_Off">
                <path id="Vector" d="M13 4H18.4C18.9601 4 19.2409 4 19.4548 4.10899C19.6429 4.20487 19.7948 4.35774 19.8906 4.5459C19.9996 4.75981 20 5.04005 20 5.6001V6.3448C20 6.58444 20 6.70551 19.9727 6.81942C19.9482 6.92146 19.9072 7.01893 19.8524 7.1084C19.7906 7.20931 19.7043 7.2958 19.5314 7.46875L18 9.00012M7.49961 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7083C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9809 14.1475 12.8915C14.2091 12.7909 14.2952 12.7048 14.4669 12.5331L14.4688 12.5314L15.5001 11.5001M15.5001 11.5001L5 1M15.5001 11.5001L19 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
            Сбросить фильтры
          </button>
        </div>
        <div class="filter-item mb-5">
          <div class="filter-item-header mb-1">
            Тип поиска:
          </div>
          <div class="filter-item-body flex gap-5 items-center">
            <SelectVue class="search-parameter" :message="'Выберите тип поиска'" :content="['Общий', 'По ключевым словам']" :key="this.resetKey"/>
            <div @click.prevent="showInfo" class="help-info cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="filter-item mb-5">
          <div class="flex gap-5">
            <div class="whitespace-nowrap self-end text-base">Период дат с</div>
            <input type="date" v-model="minValueDatePole" :max="this.maxValueDatePole" class="input-text status-data-menu-date-input">
            <div class="whitespace-nowrap self-end text-base">по</div>
            <input type="date" v-model="maxValueDatePole" :min="this.minValueDatePole" class="input-text status-data-menu-date-input">
            <div class="whitespace-nowrap self-end text-sm">(не включительно)</div>
          </div>
        </div>
        <div class="filter-item mb-5 flex gap-5">
          <div class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Сортировка по полю:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-field" :selected="true" :message="'Выберите параметр сортировки'" :content="['Номер документа', 'Сотрудники', 'Стаутс документа', 'По шаблону документа']" :key="this.resetKey"/>
            </div>
          </div>
          <div class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Сортировка:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-dir" :message="'Выберите тип сортировки'" :content="['По убыванию', 'По возрастанию']" :key="this.resetKey"/>
            </div>
          </div>
        </div>
        <div class="filter-item mb-5 flex gap-5">
          <div class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Статус документа:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-status" :type="'filter'" :selected="true" :message="'Выберите статус документа'" :content="['Черновик', 'Готов', 'Переделать', 'Архив']" :key="this.resetKey"/>
            </div>
          </div>
          <div class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Тип документа:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-type" :type="'filter'" :selected="true" :message="'Выберите тип документа'" :content="this.documentTypes" :key="doucmentTypeKey"/>
            </div>
          </div>
        </div>
      </div>
      <div class="main-table-menu pb-6 bg-white relative z-10">
        <ul class="main-table-list flex flex-row-reverse">
          <li class="main-table-item">
            <router-link to="/document/structure/select" class="main-btn py-3 px-5 flex" v-bind:disabled="(!this.roles.includes(this.currentUser.roles[0]))">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Создать
            </router-link>
          </li>
          <li class="main-table-item">
            <button class="main-btn py-3 px-5 flex" @click="refresh">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Обновить
            </button>
          </li>
        </ul>
      </div>
      <Loader class="bg-white" v-if="this.loading"/>
      <div v-if="!this.loading && this.listDocumentStructures.length === 0 && this.roles.includes(this.currentUser.roles[0])" class="message px-3 py-6 text-center text-yellow-600 rounded-lg border-yellow-600 border-2 mb-6 text-lg">Невозможно создать документ, пока нет шаблонов документов, обратитесь к техническому администратору.</div>
      <MainTable class="bg-white" v-if="!this.loading"
      :header="header" :content="content" :noDataMessage="noDataMessage"
      />
      <div class="flex">
        <div class="">
          Всего найдено документов: {{ this.countDocuments }}
        </div>
        <Paginate
          :page-count="this.countPage"
          :click-handler="pageChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
        />
      </div>
    </div>
  </div>
  <div id="typeSearchModal" class="modal modal-fixed-footer typeSearchModal" ref="typeSearchModal">
    <div class="modal-content flex flex-col">
      <div class="modal-img inline-block text-[var(--color-main)] mx-auto mb-5 font-bold">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-32 h-32">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <div class="worn-text text-3xl text-[var(--color-main)] mb-20 text-center">Информация о типах поиска</div>
      <p class="text-xl mb-6 text-left"><span class="text-2xl font-bold">Общий</span>: поиск документа(-ов) по <span class="font-bold">"Номеру документа"</span>, по <span class="font-bold">"Названию документа"</span> (шаблона документа), по <span class="font-bold">"ФИО"</span> пользователя (можно искать по отдельности, в комбинации ФИ или ИО).</p>
      <p class="text-xl mb-3 text-left"><span class="text-2xl font-bold">По ключевым словам</span>: поиск документа(-ов) который(-е) содержат ключевое(-ые) слово(-ва). При нажатии на поле поиска снизу появляется список ключевых слов, которые есть в системе и могут использоваться для поиска по ключевым словам.</p>
    </div>
    <div class="modal-footer flex justify-evenly">
      <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Закрыть</a>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import MainTable from '@/components/app/MainTable.vue'
import SelectVue from '@/components/app/Select.vue'
import DocumentService from '@/store/services/document.servive'
import messages from '@/utils/messages'
import { UserRoles } from "@/types/Roles"
import KeyWordService from '@/store/services/key-word.service'
import Tagify from '@yaireo/tagify'
import Paginate from "vuejs-paginate-next";

export default {
  name: 'DocumentsView',
  data: () => ({
    typeSearchModal: null,

    autocompleteSearch: null,

    loading: true,
    content: [],
    header: ["№ документа", "Наименование", "Создал", "Кафедра", "Статус", "Дата создания", ""],
    noDataMessage: "По вашему запросу документы не найдены",
    roles: [UserRoles.User, UserRoles.Moderator],
    message: '',
    listDocumentStructures: [],
    showFilter: false,

    parameter: '',
    currentPage: 1,
    sortField: 'id',
    sortDir: 'desc',

    minValueDatePole: '',
    maxValueDatePole: '',

    autocompleteData: [],
    

    currentDocuments: [],
    countDocuments: 0,
    countPage: 0,

    documentTypes: [],
    doucmentTypeKey: 1,

    resetKey: 1,
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }

    await KeyWordService.getKeyWords().then(
      (response) => {
        for(let item of response.data) {
          this.autocompleteData.push(item.name);
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );
      
    await DocumentService.getDocumentStructures().then(
      (response) => {
        this.listDocumentStructures = response.data;
      }, (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );

    await DocumentService.getAllDocumentTypes().then(
      (response) => {
        this.documentTypes = [];
        for (let item of response.data) {
          this.documentTypes.push(item.name);
        }
        this.doucmentTypeKey += 1;
      }, (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )
    
    setTimeout(() => {
      // this.autocompleteSearch = M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
      //   data: this.autocompleteData,
      //   limit: Infinity,
      //   minLength: 0
      // });
      this.typeSearchModal = M.Modal.init(this.$refs.typeSearchModal);
      this.autocompleteSearch = new Tagify(document.querySelector('.autocomplete'), {
        enforceWhitelist : false,
        whitelist: this.autocompleteData,
        editTags: true,
        dropdown: {
          enabled: 0,
          closeOnSelect: false,
          showOnFocus: true
        },
      });
      
      this.refresh();
      this.loading = false;
    }, 0)
    
  },
  methods: {
    async refresh() {
      this.loading = true;
      await KeyWordService.getKeyWords().then(
        (response) => {
          for(let item of response.data) {
            this.autocompleteData.push(item.name);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      
      await DocumentService.getDocumentStructures().then(
        (response) => {
          this.listDocumentStructures = response.data;
        }, (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      this.content = [];
      let typeSearch = document.querySelector('.search-parameter li.selected').innerText;
      if (typeSearch === 'Общий') {
        typeSearch = 'common';
      } else {
        typeSearch = 'keywords';
      }
      this.sortField = document.querySelector('.search-field li.selected').innerText;
      //['Номер документа', 'Сотрудники', 'Стаутс документа', 'По шаблону документа']
      if (this.sortField === 'Выберите параметр сортировки') {
        this.sortField = 'id';
      } else if (this.sortField === 'Номер документа') {
        this.sortField = 'id';
      } else if (this.sortField === 'Сотрудники') {
        this.sortField = 'user_id';
      } else if (this.sortField === 'Стаутс документа') {
        this.sortField = 'document_status_id';
      } else if (this.sortField === 'По шаблону документа') {
        this.sortField = 'document_structure_id';
      }

      this.sortDir = document.querySelector('.search-dir li.selected').innerText;
      if (this.sortDir === 'По убыванию') {
        this.sortDir = 'desc';
      } else {
        this.sortDir = 'asc';
      }

      let documentStatus = document.querySelector('.search-status li.selected').innerText;

      if (documentStatus === 'Выберите статус документа') {
        documentStatus = '';
      }

      let doucmentType = document.querySelector('.search-type li.selected').innerText;

      if (doucmentType === 'Выберите тип документа') {
        doucmentType = '';
      }

      this.parameter = this.autocompleteSearch.value.map(function(tag) {return tag.value;}).join(' ');

      await DocumentService.getDocuments(typeSearch, this.parameter, this.currentPage, this.sortField, this.sortDir, documentStatus, this.minValueDatePole, this.maxValueDatePole, doucmentType).then(
        (response) => {
          this.currentDocuments = [];
          this.currentDocuments = response.data.documents;
          this.countDocuments = response.data.totalItems;
          this.countPage = response.data.totalPages;
          this.content = [];
          
          for(const item of response.data.documents) {
            this.content.push([
              {
                'type': 'id',
                'text': item.id
              },
              {
                'type': item.documentStructure.name.length <= 20 ? 'onlyText' : 'text',
                'text': item.documentStructure.name,
                'shortTest': item.documentStructure.name.length <= 20 ? item.documentStructure.name : item.documentStructure.name.substr(0, 20) + '...'
                // 'type': 'text',
                // 'text': item.documentStructure.name,//item.documentStructure.name.length <= 20 ? item.documentStructure.name : item.documentStructure.name.substr(0, 20) + '...'
                // 'shortTest': item.documentStructure.name.length <= 20 ? item.documentStructure.name : item.documentStructure.name.substr(0, 20) + '...'
              },
              {
                'type': 'text',
                'text': item.user.lastName + ' ' + item.user.name + ' ' + item.user.patronymic + '',
                'shortTest': item.user.id === this.$store.state.auth.user.id ? 'Вы' : item.user.lastName + ' ' + item.user.name[0] + '. ' + item.user.patronymic[0] + '.'
              },
              {
                'type': 'text',
                'text': item.user.department.name,
                'shortTest': item.user.department.shortName
              },
              {
                'type': 'docStatus',
                'text': item.documentStatus.name
              },
              {
                'type': 'date',
                'text': item.dateCreate
              },
              {
                'type': 'link',
                'text': 'Подробнее',
                'link': '/document/' + item.id
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
      );
      await DocumentService.getDocumentStructures().then(
        (response) => {
          this.listDocumentStructures = response.data;
        }, (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.loading = false;
    },
    clearSearch() {
      this.parameter = '';
      this.autocompleteSearch.removeAllTags();
    },
    showInfo() {
      this.typeSearchModal.open();
    },
    pageChangeHandler: async function(pageNum) {
      if (this.currentPage !== pageNum) {
        this.currentPage = pageNum;
        await this.refresh();
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    style() {
      return `height: ${this.showFilter ? this.$refs.filter.scrollHeight+20 : 0}px; padding: ${this.showFilter ? '1.25rem' : '0px'}; border-width: ${this.showFilter ? '1px' : '0px'}; opacity: ${this.showFilter ? 1 : 0}; overflow: ${this.showFilter ? 'visible' : 'hidden'}; margin-bottom: ${this.showFilter ? 1.25 : 0}rem;`;
    }
  },
  beforeDestroy() {
    if (this.autocompleteSearch && this.autocompleteSearch.destroy) {
      this.autocompleteSearch.destroy();
    }
    if (this.typeSearchModal && this.typeSearchModal.destroy) {
      this.typeSearchModal.destroy();
    }
  },
  components: {
    Sidebar,
    Paginate,
    MainTable,
    SelectVue,
  }
}
</script>
