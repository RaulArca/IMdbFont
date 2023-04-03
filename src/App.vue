<script setup lang="ts">
import Searchbar from "@/components/searchbar.vue";
import MovieCard from "@/components/Movie-Card.vue";
import Grid from "@/components/Grid.vue";
import Slider from "@/components/slider.vue";
import {computed} from "vue";
import {store} from "@/store/store";
import MovieCircle from "@/components/Movie-Circle.vue";
import Flex from "@/components/Flex.vue";
import ResultGrid from "@/components/ResultGrid.vue";
import ResultCard from "@/components/ResultCard.vue";

const isSearching = computed(() => {
  return store.getters['search/getIsSearching'];
})

const gridSelected = computed(() => {
  return store.getters['search/getGridSelected'];
})
const showResults = computed(() => {
  return store.getters['search/getShowResults'];
})

const movies = [{id:1,score:6.3},
  {id:2,score:7},
  {id:3,score:5},
  {id:4,score:8.5},
  {id:5,score:6},
  {id:6,score:6.6},
  {id:7,score:9.3},
  {id:8,score:7.7},
  {id:9,score:3},
  {id:10,score:6.5},
  {id:11,score:5.9},
  {id:12,score:7.4},
  {id:13,score:7.2},
  {id:16,score:6},


]
</script>


<template>

  <header class="header">
    <searchbar v-if="!showResults"/>
  </header>

  <main class="app">
    <notifications />
    <transition>
      <grid v-if="gridSelected === 'cards' && !isSearching &&!showResults" >
        <movie-card
            v-for="i in movies" v-bind:index=i.id>
        </movie-card>
      </grid>

    </transition>
    <transition>
      <div class="circlesGrid" v-if="!isSearching &&!showResults" >
      <div class="grid " data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 150 }' v-if="gridSelected==='circles'" >
        <movie-circle class = "grid-item"
            v-for="i in movies" v-bind:movie=i >
        </movie-circle>
      </div>
      </div>
    </transition>

    <transition>
      <div>
        <slider v-for="x in [1,12,13,14,15]" v-if="isSearching &&!showResults">
          <movie-card
              v-for="i in movies" v-bind:index="x+ ' '+ i.id"></movie-card>
        </slider>
      </div>

    </transition>

    <transition>
      <ResultGrid  v-if="showResults">
        <result-card  v-for="i in ['tt0137523','tt0266543','tt0033467']" v-bind:imdb-id="i" ></result-card>
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
</style>
