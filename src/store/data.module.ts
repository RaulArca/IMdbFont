import type {Module} from "vuex";

import type {StateData, StateSearch} from "@vue/runtime-core";
import type {Hit} from "@/App.vue";
import type {RootState} from "@/store/store";
declare module '@vue/runtime-core' {
     interface StateData {
        movies: Hit[]
    }

}
export const  dataModule : Module<StateData,RootState>= {
    namespaced: true,
    state:{
        movies:[]


    },
    actions:{

    },
    mutations: {
        setMovies(state, value:Hit[]):void{
            state.movies= value
        },
    },
    getters:{

        getMovies (state):Hit[]{
            return state.movies
        },

    }
}