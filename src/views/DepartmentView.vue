<template>
  <div class="chapter-name text-3xl mb-6">
    Кафедра — {{ this.departmentShortName }}
  </div>
  <div class="flex gap-x-5">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 ">
      <Loader v-if="this.loading" />
      <div v-else class="department-body mb-10">
        <div class="menu-top mb-6 flex justify-between">
          <button @click.prevent="back" class="main-btn py-3 px-5 inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Вернуться
          </button>
        </div>
        <div class="shadow-md rounded-xl border p-5">
          <div class="department-data-top-menu flex justify-between mb-5">
            <div class="department-data-status ">
              <div>Статус: <span v-if="this.isActive" class=" text-green-600">Активный</span> <span v-else class=" text-red-600">Деактивированный</span></div>
              <div class="department-faculty">
                Факультет: <span>{{ this.faculty.shortName }}</span>
              </div>
            </div>
            <div class="department-data-dates">
              <div class="department-data-dateCreate">Дата создания: {{ this.$normaldate(this.dateCreate) }}</div>
              <div class="department-data-dateUpdate">Дата обновления: {{ this.$normaldate(this.dateUpdate) }}</div>
            </div>
          </div>
          <form action="" class="department-form" @submit.prevent="updateDepartmentModel">
            <div class="department-data-input">
              <label for="" class="relative required">Короткое название:</label>
              <input v-model.trim="departmentShortName" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Короткое название" title="Введите короткое название" :disabled="!this.updateMode">
            </div>
            <div class="department-data-input">
              <label for="" class="relative required">Полное название:</label>
              <input v-model.trim="departmentName" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Полное название" title="Введите полное название" :disabled="!this.updateMode">
            </div>
            <div class="input-field col s12 department-data-input">
              <label for="" class="relative required">Выберите факультет:</label>
              <select :disabled="this.updateMode">
                <option value="" disabled>Выберите факультет</option>
                <option v-for="(option) of this.facultets" :key="option" v-bind:value="option.id" :selected="this.faculty.id === option.id">{{ option.shortName }}</option>
              </select>
            </div>
            <div class="department-data-input">
              <label for="" class="relative">Описание:</label>
              <textarea v-model.trim="departmentDescrition" name="" id="" class="input-text h-36" placeholder="Описание" maxlength="255" title="Введите описание" :disabled="!this.updateMode"></textarea>
            </div>
            <div class="department-bottom-menu flex justify-end gap-5">
              <button v-if="!this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" @click.prevent="changeOperationMode">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                Редактировать
              </button>
              <button v-else-if="this.updateMode" class="main-btn-red px-5 py-3 text-xl inline-flex items-center" @click.prevent="rajectChangesModal">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                Отменить
              </button>
              <button v-if="this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="updateDepartment" class="modal modal-fixed-footer modalUpdateDepartment">
        <div class="modal-content flex flex-col">
          <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
          <p class="text-2xl mb-3 text-center">Вы действительно хотите измененить данные кафедры?</p>
        </div>
        <div class="modal-footer flex justify-evenly">
          <button class="main-btn inline-block px-5 py-3 w-[150px] text-center text-xl" @click="updateDepartment">Да</button>
          <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
        </div>
      </div>
      <div id="cancelUpdateDepartment" class="modal modal-fixed-footer modalCancelUpdateDepartment">
        <div class="modal-content flex flex-col">
          <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
          <p class="text-2xl mb-3 text-center">Вы действительно хотите отменить изменения данных кафедры?</p>
        </div>
        <div class="modal-footer flex justify-evenly">
          <button class="main-btn-yellow inline-block px-5 py-3 w-[150px] text-center text-xl" @click="rajectChanges">Да</button>
          <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
        </div>
      </div>
      <div class="facylty-info" v-if="!loading">
        <div class="facylty-users">
          <div class="facylty-users-name text-2xl mb-3">
            Сотрудники на кафедре:
          </div>
          <MainTable
            :header="usersHeader" :content="usersContent" :noDataMessage="noUsersMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
import FacultyService from '@/store/services/faculty.service'
import DepartmentService from '@/store/services/department.service'
import MainTable from '@/components/app/MainTable.vue'
import { required, minLength, maxLength } from '@vuelidate/validators'

