import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css' assert { type: 'css' }
import 'primeflex/primeflex.css'
import './style.css'
import App from './App.vue'
import router from './router/router'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import ProgressBar from 'primevue/progressbar';
import Skeleton from 'primevue/skeleton'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false
        }
    }
});

// подключение компонентов из primevue
app.component('Menubar', Menubar)
app.component('Button', Button)
app.component('ProgressBar', ProgressBar)
app.component('Skeleton', Skeleton)

app.mount('#app')



