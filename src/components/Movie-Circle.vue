<template >
  <div class="flip-card" ref="card" v-bind:id="'circle'+movie.id" v-on:click="selectMovie">
    <img  src="https://m.media-amazon.com/images/M/MV5BZGUzYTI3M2EtZmM0Yy00NGUyLWI4ODEtN2Q3ZGJlYzhhZjU3XkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_QL75_UX280_CR0,0,280,414_.jpg" >
  </div>
</template>

<script >
import { defineComponent} from "vue";
import {store} from "@/store/store";
import index from "vuex";


export default{
  name: "Movie-Circle",
  props:['movie'],
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

      document.getElementById('circle'+this.movie.id).style.width=size.toString() + "px";
      document.getElementById('circle'+this.movie.id).style.height=size.toString() +"px";
    },
    selectMovie(){
      let Card = document.getElementById('circle'+this.movie.id)
      if(this.isSelected){
        this.isSelected=false;
        Card.classList.add("active")
      }
      else {
        this.isSelected=true;
        Card.classList.remove("active")
      }

    }
  },
  mounted() {
    this.CircleSize(this.movie.score)
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
  margin: 10px 10px 10px 10px
}
img{
  padding: 0 0 0 0 ;
  width: 100%;
  height: 100%;
  border-radius: 200000px;
}
.active{
  -webkit-transform:scale(1.25);
  -moz-transform:scale(1.25);
  -ms-transform:scale(1.25);
  -o-transform:scale(1.25);
  transform:scale(1.25);
}
</style>