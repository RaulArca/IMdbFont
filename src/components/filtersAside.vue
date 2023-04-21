<template>
  <div class="absolute">
  <h3>FILTERS</h3>
  <div class="filter">
    <label for="categories"> CATEGORIES</label>
    <select id="categories" v-on:change="category($event.target.value)" v-bind:value="selectedCategory">
      <option v-for="i in ['','Adventure','Comedy','Drama','Crime','Thriller','Biography','Horror','Fantasy','Mystery','Sci-Fy','Action','Documentary']" v-bind:value="i" v-bind:content="i" >{{i}}</option>
    </select>
  </div>
  <div class="filter slider">
    <label >MAXIMUM  DURATION</label>
    <input id="durationSlider" class="filter--duration--slider" type="range" min="0" max="240" v-bind:value="maxDuration" v-on:input="duration">
    <label id="duration" class="slider--label"> 0 </label>
  </div>
  <div class="filter">
    <label > RELEASE YEAR</label>
    <div class="dates">
      <label for="dateFrom">FROM</label>
      <label for="dateTo">TO</label>
      <input v-on:input="dateFrom($event.target.value)" id = "dateFrom" type="number" min="1890" max="2023" v-bind:value="ReleaseDateFrom"><input v-on:input="dateTo($event.target.value)" v-bind:value="ReleaseDateTo" id="dateTo" type="number" min="1890" max="2023">
    </div>

  </div>
  <div class="filter slider">

    <label > SCORE</label>
    <input id="scoreSlider" class="filter--duration--slider" type="range" min="0" max="10" v-bind:value="minScore" v-on:input="score">
    <label id="score" class="slider--label"> 0 </label>
  </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "filtersAside"
  ,computed:{
    maxDuration(){
      return store.getters['search/getFilters'].duration
    },
    minScore(){
      return store.getters['search/getFilters'].score
    },
    ReleaseDateFrom(){
      return store.getters['search/getFilters'].releaseYearFrom
    },
    ReleaseDateTo(){
      return store.getters['search/getFilters'].releaseYearTo
    },
    selectedCategory(){
      return store.getters['search/getFilters'].categories
    },

  }
  , methods:{
    duration(){
      let label = document.getElementById("duration");
      let slider = document.getElementById("durationSlider");
      label.textContent= slider.value
     // store.commit('data/setMovies',[])
      store.commit('search/setDuration', slider.value,{root: true});
      store.dispatch('search/searchByQuery')
    },
    score(){
      let label = document.getElementById("score");
      let slider = document.getElementById("scoreSlider");
      label.textContent= slider.value
     // store.commit('data/setMovies',[])
      store.commit('search/setScore',slider.value,{root:true})
      store.dispatch('search/searchByQuery')

    },
    category(value){
      //store.commit('data/setMovies',[])
      store.commit('search/setCategory',value,{root:true})
      store.dispatch('search/searchByQuery')
    }
    ,
    dateFrom(value){
     // store.commit('data/setMovies',[])
      store.commit('search/setReleaseYearFrom',value,{root:true})
      store.dispatch('search/searchByQuery')
    },
    dateTo(value){
      //store.commit('data/setMovies',[])
      store.commit('search/setReleaseYearTo',value,{root:true})
      store.dispatch('search/searchByQuery')
    }

  }
}
</script>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 3px solid cornflowerblue;
  margin-bottom: 0;
}

label {
  margin-top: 0;
  margin-right: 1rem;
}
select{
  margin-top: .5rem;
}
.filter{
  padding-top: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid cornflowerblue;
}
.filter--duration--slider{
  background-color: #2c3e50;
}
.dates{
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content;
  margin-top: 1rem;
  column-gap:  1rem;
}
#dateTo{
  grid-row: 2;
  grid-column: 2;
  width: 3rem;
}
#dateFrom{
  grid-row: 2;
  grid-column: 1;
  width: 3rem;
}
.template-grid {
  justify-content: center;
  align-content: center;
  display: grid;
  grid-template-columns: repeat(8,180px);
  grid-gap: 15px;}
.slider{
  display: grid;
  grid-template-columns: min-content;
}
.slider--label{
  justify-self: center;
}
.absolute{
  position: absolute;
}
</style>