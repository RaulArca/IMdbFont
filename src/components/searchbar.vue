<template>
  <div class="template-Search">
    <transition>
      <button class = "button" v-on:click="showFilters" v-if="!isSearching"><font-awesome-icon icon="fa-solid fa-bars" /></button>
    </transition>
    <div class="relative" id="search">
      <input class="input" placeholder="write to search" v-on:click="goToSearch" v-on:input="search($event.target.value)"/>
      <span id="input-manifying-glass" >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="color: #6495ed;" />
      </span>
    </div>

    <!-- botones para camiar el grid-->
    <transition>
      <button id="button--card--grid" class="button" v-if="gridSelected==='circles' && !isSearching" v-on:click="cardsGrid"><font-awesome-icon icon="fa-solid fa-grip" bounce /></button>
    </transition>
    <transition>
      <button id="button--circles--grid" class="button" v-if="gridSelected==='cards' && !isSearching" v-on:click="circlesGrid"><font-awesome-icon icon="fa-sharp fa-light fa-braille" flip="both" bounce /></button>
    </transition>
    <!-- botones para la busqueda-->
    <transition>
    <button id="button--exit" class="button" v-if="isSearching" v-on:click="notSearch"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
    </transition>
    <transition>
    <button id="button--discover" class="button" v-on:click="showResults">Discover</button>
    </transition>
  </div>
</template>

<script lang="ts">
import {store} from "@/store/store";
import {defineComponent} from "vue";
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  name: "searchbar",
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  computed:{
    isSearching(){
      return store.getters['search/getIsSearching'];
    },
    gridSelected(){
      return store.getters['search/getGridSelected']
    },
    isFiltersShowed(){
      return store.getters['search/getShowFilters']
    },
    query(){
      return store.getters["search/getQuery"];
    },

  },
  watch:{
    query() {
      store.dispatch('search/searchByQuery');
    },
    movies(){
      if (store.getters['search/getQuery']!=''){
        this.notSearch()
      }
      else this.goToSearch();
    }
  },
  methods:{
    goToSearch(){
      if(this.query==''){
        store.commit('search/setIsSearching', 'searching')
        document.getElementById('search').style.gridColumn='1/3'
      }
    },
    notSearch(){
      store.commit('search/setIsSearching', false)
      document.getElementById('search').style.gridColumn='2/3'
    },
    circlesGrid(){

      store.commit('search/setGridSelected', 'circles')
      notify({
        title: "Warning",
        text: "the size of the circles depends on the score of the movies",
        type: "warning"
      });
    },
    cardsGrid(){
      store.commit('search/setGridSelected','cards')
    },
    showResults(){
      store.commit("search/setShowResult",true)
    },
    showFilters(){
      if(this.isFiltersShowed){
        store.commit("search/setShowFilters",false)
      }
      else{
        store.commit("search/setShowFilters",true)
      }
    },
    search(value:string){
      store.commit('search/setQuery', value);

      store.commit('data/setMovies',[]);
      if(value==""){
        this.goToSearch()
      }
      else{
        this.notSearch()
      }
      store.dispatch('search/searchByQuery')

    }

  }
})
</script>

<style scoped>
.input {
  width: 100%;
  height: 30px;
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  margin-left: 20px;
  justify-self: flex-start;
  padding-left: 20px ;
}
#button--card--grid ,#button--circles--grid ,#button--exit{
  grid-column-start: 3;
}
#button--discover{
  grid-column-start: 4;
}
#input-manifying-glass{
  position: absolute;
  display: block;
  bottom: .5rem;
  right: 0px;

  user-select: none;
  cursor: pointer;

}
.relative{

  position: relative;
}

.button {
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  justify-self: end;
  margin-right: .5rem;
}

.template-Search {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  margin-bottom: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 1000px) {
  .template-Search {
    display: grid;
    margin-top: 20px;
    grid-template-columns: 20% 30% 20% 25%;
    margin-bottom: 20px;
    column-gap: 10px;
    justify-items: center;
  }
  #input-manifying-glass{
    position: absolute;
    display: none;
    bottom: .5rem;
    right: 0px;

    user-select: none;
    cursor: pointer;

  }}
.button {
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  justify-self: end;
  margin-right: 1rem;
}
.input {
  width: 100%;
  height: 30px;
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  margin-left: 10px;
  justify-self: flex-start;
  padding-left: 10px ;
}
.relative{

  position: relative;
  margin-right: 10px;
}

</style>