import { searchModule } from './search.module'
import {dataModule} from './data.module'
import {createStore, Store} from "vuex";

export interface RootState{
    version:string;
}
export const store:Store<RootState> = createStore({
    modules: {
        search: searchModule,
        data:dataModule
    }
})