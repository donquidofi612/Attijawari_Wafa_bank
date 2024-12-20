import { createVuetify } from "vuetify"; 
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueSweetalert2 from 'vue-sweetalert2';
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";
import VueApexCharts from "../components/UI/apexcharts.vue";
import DropZone from "dropzone-vue";
import 'dropzone-vue/dist/dropzone-vue.common.css';
import VueCountdown from '@chenfengyuan/vue-countdown';
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import { Popover } from "bootstrap/dist/js/bootstrap.js";
import VueMultiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.css";
import { VueEditor } from "vue3-editor";
import Datepicker1 from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';

export default defineNuxtPlugin((nuxt) => {
  const vuetify = createVuetify({
    ssr: false,
    components,
    directives,
    theme:{
      themes:{
        colors:{
          
        }
      }
    }
  });
  nuxt.vueApp.use(vuetify);
  nuxt.vueApp.use(VueSweetalert2);
  nuxt.vueApp.component("EasyDataTable", Vue3EasyDataTable);
  nuxt.vueApp.use(DropZone);
  nuxt.vueApp.use(PerfectScrollbar);
  nuxt.vueApp.component("apexchart", VueApexCharts);
  nuxt.vueApp.component("Datepicker1", Datepicker1);
  nuxt.vueApp.component("VueMultiselect", VueMultiselect);
  nuxt.vueApp.component(VueCountdown.name, VueCountdown);
  nuxt.vueApp.component("VueEditor", VueEditor);
  nuxt.vueApp.provide("Popover", Popover);
});
