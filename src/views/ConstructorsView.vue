<template>
  <div class="chapter-name text-3xl mb-6">
    Конструктор шаблонов {{ this.selectDocument ? 'документов' : 'отчетов' }}
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-5">
      <div class="search flex gap-x-5 mb-6">
        <form action="" method="get" class="shadow-md rounded-xl flex items-stretch w-10/12 border">
          <div class="w-full relative input-field">
            <input v-model="this.parameter" maxlength="255" type="text" name="search-text" id="" placeholder="Поиск" class="w-full rounded-l-xl py-3 pl-5 pr-10 block flex-grow shrink focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]">
            <div @click.prevent="this.parameter = ''" class=" cursor-pointer px-2 py-3 absolute right-0 top-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <button @click.prevent="refresh" type="submit" class="main-btn-invers block shrink px-7 rounded-r-xl">Найти</button>
        </form>
        <button @click.prevent="this.showFilter = !this.showFilter" href="#" class="main-btn-invers rounded-xl w-2/12 block text-center py-3 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
          Фильтры
        </button>
      </div>
      <div class="filter shadow-md rounded-xl p-5 mb-6 border" ref="filter" :style="this.style">
        <div class="clear-filter mb-5 flex justify-end">
          <button @click.prevent="this.minValueDatePole = ''; this.maxValueDatePole = ''; this.resetKey += 1; this.documentKey += 1; this.reportKey += 1;" class="main-btn px-3 py-2 flex">
            <svg class="w-6 h-6 mr-1" viewBox="0 0 24 24" stroke="currentColor" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / Filter_Off">
                <path id="Vector" d="M13 4H18.4C18.9601 4 19.2409 4 19.4548 4.10899C19.6429 4.20487 19.7948 4.35774 19.8906 4.5459C19.9996 4.75981 20 5.04005 20 5.6001V6.3448C20 6.58444 20 6.70551 19.9727 6.81942C19.9482 6.92146 19.9072 7.01893 19.8524 7.1084C19.7906 7.20931 19.7043 7.2958 19.5314 7.46875L18 9.00012M7.49961 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7083C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9809 14.1475 12.8915C14.2091 12.7909 14.2952 12.7048 14.4669 12.5331L14.4688 12.5314L15.5001 11.5001M15.5001 11.5001L5 1M15.5001 11.5001L19 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
            Сбросить фильтры
          </button>
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
              <SelectVue class="search-field" :selected="true" :message="'Выберите параметр сортировки'" :content="this.selectDocument ? ['Номер документа', 'Наименование', 'Статус'] : ['Номер отчета', 'Наименование', 'Статус']" :key="this.resetKey"/>
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
              Статус шаблона:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-status" :type="'filter'" :selected="true" :message="'Выберите статус шаблона'" :content="['Активный', 'Деактивированный']" :key="this.resetKey"/>
            </div>
          </div>
          <div v-if="this.selectDocument" class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Тип документа:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-type-document" :type="'filter'" :selected="true" :message="'Выберите тип документа'" :content="this.documentTypeList" :key="this.documentKey"/>
            </div>
          </div>
          <div v-else class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Тип отчета:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-type-report" :type="'filter'" :selected="true" :message="'Выберите тип отчета'" :content="this.reportTypeList" :key="this.reportKey"/>
            </div>
          </div>
        </div>
      </div>
      <div class="main-table-menu pb-6 flex items-center bg-white relative z-10">
        <div class="battons">
          <button v-if="!this.selectDocument" class="main-btn px-6 py-3 inline-flex items-center select-none" @click.prevent="this.replaceMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            Документы
          </button>
          <button v-else class="main-btn px-6 py-3 inline-flex items-center select-none" @click.prevent="this.replaceMode">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            Отчеты
          </button>
        </div>
        <ul class="main-table-list flex flex-grow flex-row-reverse">
          <li class="main-table-item">
            <button class="main-btn py-3 px-5 flex" @click.prevent="create">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Создать
            </button>
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
      <Loader v-if="this.loading" class="w-full bg-white"/>
      <MainTable class="bg-white"
        v-if="this.selectDocument && !this.loading"
        :header="headerDocuments" :content="contentDocuments" :noDataMessage="noDocuments"
      />
      <MainTable class="bg-white"
        v-else-if="!this.selectDocument && !this.loading"
        :header="headerReports" :content="contentReports" :noDataMessage="noReports"
      />
      <div class="flex" :class="{'paginate-Hidden': !this.selectDocument}">
        <div class="">
          Всего найдено шаблонов документов: {{ this.countDocumentStructures }}
        </div>
        <Paginate
          :page-count="this.countDocumentPage"
          :click-handler="pageDocumentChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
        />
      </div>
      <div class="flex" :class="{'paginate-Hidden': this.selectDocument}">
        <div class="">
          Всего найдено шаблонов отчетов: {{ this.countReportStructures }}
        </div>
        <Paginate
          :page-count="this.countReportPage"
          :click-handler="pageReportChangeHandler"
          :prev-text="'Назад'"
          :next-text="'Вперед'"
          :container-class="'pagination'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import MainTable from '@/components/app/MainTable.vue'
