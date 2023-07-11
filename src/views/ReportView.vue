<template>
  <div v-if="this.createMode" class="chapter-name text-3xl mb-6">
    Создание отчета
  </div>
  <div v-else class="chapter-name text-3xl mb-6">
    Просмотр отчета — №{{ this.$route.query.reportId }}
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
          <button v-if="this.createMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="createReport" :disabled="false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            Опубликовать
          </button>
        </div>

        <button v-if="!this.createMode" class="modal-trigger flex main-btn-red py-3 px-5" @click.prevent="deleteReportMod" :disabled="this.loadReportStatusId === 3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
          Удалить
        </button>

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

        <div id="updateStatusModal" class="modal modal-fixed-footer" ref="updateStatusModal">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-left">При изменении статуса на "Архив", все исходные документы получат этот же статус.</p>
            <p class="text-2xl mb-6 text-left">Отчет и документы нельзя будет изменить.</p>
            <p class="text-2xl mb-3 text-left">Вы действительно хотите изменить статус отчета на "Архив"?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Нет</a>
            <button @click.prevent="updateReportStatus(3)" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>

        <div id="createReportModel" class="modal modal-fixed-footer" ref="createReportModel">
          <div class="modal-content flex flex-col">
            <div class="document-message-img bg-[var(--color-main)] inline-block text-white rounded-full p-6 mx-auto mb-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-32">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-[var(--color-main)] mb-20 text-center">Отчет № {{ this.idNewReport }} создан!</div>
            <p class="text-2xl mb-3 text-center">Перейти к созданному отчету?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Нет</a>
            <button @click.prevent="moveToReport" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>
      </div>

      <div id="deleteReportModel" class="modal modal-fixed-footer" ref="deleteReportModel">
          <div class="modal-content flex flex-col">
            <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
            <p class="text-2xl mb-3 text-center">Вы действительно хотите удалить отчет №{{ this.$route.query.reportId }}?</p>
          </div>
          <div class="modal-footer flex justify-evenly">
            <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Остаться</a>
            <button @click.prevent="deleteReport" class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl">Да</button>
          </div>
        </div>

      <loader v-if="loading"/>
      <div v-else-if="!loading && this.createMode" class="flex gap-5">
        <div class="structure-vue w-full shadow-md rounded-xl border p-4">
          <div class="structure-top-header">
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Шаблон отчета:</label>
              <div class="input-field col s12 selectSingle w-full report-structure-select">
                <SelectVue :selected="false" :content="this.listReports" :message="'Выберите шаблон отчета'" :multy="false" :disabled="!this.canWritePoles" :equalId="this.selectStructureInLoadReport" :key="this.keySelectReportStucture"/>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Выбор документов за период:</label>
              <div class="flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период дат с</div>
                <input type="date" v-model="minValueDatePole" :max="this.maxValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input type="date" v-model="maxValueDatePole" :min="this.minValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles">
                <div class="whitespace-nowrap self-end text-lg">(не включительно)</div>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label for="" class="relative required">Выборка документов по:</label>
              <div class="flex gap-3">
                <div class="input-field col s12 selectSingle w-full report-viborka-select">
                  <SelectVue :selected="false" :content="this.listViborks" :message="'Выберите тип выборки'" :multy="false" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'" :equalId="this.selectItemVibork" :key="this.keySelectViborka"/>
                </div>
                <button class="main-btn py-2 px-5 w-[25%]" @click.prevent="updateSelectViborka" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'">Сохранить выбор</button>
              </div>
            </div>
            <div class="profile-data-input flex-grow mb-3">
              <label class="inline-flex self-center">
                <input v-model="this.allInfoCreate" type="checkbox" class="form-checkbox-item filled-in" v-bind:disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'"/>
                <span block>Создать отчеты для всех (кафедр/факультетов)</span>
              </label>
            </div>
            <div v-if="!this.allInfoCreate" class="">
              <div v-if="this.selectItemVibork === 'Кафедра'" class="profile-data-input flex-grow mb-3 report-viborks">
                <label for="" class="relative required">Перечень кафедр:</label>
                <div class="input-field col s12 w-full">
                  <SelectVue :selected="false" :content="this.listDepartment" :message="'Выберите кафедру(ы)'" :multy="true" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'" :equalId="this.selectStructureInLoadReport" :key="this.keySelectReportStucture"/>
                </div>
              </div>
              <div v-else class="profile-data-input flex-grow mb-3 report-viborks">
                <label for="" class="relative required">Перечень факультетов:</label>
                <div class="input-field col s12 w-full">
                  <SelectVue :selected="false" :content="this.listFaculty" :message="'Выберите факультет(ы)'" :multy="true" :disabled="!this.canWritePoles" :equalId="this.selectStructureInLoadReport" :key="this.keySelectReportStucture"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!loading && !this.createMode" class="structure-vue w-full shadow-md rounded-xl border p-4 flex-grow flex flex-col">
        <div class="mb-8">
          <div class="date-block flex justify-between mb-3">
            <div class="owner">
              Создал: <span class="inline-block py-1 px-3 rounded-lg bg-[var(--color-main)] text-white">{{ this.owner ? this.owner.id === this.currentUser.id ? 'Вы' : `${this.owner.lastName} ${this.owner.name} ${this.owner.patronymic}` : 'Пользователь' }}</span>
            </div>
            <div class="date-body">
              <div class="date-create">Дата создания: {{ this.$normaldate(this.reportDateCreate) }}</div>
              <div class="date-create mb-6">Дата обновления: {{ this.$normaldate(this.reportDateUpdate) }}</div>
              <div class="report-status-menu flex gap-2">
                <SelectVue class="report-status-select" v-bind:disabled="!this.canChanges || this.loadReportStatusId === 3" :selected="false" :content="this.loadReportStatusId !== 3 && this.currentUser.roles[0] === 'ROLE_MODERATOR' ? [{name: 'Черновик', id:1}, {name:'Готов', id:2}] : this.currentUser.roles[0] !== 'ROLE_MODERATOR' ? [{name: 'Черновик', id:1}, {name:'Готов', id:2}, {name:'Архив', id:3}] : [{name: 'Черновик', id:1}, {name:'Готов', id:2}, {name:'Архив', id:3}]" :message="'Выберите статус отчета'" :multy="false" :equalId="this.loadReportStatusId" :key="keyReportStatus"/>
                <button @click.prevent="updateReportStatusMod" class="main-btn px-3" v-bind:disabled="!this.canChanges || this.loadReportStatusId === 3">Изменить</button>
              </div>
            </div>
          </div>
          <div class="report-name text-2xl mb-3">
            Название отчета: {{ this.reportName }}
          </div>
          <div class="report-desctiption text-xl mb-3">
            Описание отчета: {{ this.reportDesctiption }}
          </div>
          <div class=" text-xl">Период отчетности с <span class="font-bold">{{ this.$onlydate(this.minValueDatePole) }}</span> по <span class="font-bold">{{ this.$onlydate(this.maxValueDatePole) }}</span> (не включительно).</div>
        </div>
        <div class="download-model mb-6 flex gap-10">
          <ul class="collapsible w-1/3" ref="collDownload">
            <li>
              <div class="collapsible-header">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3 text-[var(--color-main)]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Скачивание документов по отдельности
              </div>
              <div class="collapsible-body">
                <ul class="gap-3">
                  <li v-for="(value, index) in this.listOtdelis" :key="index" class="overflow-hidden text-base py-2 flex justify-between items-center border-t-[1px] border-t-gray-200 border-b-[1px] border-b-gray-200">
                    <div class="">{{ value.shortName }}</div>
                    <div class="flex justify-between gap-5">
                      <button @click="downloadReport(value.id)" class="main-btn py-2 px-3 inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div v-if="this.currentUser.roles[0] !== 'ROLE_MODERATOR'" class="download-all w-1/3 items-start pt-3">
            <div class="flex gap-5 items-center">
              <div class="download-all-title text-lg">Скачать все документы:</div>
              <button @click="downloadReport(''), timeoutDownload()" class="main-btn py-2 px-3 inline-flex" :disabled="this.isTimeout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </button>
            </div>
          </div>
          <div class="download-all w-1/3 items-start pt-3">
            <div class="flex gap-5 items-center">
              <div class="download-all-title text-lg">Скачать общий документ:</div>
              <button @click="downloadCombinedReport(), timeoutDownload()" class="main-btn py-2 px-3 inline-flex" :disabled="this.isTimeout">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="menu-select-razdela flex-grow flex flex-col">
          <div class="col s12 mb-9">
            <ul class="tabs flex justify-center gap-3 menu-tabs">
              <li class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#previewReport" @click.prevent="updateSelectTab('Передпросмотр')">Передпросмотр отчета</a></li>
              <li class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#optionReport" @click.prevent="updateSelectTab('Настройка')">Настройка отчета</a></li>
            </ul>
          </div>
          <div id="previewReport" class="preview-report">
            <div class="mb-5">
              <div v-if="this.selectItemVibork === 'Кафедра'" class="mb-3 text-lg">Документы по кафедре:</div>
              <div v-else class="mb-3 text-lg">Документы по факултьету:</div>
              <ul class="gap-3 otdel-tabs">
                <li v-for="(value, index) in this.listOtdelis" :key="index" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg otdel-link" :class="{'active': index === this.selectOtdelIndex}" @click.prevent="updateSelectOtdel(value.id, index)">{{ value.shortName }}</a></li>
                <!-- <li class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#otdel-2" @click.prevent="updateSelectTab('Настройка')">Кафедра 2</a></li> -->
              </ul>
            </div>
            <div class="department-data">
              <div class="">
                <div class="mb-5">
                  <div class="mb-3 text-lg">Страницы по документам:</div>
                  <ul v-if="this.selectItemVibork === 'Кафедра'" class="gap-3 page-tabs">
                    <li v-for="(value, index) in this.listDocumentStructures" :key="index" class="tab col s3 rounded-lg overflow-hidden text-sm py-2"><a class="tab-link p-6 rounded-lg" :class="{'active': index === this.selectDocumentStructureIdIndex}" @click.prevent="updateSelectDocument(value.id, index)">{{value.name}}</a></li>
                  </ul>
                  <ul v-else class="gap-3 page-tabs">
                    <li v-for="(value, index) in this.listDocumentStructures" :key="index" class="tab col s3 rounded-lg overflow-hidden text-sm py-2"><a class="tab-link p-6 rounded-lg" :class="{'active': index === this.selectDocumentStructureIdIndex}" @click.prevent="updateSelectDocument(value.id, index)">{{value.name}}</a></li>
                  </ul>
                </div>
                <div class="table-pages rounded-lg border-[3px]">
                  <ul class="page-list">
                    <li class="page-item">
                      <div v-if="this.listKeysDocumentStructures.length !== 0" class="table-pages">
                        <div class="table-pages-column">
                          <div class="table-page-header">
                            №
                          </div>
                          <div v-for="(value, index) in this.listDocumentData" :key="index" class="table-page-pole">
                            {{ index+1 }}
                          </div>
                        </div>

                        <div v-for="(value, index) in this.listKeysDocumentStructures[this.selectDocumentStructureId].structure.data" :key="index" class="table-pages-column">
                          <div class="table-page-header">
                            {{ value.name[value.name.length-1] === ':' ? value.name.slice(0, -1) : value.name}}
                          </div>
                          <div v-for="innerItem of this.listDocumentData" :key="innerItem.id" class="table-page-pole" :class="{'opacity-[0.3] select-none': innerItem.documentData.userResponse[index] === undefined}">
                            {{ 
                              innerItem.documentData.userResponse[index] !== undefined ? this.processUserDataArr(innerItem.documentData.userResponse[index][value.id] || '') : 'Пусто'
                            }}
                          </div>
                        </div>

                        <div class="table-pages-column">
                          <div class="table-page-header">
                            Ссылка на документ
                          </div>
                          <div v-for="innerItem of this.listDocumentData" :key="innerItem.id" class="table-page-pole py-0">
                            <router-link :to="'document/'+innerItem.id" class="main-btn px-2 inline-block text-xs">Подробнее</router-link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>
          <div id="optionReport" class="option-report flex-grow flex flex-col">
            <div class="structure-vue w-full flex-grow h-[100%] flex flex-col">
              <div class="structure-top-header flex-grow">
                <div class="profile-data-input flex-grow mb-3">
                  <label for="" class="relative required">Шаблон отчета:</label>
                  <div class="input-field col s12 selectSingle w-full report-structure-select">
                    <SelectVue :selected="false" :content="this.listReports" :message="'Выберите шаблон отчета'" :multy="false" :disabled="!this.canWritePoles" :equalId="this.optionReportStructure" :key="this.keySelectReportStucture"/>
                  </div>
                </div>
                <div class="profile-data-input flex-grow mb-3">
                  <label for="" class="relative required">Выбор документов за период:</label>
                  <div class="flex gap-5">
                    <div class="whitespace-nowrap self-end text-lg">Период дат с</div>
                    <input type="date" :max="this.maxValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles"  v-model="minValueDatePole">
                    <div class="whitespace-nowrap self-end text-lg">по</div>
                    <input type="date" v-model="maxValueDatePole" :min="this.minValueDatePole" class="input-text status-data-menu-date-input" :disabled="!this.canWritePoles">
                    <div class="whitespace-nowrap self-end text-lg">(не включительно)</div>
                  </div>
                </div>
                <div class="profile-data-input flex-grow mb-3">
                  <label for="" class="relative required">Выборка документов по:</label>
                  <div class="flex gap-3">
                    <div class="input-field col s12 selectSingle w-full report-viborka-select">
                      <SelectVue :selected="false" :content="this.listViborks" :message="'Выберите тип выборки'" :multy="false" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'" :equalId="this.selectItemVibork" :key="this.keySelectViborka"/>
                    </div>
                    <button class="main-btn py-2 px-5 w-[25%]" @click.prevent="updateSelectViborka" :disabled="!this.updateMode || this.currentUser.roles[0] === 'ROLE_MODERATOR'">Сохранить выбор</button>
                  </div>
                </div>
                <div class="profile-data-input flex-grow mb-3">
                  <label class="inline-flex self-center">
                    <input v-model="this.allInfoCreate" type="checkbox" class="form-checkbox-item filled-in" v-bind:disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'"/>
                    <span block>Создать отчеты для всех (кафедр/факультетов)</span>
                  </label>
                </div>
                <div v-if="!this.allInfoCreate" class="">
                  <div v-if="this.selectItemVibork === 'Кафедра'" class="profile-data-input flex-grow mb-3 report-viborks">
                    <label for="" class="relative required">Перечень кафедр:</label>
                    <div class="input-field col s12 w-full">
                      <SelectVue :selected="false" :content="this.listDepartment" :message="'Выберите кафедру(ы)'" :multy="true" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'" :equalId="this.selectDepartmentInLoadReport" :key="this.keySelectReportStucture"/>
                    </div>
                  </div>
                  <div v-else class="profile-data-input flex-grow mb-3 report-viborks">
                    <label for="" class="relative required">Перечень факультетов:</label>
                    <div class="input-field col s12 w-full">
                      <SelectVue :selected="false" :content="this.listFaculty" :message="'Выберите факультет(ы)'" :multy="true" :disabled="!this.canWritePoles || this.currentUser.roles[0] === 'ROLE_MODERATOR'" :equalId="this.selectFacultyInLoadReport" :key="this.keySelectReportStucture"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom-menu flex justify-end gap-5">
                <button v-if="!this.canWritePoles && !this.updateMode" class="main-btn py-3 px-5 inline-flex" @click.prevent="onUpdateMode" :disabled="!this.canChanges || this.loadReportStatusId === 3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-1">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                  Изменить
                </button>

                <button v-if="this.updateMode" class="main-btn-red py-3 px-5 flex items-center gap-1" @click.prevent="rejectChanges">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Отменить
                </button>

                <button v-if="this.updateMode" class="main-btn py-3 px-5 flex items-center gap-1" @click.prevent="updateReport" v-bind:disabled="(!this.updateMode)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ReportService from '@/store/services/report.service';
