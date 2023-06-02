<template>
  <div class="main-layout max-w-screen-xl mx-auto px-3 flex flex-col">
    <HeaderMain />
    <main class="content flex flex-col flex-grow">
      <router-view/>
    </main>
  </div>
</template>

<script>
import HeaderMain from '@/components/app/HeaderMain.vue'
export default {
  name: 'main-layout',
  components: {
    HeaderMain
  }
}
</script>