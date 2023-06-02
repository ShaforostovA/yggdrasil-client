<template>
  <div v-if="this.createMode" class="chapter-name text-3xl mb-6">
    Конструктор шаблона — Отчеты
  </div>
  <div v-else class="chapter-name text-3xl mb-6">
    Просмотр шаблона отчетов — №{{ this.$route.query.reportStructure }}
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="w-full flex flex-col mb-6">
      <div class="menu-top mb-6 flex justify-between">
        <button class="main-btn py-3 px-5 inline-flex" @click.prevent="leavingPage">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>

        <div class="flex justify-between gap-5">

          <button v-if="!this.createMode && !this.updateMode && this.isActive" class="main-btn-yellow px-5 py-3 text-lg flex items-center gap-1" @click.prevent="updateReportStatus">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
            Деактивировать
          </button>

          <button v-if="!this.createMode && !this.updateMode && !this.isActive" class="main-btn px-5 py-3 text-lg flex items-center gap-1" @click.prevent="revActivationReportStructure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            Активировать
          </button>

          <button v-if="this.createMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="createNewReportStructure" :disabled="this.nameStructure === '' || this.documnetSelectedStructures.length === 0 || this.typesReports.length === 0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Опубликовать
          </button>

          <button v-if="!this.canWritePoles && !this.updateMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="onUpdateMode">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
            </svg>
            Изменить
          </button>

          <button v-if="this.updateMode" class="main-btn-red py-3 px-5 flex items-center gap-1" @click.prevent="rajectChangesStructure">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            Отменить
          </button>

          <button v-if="this.updateMode" class="main-btn py-3 px-5 flex items-center gap-1" @click.prevent="updateReportStructure" v-bind:disabled="(!this.updateMode) || this.nameStructure === '' || (this.documnetSelectedStructures && this.documnetSelectedStructures.length === 0)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Сохранить
          </button>
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
            <button @click.prevent="back" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Уйти</button>
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
          </div>
        </div>

        <div id="updateStatusModel" class="modal modal-fixed-footer" ref="updateStatusModel">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-10 text-left">При деактивации шаблона, все отчеты на его основе будут заблокированы для редактирования.</p>
            <p class="text-2xl mb-3 text-center">Применить изменения?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Нет</a>
            <button @click.prevent="revActivationReportStructure" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>

        <div id="createTypeModel" class="modal modal-fixed-footer" ref="typeCreateModel">
          <div class="modal-content flex flex-col">
            <div class="profile-data-input mb-3">
              <label for="" class="relative required">Название типа отчета:</label>
              <div class="flex gap-3">
                <div class="w-full">
                  <input v-model.trim="typeName" v-on:input="this.checkReportTypeName()" :class="{invalid: (v$.typeName.$errors.length)}" minlength="1" maxlength="50" required type="text" name="" id="" class="input-text" placeholder="Название типа отчета" title="Введите название типа отчета">
                  <div class="input-errors max-w-xl" v-for="error of v$.typeName.$errors" :key="error.$uid">
                    <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
                  </div>
                </div>
                <div v-if="this.typeName" class="self-center">
                  <div class="" v-if="this.validTypeName" title="Название свободено.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green-600">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="" v-else title="Тип отчета с таким названием уже существует!">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-700">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отменить</a>
            <button @click.prevent="createReportType" :disabled="!this.validTypeName" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Сохранить</button>
          </div>
        </div>
      </div>

      <loader v-if="loading"/>
      <div v-else class="flex gap-5">
        <div class="structure-vue w-full shadow-md rounded-xl border p-4">
          <div v-if="this.createMode === false" class="">
            <div class="mb-3">
              <div class="active">Статус: <span v-if="this.isActive" class="text-green-600">Активный</span><span v-else class="disables text-yellow-600">Деактивированный</span></div>
            </div>
            <div class="date-block flex justify-end mb-3">
              <div class="date-body">
                <div class="date-create">Дата создания: {{ this.$normaldate(this.dateCreate) }}</div>
                <div class="date-create">Дата обновления: {{ this.$normaldate(this.dateUpdate) }}</div>
              </div>
            </div>
            <div v-if="this.oldStructureReport !== null" class="old-report-structure mb-3">
              <div class="old-report-structure-title">Шаблон основан на:</div>
              <router-link class="p-1 main-btn inline-block" :to="'/constructors/report/create?reportStructure=' + this.oldStructureReport.id">
                {{ this.oldStructureReport.name + " №(" + this.oldStructureReport.id + ")" }}
              </router-link>
            </div>
            <div v-if="this.listNewReportStructures.length !== 0" class="list-new-report-structure mb-3 flex gap-3">
              <div class="list-new-report-structure-title w-1/5">Шаблоны основанные на этом шаблоне:</div>
              <ul class="newReportStructuresList flex flex-wrap gap-2 w-4/5">
                <li v-for="item of this.listNewReportStructures" :key="item.id" class="newReportStructuresList-item">
                  <router-link class="p-1 main-btn block" :to="'/constructors/report/create?reportStructure=' + item.id">
                    {{ item.name + " №(" + item.id + ")" }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="structure-top-header">
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Название шаблона:</label>
              <input v-model.trim="nameStructure" :class="{invalid: (v$.nameStructure.$errors.length)}" minlength="1" maxlength="255" required type="text" name="nameStructure" id="" class="input-text" placeholder="Название шаблона" title="Введите название шаблона" :disabled="!this.canWritePoles">
              <div class="input-errors max-w-xl" v-for="error of v$.nameStructure.$errors" :key="error.$uid">
                <div class="helper-text">{{  error.$message === "This field should be at least 1 characters long" ? "Длина этого поля должна составлять не менее 1 символа" : error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="">Описание шаблона:</label>
              <textarea v-model.trim="descriptionStructure" :class="{invalid: (v$.descriptionStructure.$errors.length)}" name="descriptionStructure" id="" class="input-text" maxlength="500" placeholder="Описание шаблона" :disabled="!this.canWritePoles"></textarea>
              <div class="input-errors max-w-xl" v-for="error of v$.descriptionStructure.$errors" :key="error.$uid">
                <div class="helper-text">{{ error.$message === "Value is required" ? "Значение является обязательным" : error.$message }}</div>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Тип отчета:</label>
              <div class="flex gap-3">
                <div class="input-field col s12 selectSingle w-full report-type-select">
                  <SelectVue :selected="false" :content="this.typesReports" :message="'Выберите тип отчета'" :multy="false" :disabled="!this.canWritePoles" :equalId="this.selectTypeInLoadStucture" :key="this.keySelectReportTypes"/>
                </div>
                <button class="main-btn py-3 px-5 flex self-start" @click.prevent="createType" :disabled="!this.canWritePoles">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Добавить
                </button>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-10">
              <label for="" class="relative required">Перечень документов:</label>
              <div class="flex gap-3">
                <div class="input-field col s12 selectSingle w-full document-structures-select">
                  <SelectVue :selected="false" :content="this.documentStructures" :message="'Выберите документ(ы)'" :multy="true" :disabled="!this.canWritePoles" :equalId="this.documnetSelectedStructures" :key="this.keySelectDocumentStructures"/>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button v-if="this.createMode || this.updateMode" class="main-btn py-3 px-5 flex items-center gap-1" @click.prevent="updateSelectDocumentStructures">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Сохранить выбранный перечень
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
import SelectVue from '@/components/app/Select.vue'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue'

import DocumentServive from '@/store/services/document.servive'
import ReportService from '@/store/services/report.service'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import Loader from '@/components/app/Loader.vue'

export default {
  name: 'ConstructorReportView',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({

    // Модальные окна
    modal: null,
    typeModel: null,
    updateStatusModel: null,

    // Загрузка
    loading: true,
    
    // Режимы
    updateMode: false,
    createMode: false,

    // Типы отчетов
    typeName: '',
    typesReports: [],
    validTypeName: false,
    selectTypeInLoadStucture: -1,

    // ID для обновления компонентов
    keySelectReportTypes: 1,
    keySelectDocumentStructures: 1,

    // Данные структуры отчетов
    nameStructure: '',
    descriptionStructure: '',
    dateCreate: '',
    dateUpdate: '',
    documnetSelectedStructures: [],
    isActive: true,

    // Структуры документов
    documentStructures: [],

    // Selects
    selectDoucumentStructures: null,

    // Шаблоны отчетов, созданные на основе текущего
    listNewReportStructures: [],
    
    // ID шаблона на основе которого был создан текущий
    oldStructureReport: null
  }),
  validations() {
    return {
      typeName: {required, minLength: minLength(1), maxLength: maxLength(50)},
      nameStructure: {required, minLength: minLength(1), maxLength: maxLength(255)},
      descriptionStructure: {maxLength: maxLength(500)},
    }
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    if (this.$route.query.reportStructure === undefined) {
      this.createMode = true;
      setTimeout(() => {
        this.updateComp();
      })
    } else {
      await ReportService.checkReportStructure(this.$route.query.reportStructure).then(
        (response) => {
          if (!response.data) {
            this.$router.go(-1);
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      await ReportService.getReportStructureById(this.$route.query.reportStructure).then(
        (response) => {
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.reportType.id;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.documnetSelectedStructures = JSON.parse(response.data.reportStructure);
          this.isActive = response.data.isActive;
          while (typeof this.documnetSelectedStructures === 'string') {
            this.documnetSelectedStructures = JSON.parse(this.documnetSelectedStructures);
          }
          this.documnetSelectedStructures = this.documnetSelectedStructures.data;
          if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
            ReportService.getReportStructureById(response.data.oldStructureId).then(
              (innerResponse) => {
                this.oldStructureReport = innerResponse.data;
                this.updateComp();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            this.oldStructureReport = null;
          }
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      this.updateComp();
    }

    await ReportService.getAllReportTypes().then(
        (response) => {
          this.typesReports = response.data;
          setTimeout(() => {
            this.updateComp();
          })
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      
    await DocumentServive.getDocumentStructures().then(
      (response) => {
        this.documentStructures = response.data;
        this.updateComp();
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    )

    await ReportService.getNewReportStructures(this.$route.query.reportStructure).then(
      (response) => {
        this.listNewReportStructures = response.data;
        this.updateComp();
      },
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
    );
    
    setTimeout(() => {
      this.modal = M.Modal.init(this.$refs.modal);
      this.typeModel = M.Modal.init(this.$refs.typeCreateModel);
      this.updateStatusModel = M.Modal.init(this.$refs.updateStatusModel);
      this.selectDoucumentStructures = M.FormSelect.init(document.querySelector('.document-structures-select select'));
      this.updateComp();
    }, 0)
    this.loading = false;
  },
  methods: {
    async checkReportTypeName() {
      await ReportService.checkReportTypeName(this.typeName).then(
        (response) => {
          if (response.data || this.typeName === '') {
            this.validTypeName = false;
          } else {
            this.validTypeName = true;
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },
    createType() {
      this.typeModel.open();
    },
    async createReportType() {
      this.loading = true;
      await ReportService.createReportType(this.typeName).then(
        (response) => {
          this.typeName = '';
          ReportService.getAllReportTypes().then(
            (response) => {
              this.typesReports = response.data;
              this.keySelectReportTypes += 1;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
          this.typeModel.close();
          this.$message(`Тип отчета №${response.data.id} создан`);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
      this.loading = false;
    },

    updateSelectDocumentStructures() {
      this.documnetSelectedStructures = [];
      let findLi = document.querySelectorAll('.document-structures-select li[class="selected"]');
      for(let item of findLi) {
        let sliceItem = item.innerText.split(' ');
        this.documnetSelectedStructures.push(sliceItem[sliceItem.length-1].replace(/^.|.$/g,""));
      }
    },

    async createNewReportStructure() {
      this.loading = true;
      let listLiItems = document.querySelector('.report-type-select').querySelectorAll('li');
      let selectTypeReport = '';
      let structureReportFinal = {data: []};
      structureReportFinal.data = this.documnetSelectedStructures;
      for (let item of listLiItems) {
        if (item.classList.value.includes('selected')) {
          let arList = item.textContent.split(' ');
          selectTypeReport = arList[arList.length - 1].replace(/^.|.$/g,"");
          break;
        }
      }
      await ReportService.createReportStructure('', this.nameStructure, this.descriptionStructure, selectTypeReport, structureReportFinal).then(
        (response) => {
          this.$message(`Создан Шаблон отчетов №${response.data.id}`);
          this.nameStructure = '';
          this.descriptionStructure = '';
          this.documnetSelectedStructures = [];
          this.updateComp();
        }
      ),
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
      this.loading = false;
    },

    updateReportStatus() {
      this.updateStatusModel.open();
    },

    revActivationReportStructure() {
      this.loading = true;
      this.updateStatusModel.close();
      ReportService.updateStatusReportStructure(this.$route.query.reportStructure, !this.isActive).then(
        (response) => {
          if (!this.isActive) {
            this.$message(`Шаблон №${this.$route.query.reportStructure} активирован`);
          } else {
            this.$message(`Шаблон №${this.$route.query.reportStructure} деактивирован`);
          }
          this.isActive = !this.isActive;
        }
      ),
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
      this.loading = false;
    },

    async rajectChangesStructure() {
      this.loading = true;
      await ReportService.getReportStructureById(this.$route.query.reportStructure).then(
        (response) => {
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.reportType.id;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.documnetSelectedStructures = JSON.parse(response.data.reportStructure);
          while (typeof this.documnetSelectedStructures === 'string') {
            this.documnetSelectedStructures = JSON.parse(this.documnetSelectedStructures);
          }
          this.documnetSelectedStructures = this.documnetSelectedStructures.data;
          if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
            ReportService.getReportStructureById(response.data.oldStructureId).then(
              (innerResponse) => {
                this.oldStructureReport = innerResponse.data;
                this.updateComp();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            this.oldStructureReport = null;
          }
          this.updateComp();
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
      this.updateComp();
      this.$message('Изменения отменены');
    },

    async updateReportStructure() {
      this.loading = true;
      let listLiItems = document.querySelector('.report-type-select').querySelectorAll('li');
      let selectTypeReport = '';
      let structureReportFinal = {data: []};
      if (this.documnetSelectedStructures === undefined || this.documnetSelectedStructures.length === 0) {
        this.$error(`Необходимо выбрать хотя бы 1 документ`);
        return;
      }
      structureReportFinal.data = this.documnetSelectedStructures;
      for (let item of listLiItems) {
        if (item.classList.value.includes('selected')) {
          let arList = item.textContent.split(' ');
          selectTypeReport = arList[arList.length - 1].replace(/^.|.$/g,"");
          break;
        }
      }
      await ReportService.updateReportStructure(this.$route.query.reportStructure, this.nameStructure, this.descriptionStructure, selectTypeReport, structureReportFinal).then(
        (response) => {
          this.$message(`Обновлен Шаблон отчетов №${response.data.id}`);
          this.nameStructure = response.data.name;
          this.descriptionStructure = response.data.description;
          this.selectTypeInLoadStucture = response.data.reportType.id;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.documnetSelectedStructures = JSON.parse(response.data.reportStructure);
          while (typeof this.documnetSelectedStructures === 'string') {
            this.documnetSelectedStructures = JSON.parse(this.documnetSelectedStructures);
          }
          this.documnetSelectedStructures = this.documnetSelectedStructures.data;
          this.updateMode = false;
          this.updateComp();
        }
      ),
      (error) => {
        this.message = (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        this.$error(messages[this.message] || 'Что-то пошло не так');
      }
      this.loading = false;
    },
    
    leavingPage() {
      if (this.updateMode || this.createMode) {
        this.modal.open();
      } else {
        this.back();
      }
    },
    back() {
      this.$router.push('/constructors');
    },
    onUpdateMode() {
      this.updateMode = true;
      this.updateComp();
    },
    updateComp() {
      this.keySelectReportTypes += 1;
      this.keySelectDocumentStructures += 1;
    },
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
    if (this.typeModel && this.typeModel.destroy) {
      this.typeModel.destroy();
    }
    if (this.updateStatusModel && this.updateStatusModel.destroy) {
      this.updateStatusModel.destroy();
    }
    if (this.selectDoucumentStructures && this.selectDoucumentStructures.destroy) {
      this.selectDoucumentStructures.destroy();
    }
  },
  computed: {
    canWritePoles() {
      return this.updateMode || this.createMode;
    },
  },
  watch: {
    async $route() {
      this.listNewReportStructures = [];
      this.loading = true;
      
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
      if (this.$route.query.reportStructure === undefined) {
        this.createMode = true;
        setTimeout(() => {
          this.updateComp();
        })
      } else {
        await ReportService.checkReportStructure(this.$route.query.reportStructure).then(
          (response) => {
            if (!response.data) {
              this.$router.go(-1);
            }
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
        await ReportService.getReportStructureById(this.$route.query.reportStructure).then(
          (response) => {
            this.nameStructure = response.data.name;
            this.descriptionStructure = response.data.description;
            this.selectTypeInLoadStucture = response.data.reportType.id;
            this.dateCreate = response.data.dateCreate;
            this.dateUpdate = response.data.dateUpdate;
            this.isActive = response.data.isActive;
            this.documnetSelectedStructures = JSON.parse(response.data.reportStructure);
            while (typeof this.documnetSelectedStructures === 'string') {
              this.documnetSelectedStructures = JSON.parse(this.documnetSelectedStructures);
            }
            this.documnetSelectedStructures = this.documnetSelectedStructures.data;
            if (response.data.oldStructureId !== null && response.data.oldStructureId !== '') {
              ReportService.getReportStructureById(response.data.oldStructureId).then(
                (innerResponse) => {
                  this.oldStructureReport = innerResponse.data;
                  this.updateComp();
                },
                (error) => {
                  this.message = (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();
                  this.$error(messages[this.message] || 'Что-то пошло не так');
                }
              );
            } else {
              this.oldStructureReport = null;
            }
            this.updateComp();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        )
        await ReportService.getNewReportStructures(this.$route.query.reportStructure).then(
          (response) => {
            this.listNewReportStructures = response.data;
            this.updateComp();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );
        this.updateComp();
      }

      await ReportService.getAllReportTypes().then(
        (response) => {
          this.typesReports = response.data;
          setTimeout(() => {
            this.updateComp();
          })
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
        
      await DocumentServive.getDocumentStructures().then(
        (response) => {
          this.documentStructures = response.data;
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );

      this.loading = false;
    }
  },
  components: {
    Sidebar,
    FullScreenLoader,
    SelectVue,
    Loader
}
}
</script>
