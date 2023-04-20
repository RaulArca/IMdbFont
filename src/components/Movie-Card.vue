<template>
  <div class="flip-card" v-on:click="selectMovie" ref="card" v-bind:id="movieID" :class="{'selected': isSelected}">

    <img v-bind:id="'poster'+movieID" >

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
    }
  },mounted() {

    let url = 'https://api.themoviedb.org/3/find/'+this.movie.tconst+
        '?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id'


    let imageNotFoundurl ='https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
    fetch(url)
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

          if(selected.includes(this.movie)){
            this.$data.isSelected=true
          }

          document.getElementById("poster"+this.movieID).src=urlImage
          document.getElementById("poster"+this.movieID).width=180;
          document.getElementById("poster"+this.movieID).height=250
        });



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
.selected{
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