<template>
<div style="width: 101vw ; height: 97vh" v-bind:class="{ visible: notVisible }">
  <iframe
      width="100%" height="100%"

          v-bind:src="'https://www.youtube.com/embed/'+movie.youtubekey"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen>

  </iframe>
</div>
</template>

<script lang="ts">
 import {store} from "@/store/store";


 import { defineComponent } from 'vue'

export default defineComponent({

  name: "ResultCard",
  props:['movie'],
  computed:{
    isVisible():boolean{
      return this.$data.notVisible;
    },
  },
  data() {
    return {
      youtubekey :"WBQGrEaxegk",
      notVisible:false
    }
  }
  ,async mounted() {
    if(this.movie.youtubekey){
      this.notVisible= false
    }
    else this.notVisible=true
  },
})
</script>

<style scoped>
.visible{
  display: none;
}

</style>