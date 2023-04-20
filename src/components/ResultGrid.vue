<template>
  <div class="slide-result">
    <div class="sliding">
      <button class="left direction" v-on:click="slide('left')"> &lt;</button>
      <button class="top direction" v-on:click="exit()"> X</button>
      <div class="scroll" id="scroll" ref="scroll">
        <div class="item-list">
          <slot></slot>
        </div>
      </div>
      <button class="right direction" v-on:click="slide('right')"> ></button>
    </div>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "ResultGrid",
  methods:{
    slide(direction) {
      let divContent =this.$refs.scroll
      if (direction=="right")
        divContent.scrollLeft += window.innerWidth;
      else
        divContent.scrollLeft -= window.innerWidth;
    },
    exit(){
      store.commit('data/setRecomendedMovies', [])
      store.commit("search/setShowResult",false)
    }
  }
}
</script>

<style scoped>
.template-result-grid {
  display: grid;
  grid-template: repeat(10, 10%)/ repeat(10, 10%);
}
.slide-result{
  margin-top: 10px;
  margin-bottom: 10px;
}

.sliding {
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}

.scroll {
  display: flex;
  flex: 100%;
  flex-flow: row nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
}

.scroll > * {
  flex: 0 0 auto;
}

.item-list {
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
}

.direction {
  background: none;
  height: 50px;
  width: 50px;
  border : 2px solid cornflowerblue;
  border-radius: 100000px;
  color: white;
}

.direction:hover {
  opacity: 1;
  background: #2c3e50;
  color: white;
}

.right {
  position: absolute;
  right: 10px;
}

.left {
  position: absolute;
  left: 10px;
}
.top{
  position: absolute;
  top: 10px;
  right: 10px;
}

.slider--category {
  color: transparent;
  font-size: 40px;
}
</style>