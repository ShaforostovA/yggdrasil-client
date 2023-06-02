<template>
  <FullScreenLoader v-if="this.loading" />
  <div class="chapter-name text-3xl mb-6">
    Статистика
  </div>
  <div class="flex gap-x-5 flex-grow">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 flex flex-col mb-6">
      <div class="menu-top mb-6 flex justify-between">
        <button @click.prevent="back" class="main-btn py-3 px-5 inline-flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
          Вернуться
        </button>
      </div>
      <div class="statistic-content">
        <div class="row">
          <div class="col s12 mb-9">
            <ul class="tabs flex justify-center gap-3">
              <li v-if="this.currentUser.roles[0] !== this.roleAdmin" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#personalStatistics" @click.prevent="updateSelectTab('Личная')">Личная</a></li>
              <li v-if="this.currentUser.roles[0] !== this.roleUser" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#userStatistics" @click.prevent="updateSelectTab('По пользователю')">По пользователю</a></li>
              <li v-if="this.currentUser.roles[0] !== this.roleUser" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#departmentStatistics" @click.prevent="updateSelectTab('По кафедре')">По кафедре</a></li>
              <li v-if="this.currentUser.roles[0] === this.roleAdmin" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#facultyStatistics" @click.prevent="updateSelectTab('По факультету')">По факультету</a></li>
              <li v-if="this.currentUser.roles[0] === this.roleAdmin" class="tab col s3 rounded-lg overflow-hidden text-xl py-2"><a class="tab-link p-6 rounded-lg" href="#allStatistics" @click.prevent="updateSelectTab('По институту')">По институту</a></li>
            </ul>
          </div>
          <div v-if="this.currentUser.roles[0] !== this.roleAdmin" id="personalStatistics" class="personalStatistics col s12 shadow-md rounded-xl border p-5">
            <div class="status-data-menu mb-20 flex justify-between gap-3">
              <div class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период с</div>
                <input @blur.prevent="updateData" type="date" v-model="this.minDate" :max="this.maxDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input @blur.prevent="updateData" type="date" v-model="this.maxDate" :min="this.minDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-sm">(не включительнно)</div>
              </div>
              <div class=" text-xl self-end">Всего документов: {{ this.allCountDocument }}</div>
            </div>
            <button v-if="this.typeChart === 'PieChart'" @click.prevent="selectTypeChart('ColumnChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Столбчатая диаграмма
            </button>
            <button v-else-if="this.typeChart === 'ColumnChart'" @click.prevent="selectTypeChart('PieChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Круговая диаграмма
            </button>
            <GChart :type="this.typeChart" :options="this.chartOption" :data="this.chartData" :key="chartId"/>
            <MainTable class=" mb-0"
              :header="personalHeader" :content="content" :noDataMessage="noDataMessage"
            />
          </div>
          <div v-if="this.currentUser.roles[0] !== this.roleUser" id="userStatistics" class="userStatistics col s12 shadow-md rounded-xl border p-5">
            <div class="status-data-menu mb-20 flex justify-between gap-3">
              <div class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период с</div>
                <input @blur.prevent="updateData" type="date" v-model="this.minDate" :max="this.maxDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input @blur.prevent="updateData" type="date" v-model="this.maxDate" :min="this.minDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-sm">(не включительнно)</div>
              </div>
              <div class=" text-xl self-end">Всего документов: {{ this.allCountDocument }}</div>
            </div>
            <div class="flex gap-3">
              <div class="input-field col s12 m6 selectSingleImage mb-5 w-full">
                <select class="icons">
                  <option value="" disabled>Выберите сотрудника</option>
                  <option v-for="option of this.employeesList" :key="option.id"  v-bind:value="option.id" v-bind:data-icon="option.imgUrl">{{ `${option.lastName} ${option.name[0]}. ${option.patronymic[0]}. (№${option.id})` }}</option>
                </select>
              </div>
              <button @click.prevent="updateData" class="main-btn px-5 py-2 text-xl inline-flex items-center self-start" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Найти
              </button>
            </div>
            <button v-if="this.typeChart === 'PieChart'" @click.prevent="selectTypeChart('ColumnChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Столбчатая диаграмма
            </button>
            <button v-else-if="this.typeChart === 'ColumnChart'" @click.prevent="selectTypeChart('PieChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Круговая диаграмма
            </button>
            <GChart :type="this.typeChart" :options="this.chartOption" :data="this.chartData"/>
            <MainTable class=" mb-0"
              :header="personalHeader" :content="content" :noDataMessage="noDataMessage"
            />
          </div>
          <div v-if="this.currentUser.roles[0] !== this.roleUser" id="departmentStatistics" class="departmentStatistics col s12 shadow-md rounded-xl border p-5">
            <div class="status-data-menu mb-20 flex justify-between gap-3">
              <div class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период с</div>
                <input @blur.prevent="updateData" type="date" v-model="this.minDate" :max="this.maxDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input @blur.prevent="updateData" type="date" v-model="this.maxDate" :min="this.minDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-sm">(не включительнно)</div>
              </div>
              <div class=" text-xl self-end">Всего документов: {{ this.allCountDocument }}</div>
            </div>
            <div v-if="this.currentUser.roles[0] === 'ROLE_ADMIN'" class="flex gap-3">
              <div class="input-field col s12 m6 selectSingle mb-5 w-full">
                <select :disabled="this.currentUser.roles[0] !== 'ROLE_ADMIN'">
                  <option value="" disabled>Выберите кафедру</option>
                  <option v-for="option of this.departmentList" :key="option.id" v-bind:value="option.id">{{ option.name }}</option>
                </select>
              </div>
              <button @click.prevent="updateData" class="main-btn px-5 py-2 text-xl inline-flex items-center self-start" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Найти
              </button>
            </div>
            <button v-if="this.typeChart === 'PieChart'" @click.prevent="selectTypeChart('ColumnChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Столбчатая диаграмма
            </button>
            <button v-else-if="this.typeChart === 'ColumnChart'" @click.prevent="selectTypeChart('PieChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Круговая диаграмма
            </button>
            <GChart :type="this.typeChart" :options="this.chartOption" :data="this.chartData"/>
            <MainTable class=" mb-0"
              :header="personalHeader" :content="content" :noDataMessage="noDataMessage"
            />
          </div>
          <div v-if="this.currentUser.roles[0] === this.roleAdmin" id="facultyStatistics" class="facultyStatistics col s12 shadow-md rounded-xl border p-5">
            <div class="status-data-menu mb-20 flex justify-between gap-3">
              <div class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период с</div>
                <input @blur.prevent="updateData" type="date" v-model="this.minDate" :max="this.maxDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input @blur.prevent="updateData" type="date" v-model="this.maxDate" :min="this.minDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-sm">(не включительнно)</div>
              </div>
              <div class=" text-xl self-end">Всего документов: {{ this.allCountDocument }}</div>
            </div>
            <div v-if="this.currentUser.roles[0] === 'ROLE_ADMIN'" class="flex gap-3">
              <div class="input-field col s12 m6 selectSingle mb-5 w-full">
                <select :disabled="this.currentUser.roles[0] !== 'ROLE_ADMIN'">
                  <option value="" disabled>Выберите факультет</option>
                  <option v-for="option of this.facultyList" :key="option.id" v-bind:value="option.id">{{ option.name }}</option>
                </select>
              </div>
              <button @click.prevent="updateData" class="main-btn px-5 py-2 text-xl inline-flex items-center self-start" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Найти
              </button>
            </div>
            <button v-if="this.typeChart === 'PieChart'" @click.prevent="selectTypeChart('ColumnChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Столбчатая диаграмма
            </button>
            <button v-else-if="this.typeChart === 'ColumnChart'" @click.prevent="selectTypeChart('PieChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Круговая диаграмма
            </button>
            <GChart :type="this.typeChart" :options="this.chartOption" :data="this.chartData"/>
            <MainTable class=" mb-0"
              :header="personalHeader" :content="content" :noDataMessage="noDataMessage"
            />
          </div>
          <div v-if="this.currentUser.roles[0] === this.roleAdmin" id="allStatistics" class="allStatistics col s12 shadow-md rounded-xl border p-5">
            <div class="status-data-menu mb-20 flex justify-between gap-3">
              <div class="status-data-menu-date flex gap-5">
                <div class="whitespace-nowrap self-end text-lg">Период с</div>
                <input @blur.prevent="updateData" type="date" v-model="this.minDate" :max="this.maxDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-lg">по</div>
                <input @blur.prevent="updateData" type="date" v-model="this.maxDate" :min="this.minDate" class="input-text status-data-menu-date-input">
                <div class="whitespace-nowrap self-end text-sm">(не включительнно)</div>
              </div>
              <div class=" text-xl self-end">Всего документов: {{ this.allCountDocument }}</div>
            </div>
            <button v-if="this.typeChart === 'PieChart'" @click.prevent="selectTypeChart('ColumnChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              Столбчатая диаграмма
            </button>
            <button v-else-if="this.typeChart === 'ColumnChart'" @click.prevent="selectTypeChart('PieChart')" class="main-btn py-3 px-5 inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Круговая диаграмма
            </button>
            <GChart :type="this.typeChart" :options="this.chartOption" :data="this.chartData"/>
            <MainTable class=" mb-0"
              :header="personalHeader" :content="content" :noDataMessage="noDataMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import FullScreenLoader from '@/components/app/FullScreenLoader.vue';
