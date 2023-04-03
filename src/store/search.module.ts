import type {Module} from "vuex";

import type {StateSearch} from "@vue/runtime-core";
declare module '@vue/runtime-core' {
     interface StateSearch {
         isSearching: boolean
         gridSelected: string

         showResults:boolean
    }

}
export const  searchModule : Module<StateSearch,any>= {
    namespaced: true,
    state:{
        isSearching: false,
        gridSelected:'cards',
        showResults:false,

    },
    actions:{

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
    }
}