import FacultyService from '@/store/services/faculty.service';
import DepartmentService from '@/store/services/department.service';
import DocumentServive from '@/store/services/document.servive';
import UserService from '@/store/services/user.service';
import SelectVue from '@/components/app/Select.vue';
import { saveAs } from 'file-saver';

import moment from 'moment';

import messages from '@/utils/messages'

import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import userService from '@/store/services/user.service';
import reportService from '@/store/services/report.service';

export default {
  name: 'ReportCreate',
  setup () {
    return { v$: useVuelidate() }
  },
  data: () => ({
    // indexs
    indexPage: 1,
    indexOtdel: 1,
    // Tabs
    tabsMenu: null,
    tabsPages: null,
    tabsOtdels: null,
    // Модальные окна
    modal: null,
    createReportModel: null,
    deleteReportModel: null,
    updateStatusModal: null,

    collDownload: null,

    // Режимы работы
    updateMode: false,
    createMode: false,

    // Загрузка
    loading: true,

    // Информация отчета
    reportName: '',
    reportDesctiption: '',
    reportDateCreate: '',
    reportDateUpdate: '',
    selectStructureInLoadReport: -1,
    selectDepartmentInLoadReport: -1,
    selectFacultyInLoadReport: -1,
    allInfoCreate: false,
    loadReportStatusId: 1,

    // Список активных шаблонов отчетов
    listReports: [],

    // ID для обновления компонентов
    keySelectReportStucture: 1,
    keySelectViborka: 1,
    keyReportStatus: 1,

    // Период дат
    minValueDatePole: '',
    maxValueDatePole: '',

    // Список выборок
    listViborks: ['Кафедра', 'Факультет'],
    selectItemVibork: 'Кафедра',

    // Список факультетов
    listFaculty: [],

    // Список кафедр
    listDepartment: [],

    // ID созданного отчета
    idNewReport: '',

    selectTabName: null,

    listDocumentStructures: [],
    listKeysDocumentStructures: {},
    listDocumentData: [],

    listFaculty: [],
    listDepartment: [],

    selectOtdel: null,
    selectOtdelIndex: 0,

    selectDocumentStructureId: 1,
    selectDocumentStructureIdIndex: 0,

    optionReportStructure: '',

    listOtdelis: [],
    listIdOtdelis: {},
    

    canChanges: false,

    owner: '',
    
    isTimeout: false,
  }),
  validations() {
    return {

    }
  },
  async mounted() {
    await this.startWork();
  },
  methods: {
    async startWork() {
      this.loading = true;
      if (messages[this.$route.query.message]) {
        this.$message(messages[this.$route.query.message])
      }
      if (this.$route.query.reportId === undefined) {
        this.createMode = true;
        if (this.currentUser.roles[0] === 'ROLE_MODERATOR') {
          await userService.getUserDepartment(this.currentUser.username).then(
            (response) => {
              this.selectStructureInLoadReport = response.data.id;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }
        setTimeout(() => {
          this.updateComp();
        })
      } else {
        this.createMode = false;
        let reportStructure;

        if (this.selectItemVibork !== 'Кафедра') {
        await FacultyService.getAllActiveFaculty().then(
          (response) => {
            this.listFaculty = response.data;
            if (Array.isArray(this.selectFacultyInLoadReport)) {
              this.listOtdelis = [];
              this.listIdOtdelis = {};
              for (let item of this.listFaculty) {
                if (this.selectFacultyInLoadReport.includes(''+item.id)) {
                  this.listOtdelis.push(item);
                  this.listIdOtdelis[item.id] = item;
                }
              }
            }
            if (this.allInfoCreate) {
              this.listOtdelis = response.data;
              for (let oI of response.data) {
                this.listIdOtdelis[oI.id] = oI;
              }
            }
            if (this.selectItemVibork === 'Кафедра') {
              if (this.listFaculty.length !== 0) {
                this.selectOtdel = this.listFaculty[0].id;
              }
            } else {
              if (this.listDepartment.length !== 0) {
                this.selectOtdel = this.listDepartment[0].id;
              }
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
      } else {
        await DepartmentService.getDepartmentsActiveAll().then(
          (response) => {
            this.listDepartment = response.data;
            if (Array.isArray(this.selectDepartmentInLoadReport)) {
              this.listOtdelis = [];
              this.listIdOtdelis = {};
              for (let item of this.listDepartment) {
                if (this.selectDepartmentInLoadReport.includes(''+item.id)) {
                  this.listOtdelis.push(item);
                  this.listIdOtdelis[item.id] = item;
                }
              }
            }
            if (this.allInfoCreate) {
              this.listOtdelis = response.data;
              for (let oI of response.data) {
                this.listIdOtdelis[oI.id] = oI;
              }
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
      }

        await ReportService.getReport(this.$route.query.reportId).then(
          (response) => {
            let reportData = response.data.reportData;
            while (typeof reportData === 'string') {
              reportData = JSON.parse(reportData);
            }
            this.minValueDatePole = moment(response.data.dateStart).format('YYYY-MM-DD');
            this.maxValueDatePole = moment(response.data.dateEnd).format('YYYY-MM-DD');
            this.reportDateCreate = response.data.dateCreate;
            this.reportDateUpdate = response.data.dateUpdate;
            this.loadReportStatusId = response.data.reportStatus.id;
            this.canChanges = response.data.canChange;
            this.reportName = response.data.reportStructure.name;
            this.reportDesctiption = response.data.reportStructure.description;
            this.selectItemVibork = reportData.viborka;

            if (!response.data.allInfo && reportData.data.viborkaList.length < 2) {
              this.selectOtdel = reportData.data.viborkaList[0];
            } else {
              if (this.selectItemVibork === 'Кафедра') {
                this.selectOtdel = this.listDepartment[0].id;
              } else {
                this.selectOtdel = this.listFaculty[0].id;
              }
            }
            
            this.owner = response.data.user;

            if (this.selectItemVibork === 'Кафедра' ) {
              this.selectDepartmentInLoadReport = reportData.data.viborkaList;
            } else {
              this.selectFacultyInLoadReport = reportData.data.viborkaList;
            }

            this.optionReportStructure = response.data.id;

            this.allInfoCreate = reportData.data.allInfo,
            

            reportStructure = response.data.reportStructure.reportStructure;
            
            while (typeof reportStructure === 'string') {
              reportStructure = JSON.parse(reportStructure);
            }
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
            this.$router.go(-1);
          }
        )
        this.listDocumentStructures = [];
        this.listKeysDocumentStructures = {};
        for (let item of reportStructure.data) {
          await DocumentServive.getDocumentStructure(item).then(
            (response) => {
              
              let newItem = response.data;
              let innerStructureDate = response.data.structure;
              while (typeof innerStructureDate === 'string') {
                innerStructureDate = JSON.parse(innerStructureDate);
              }
              newItem.structure = innerStructureDate;
              
              if (this.listDocumentStructures.length === 0) {
                this.selectDocumentStructureId = newItem.id;
              }
              this.listDocumentStructures.push(newItem);

              this.listKeysDocumentStructures[newItem.id] = newItem;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }

        if (this.selectItemVibork === 'Кафедра') {
          await DocumentServive.getAllDepartmentDocuments(this.selectDocumentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        } else {
          await DocumentServive.getAllFacultyDocuments(this.selectDocumentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }

        this.updateComp();
      }

      await ReportService.getAllActiveReportStructures().then(
        (response) => {
          this.listReports = response.data;
          if (this.listReports.length === 0) {
            this.$router.go(-1);
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

      if (this.selectItemVibork !== 'Кафедра') {
        await FacultyService.getAllActiveFaculty().then(
          (response) => {
            this.listFaculty = response.data;
            if (Array.isArray(this.selectFacultyInLoadReport)) {
              this.listOtdelis = [];
              this.listIdOtdelis = {};
              for (let item of this.listFaculty) {
                if (this.selectFacultyInLoadReport.includes(''+item.id)) {
                  this.listOtdelis.push(item);
                  this.listIdOtdelis[item.id] = item;
                }
              }
            }
            if (this.allInfoCreate) {
              this.listOtdelis = response.data;
              for (let oI of response.data) {
                this.listIdOtdelis[oI.id] = oI;
              }
            }
            if (this.selectItemVibork === 'Кафедра') {
              if (this.listFaculty.length !== 0) {
                this.selectOtdel = this.listFaculty[0].id;
              }
            } else {
              if (this.listDepartment.length !== 0) {
                this.selectOtdel = this.listDepartment[0].id;
              }
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
      } else {
        await DepartmentService.getDepartmentsActiveAll().then(
          (response) => {
            this.listDepartment = response.data;
            if (Array.isArray(this.selectDepartmentInLoadReport)) {
              this.listOtdelis = [];
              this.listIdOtdelis = {};
              for (let item of this.listDepartment) {
                if (this.selectDepartmentInLoadReport.includes(''+item.id)) {
                  this.listOtdelis.push(item);
                  this.listIdOtdelis[item.id] = item;
                }
              }
            }
            if (this.allInfoCreate) {
              this.listOtdelis = response.data;
              for (let oI of response.data) {
                this.listIdOtdelis[oI.id] = oI;
              }
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
      }
      

      setTimeout(() => {
        this.tabsMenu = M.Tabs.init(document.querySelector('.menu-tabs'));
        // this.tabsPages = M.Tabs.init(document.querySelector('.page-tabs'));
        // this.tabsOtdels = M.Tabs.init(document.querySelector('.otdel-tabs'));
        this.modal = M.Modal.init(this.$refs.modal);
        this.deleteReportModel = M.Modal.init(this.$refs.deleteReportModel);
        this.updateStatusModal = M.Modal.init(this.$refs.updateStatusModal);
        this.collDownload = M.Collapsible.init(this.$refs.collDownload);
        this.createReportModel = M.Modal.init(this.$refs.createReportModel, {
          onCloseEnd: () => {
            this.idNewReport = ''
          }
        });
        this.updateComp();
      }, 0)
      this.loading = false;
    },

    deleteReportMod() {
      this.deleteReportModel.open();
    },

    async deleteReport() {
      await reportService.deleteReport(this.$route.query.reportId).then(
        (response) => {
          this.deleteReportModel.close();
          if (response.data) {
            this.$message(`Отчет №${this.$route.query.reportId} успешно удален.`)
            setTimeout(() => {
              this.$router.push('/reports')
            }, 700)
          } else {
            this.$error(`Не удалось удалить отчет №${this.$route.query.reportId}`)
          }
        }
      )
    },

    async rejectChanges() {
      this.loading = true;
      await this.startWork();
      this.updateMode = false;
      this.loading = false;
    },

    async updateReport() {
      this.loading = true;

      let errors = 0;
      let reportData = {'data': {}};

      if (this.minValueDatePole === undefined || this.minValueDatePole === '') {
        this.$error('Вы не выбрали начальную дату периода');
        errors += 1;
      }
      if (this.maxValueDatePole === undefined || this.maxValueDatePole === '') {
        this.$error('Вы не выбрали конечную дату периода');
        errors += 1;
      }
      
      let reportStructure = document.querySelector('.report-structure-select .selected').innerText.split(' ');
      reportStructure = reportStructure[reportStructure.length-1].replace(/^.|.$/g,"");
      reportData.data.typeViborka = this.selectItemVibork;
      reportData.data.allInfo = this.allInfoCreate;
      reportData.data.viborkaList = [];
      for (let item of document.querySelectorAll('.report-viborks .selected')) {
        let obrViborka = item.innerText.split(' ');
        reportData.data.viborkaList.push(obrViborka[obrViborka.length-1].replace(/^.|.$/g,""));
      }

      if (this.allInfoCreate === false && reportData.data.viborkaList.length === 0) {
        this.$error('Выберите кафедры/факультеты или для всех');
        errors += 1;
      }
      if (errors !== 0) {
        return;
      }
      //console.log(reportData);
      reportData.viborka = this.selectItemVibork;

      await ReportService.updateReport(this.$route.query.reportId, reportData, this.minValueDatePole, this.maxValueDatePole, reportStructure, this.currentUser.id, this.loadReportStatusId);
      await this.startWork();
      this.updateMode = false;
      this.loading = false;
      this.$message('Отчет обновлен');
    },

    async updateSelectTab(text) {
      if (this.selectTabName !== text) {
        if (text === "Передпросмотр") {
          
        } else if(text === "Настройка") {
          
        }
      }

      this.selectTabName = text;
    },

    async updateSelectOtdel(otdel, index) {
      if (this.selectOtdel !== otdel) {
        this.selectOtdelIndex = index;
        this.selectOtdel = otdel;

        if (this.selectItemVibork === 'Кафедра') {
          await DocumentServive.getAllDepartmentDocuments(this.selectDocumentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        } else {
          await DocumentServive.getAllFacultyDocuments(this.selectDocumentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }
      }
    },

    async updateSelectDocument(documentStructureId, index) {
      if (this.selectDocumentStructureId !== documentStructureId) {
        this.selectDocumentStructureIdIndex = index;
        if (this.selectItemVibork === 'Кафедра') {
          await DocumentServive.getAllDepartmentDocuments(documentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        } else {
          await DocumentServive.getAllFacultyDocuments(documentStructureId, this.selectOtdel, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              let processingData = [];
              for (let item of response.data) {
                while (typeof item.documentData === 'string') {
                  item.documentData = JSON.parse(item.documentData);
                }
                processingData.push(item);
              }
              this.listDocumentData = processingData;
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          )
        }
        this.selectDocumentStructureId = documentStructureId;
      }
    },

    async updateReportStatusMod() {
      let selectStatus = document.querySelector('.report-status-select .selected').innerText.split(' ');
      selectStatus = selectStatus[selectStatus.length - 1].replace(/^.|.$/g,"");

      if (selectStatus === 3 || selectStatus === '3') {
        this.updateStatusModal.open();
      } else {
        await this.updateReportStatus(selectStatus);
      }
    },

    async updateReportStatus(reportStatusId) {
      if (reportStatusId === undefined || reportStatusId === '' || reportStatusId === "") {
        let selectStatus = document.querySelector('.report-status-select .selected').innerText.split(' ');
        reportStatusId = selectStatus[selectStatus.length - 1].replace(/^.|.$/g,"");
      }
      console.log(reportStatusId);
      
      await ReportService.updateReportStatus(this.$route.query.reportId, reportStatusId).then(
        (response) => {
          this.$message('Обновлен статус отчета №' + this.$route.query.reportId);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
        
      if (reportStatusId === 3 || reportStatusId === '3') {
        for (let key of Object.keys(this.listKeysDocumentStructures)) {
          await DocumentServive.archivingDocuments(key, 4, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              if(!response.data) {
                this.$error(`Не удалось изменить статус документов шаблона №${key}`)
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
        this.updateStatusModal.close();
        await this.startWork();
      }
    },

    updateSelectViborka() {
      this.selectItemVibork = document.querySelector('.report-viborka-select .selected').innerText;
    },

    async createReport() {
      let errors = 0;
      let reportData = {'data': {}};
      // reportData.data.reportStructure = document.querySelector('.report-structure-select .selected').innerText;
      // reportData.data.dateStart = this.minValueDatePole || '';
      // reportData.data.dateEnd = this.maxValueDatePole || '';
      if (this.minValueDatePole === undefined || this.minValueDatePole === '') {
        this.$error('Вы не выбрали начальную дату периода');
        errors += 1;
      }
      if (this.maxValueDatePole === undefined || this.maxValueDatePole === '') {
        this.$error('Вы не выбрали конечную дату периода');
        errors += 1;
      }
      
      let reportStructure = document.querySelector('.report-structure-select .selected').innerText.split(' ');
      reportStructure = reportStructure[reportStructure.length-1].replace(/^.|.$/g,"");
      reportData.data.typeViborka = this.selectItemVibork;
      reportData.data.allInfo = this.allInfoCreate;
      reportData.data.viborkaList = [];
      for (let item of document.querySelectorAll('.report-viborks .selected')) {
        let obrViborka = item.innerText.split(' ');
        reportData.data.viborkaList.push(obrViborka[obrViborka.length-1].replace(/^.|.$/g,""));
      }

      if (this.allInfoCreate === false && reportData.data.viborkaList.length === 0) {
        this.$error('Выберите кафедры/факультеты или для всех');
        errors += 1;
      }
      if (errors !== 0) {
        return;
      }
      //console.log(reportData);
      reportData.viborka = this.selectItemVibork;
      await ReportService.createReport(reportData, this.minValueDatePole, this.maxValueDatePole, reportStructure, this.currentUser.id, 1).then(
        (response) => {
          this.createReportModel.open();
          this.idNewReport = response.data.id;
          this.reportDateCreate = '';
          this.reportDateUpdate = '';
          this.minValueDatePole = '';
          this.maxValueDatePole = '';
          this.allInfoCreate = false;
          this.selectItemVibork = 'Кафедра';
          this.updateComp();
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },

    async downloadReport(otedelId) {
      if (otedelId !== '') {
        if (this.selectItemVibork === "Кафедра") {
          await DocumentServive.documentExportToExcel(Object.keys(this.listKeysDocumentStructures), '', otedelId, this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', "О_"+ this.$route.query.reportId + "_К_" + this.listIdOtdelis[otedelId].shortName /*+ this.reportName.replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_')*/ + ' - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
              document.body.appendChild(link);
              link.click();
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          );
        } else {
          await DocumentServive.documentExportToExcel(Object.keys(this.listKeysDocumentStructures), otedelId, '', this.minValueDatePole, this.maxValueDatePole).then(
            (response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', "О_"+ this.$route.query.reportId + "_Ф_" + this.listIdOtdelis[otedelId].shortName + ' - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
              document.body.appendChild(link);
              link.click();
            },
            (error) => {
              this.message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
              this.$error(messages[this.message] || 'Что-то пошло не так');
            }
          );
        }
      } else {
        for (let otdel of this.listOtdelis) {
          console.log(otdel.id);
          if (this.selectItemVibork === "Кафедра") {
            await DocumentServive.documentExportToExcel(Object.keys(this.listKeysDocumentStructures), '', otdel.id, this.minValueDatePole, this.maxValueDatePole).then(
              (response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "О_"+ this.$route.query.reportId + "_К_" + otdel.shortName + ' - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
                document.body.appendChild(link);
                link.click();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          } else {
            await DocumentServive.documentExportToExcel(Object.keys(this.listKeysDocumentStructures), otdel.id, '', this.minValueDatePole, this.maxValueDatePole).then(
              (response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "О_"+ this.$route.query.reportId + "_Ф_" + otdel.shortName + ' - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
                document.body.appendChild(link);
                link.click();
              },
              (error) => {
                this.message = (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
                this.$error(messages[this.message] || 'Что-то пошло не так');
              }
            );
          }
        }
      }
    },

    async downloadCombinedReport() {
      let otedelIdList = [];
      for (let item of this.listOtdelis) {
        otedelIdList.push(item.id);
      }
      if (this.selectItemVibork === "Кафедра") {
        await DocumentServive.documentCombinedExportToExcel(Object.keys(this.listKeysDocumentStructures), [], otedelIdList, this.minValueDatePole, this.maxValueDatePole).then(
          (response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "О_"+ this.$route.query.reportId + '_К - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
            document.body.appendChild(link);
            link.click();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );
      } else {
        await DocumentServive.documentCombinedExportToExcel(Object.keys(this.listKeysDocumentStructures), otedelIdList, [], this.minValueDatePole, this.maxValueDatePole).then(
          (response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "О_"+ this.$route.query.reportId + '_Ф - ' + this.$normaldate(new Date()).replace(/[\~\!\@\/\:\\\#\$\%\^\&\*\=\|\`\"\<\>]/g, '_').replace(/[" "]/g, '') + '.xlsx');
            document.body.appendChild(link);
            link.click();
          },
          (error) => {
            this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
            this.$error(messages[this.message] || 'Что-то пошло не так');
          }
        );
      }
    },

    timeoutDownload() {
      this.isTimeout = true;
      setTimeout(() => {
        this.isTimeout = false;
      }, 3000)
    },

    processUserDataArr(arr) {
      if (Array.isArray(arr) && arr.length === 0) {
        return '';
      }
      if (typeof arr === 'string') {
        return arr;
      }
      if (typeof arr[0] === 'string') {
        return arr.join(', ');
      }
      let newArr = [];
      if (Array.isArray(arr)) {
        for (let item of arr) {
          if (Array.isArray(item)) {
            for (let innerItem of item) {
              newArr.push(innerItem.name);
            }
          } else {
          newArr.push(item.name);
        }
      }
      } else {
        newArr.push(arr.name);;
      }
      return newArr.join(', ');
    },

    moveToReport() {
      this.createReportModel.close();
      this.$router.push('/report?reportId=' + this.idNewReport);
    },

    leavingPage() {
      if (this.updateMode || this.createMode) {
        this.modal.open();
      } else {
        this.back();
      }
    },
    back() {
      if (this.createMode) {
        this.$router.push('/reports')
      }

      this.indexPage = 1;
      this.indexOtdel = 1;
      this.tabsMenu = null;
      this.tabsPages = null;
      this.tabsOtdels = null;
      this.modal = null;
      this.createReportModel = null;
      this.updateMode = false;
      this.createMode = false;
      this.loading = true;
      this.reportName = '';
      this.reportDesctiption = '';
      this.reportDateCreate = '';
      this.reportDateUpdate = '';
      this.selectStructureInLoadReport = -1;
      this.selectDepartmentInLoadReport = -1;
      this.selectFacultyInLoadReport = -1;
      this.allInfoCreate = false;
      this.loadReportStatusId = 1;
      this.listReports = [];
      this.keySelectReportStucture = 1;
      this.keySelectViborka = 1;
      this.minValueDatePole = '';
      this.maxValueDatePole = '';
      this.listViborks = ['Кафедра', 'Факультет'];
      this.selectItemVibork = 'Кафедра';
      this.listFaculty = [];
      this.listDepartment = [];
      this.idNewReport = '';
      this.selectTabName = null;
      this.listDocumentStructures = [];
      this.listKeysDocumentStructures = {};
      this.listDocumentData = [];
      this.listFaculty = [];
      this.listDepartment = [];
      this.selectOtdel = null;
      this.selectOtdelIndex = 0;
      this.selectDocumentStructureId = 1;
      this.selectDocumentStructureIdIndex = 0;
      this.optionReportStructure = '';
      this.listOtdelis = [];
      this.listIdOtdelis = {};
      this.canChanges = false;
      this.owner = '';

      this.$router.go(-1);
    },
    onUpdateMode() {
      this.updateMode = true;
      this.updateComp();
    },
    updateComp() {
      this.keySelectViborka += 1;
      this.keySelectReportStucture += 1;
      this.keyReportStatus +=1;
    }
  },
  computed: {
    canWritePoles() {
      return this.updateMode || this.createMode;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  beforeDestroy() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
    if (this.createReportModel && this.createReportModel.destroy) {
      this.createReportModel.destroy();
    }
    if (this.tabsMenu && this.tabsMenu.destroy) {
      this.tabsMenu.destroy();
    }
    if (this.tabsPages && this.tabsPages.destroy) {
      this.tabsPages.destroy();
    }
    if (this.tabsOtdels && this.tabsOtdels.destroy) {
      this.tabsOtdels.destroy();
    }
    if (this.deleteReportModel && this.deleteReportModel.destroy) {
      this.deleteReportModel.destroy();
    }
    if (this.updateStatusModal && this.updateStatusModal.destroy) {
      this.updateStatusModal.destroy();
    }
  },
  watch: {
    async $route() {
      await this.startWork();
    }
  },
  components: {
    SelectVue,
  }
}
</script>