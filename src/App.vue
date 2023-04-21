<script setup lang="ts">
import Searchbar from "@/components/searchbar.vue";
import MovieCard from "@/components/Movie-Card.vue";
import Grid from "@/components/Grid.vue";
import Slider from "@/components/slider.vue";
import {computed, onMounted} from "vue";
import {store} from "@/store/store";
import MovieCircle from "@/components/Movie-Circle.vue";
import Flex from "@/components/Flex.vue";
import ResultGrid from "@/components/ResultGrid.vue";
import ResultCard from "@/components/ResultCard.vue";
import FiltersAside from "@/components/filtersAside.vue";

const isSearching = computed(() => {
  return store.getters['search/getIsSearching'];
})


const gridSelected = computed(() => {
  return store.getters['search/getGridSelected'];
})
const showResults = computed(() => {
  return store.getters['search/getShowResults'];
})
const showFilters = computed(() => {
  return store.getters['search/getShowFilters'];
})
const movies = computed(() => {
  return store.getters['data/getMovies'];
})
const selectedMovies = computed(() => {
  return store.getters['data/getMoviesSelected'];
})
const Catmovies = computed(() => {
  return store.getters['data/getCategoryMovies'];
})
const recomendedMovies = computed(() => {
  return store.getters['data/getRecomendedMovies'];
})
export interface moviResult{
  hits: Hit[]
  facets: any[]
  spellchecked: string| null
}
export interface categoryMovies {
  category:string,
  movies: Hit[]
}
export interface Hit {
  id: string| null
  image?: string;

  youtubekey?:string;
  tconst: string
  titleType: string
  primaryTitle: string
  originalTitle: string
  isAdult: boolean
  startYear: number
  endYear: number
  runtimeMinutes: number
  genres: string[]
  averageRating: number
  numVotes: number
  akas: Aka[]
  directors: Director[]
  starring: Starring[]
}

export interface Aka {
  title: string
  region: string
  language: string
  isOriginalTitle: boolean
}

export interface Director {
  nconst: string
}

export interface Starring {
  name: Name
  characters: string
}

export interface Name {
  nconst: string
}


function  setMovies(movies:Hit[]){
  store.commit('data/setMovies', movies)
}

onMounted(() => {
  store.dispatch('search/searchByQuery')
  store.dispatch('search/searchByCategory')

})
</script>


<template>

  <header class="header">
    <searchbar v-if="!showResults "/>
  </header>

  <main class="app">
    <notifications />
    <transition>
      <aside v-if="!isSearching && !showResults&& showFilters">
        <filters-aside>

        </filters-aside>
      </aside>
    </transition>
    <transition>
      <grid v-if="gridSelected === 'cards' && !isSearching &&!showResults">
        <transition-group  name="card">
        <movie-card class="card"
            v-for="i in movies" v-bind:movie=i v-bind:movie-i-d="i.tconst">
        </movie-card>
        </transition-group>
      </grid>

    </transition>
    <transition>
      <div class="circlesGrid" v-if="!isSearching &&!showResults" >
      <div class="grid " data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 150 }' v-if="gridSelected==='circles'" >
        <movie-circle class = "grid-item"
          v-for="i in movies" v-bind:movie=i v-bind:movie-i-d="'movieCircle'+i.tconst">
        </movie-circle>
      </div>
      </div>
    </transition>

    <transition>
      <div>
        <slider v-for="x in Catmovies" v-if="isSearching &&!showResults" v-bind:category="x.category">
          <movie-card
              v-for="i in x.movies" v-bind:movie=i v-bind:movie-i-d="x.category+i.tconst">

          </movie-card>
        </slider>
      </div>
    </transition>

    <transition>
      <ResultGrid  v-if="showResults">
        <result-card  v-for="i in recomendedMovies" v-bind:movie="i" ></result-card>
      </ResultGrid>
    </transition>

  </main>
</template>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.circlesGrid{
  display: flex;
  justify-content: center;
}
.grid{
  max-width: 1600px;
  justify-content: center;
}
/* clearfix */
.grid:after {
}
.grid-item {
  float:left  ;
}
.card {
  transition: all 0.6s;

}
.card-enter, .card-leave-to
  /* .card-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0);
}
.card-enter-to {
  opacity: 1;
  transform: scale(1);
}

.card-leave-active {
  /*position: absolute;*/
}

.card-move {
  opacity: 1;
  transition: all 0.5s;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
