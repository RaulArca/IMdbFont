<template>
<div style="width: 101vw ; height: 97vh" v-bind:class="{ visible: isVisible }">
  <iframe
      width="100%" height="100%"

          v-bind:src="'https://www.youtube.com/embed/'+youtubekey"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>

  </iframe>
</div>
</template>

<script lang="ts">
 import {store} from "@/store/store";

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

 import { defineComponent } from 'vue'

export default defineComponent({

  name: "ResultCard",
  props:['movie'],
  computed:{
    isVisible():boolean{
      return this.$data.notVisible;
    },
  },
  data() {
    return {
      youtubekey :"WBQGrEaxegk",
      notVisible:false
    }
  }
  ,async mounted() {

    let urlFind: string = "https://api.themoviedb.org/3/find/" + this.movie.tconst + "?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id"
    let trailer: TrailerRoot

    await fetch(urlFind)
        .then(response => response.json())
        .then(async data => {
          let movie: MovieRoot = data
          if(this.movie.titleType=='tvSeries'){

            if(movie.tv_results[0]!=null&&movie.tv_results[0]!=undefined){
              let id: number = movie.tv_results[0].id
              let url: string = "https://api.themoviedb.org/3/tv/" + id + '/videos?api_key=06874088a2d1704a5a7018a3e1d000b3'
              await fetch(url)
                  .then(response => response.json())
                  .then(data => {
                    trailer = data
                    if(trailer.results[0]!= null && trailer.results[0]!= undefined)
                      this.youtubekey= trailer.results[0].key.toString();
                    else {
                      this.notVisible=true;
                    }

                  });
            }
            else {
              this.notVisible=true
            }
          }
          else{
            if(movie.movie_results[0]!=null&&movie.movie_results[0]!=undefined){
              let id: number = movie.movie_results[0].id
              let url: string = "https://api.themoviedb.org/3/movie/" + id + '/videos?api_key=06874088a2d1704a5a7018a3e1d000b3'
              await fetch(url)
                  .then(response => response.json())
                  .then(data => {
                    trailer = data
                    if(trailer.results[0]!= null && trailer.results[0]!= undefined)
                      this.youtubekey= trailer.results[0].key.toString();
                    else this.notVisible=true;
                  });
            }
            else this.notVisible=true

          }

        });
  },
})
</script>

<style scoped>
.visible{
  display: none;
}

</style>