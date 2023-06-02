<template>
  <div class="chapter-name text-3xl mb-6">
    Кафедра — {{ this.documentTypeId }}
  </div>
  <div class="flex gap-x-5">
    <div class="menu w-1/5">
      <Sidebar />
    </div>
    <div class="w-4/5 ">
      <Loader v-if="this.loading" />
      <div v-else class="department-body mb-10">
        <div class="menu-top mb-6 flex justify-between">
          <button @click.prevent="this.back" class="main-btn py-3 px-5 inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            Вернуться
          </button>
        </div>
        <div class="shadow-md rounded-xl border p-5">
          <form action="" class="department-form" @submit.prevent="this.updateDocumentType">
            <div class="department-data-input">
              <label for="" class="relative required">Название ключевого слова:</label>
              <input v-model.trim="documentTypeName" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Название ключевого слова" title="Введите название ключевого слова" :disabled="!this.updateMode">
            </div>
            <div class="department-bottom-menu flex justify-end gap-5">
              <button v-if="!this.updateMode" class="main-btn px-5 py-3 text-xl inline-flex items-center" @click.prevent="changeOperationMode">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                Редактировать
              </button>
              <button v-else-if="this.updateMode" class="main-btn-red px-5 py-3 text-xl inline-flex items-center" @click.prevent="rajectChanges">
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
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/app/Sidebar.vue'
import messages from '@/utils/messages'
import documentServive from '@/store/services/document.servive'

export default {
  name: 'DocumentTypeView',
  props: ['documentTypeId'],
  data: () => ({
    loading: true,
    documentTypeName: '',
    updateMode: false,
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    
    await this.findDocumentType();
    
    setTimeout(() => {

    }, 0)
    this.loading = false
  },
  methods: {
    async findDocumentType() {
      await documentServive.getAllDocumentTypes().then(
        (response) => {
          for (let item of response.data) {
            if (Number(item.id) === Number(this.documentTypeId)) {
              this.documentTypeName = item.name;
              break;
            }
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
    changeOperationMode() {
      this.updateMode = true,
      this.$message("Включен режим редактирования");
    },
    async rajectChanges() {
      this.updateMode = false;
      await this.findDocumentType();
      this.$message('Отмена изменений');
    },
    async updateDocumentType() {
      await documentServive.updateDocumentType(this.documentTypeId, this.documentTypeName).then(
        (response) => {
          this.updateMode = false;
          this.$message('Тип документа обновлен');
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },


    back() {
      this.$router.go(-1);
    }
  },
  beforeDestroy() {

  },
  components: {
    Sidebar,
  }
}
</script>
