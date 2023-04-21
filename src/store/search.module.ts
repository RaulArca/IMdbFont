import type {Module} from "vuex";

import type {StateSearch} from "@vue/runtime-core";
import type {Hit, categoryMovies, moviResult} from "@/App.vue";
import type {RootState} from "@/store/store";
import {store} from "@/store/store";
declare module '@vue/runtime-core' {
    interface MovieRoot {
        movie_results: MovieResult[]
        person_results: any[]
        tv_results: TVResult[]
        tv_episode_results: any[]
        tv_season_results: any[]
    }

    interface MovieResult {
        adult: boolean
        backdrop_path: string
        id: number
        title: string
        original_language: string
        original_title: string
        overview: string
        poster_path: string
        media_type: string
        genre_ids: number[]
        popularity: number
        release_date: string
        video: boolean
        vote_average: number
        vote_count: number
    }
    interface TrailerRoot {
        id: number
        results: TrailerResult[]
    }

    interface TrailerResult {
        iso_639_1: string
        iso_3166_1: string
        name: string
        key: string
        site: string
        size: number
        type: string
        official: boolean
        published_at: string
        id:string
    }

    export interface TVResult {
        backdrop_path: string
        created_by: CreatedBy[]
        episode_run_time: number[]
        first_air_date: string
        genres: Genre[]
        homepage: string
        id: number
        in_production: boolean
        languages: string[]
        last_air_date: string
        last_episode_to_air: LastEpisodeToAir
        name: string
        next_episode_to_air: any
        networks: Network[]
        number_of_episodes: number
        number_of_seasons: number
        origin_country: string[]
        original_language: string
        original_name: string
        overview: string
        popularity: number
        poster_path: string
        production_companies: ProductionCompany[]
        production_countries: ProductionCountry[]
        seasons: Season[]
        spoken_languages: SpokenLanguage[]
        status: string
        tagline: string
        type: string
        vote_average: number
        vote_count: number
    }

    export interface CreatedBy {
        id: number
        credit_id: string
        name: string
        gender: number
        profile_path: string
    }

    export interface Genre {
        id: number
        name: string
    }

    export interface LastEpisodeToAir {
        air_date: string
        episode_number: number
        id: number
        name: string
        overview: string
        production_code: string
        season_number: number
        still_path: string
        vote_average: number
        vote_count: number
    }

    export interface Network {
        name: string
        id: number
        logo_path: string
        origin_country: string
    }

    export interface ProductionCompany {
        id: number
        logo_path?: string
        name: string
        origin_country: string
    }

    export interface ProductionCountry {
        iso_3166_1: string
        name: string
    }

    export interface Season {
        air_date: string
        episode_count: number
        id: number
        name: string
        overview: string
        poster_path: string
        season_number: number
    }

