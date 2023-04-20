<template>
  <div class="slide">
    <h3 class=" slider--category">{{category}}</h3>
    <div class="sliding">
      <button class="left direction" v-on:click="slide('left')"> &lt;</button>
      <div class="scroll" id="scroll" ref="scroll">
        <div class="item-list">
          <slot></slot>
        </div>
      </div>
      <button class="right direction" v-on:click="slide('right')"> ></button>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: "slider",
  props:['category'],

  methods: {
    slide(direction) {
      let divContent = this.$refs.scroll
      if (direction == "right")
        divContent.scrollLeft += window.innerWidth;
      else
        divContent.scrollLeft -= window.innerWidth;
    }
  }
}


</script>

<style scoped>
.slide {
  margin-top: 50px;
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
  border: none;
  border-radius: 100000px;
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

.slider--category {
  color: white;
  font-size: 40px;
}


</style>