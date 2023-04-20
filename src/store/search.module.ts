import type {Module} from "vuex";

import type {StateSearch} from "@vue/runtime-core";
import type {Hit, categoryMovies, moviResult} from "@/App.vue";
import type {RootState} from "@/store/store";
declare module '@vue/runtime-core' {
     interface StateSearch {
         isSearching: boolean
         gridSelected: string

         showResults:boolean

         showFilters: boolean

         query:string

         filters:{
             categories: string,
             duration: number,
             releaseYearFrom:number,
             releaseYearTo:number,
             score:number,
         }
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
        filters:{
            categories:'',
            duration: 0,
            releaseYearFrom:0,
            releaseYearTo:0,
            score:0,
            }
        }

    },
    actions:{
        async searchByQuery({commit, rootGetters}) {
            let url = 'http://localhost:8080/movies' + rootGetters['search/getQuery'];

            try {
                fetch(url)
                    .then(response => response.json())
                    .then(async data => {
                        let result: moviResult = data.hits;
                        //setMovies(result.hits)
                       // let result: Hit[] = data;
                        commit('data/setMovies',result, {root: true})

                    });
            } catch (error) {

            }
        },
        async postData({commit, rootGetters}) {
            let url ='http://localhost:8080/movies/recommended'
            // Default options are marked with *
            const aux = fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(rootGetters['data/getMoviesSelected']), // body data type must match "Content-Type" header
            }).then(response => response.json())
                .then(async data => {
                    let result: Hit[] = data.hits;
                    //setMovies(result.hits)
                    // let result: Hit[] = data;
                    commit('data/setRecomendedMovies',result, {root: true})

                });
        },
        async searchByCategory({commit}) {
            let urlComedy = 'http://localhost:8080/movies/genre/Comedy';
            let urlDrama = 'http://localhost:8080/movies/genre/Drama';
            let urlHorror = 'http://localhost:8080/movies/genre/Horror';
            let urlAction = 'http://localhost:8080/movies/genre/Action';
            try {
                fetch(urlComedy)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Comedy'
                            result.movies = hits
                        //setMovies(result.hits)
                        // let result: Hit[] = data;
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlDrama)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Drama'
                        result.movies = hits
                        //setMovies(result.hits)
                        // let result: Hit[] = data;
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlHorror)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Horror'
                        result.movies = hits
                        //setMovies(result.hits)
                        // let result: Hit[] = data;
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlAction)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;
                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Action'
                        result.movies = hits
                        //setMovies(result.hits)
                        // let result: Hit[] = data;
                        commit('data/addCategoryMovies',result, {root: true})

                    });
            } catch (error) {

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