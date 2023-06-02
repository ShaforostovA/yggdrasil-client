<template>
  <div class="chapter-name text-3xl mb-6">
    Отчеты
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-5">
      <div class="search flex gap-x-5 mb-6">
        <form action="" method="get" class="shadow-md rounded-xl flex items-stretch w-10/12 border">
          <div class="w-full relative input-field">
            <input v-model="this.parameter" maxlength="255" type="text" name="search-text" id="" placeholder="Поиск" class=" w-full rounded-l-xl py-3 pl-5 pr-10 block flex-grow shrink focus:outline-none focus:ring-2 focus:ring-[var(--color-main)]">
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
          <button @click.prevent="this.minValueDatePole = ''; this.maxValueDatePole = ''; this.resetKey += 1; this.reportTypeKey += 1" class="main-btn px-3 py-2 flex">
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
              <SelectVue class="search-field" :selected="true" :message="'Выберите параметр сортировки'" :content="['Номер отчета', 'Сотрудники', 'Стаутс отчета', 'По шаблону отчета']" :key="this.resetKey"/>
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
              Статус отчета:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-status" :type="'filter'" :selected="true" :message="'Выберите статус отчета'" :content="['Черновик', 'Готов', 'Архив']" :key="this.resetKey"/>
            </div>
          </div>
          <div class="filter-item-inner w-1/2">
            <div class="filter-item-header mb-1">
              Тип отчета:
            </div>
            <div class="filter-item-body">
              <SelectVue class="search-type" :type="'filter'" :selected="true" :message="'Выберите тип отчета'" :content="this.reportTypes" :key="reportTypeKey"/>
            </div>
          </div>
        </div>
      </div>
      <div class="main-table-menu pb-6 bg-white relative z-10">
        <ul class="main-table-list flex flex-row-reverse">
          <li class="main-table-item">
            <router-link to="/report" class="main-btn py-3 px-5 flex" :disabled="this.listReportStructures.length === 0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Создать
            </router-link>
          </li>
          <li class="main-table-item">
            <button class="main-btn py-3 px-5 flex" @click.prevent="refresh">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Обновить
            </button>
          </li>
        </ul>
      </div>
      <Loader class="bg-white" v-if="this.loading"/>
      <div v-if="!this.loading && this.listReportStructures.length === 0" class="bg-white message px-3 py-6 text-center text-yellow-600 rounded-lg border-yellow-600 border-2 mb-6 text-lg">Невозможно создать отчет, пока нет шаблонов отчетов, обратитесь к техническому администратору.</div>
      <MainTable class="bg-white" v-if="!this.loading"
        :header="header" :content="content" :noDataMessage="noDataMessage"
      />
      <div class="flex">
        <div class="">
          Всего найдено отчетов: {{ this.countReports }}
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
</template>

<script>
// // @ is an alias to /src
import Sidebar from '@/components/app/Sidebar.vue'
import MainTable from '@/components/app/MainTable.vue'
import SelectVue from '@/components/app/Select.vue'
import ReportService from '@/store/services/report.service';
import messages from '@/utils/messages'
import Paginate from "vuejs-paginate-next";

