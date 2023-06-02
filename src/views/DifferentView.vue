<template>
  <div class="chapter-name text-3xl mb-6">
    Сотрудники
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-5">
      <div class="col s12 mb-9">
        <ul class="tabs gap-3 menu-tabs flex justify-center mb-10">
          <li class="tab col s3 rounded-xl overflow-hidden py-2"><a class="tab-link p-6 rounded-xl active" href="#keyWord">Ключевые слова</a></li>
          <li class="tab col s3 rounded-xl overflow-hidden py-2"><a class="tab-link p-6 rounded-xl" href="#typeDocument">Типы документов</a></li>
          <li class="tab col s3 rounded-xl overflow-hidden py-2"><a class="tab-link p-6 rounded-xl" href="#typeReport">Типы отчетов</a></li>
        </ul>
      </div>
      <div id="keyWord" class="">
        <MainTable  class="bg-white" 
          :header="header" :content="content" :noDataMessage="noDataMessage"
        />
      </div>
      <div id="typeDocument" class="">
        <MainTable class="bg-white" 
          :header="headerDocumentType" :content="contentDocumentType" :noDataMessage="noDataMessageDocumentType"
        />
      </div>
      <div id="typeReport" class="">
        <MainTable  class="bg-white" 
          :header="headerReportType" :content="contentReportType" :noDataMessage="noDataMessageReportType"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import MainTable from '@/components/app/MainTable.vue'
import userService from '@/store/services/user.service'
import messages from '@/utils/messages'
import keyWordService from '@/store/services/key-word.service'
import documentServive from '@/store/services/document.servive'
import reportService from '@/store/services/report.service'
export default {
  name: 'DifferentView',
  data: () => ({

    tabs: null,

    content: [],
    header: ["№ ключевого слова", "Наименование", ""],
    noDataMessage: "По вашему запросу ключевые слова не найдены",

    contentDocumentType: [],
    headerDocumentType: ["№ типа документа", "Наименование", ""],
    noDataMessageDocumentType: "По вашему запросу типы документов не найдены",

    contentReportType: [],
    headerReportType: ["№ типа отчета", "Наименование", ""],
    noDataMessageReportType: "По вашему запросу типы отчетов не найдены",


    message: '',

  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    
    setTimeout(() => {
      this.refresh();
      this.tabs = M.Tabs.init(document.querySelector('.tabs'));
    }, 0)
  },
  methods: {
    async refresh() {
      this.content = [];
      this.contentDocumentType = [];
      this.contentReportType = [];

      await keyWordService.getKeyWords().then(
        (response) => {
          for(const item of response.data) {
            this.content.push([
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
                'type': 'linkP',
                'text': 'Подробнее',
                'link': '/keyword/' + item.id
              }
            ]);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      await documentServive.getAllDocumentTypes().then(
        (response) => {
          for(const item of response.data) {
            this.contentDocumentType.push([
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
                'type': 'linkP',
                'text': 'Подробнее',
                'link': '/document/type/' + item.id
              }
            ]);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      await reportService.getAllReportTypes().then(
        (response) => {
          for(const item of response.data) {
            this.contentReportType.push([
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
                'type': 'linkP',
                'text': 'Подробнее',
                'link': '/report/type/' + item.id
              }
            ]);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
    },
    
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  beforeDestroy() {
    if (this.tabs && this.tabs.destroy) {
      this.tabs.destroy();
    }
  },
  components: {
    Sidebar,
    MainTable,
  }
}
</script>