export default {
  name: 'Department',
  props: ['departmentId'],
  data: () => ({
    loading: true,
    formSelect: null,
    modalUpdateDepartment: null,
    modalCancelUpdateDepartment: null,
    updateMode: false,
    departmentShortName: '',
    departmentName: '',
    departmentDescrition: '',
    isActive: '',
    users: [],
    dateCreate: '',
    dateUpdate: '',
    message: '',
    usersHeader: ["№ сотрудника", "ФИО", "Роль", "Кафедра", "Статус", "Штатный", "Дата создания", ""],
    noUsersMessage: "Сотрудники на факультете не найдены",
    usersContent: [],
    faculty: null,
    facultets: [],
    facultyMap: {}
  }),
  validations() {
    return {
      departmentShortName: {required, minLength: minLength(1)},
      departmentName: {required, minLength: minLength(1)},
      departmentDescrition: {minLength: minLength(0)},
    }
  },
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    await FacultyService.getAllFaculty().then(
      (response) => {
        this.facultets = response.data
        for(let item of this.facultets) {
          this.facultyMap[item.shortName] = item.id
        }
      }
    ),
    await DepartmentService.getUserDepartmentAllUsers(this.departmentId).then(
      (response) => {
        this.departmentShortName = response.data.shortName;
        this.departmentName = response.data.name;
        this.departmentDescrition = response.data.description;
        this.isActive = response.data.isActive;
        this.dateCreate = response.data.dateCreate;
        this.dateUpdate = response.data.dateUpdate;
        this.faculty = response.data.faculty;
        this.users = response.data.users;
        for(const item of this.users) {
          if (item.roles[0].name === "ROLE_ADMIN" || item.roles[0].name === "ROLE_SUPER_ADMIN") continue
          this.usersContent.push([
            {
              'type': 'id',
              'text': item.id
            },
            {
              'type': 'text',
              'text': item.lastName + ' ' + item.name + ' ' + item.patronymic,
              'shortTest': item.lastName + ' ' + item.name[0] + '. ' + item.patronymic[0] + '.'
            },
            {
              'type': 'onlyText',
              'text': item.roles[0].name === "ROLE_MODERATOR" ? 'Зав. кафедрой' : 'Преподаватель',
            },
            {
              'type': 'text',
              'text': item.department.name,
              'shortTest': item.department.shortName
            },
            {
              'type': 'status',
              'text': item.isActive ? "Активный" : "Деактивированный"
            },
            {
              'type': 'date',
              'text': item.dateCreate
            },
            {
              'type': 'link',
              'text': 'Подробнее',
              'link': '/employees/' + item.id
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
    setTimeout(() => {
      this.modalUpdateDepartment = M.Modal.init(document.querySelector('.modalUpdateDepartment'), {});
      this.modalCancelUpdateDepartment = M.Modal.init(document.querySelector('.modalCancelUpdateDepartment'), {});
      this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
    }, 0)
    this.loading = false
  },
  methods: {
    changeOperationMode() {
      this.updateMode = true,
      this.$message("Включен режим редактирования");
    },
    rajectChanges() {
      this.modalCancelUpdateDepartment.close();
      this.updateMode = false;
      this.loading = true;
      this.$message('Отмена изменений');
      
      setTimeout(() => {
        window.location.reload()
      }, 1300)
    },
    rajectChangesModal() {
      this.modalCancelUpdateDepartment.open();
    },
    updateDepartmentModel() {
      if (this.departmentShortName === "" || this.departmentName === "") {
        this.$error('Заполните все обязательные поля');
        return;
      }
      this.modalUpdateDepartment.open();
    },
    async updateDepartment() {
      this.loading = true;
      this.modalUpdateDepartment.close();
      await DepartmentService.updateDepartment(this.departmentId, this.departmentShortName, this.departmentName, this.departmentDescrition, this.facultyMap[document.querySelector('.selected').textContent]).then(
        (response) => {
          this.departmentShortName = response.data.shortName;
          this.departmentName = response.data.name;
          this.departmentDescrition = response.data.description;
          this.isActive = response.data.isActive;
          this.dateCreate = response.data.dateCreate;
          this.dateUpdate = response.data.dateUpdate;
          this.faculty = response.data.faculty;
          this.users = response.data.users;
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
      this.$message("Кафедра обновлена");
      setTimeout(() => {
        this.formSelect = M.FormSelect.init(document.querySelectorAll('select'), {});
      }, 0)
    },
    back() {
      this.$router.go(-1);
    }
  },
  beforeDestroy() {
    if(this.formSelect && this.formSelect.destroy) {
      this.formSelect.destroy()
    }
    if(this.modalUpdateDepartment && this.modalUpdateDepartment.destroy) {
      this.modalUpdateDepartment.destroy()
    }
    if(this.modalCancelUpdateDepartment && this.modalCancelUpdateDepartment.destroy) {
      this.modalCancelUpdateDepartment.destroy()
    }
  },
  components: {
    Sidebar,
    MainTable
  }
}
</script>