import MainTable from '@/components/app/MainTable.vue'
import DocumentServive from '@/store/services/document.servive';
import UserService from '@/store/services/user.service';
import DepartmentService from '@/store/services/department.service'
import FacultyService from '@/store/services/faculty.service';
import messages from '@/utils/message.plagin'
import { UserRoles } from '@/types/Roles'
import { GChart } from "vue-google-charts";


export default {
  name: 'StatisticsView',
  data: () => ({
    loading: true,
    tabs: null,
    formSelect: null,
    roleUser: UserRoles.User,
    roleModer: UserRoles.Moderator,
    roleAdmin: UserRoles.Admin,
    roleSupAdmin: UserRoles.SuperAdmin,
    personalHeader: ["Тип документа", "Готов", "Архив", "Переделать", "Черновик", "Всего", "%"],
    noDataMessage: "По вашему запросу статистика не найдена",
    content: [],
    selectTabName: null,
    allCountDocument: 0,
    minDate: '',
    maxDate: '',
    employeesList: [],
    departmentList: [],
    departmentMap: {},
    facultyList: [],
    facultyMap: {},
    chartData: [['Тип документа', 'Количество']],
    chartOption: {
      height: 300,
    },
    typeChart: 'PieChart',
    filteredStatistics: {},
    chartId: 1,
  }),
  async mounted() {
    if (this.currentUser.roles[0] !== 'ROLE_USER') {
      await UserService.getAllDepartmentUsers().then(
        (response) => {
          this.employeesList = response.data;
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      );
    }
    if (this.currentUser.roles[0] === 'ROLE_ADMIN') {
      await DepartmentService.getDepartmentsAll().then(
        (response) => {
          this.departmentList = response.data;
          for(let item of this.departmentList) {
            this.departmentMap[item.name] = item.id;
          }
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )

      await FacultyService.getAllFaculty().then(
        (response) => {
          this.facultyList = response.data;
          for(let item of this.facultyList) {
            this.facultyMap[item.name] = item.id;
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
    setTimeout(() => {
      this.tabs = M.Tabs.init(document.querySelectorAll('.tabs'), {});
      this.selectTabName = document.querySelector('.tab a.active').innerText;
      this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
      this.updateData();
    }, 0)
    this.loading = false;
  },
  methods: {
    async getUserStatistics(userId) {
      await DocumentServive.getUserStatistics(userId, this.minDate, this.maxDate).then(
        (response) => {
          this.createDataForTable(response.data);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },
    
    async getDepartmentStatistics(departmentId) {
      await DocumentServive.getDepartmentStatistics(departmentId, this.minDate, this.maxDate).then(
        (response) => {
          this.createDataForTable(response.data);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },

    async getFacultyStatistics(facultyId) {
      await DocumentServive.getFacultayStatistics(facultyId, this.minDate, this.maxDate).then(
        (response) => {
          this.createDataForTable(response.data);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },

    async getAllStatistics() {
      await DocumentServive.getAllStatistics(this.minDate, this.maxDate).then(
        (response) => {
          this.createDataForTable(response.data);
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },

    createDataForTable(response) {
      this.filteredStatistics = {};
      let obj = {sum: 0};
      this.allCountDocument = 0;
      for (let item of response) {
        if (this.filteredStatistics[item.typeName] === undefined) {
          obj = {sum: 0};
        }
        obj[item.statusName] = item.count;
        obj.sum += item.count;
        this.allCountDocument += item.count;
        this.filteredStatistics[item.typeName] = obj; 
      }
      this.content = [];
      this.chartData = [['Тип документа', 'Количество']];
      for (let key in this.filteredStatistics) {
        this.content.push([
          {
            'type': 'text',
            'shortTest': key.length < 25 ? key : key.substr(0, 25) + '...',
            'text': key
          },
          {
            'type': 'onlyText',
            'text': this.filteredStatistics[key]['Готов']
          },
          {
            'type': 'onlyText',
            'text': this.filteredStatistics[key]['Архив']
          },
          {
            'type': 'onlyText',
            'text': this.filteredStatistics[key]['Переделать']
          },
          {
            'type': 'onlyText',
            'text': this.filteredStatistics[key]['Черновик']
          },
          {
            'type': 'onlyText',
            'text': this.filteredStatistics[key].sum
          },
          {
            'type': 'onlyText',
            'text': ((this.filteredStatistics[key].sum / this.allCountDocument * 100).toString().length < 4 ? (this.filteredStatistics[key].sum / this.allCountDocument * 100) : (this.filteredStatistics[key].sum / this.allCountDocument * 100).toFixed(2)) || 0
          }
        ])
        
        this.chartData.push(
          [key, this.filteredStatistics[key].sum]
        )
      }
    },
    selectTypeChart(newChartType) {
      if (this.typeChart !== newChartType) {
        if (newChartType === 'PieChart') {
          this.chartData = [['Тип документа', 'Количество']];
          for(let key in this.filteredStatistics) {
            this.chartData.push(
              [key, this.filteredStatistics[key].sum]
            )
          }
        } else if (newChartType === 'ColumnChart') {
          this.chartData = [['Тип документа', 'Черновик', 'Переделать', 'Готов', 'Архив']];
          for(let key in this.filteredStatistics) {
            this.chartData.push(
              [key, this.filteredStatistics[key]['Черновик'], this.filteredStatistics[key]['Переделать'], this.filteredStatistics[key]['Готов'], this.filteredStatistics[key]['Архив']]
            )
          }
        }
        
        this.typeChart = newChartType;
        this.chartId += 1;
      }
    },
    async updateData() {
      if (this.selectTabName === "Личная") {
        this.getUserStatistics(this.currentUser.id)
      } else if(this.selectTabName === "По пользователю") {
        let querySelectSinglImage = document.querySelector('.userStatistics li.selected');
        if(!querySelectSinglImage.classList.contains('disabled')) {
          await this.getUserStatistics(querySelectSinglImage.textContent.replace(/[^+\d]/g, ''));
        }
      } else if(this.selectTabName === "По кафедре") {
        if(this.currentUser.roles[0] === 'ROLE_ADMIN') {
          let querySelectSingl= document.querySelector('.departmentStatistics li.selected');
          if(!querySelectSingl.classList.contains('disabled')) {
            await this.getDepartmentStatistics(this.departmentMap[querySelectSingl.textContent]);
          }
        } else {
          let departmentId
          await UserService.getUserDepartment(this.currentUser.username).then(
            (response) => {
              departmentId = response.data.id;
            }
          )
          await this.getDepartmentStatistics(departmentId)
        }
      } else if (this.selectTabName === "По факультету") {
        let querySelectSingl = document.querySelector('.facultyStatistics li.selected');
        if(!querySelectSingl.classList.contains('disabled')) {
          await this.getFacultyStatistics(this.facultyMap[querySelectSingl.textContent]);
        }
      } else if (this.selectTabName === "По институту") {
        await this.getAllStatistics();
      }
      this.$message("Данные обновлены")
    },
    async updateSelectTab(text) {
      if (this.selectTabName !== text) {
        if (text === "Личная") {
          await this.getUserStatistics(this.currentUser.id)
        } else if(text === "По пользователю") {
          let querySelectSinglImage = document.querySelector('.userStatistics li.selected');
          if(!querySelectSinglImage.classList.contains('disabled')) {
            await this.getUserStatistics(querySelectSinglImage.textContent.replace(/[^+\d]/g, ''));
          }
        } else if(text === "По кафедре") {
          if(this.currentUser.roles[0] === 'ROLE_ADMIN') {
            let querySelectSingl= document.querySelector('.departmentStatistics li.selected');
            if(!querySelectSingl.classList.contains('disabled')) {
              await this.getDepartmentStatistics(this.departmentMap[querySelectSingl.textContent]);
            }
          } else {
            let departmentId
            await UserService.getUserDepartment(this.currentUser.username).then(
              (response) => {
                departmentId = response.data.id;
              }
            )
            await this.getDepartmentStatistics(departmentId)
          }
        } else if (text === "По факультету") {
          let querySelectSingl = document.querySelector('.facultyStatistics li.selected');
          if(!querySelectSingl.classList.contains('disabled')) {
            await this.getFacultyStatistics(this.facultyMap[querySelectSingl.textContent]);
          }
        } else if (text === "По институту") {
          await this.getAllStatistics();
        }
      }

      this.selectTabName = text;
    },
    back() {
      this.$router.go(-1);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  beforeDestroy() {
    if(this.tabs && this.tabs.destroy) {
      this.tabs.destroy()
    }
    if(this.formSelect && this.formSelect.destroy) {
      this.formSelect.destroy()
    }
  },
  components: {
    Sidebar,
    FullScreenLoader,
    MainTable,
    GChart
  }
}
</script>