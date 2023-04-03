import { searchModule } from './search.module'
import {createStore, Store} from "vuex";


export const store:Store<any> = createStore({
    modules: {
        search: searchModule,
    }
})