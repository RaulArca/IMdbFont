<template>
<div style="width: 101vw ; height: 97vh">
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
 interface MovieRoot {
  movie_results: MovieResult[]
  person_results: any[]
  tv_results: any[]
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
 import { defineComponent } from 'vue'

export default defineComponent({

  name: "ResultCard",
  props:['imdbId'],
  data() {
    return {
    youtubekey :"ZS_8btMjx2U"
    }
  }
  ,async beforeCreate() {
    let movie: MovieRoot;
    let urlFind: string = "https://api.themoviedb.org/3/find/" + this.imdbId + "?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id"
    let trailer: TrailerRoot
    await fetch(urlFind)
        .then(response => response.json())
        .then(async data => {
          movie = data
          let id: number = movie.movie_results[0].id
          let url: string = "https://api.themoviedb.org/3/movie/" + id + '/videos?api_key=06874088a2d1704a5a7018a3e1d000b3'
          await fetch(url)
              .then(response => response.json())
              .then(data => {
                trailer = data
               this.youtubekey= trailer.results[0].key.toString();
              });
        });
  },
})
</script>

<style scoped>


</style>