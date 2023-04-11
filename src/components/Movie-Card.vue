<template>
  <div class="flip-card" v-on:click="selectMovie" ref="card" v-bind:id="index">
    <img src="https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_QL75_UX280_CR0,0,280,414_.jpg">

    <h3 class="flip-card--title">Title</h3>
    <a class="flip-card--rating"><font-awesome-icon icon="fa-solid fa-star" style="color: #2c3e50;" /> 8,9 </a>

  </div>
</template>

<script lang="js">
export default {
  props:["index"],
  name: "Movie-Card",
  data() {
    return {
      isSelected: false
    }
  }
  ,methods:{
    selectMovie(){
      let Card = document.getElementById(this.index)
      if(this.isSelected){
        this.isSelected=false;
        Card.classList.add("selected")
      }
      else {
        this.isSelected=true;
        Card.classList.remove("selected")
      }

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
  grid-template-rows:250px repeat(2, 50px);
  grid-template-columns: 180px;
  align-content: center;
  color: #2c3e50;
;
}
img{
  grid-row-start: 1;
  height: 100%;
  width: 100%;
}
h3 ,a {
  justify-self: center;
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