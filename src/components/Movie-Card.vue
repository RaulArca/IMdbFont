<template>
  <div class="flip-card" v-on:click="selectMovie" ref="card" v-bind:id="movieID">
    <img v-bind:id="'poster'+movieID">

    <h3 class="flip-card--title">{{movie.originalTitle}}</h3>
    <a class="flip-card--rating"><font-awesome-icon icon="fa-solid fa-star" style="color: #2c3e50;" />
      {{movie.averageRating}}</a>

  </div>
</template>

<script lang="js">
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
      let Card = document.getElementById(this.movieID)
      if(this.isSelected){
        this.isSelected=false;
        Card.classList.add("selected")
      }
      else {
        this.isSelected=true;
        Card.classList.remove("selected")
      }

    }
  },mounted() {

      let url = 'https://api.themoviedb.org/3/find/'+this.movieID+
          '?api_key=06874088a2d1704a5a7018a3e1d000b3&language=en-US&external_source=imdb_id'

      fetch(url)
          .then(response => response.json())
          .then(async data => {
            let urlImage = ''
            if(data.tv_results[0]!= null || data.tv_results[0]!=undefined){
              urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_results[0].poster_path
            }
            else if(data.movie_results[0]!=null || data.movie_results[0]!= undefined) {
              urlImage = 'https://image.tmdb.org/t/p/original'+data.movie_results[0].poster_path
            }
            else if(data.person_results[0]!= null || data.person_results[0]!=undefined){
              urlImage = 'https://image.tmdb.org/t/p/original'+data.person_results[0].poster_path
            }
            else if(data.tv_episode_results[0]!=null || data.tv_episode_results[0]!= undefined) {
              urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_episode_results[0].poster_path
            }
            else {
              urlImage = 'https://image.tmdb.org/t/p/original'+data.tv_season_results[0].poster_path
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

</style>