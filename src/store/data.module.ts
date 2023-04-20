import type {Module} from "vuex";

import type {StateData, StateSearch} from "@vue/runtime-core";
import type {categoryMovies, Hit, moviResult} from "@/App.vue";
import type {RootState} from "@/store/store";
declare module '@vue/runtime-core' {
     interface StateData {
        movies: Hit[],
        moviesSelected:Hit[],
        CategoriesMovies: categoryMovies[],
        recomendedMovies: Hit[],
    }

}
export const  dataModule : Module<StateData,RootState>= {
    namespaced: true,
    state:{
        movies:[],
        moviesSelected:[],
        CategoriesMovies:[],
        recomendedMovies:[],
    },
    actions:{

    },
    mutations: {
        setMovies(state, value:Hit[]):void{
            state.movies= value
        },
        addMovieSelected(state,value:Hit):void {
            state.moviesSelected.push(value)
        },
        removeMovieSelected(state,value:Hit):void{
            state.moviesSelected.splice(state.moviesSelected.indexOf(value),1)
        },
        addCategoryMovies(state,value:moviResult):void {
            state.CategoriesMovies.push(value)
        },
        setRecomendedMovies(state, value:Hit[]):void{
            state.recomendedMovies= value;
        }
    },
    getters:{

        getMovies (state):Hit[]{
            return state.movies
        },
        getMoviesSelected(state): Hit[]{
            return state.moviesSelected
        },
        getCategoryMovies(state): moviResult[]{
            return state.CategoriesMovies
        },
        getRecomendedMovies(state):Hit[]{
            return state.recomendedMovies
        }

    }
}