    export interface SpokenLanguage {
        english_name: string
        iso_639_1: string
        name: string
    }

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


    },
    actions:{
        async searchByQuery({commit, rootGetters, dispatch}) {
            let url = 'http://localhost:8080/movies/search?' +
                    (rootGetters['search/getQuery'] ?  'query='+rootGetters['search/getQuery']+'&' : '')+
                    (rootGetters['search/getFilters'].categories ? 'genre=' + rootGetters['search/getFilters'].categories+'&'   : '')+
                    (rootGetters['search/getFilters'].duration ? 'maxDuration=' + rootGetters['search/getFilters'].duration+'&'  : '')+
                    (rootGetters['search/getFilters'].releaseYearFrom ? 'minDate=' + rootGetters['search/getFilters'].releaseYearFrom +'&' : '')+
                    (rootGetters['search/getFilters'].releaseYearTo ? 'maxDate=' + rootGetters['search/getFilters'].releaseYearTo+'&'  : '')+
                    (rootGetters['search/getFilters'].score ? 'minScore=' + rootGetters['search/getFilters'].score+'&'  : '');


            try {
                fetch(url)
                    .then(response => response.json())
                    .then(async data => {
                        let result: Hit[] = data.hits;
                        //setMovies(result.hits)
                       // let result: Hit[] = data;
                        for (let r of result) {
                           r = await dispatch('getImages', r);
                        }
                        commit('data/setMovies',result, {root: true})

                    });
            } catch (error) {

            }
        },
        async getImages({},movie: Hit):Hit{
            let url = 'https://api.themoviedb.org/3/find/'+movie.tconst+
                '?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id'

            let imageNotFoundurl ='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
             await fetch(url)
                .then(response => response.json())
                .then(async data => {
                    let selected = store.getters["data/getMoviesSelected"]
                    let urlImage = ''
                    if(data.tv_results[0]!= null  && data.tv_results[0]!=undefined && data.tv_results[0].poster_path){
                        urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_results[0].poster_path
                    }
                    else if(data.movie_results[0]!=null  && data.movie_results[0]!= undefined  &&data.movie_results[0].poster_path) {
                        urlImage = 'https://image.tmdb.org/t/p/original'+data.movie_results[0].poster_path
                    }
                    else if(data.person_results[0]!= null  && data.person_results[0]!=undefined && data.person_results[0].poster_path){
                        urlImage = 'https://image.tmdb.org/t/p/original'+data.person_results[0].poster_path
                    }
                    else if(data.tv_episode_results[0]!=null  && data.tv_episode_results[0]!= undefined && data.tv_episode_results[0].poster_path) {
                        urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_episode_results[0].poster_path
                    }
                    else if(data.tv_season_results[0]!=null && data.tv_season_results[0]!= undefined && data.tv_season_results[0].poster_path)  {
                        urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_season_results[0].poster_path
                    }
                    else{
                        urlImage= imageNotFoundurl;
                    }
                      movie.image = urlImage
                    return movie
                });

        },
        async getVideo({},movie:Hit){

            let urlFind: string = "https://api.themoviedb.org/3/find/" + movie.tconst + "?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id"
            let trailer: TrailerRoot

            await fetch(urlFind)
                .then(response => response.json())
                .then(async data => {
                    let result: MovieRoot = data
                    if(movie.titleType=='tvSeries'){

                        if(result.tv_results[0]!=null&&result.tv_results[0]!=undefined){
                            let id: number = result.tv_results[0].id
                            let url: string = "https://api.themoviedb.org/3/tv/" + id + '/videos?api_key=06874088a2d1704a5a7018a3e1d000b3'
                            await fetch(url)
                                .then(response => response.json())
                                .then(data => {
                                    trailer = data
                                    if(trailer.results[0]!= null && trailer.results[0]!= undefined)
                                        movie.youtubekey= trailer.results[0].key.toString();


                                });
                        }

                    }
                    else{
                        if(result.movie_results[0]!=null&&result.movie_results[0]!=undefined){
                            let id: number = result.movie_results[0].id
                            let url: string = "https://api.themoviedb.org/3/movie/" + id + '/videos?api_key=06874088a2d1704a5a7018a3e1d000b3'
                            await fetch(url)
                                .then(response => response.json())
                                .then(data => {
                                    trailer = data
                                    if(trailer.results[0]!= null && trailer.results[0]!= undefined)
                                        movie.youtubekey= trailer.results[0].key.toString();

                                });
                        }


                    }

                });
        },
        async postData({commit, rootGetters,dispatch}) {
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
                    for (let r of result) {
                        r = await dispatch('getVideo', r);
                    }
                    commit('data/setRecomendedMovies',result, {root: true})

                });
        },
        async searchByCategory({commit}) {
            let urlComedy = 'http://localhost:8080/movies/genres?genre=Comedy';
            let urlDrama = 'http://localhost:8080/movies/genres?genre=Drama';
            let urlHorror = 'http://localhost:8080/movies/genres?genre=Horror';
            let urlAction = 'http://localhost:8080/movies/genres?genre=Action';
            try {
                fetch(urlComedy)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Comedy'

                        //setMovies(result.hits)
                        // let result: Hit[] = data;
                        for (let r of hits) {
                            r = await this.dispatch('search/getImages', r);
                        }
                        result.movies = hits
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlDrama)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Drama'
                        for (let r of hits) {
                            r = await this.dispatch('search/getImages', r);
                        }
                        result.movies = hits
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlHorror)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;

                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Horror'
                        for (let r of hits) {
                            r = await this.dispatch('search/getImages', r);
                        }
                        result.movies = hits
                        commit('data/addCategoryMovies',result, {root: true})

                    });
                fetch(urlAction)
                    .then(response => response.json())
                    .then(async data => {
                        let hits: Hit = data.hits;
                        let result: categoryMovies = {category:'', movies:[]}
                        result.category= 'Action'
                        for (let r of hits) {
                            r = await this.dispatch('search/getImages', r);
                        }
                        result.movies = hits
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
           state.query=value
        },

        setCategory(state,value:string):void{
            state.filters.categories= value
        },
        setDuration(state,value:number):void{
            state.filters.duration= value;
        },
        setReleaseYearFrom(state,value:number):void{
            state.filters.releaseYearFrom=value
        },
        setReleaseYearTo(state,value:number):void{
            state.filters.releaseYearTo=value;
        },
        setScore(state,value:number):void{
            state.filters.score= value;
        }
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
        getFilters(state){
            return state.filters
        }
    }
}