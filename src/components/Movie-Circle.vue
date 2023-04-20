<template >
  <div class="flip-card" ref="card" v-bind:id="'circle'+movieID" v-on:click="selectMovie">
    <transition>
    <div class="visible" v-if="isSelected">
      <font-awesome-icon icon="fa-solid fa-heart" size="2xl" style="color: #43c78d;"/>
    </div>
    </transition>
    <img v-bind:id="'img'+movieID">

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

    let url = 'https://api.themoviedb.org/3/find/' + this.movie.tconst +
        '?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id'


    let imageNotFoundurl = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'
    fetch(url)
        .then(response => response.json())
        .then(async data => {
          let selected = store.getters["data/getMoviesSelected"]
          let urlImage = ''
          if (data.tv_results[0] != null && data.tv_results[0] != undefined && data.tv_results[0].poster_path) {
            urlImage = 'https://image.tmdb.org/t/p/original' + data.tv_results[0].poster_path
          } else if (data.movie_results[0] != null && data.movie_results[0] != undefined && data.movie_results[0].poster_path) {
            urlImage = 'https://image.tmdb.org/t/p/original' + data.movie_results[0].poster_path
          } else if (data.person_results[0] != null && data.person_results[0] != undefined && data.person_results[0].poster_path) {
            urlImage = 'https://image.tmdb.org/t/p/original' + data.person_results[0].poster_path
          } else if (data.tv_episode_results[0] != null && data.tv_episode_results[0] != undefined && data.tv_episode_results[0].poster_path) {
            urlImage = 'https://image.tmdb.org/t/p/original' + data.tv_episode_results[0].poster_path
          } else if (data.tv_season_results[0] != null && data.tv_season_results[0] != undefined && data.tv_season_results[0].poster_path) {
            urlImage = 'https://image.tmdb.org/t/p/original' + data.tv_season_results[0].poster_path
          } else {
            urlImage = imageNotFoundurl;
          }

          if(selected.includes(this.movie)){
            this.$data.isSelected=true
          }
          document.getElementById("img" + this.movieID).src = urlImage
          this.CircleSize(this.movie.averageRating)
        });
  }
}
</script>

<style scoped>
.flip-card{
  width: 150px;
  height: 150px;
  border: 2px solid cornflowerblue;
  border-radius: 20000000px;
  background:beige ;
  align-content: center;
  color: #2c3e50;
  margin: 10px 10px 10px 10px;
  position: relative;
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
</style>