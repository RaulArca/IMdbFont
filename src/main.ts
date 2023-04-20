import { createApp } from 'vue'
import App from './App.vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from '@kyvg/vue3-notification'


/* import specific icons */
import { faUserSecret, faMagnifyingGlass,faXmark, faStar,faGrip,faBraille,faBars,faCompass,faHeart} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faMagnifyingGlass,faXmark,faStar,faGrip,faBraille,faBars,faCompass,faHeart)
import {store} from "@/store/store";

createApp(App)
    .use(store)
    .use(Notifications)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app')
