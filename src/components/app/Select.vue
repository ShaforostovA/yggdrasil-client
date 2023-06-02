<template>
  <div class="input-field col s12 selectSingle w-full">
    <select v-if="this.type === 'filter'" :multiple="this.multy" :disabled="this.disabled">
      <option value="" :selected="this.selected">{{ message }}</option>
      <option v-for="(option) of this.content" :key="option" v-bind:value="option" :selected="option === this.equalId">{{ option }}</option>
    </select>
    <select v-else-if="!Array.isArray(this.equalId) && this.content.length !== 0 && (typeof this.content[0] !== 'object')" :multiple="this.multy" :disabled="this.disabled">
      <option value="" disabled :selected="this.selected">{{ message }}</option>
      <option v-for="(option) of this.content" :key="option" v-bind:value="option" :selected="option === this.equalId">{{ option }}</option>
    </select>
    <select v-else-if="Array.isArray(this.equalId) && this.content.length !== 0 && (typeof this.content[0] !== 'object')" :multiple="this.multy" :disabled="this.disabled">
      <option value="" disabled :selected="this.selected">{{ message }}</option>
      <option v-for="(option) of this.content" :key="option" v-bind:value="option" :selected="this.isSelect(this.equalId, option)">{{ option }}</option>
    </select>
    <select v-else-if="!Array.isArray(this.equalId)" :multiple="this.multy" :disabled="this.disabled">
      <option value="" disabled :selected="this.selected">{{ message }}</option>
      <option v-for="(option) of this.content" :key="option.id" v-bind:value="option.id" :selected="option.id === this.equalId">{{ option.name }} <span class="opacity-0">({{ option.id }})</span></option>
    </select>
    <select v-else :multiple="this.multy" :disabled="this.disabled">
      <option value="" disabled :selected="this.selected">{{ message }}</option>
      <option v-for="(option) of this.content" :key="option.id" v-bind:value="option.id" :selected="this.isSelect(this.equalId, option.id)">{{ option.name }} <span class="opacity-0">({{ option.id }})</span></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'selectComponent',
  props: ['selected', 'message', 'content', 'multy', 'disabled', 'equalId', 'type'],
  data: () => ({
    select: null,
  }),
  mounted() {
    setTimeout(() => {
      this.select = M.FormSelect.init(document.querySelectorAll('select'), {});
    }, 0)
  },
  methods: {
    isSelect(arr, value) {
      let newArr = [];
      for (let item of arr) {
        newArr.push(Number(item));
      }
      return newArr.includes(value);
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
}
</script>