import SelectVue from '@/components/app/Select.vue'
import ReportService from '@/store/services/report.service'
import DocumentService from '@/store/services/document.servive'
import messages from '@/utils/messages'
import Paginate from "vuejs-paginate-next";


export default {
  name: 'ConstructorsView',
  data: () => ({
    loading: true,
    selectDocument: true,
    contentDocuments: [],
    headerDocuments: ["№ шаблона", "Наименование документа", "Описание", "Статус", "Дата создания", ""],
    noDocuments: "По вашему запросу шаблонов документов нет",
    contentReports: [],
    headerReports: ["№ шаблона", "Наименование отчета", "Описание", "Статус", "Дата создания", ""],
    noReports: "По вашему запросу шаблонов отчетов нет",
    message: '',

    showFilter: false,

    parameter: '',
    currentDocumentPage: 1,
    currentReportPage: 1,
    sortField: 'id',
    sortDir: 'desc',
    isState: '',
    documentTypeName: '',
    reportTypeName: '',
    isActive: '',

    countReportStructures: 0,
    countReportPage: 0,

    countDocumentStructures: 0,
    countDocumentPage: 0,

    minValueDatePole: '',
    maxValueDatePole: '',

    resetKey: 1,
    documentKey: 1,
    reportKey: 1,

    documentTypeList: [],
    reportTypeList: [],
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    await DocumentService.getAllDocumentTypes().then(
      (response) => {
        this.documentTypeList = [];
        for (let item of response.data) {
          this.documentTypeList.push(item.name);
        }
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )

    await ReportService.getAllReportTypes().then(
      (response) => {
        this.reportTypeList = [];
        for (let item of response.data) {
          this.reportTypeList.push(item.name);
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
      this.documentKey += 1;
      this.reportKey += 1;
      this.refresh();
      this.loading = false;
    }, 10)
    
  },
  methods: {
    replaceMode() {
      this.selectDocument = !this.selectDocument;
      setTimeout(() => {
        this.refresh();
      }, 10)
    },
    async refresh() {
      this.loading = true;

      this.sortField = document.querySelector('.search-field li.selected').innerText;
      //['Номер пользователя', 'ФИО', 'Роль', 'Кафедра', 'Статус', 'Штатность', 'По шаблону отчета']
      if (this.sortField === 'Выберите параметр сортировки') {
        this.sortField = 'id';
      } else if (this.sortField === 'Номер документа' || this.sortField === 'Номер отчета') {
        this.sortField = 'id';
      } else if (this.sortField === 'Наименование') {
        this.sortField = 'name';
      } else if (this.sortField === 'Статус') {
        this.sortField = 'isActive';
      }

      this.sortDir = document.querySelector('.search-dir li.selected').innerText;
      if (this.sortDir === 'По убыванию') {
        this.sortDir = 'desc';
      } else {
        this.sortDir = 'asc';
      }

      this.isActive = document.querySelector('.search-status li.selected').innerText;
      if (this.isActive === 'Активный') {
        this.isActive = true;
      } else if (this.isActive === 'Деактивированный') {
        this.isActive = false;
      } else {
        this.isActive = '';
      }

      if (this.selectDocument) {
        this.contentDocuments = [],

        this.documentTypeName = document.querySelector('.search-type-document li.selected').innerText;
        if (this.documentTypeName === 'Выберите тип документа') {
          this.documentTypeName = '';
        }

        await DocumentService.getAdminDocumentStructures(this.parameter, this.currentDocumentPage, this.sortField, this.sortDir, this.isActive, this.minValueDatePole, this.maxValueDatePole, this.documentTypeName).then(
          (response) => {
            this.contentDocuments = [];
            this.countDocumentStructures = response.data.totalItems;
            this.countDocumentPage = response.data.totalPages;
            for(const item of response.data.documentStructureList) {
              this.contentDocuments.push([
                {
                  'type': 'id',
                  'text': item.id
                },
                {
                  'type': item.name.length <= 20 ? 'onlyText' : 'text',
                  'text': item.name,
                  'shortTest': item.name.length <= 20 ? item.name : item.name.substr(0, 20) + '...'
                },
                {
                  'type': item.description.length <= 30 ? 'onlyText' : 'text',
                  'text': item.description,
                  'shortTest': item.description.length <= 30 ? item.description : item.description.substr(0, 30) + '...'
                },
                {
                  'type': 'status',
                  'text': item.isActive ? 'Активный' : 'Деактивированный'
                },
                {
                  'type': 'date',
                  'text': item.dateCreate
                },
                {
                  'type': 'linkP',
                  'text': 'Подробнее',
                  'link': '/constructors/document/create?documnetStructure=' + item.id,
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
        )
      } else {
        this.contentReports = [];

        this.reportTypeName = document.querySelector('.search-type-report li.selected').innerText;
        if (this.reportTypeName === 'Выберите тип отчета') {
          this.reportTypeName = '';
        }

        await ReportService.getAllReportStructures(this.parameter, this.currentDocumentPage, this.sortField, this.sortDir, this.isActive, this.minValueDatePole, this.maxValueDatePole, this.reportTypeName).then(
          (response) => {
            this.contentReports = [];
            this.countReportStructures = response.data.totalItems;
            this.countReportPage = response.data.totalPages;
            for(const item of response.data.reportStructureList) {
              this.contentReports.push([
                {
                  'type': 'id',
                  'text': item.id
                },
                {
                  'type': item.name.length <= 20 ? 'onlyText' : 'text',
                  'text': item.name,
                  'shortTest': item.name.length <= 20 ? item.name : item.name.substr(0, 20) + '...'
                },
                {
                  'type': item.description.length <= 30 ? 'onlyText' : 'text',
                  'text': item.description,
                  'shortTest': item.description.length <= 30 ? item.description : item.description.substr(0, 30) + '...'
                },
                {
                  'type': 'status',
                  'text': item.isActive ? 'Активный' : 'Деактивированный'
                },
                {
                  'type': 'date',
                  'text': item.dateCreate
                },
                {
                  'type': 'linkP',
                  'text': 'Подробнее',
                  'link': '/constructors/report/create?reportStructure=' + item.id,
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
        )
      }
      this.loading = false;
    },
    create() {
      if (this.selectDocument) {
        this.$router.push('/constructors/document/create')
      } else {
        this.$router.push('/constructors/report/create')
      }
    },
    pageDocumentChangeHandler: async function(pageNum) {
      if (this.currentDocumentPage !== pageNum) {
        this.currentDocumentPage = pageNum;
        await this.refresh();
      }
    },
    pageReportChangeHandler: async function(pageNum) {
      if (this.currentReportPage !== pageNum) {
        this.currentReportPage = pageNum;
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
  components: {
    Sidebar,
    MainTable,
    SelectVue,
    Paginate
  }
}
</script>