export default {
  name: 'ReportsView',
  data: () => ({
    showFilter: false,

    loading: true,
    content: [],
    header: ["№ отчета", "Наименование", "Описание", "Тип", "Создал", "Статус", "Дата создания", ""],
    noDataMessage: "По вашему запросу отчеты не найдены",
    message: '',
    listReportStructures: [],

    parameter: '',
    currentPage: 1,
    sortField: 'id',
    sortDir: 'desc',

    countReports: 0,
    countPage: 0,

    reportTypes: [],
    reportTypeKey: 1,

    minValueDatePole: '',
    maxValueDatePole: '',

    resetKey: 1,
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }

    await ReportService.getAllReportTypes().then(
      (response) => {
        this.reportTypes = [];
        for (let item of response.data) {
          this.reportTypes.push(item.name);
        }
        this.reportTypeKey += 1;
      }, (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )

    setTimeout(() => {
      this.refresh();
      this.loading = false;
    }, 0)
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.content = [];

      this.sortField = document.querySelector('.search-field li.selected').innerText;

      if (this.sortField === 'Выберите параметр сортировки') {
        this.sortField = 'id';
      } else if (this.sortField === 'Номер отчета') {
        this.sortField = 'id';
      } else if (this.sortField === 'Сотрудники') {
        this.sortField = 'user';
      } else if (this.sortField === 'Стаутс отчета') {
        this.sortField = 'reportStatus';
      } else if (this.sortField === 'По шаблону отчета') {
        this.sortField = 'reportStructure';
      }

      this.sortDir = document.querySelector('.search-dir li.selected').innerText;
      if (this.sortDir === 'По убыванию') {
        this.sortDir = 'desc';
      } else {
        this.sortDir = 'asc';
      }

      let reportStatus = document.querySelector('.search-status li.selected').innerText;

      if (reportStatus === 'Выберите статус отчета') {
        reportStatus = '';
      }

      let reportType = document.querySelector('.search-type li.selected').innerText;

      if (reportType === 'Выберите тип отчета') {
        reportType = '';
      }

      await ReportService.getAllActiveReportStructures().then(
        (response) => {
          this.listReportStructures = response.data;
        }, (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      await ReportService.getAllReports(this.parameter, this.currentPage, this.sortField, this.sortDir, reportStatus, this.minValueDatePole, this.maxValueDatePole, reportType).then(
        (response) => {
          this.content = [];
          this.countReports = response.data.totalItems;
          this.countPage = response.data.totalPages;
          for(const item of response.data.reports) {
            //console.log(item);
            this.content.push([
              {
                'type': 'id',
                'text': item.id
              },
              {
                'type': item.reportStructure.name.length <= 20 ? 'onlyText' : 'text',
                'text': item.reportStructure.name,
                'shortTest': item.reportStructure.name.length <= 20 ? item.reportStructure.name : item.reportStructure.name.substr(0, 20) + '...'
                // 'type': 'text',
                // 'text': item.reportStructure.name,
                // 'shortTest': item.reportStructure.name.length <= 20 ? item.reportStructure.name : item.reportStructure.name.substr(0, 20) + '...'
              },
              {
                'type': item.reportStructure.description.length <= 30 ? 'onlyText' : 'text',
                'text': item.reportStructure.description,
                'shortTest': item.reportStructure.description.length <= 30 ? item.reportStructure.description : item.reportStructure.description.substr(0, 30) + '...'
                // 'type': 'text',
                // 'text': item.reportStructure.description,
                // 'shortTest': item.reportStructure.description.length <= 30 ? item.reportStructure.description : item.reportStructure.description.substr(0, 30) + '...'
              },
              {
                'type': item.reportStructure.reportType.name.length <= 20 ? 'onlyText' : 'text',
                'text': item.reportStructure.reportType.name,
                'shortTest': item.reportStructure.reportType.name.length <= 20 ? item.reportStructure.reportType.name : item.reportStructure.reportType.name.substr(0, 20) + '...'
                // 'type': 'text',
                // 'text': item.reportStructure.reportType.name,
                // 'shortTest': item.reportStructure.reportType.name.length <= 15 ? item.reportStructure.reportType.name : item.reportStructure.reportType.name.substr(0, 15) + '...',
              },
              {
                'type': 'text',
                'text': item.user.lastName + ' ' + item.user.name + ' ' + item.user.patronymic + '',
                'shortTest': item.user.id === this.$store.state.auth.user.id ? 'Вы' : item.user.lastName + ' ' + item.user.name[0] + '. ' + item.user.patronymic[0] + '.'
              },
              {
                'type': 'reportStatus',
                'text': item.reportStatus.name,
              },
              {
                'type': 'date',
                'text': item.dateCreate
              },
              {
                'type': 'linkP',
                'text': 'Подробнее',
                'link': '/report?reportId=' + item.id
              }
            ])
          }
        }, (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
      this.loading = false;
    },
    pageChangeHandler: async function(pageNum) {
      if (this.currentPage !== pageNum) {
        this.currentPage = pageNum;
        await this.refresh();
      }
    }
  },
  computed: {
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
