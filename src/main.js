import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlagin from './utils/message.plagin'
import datePlagin from './utils/date.plagin'
import Loader from '@/components/app/Loader'
import FullScreenLoader from '@/components/app/FullScreenLoader'
import tooltipDirective from '@/directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min'

createApp(App).use(store).use(router).use(messagePlagin).use(datePlagin).directive('tooltip', tooltipDirective).component('Loader', Loader).component('FullScreenLoader', FullScreenLoader).mount('#app')