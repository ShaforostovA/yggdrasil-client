<template>
  <div class="chapter-name text-3xl mb-6">
    Кафедра — {{ this.keyWordId }}
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
          <button class="flex main-btn-red py-3 px-5" @click.prevent="this.deleteModalOpen">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            Удалить
          </button>
          <div id="modelDelete" class="modal modal-fixed-footer">
            <div class="modal-content flex flex-col">
              <div class="modal-img inline-block p-10 rounded-full border-[8px] border-solid border-red-700 text-red-700 mx-auto mb-5 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[8rem]">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div class="worn-text text-3xl text-red-700 mb-20 text-center">Внимание!</div>
              <p class="text-2xl mb-3 text-center">Вы действительно хотите удалить ключевое слово №{{ this.keyWordId }}?</p>
            </div>
            <div class="modal-footer flex justify-evenly">
              <button class="main-btn-red inline-block px-5 py-3 w-[150px] text-center text-xl" @click="deleteKeyWord">Да</button>
              <a href="#" class="modal-close main-btn-invers inline-block rounded-lg px-5 py-3 w-[150px] text-center text-xl">Отмена</a>
            </div>
          </div>
        </div>
        <div class="shadow-md rounded-xl border p-5">
          <form action="" class="department-form" @submit.prevent="this.updateKeyWord">
            <div class="department-data-input">
              <label for="" class="relative required">Название ключевого слова:</label>
              <input v-model.trim="keyWordName" minlength="1" required type="text" name="" id="" class="input-text" placeholder="Название ключевого слова" title="Введите название ключевого слова" :disabled="!this.updateMode">
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
import keyWordService from '@/store/services/key-word.service'

export default {
  name: 'Keyword',
  props: ['keyWordId'],
  data: () => ({
    loading: true,
    keyWordName: '',
    updateMode: false,
    modalDelete: null,
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    
    await this.findKeyWord();
    
    setTimeout(() => {
      this.modalDelete = M.Modal.init(document.querySelector('.modal'), {});
    }, 10)
    this.loading = false
  },
  methods: {
    async findKeyWord() {
      await keyWordService.getKeyWords().then(
        (response) => {
          for (let item of response.data) {
            if (Number(item.id) === Number(this.keyWordId)) {
              this.keyWordName = item.name;
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
      await this.findKeyWord();
      this.$message('Отмена изменений');
    },
    async updateKeyWord() {
      await keyWordService.updateKeyWord(this.keyWordId, this.keyWordName).then(
        (response) => {
          this.updateMode = false;
          this.$message('Ключевое слово обновлено');
        },
        (error) => {
          this.message = (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString();
          this.$error(messages[this.message] || 'Что-то пошло не так');
        }
      )
    },

    deleteModalOpen() {
      this.modalDelete.open();
    },

    async deleteKeyWord() {
      await keyWordService.deleteKeyWord(this.keyWordId).then(
        (response) => {
          this.updateMode = false;
          this.modalDelete.close();
          this.$message(`Ключевое слово №${this.keyWordId} удалено`);
          setTimeout(() => {
            this.$router.push('/different')
          }, 500)
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
    if (this.modalDelete && this.modalDelete.destroy) {
      this.modalDelete.destroy();
    }
  },
  components: {
    Sidebar,
  }
}
</script>
