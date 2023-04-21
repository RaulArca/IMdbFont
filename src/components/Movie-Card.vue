<template>
  <div class="flip-card" v-on:click="selectMovie" ref="card" v-bind:id="movieID" :class="{'visible': isSelected}">

    <img v-bind:id="'poster'+movieID" v-bind:src="movie.image">

    <h3 class="flip-card--title">{{movie.originalTitle}}</h3>
    <!--
    <a class="flip-card--rating"><font-awesome-icon icon="fa-solid fa-star" style="color: #2c3e50;" />
      {{movie.averageRating}}</a>
    -->
    <a class="flip-card--rating" v-if="movie.averageRating!=-1"><font-awesome-icon icon="fa-solid fa-star" style="color: #2c3e50;" />
      {{movie.averageRating}}</a>

    <div class="ribbon-wrapper">
      <div class="ribbon">{{movie.titleType}}</div>
    </div>
  </div>
</template>

<script lang="js">
import {store} from "@/store/store";

export default {
  props:["movie","movieID"],
  name: "Movie-Card",
  data() {
    return {
      isSelected: false,
    }
  }
  ,methods:{
    selectMovie(){
      if(this.isSelected){
        this.isSelected=false;
        store.commit('data/removeMovieSelected', this.movie)
      }
      else {
        this.isSelected=true;
        store.commit('data/addMovieSelected', this.movie)
      }
    },
  },
  mounted() {
    let selected = store.getters["data/getMoviesSelected"]
    if(selected.includes(this.movie)){
      this.isSelected=true
    }
  },
  beforeUpdate() {
    let selected = store.getters["data/getMoviesSelected"]
    if(selected.includes(this.movie)){
      this.isSelected=true
    }
  }
}
</script>

<style scoped>

.flip-card  {
  -webkit-transition:all .25s ease; /* Safari y Chrome */
  -moz-transition:all .9s ease; /* Firefox */
  -o-transition:all .9s ease; /* IE 9 */
  -ms-transition:all .9s ease; /* Opera */
  width:100%;
}
.visible{
  -webkit-transform:scale(1.10);
  -moz-transform:scale(1.10);
  -ms-transform:scale(1.10);
  -o-transform:scale(1.10);
  transform:scale(1.10);
}
.flip-card{
  width: 180px;
  border: 2px solid cornflowerblue;
  background:beige ;
  display: grid;
  grid-template-rows:250px repeat(2, minmax(50px,max-content));
  grid-template-columns: 180px;
  align-content: start;
  color: #2c3e50;
  position: relative;
  z-index: 90;
;
}
img{
  grid-row-start: 1;
  height: 100%;
  width: 100%;
  align-self: start;
  margin-bottom: 20px;
}
h3 ,a {
  justify-self: center;
  align-self: center;

}
.flip-card--title{
  grid-row-start: 2;
  margin:5px
}
.flip-card--rating{
  grid-row-start: 3
;
}


.ribbon-wrapper {
  width: 85px;
  height: 88px;
  overflow: hidden;
  position: absolute;
  top: -3px;
  left: -3px;
}
.ribbon {
  font: bold 15px sans-serif;
  color: #333;
  text-align: center;
  -webkit-transform: rotate(-45deg);
  -moz-transform:    rotate(-45deg);
  -ms-transform:     rotate(-45deg);
  -o-transform:      rotate(-45deg);
  position: relative;
  padding: 7px 0;
  top: 15px;
  left: -30px;
  width: 120px;
  background-color: #ebb134;
  color: #fff;
}


</style>