<template>
  <div class="main-table flex-grow border rounded-xl shadow-md overflow-hidden mb-6">
        <table class="main-table-data">
          <thead class="bg-[var(--color-main)] text-white">
            <tr>
              <th
                v-for="headItem of this.header"
                :key="headItem"
              >{{ headItem }}</th>
            </tr>
          </thead>
          <tbody v-if="this.loading" class="empty-data">
            <tr>
              <td class="text-center" v-bind:colspan="this.header.length"><Loader/></td>
            </tr>
          </tbody>
          <tbody v-else-if="this.content && !this.content.length" class="empty-data">
            <tr>
              <td class="text-center select-none" v-bind:colspan="this.header.length">{{ this.noDataMessage }}</td>
            </tr>
          </tbody>
          <tbody v-else class="overscroll-contain">
            <tr 
              v-for="row of this.content"
              :key="row"
              class="main-table-data-tr">
              <td
                v-for="item of row"
                :key="item"
              >
                <label v-if="item.type === 'radio'">
                  <input type="radio" name="radio" v-model="this.radioValue"  v-bind:value="row[0].id" v-bind:id="row[0].id">
                  <span></span>
                </label>
                <span v-else-if="item.type === 'onlyText'">{{ item.text }}</span>
                <span v-else-if="item.type === 'status'" class="col-status" :class="{active: item.text === 'Активный' || item.text === 'Учится', disabled: item.text === 'Деактивированный' || item.text === 'Не учится'}">{{ item.text }}</span>
                <label v-else-if="item.type === 'lable'" v-bind:for="row[0].id">{{ item.text }}</label>
                <router-link v-else-if="item.type === 'link'" :to="{path: item.link}" class="main-table-link main-btn">{{ item.text }}</router-link>
                <button v-else-if="item.type === 'linkP'" @click="this.$router.push(item.link)" class="main-table-link main-btn">{{ item.text }}</button>
                <span v-else-if="item.type === 'docStatus'" class="doc-status" :class="{draft: item.text === 'Черновик', ready: item.text === 'Готов', remake: item.text === 'Переделать', archive: item.text === 'Архив'}">{{ item.text }}</span>
                <span v-else-if="item.type === 'reportStatus'" class="report-status" :class="{draft: item.text === 'Черновик', ready: item.text === 'Готов', archive: item.text === 'Архив'}">{{ item.text }}</span>
                <span v-else-if="item.type === 'id'">{{ item.text }}</span>
                <span v-else-if="item.type === 'date'">{{ this.$normaldate(item.text) }}</span>
                <button v-else-if="item.type === 'copy'" class="main-table-link main-btn copy" :data-clipboard-text="item.text" @click.prevent="this.copyDate">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  Копировать
                </button>
                <span v-else v-tooltip="item.text">{{ item.shortTest ? item.shortTest : item.text }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import messages from '@/utils/messages'

export default {
  name: "mainTable",
  props: ['header', 'content', 'noDataMessage'],
  data: () => ({
    radioValue: null,
    loading: true,
    clipBoard: null
  }),
  async mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
    this.clipBoard = new ClipboardJS('.copy');
    // this.clipBoard.on('success', function(e) {
    //   this.$message(`Данные скопированы`)
    // });
    this.loading = false;
  },
  methods: {
    copyDate() {
      this.$message(`Данные скопированы`)
    },
    clearRadioButton() {
      this.radioValue = 0;
    }
  },
  beforeDestroy() {
    if(this.clipBoard && this.clipBoard.destroy) {
      this.clipBoard.destroy();
    }
  },
  watch: {
    radioValue(value) {
      this.$emit('updateParent', value);
    }
  }
}
</script>