<template >
  <!--
  <div class="flip-card" ref="card" v-bind:id="'circle'+movieID" v-on:click="selectMovie">
    <div class="visible" v-if="isSelected">
      <font-awesome-icon icon="fa-solid fa-heart" size="2xl" style="color: #43c78d;"/>
    </div>
    <img v-bind:id="'img'+movieID">

  </div>-->
  <div class="flip-card" ref="card" v-bind:id="'circle'+movieID" v-on:click="selectMovie">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="visible" v-if="isSelected">
          <font-awesome-icon icon="fa-solid fa-heart" size="2xl" style="color: #43c78d;"/>
        </div>
        <img v-bind:id="'img'+movieID" v-bind:src="movie.image">
      </div>
      <div class="flip-card-back">
        <div class="back">
          <h3>{{movie.originalTitle}} </h3>
        </div>

      </div>

  </div>
  </div>
</template>

<script >
import { defineComponent} from "vue";
import {store} from "@/store/store";
import index from "vuex";


export default{
  name: "Movie-Circle",
  props:['movie', 'movieID'],
  data() {
    return {
      isSelected: false
    }
  },
  methods:{
    CircleSize(score){
      let size = (score*400)/10
      if(size<210){
        size= 150;
      }
      else if(size>400)
        size = 400

      document.getElementById('circle'+this.movieID).style.width=size.toString() + "px";
      document.getElementById('circle'+this.movieID).style.height=size.toString() +"px";
    },
    selectMovie(){
      if(this.isSelected){
        this.isSelected=false;
        store.commit('data/removeMovieSelected', this.movie)
      }
      else {
        this.isSelected=true;
        store.commit('data/addMovieSelected', this.movie)
      }

    }
  },
  mounted() {
    let selected = store.getters["data/getMoviesSelected"]
    if(selected.includes(this.movie)){
      this.$data.isSelected=true
    }
    this.CircleSize(this.movie.averageRating)
  },
  updated() {
    let selected = store.getters["data/getMoviesSelected"]
    if(selected.includes(this.movie)){
      this.$data.isSelected=true
    }
    this.CircleSize(this.movie.averageRating)
  }
}
</script>

<style scoped>
.flip-card{
  width: 150px;
  height: 150px;

  border-radius: 20000000px;
  align-content: center;
  color: #2c3e50;
  margin: 10px 10px 10px 10px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
}
img{
  padding: 0 0 0 0 ;
  width: 100%;
  height: 100%;
  border-radius: 200000px;
}

.visible{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
}
.active{
  -webkit-transform:scale(1.25);
  -moz-transform:scale(1.25);
  -ms-transform:scale(1.25);
  -o-transform:scale(1.25);
  transform:scale(1.25);
}


.flip-card-inner {
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
  border-radius: 200000px;
  border: 2px solid cornflowerblue; }

.flip-card-front, .flip-card-back {

  border-radius: 200000px;
  position: absolute;
  width: 100%;
  height: 100%;  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: beige;
  color: black;}

.flip-card-back {

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: beige;
  color: black;
  transform: rotateY(180deg);

}
.back {

}

</style>