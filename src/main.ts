import '@/assets/main.css'

import App from '@/App.vue'
import router from '@/router'

import {
  AppBadge,
  AppTable,
  BreakScreen,
  EmptyState,
  SectionHeader,
  TimeInfo
} from '@/components/global'
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { onMessage } from "firebase/messaging";
import { messaging } from "@/firebase";

const app = createApp(App)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((reg) => console.log('Service Worker registered:', reg))
    .catch((err) => console.error('SW registration failed:', err));
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'fcm-message') {
      const customEvent = new CustomEvent('fcm-message', { detail: event.data.data });
      window.dispatchEvent(customEvent);
    }
  });
}

onMessage(messaging, (payload) => {
  console.log("Pesan foreground:", payload);

  const event = new CustomEvent('fcm-message', { detail: payload });
  window.dispatchEvent(event);
});

app.use(VueApexCharts)
app.component('ApexChart', VueApexCharts)
// global components
app
  .component('AppBadge', AppBadge)
  .component('EmptyState', EmptyState)
  .component('SectionHeader', SectionHeader)
  .component('AppTable', AppTable)
  .component('BreakScreen', BreakScreen)
  .component('TimeInfo', TimeInfo)

app.use(router)

app.mount('#app')
