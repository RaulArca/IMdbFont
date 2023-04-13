import type {Module} from "vuex";

import type {StateSearch} from "@vue/runtime-core";
import type {Hit} from "@/App.vue";
import type {RootState} from "@/store/store";
declare module '@vue/runtime-core' {
     interface StateSearch {
         isSearching: boolean
         gridSelected: string

         showResults:boolean

         showFilters: boolean

         query:string
    }

}
export const  searchModule : Module<StateSearch,RootState>= {
    namespaced: true,
    state:{
        isSearching: false,
        gridSelected:'cards',
        showResults:false,
        showFilters:false,
        query:'',


    },
    actions:{
        async searchByQuery({commit, rootGetters}) {
            let url = 'http://localhost:8080/movies' + rootGetters['search/getQuery'];

            try {
                fetch(url)
                    .then(response => response.json())
                    .then(async data => {
                        //let result: moviResult = data;
                        //setMovies(result.hits)
                        let result: Hit[] = data;
                        commit('data/setMovies',result, {root: true})

                    });
            } catch (error) {
                commit('setCharacters', []);
                commit('setEpisodes', []);
            }
        },
    },
    mutations: {
        setIsSearching(state, value:boolean):void{
            state.isSearching= value
        },
        setGridSelected(state, value:string):void{
            state.gridSelected= value
        },
        setShowResult(state, value:boolean):void{
            state.showResults= value
        },
        setShowFilters(state,value:boolean):void{
            state.showFilters= value
        },
        setQuery(state, value:string):void{
            if(value=='')
            state.query= value
            else{
                state.query='/'+ value
            }
        },
    },
    getters:{

        getIsSearching (state):boolean{
            return state.isSearching
        },
        getGridSelected(state):string{
          return state.gridSelected
        },
        getShowResults (state):boolean{
            return state.showResults
        },
        getShowFilters(state):boolean{
            return state.showFilters
        },
        getQuery(state):string{
            return state.query
        },
    }
}