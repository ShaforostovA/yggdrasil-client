<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout';
    }
  },
  components: {
    EmptyLayout, MainLayout
  }
}
</script>

<style lang="scss">
// @import '~materialize-css/dist/css/materialize.min.css';
@import '/public/css/style.css';
// @import '../node_modules/@yaireo/tagify/src/tagify';
</style>
