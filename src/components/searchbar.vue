<template>
  <div class="template-Search">
    <transition>
      <button class = "button"><font-awesome-icon icon="fa-solid fa-bars" /></button>
    </transition>
    <div class="relative">
      <input class="input" placeholder="write to search" v-on:click="goToSearch"/>
      <span id="input-manifying-glass" >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" style="color: #6495ed;" />
      </span>
    </div>

    <!-- botones para camiar el grid-->
    <transition>
      <button class="button" v-if="gridSelected==='circles' && !isSearching" v-on:click="cardsGrid"><font-awesome-icon icon="fa-solid fa-grip" bounce /></button>
    </transition>
    <transition>
      <button class="button" v-if="gridSelected==='cards' && !isSearching" v-on:click="circlesGrid"><font-awesome-icon icon="fa-sharp fa-light fa-braille" flip="both" bounce /></button>
    </transition>
    <!-- botones para la busqueda-->
    <transition>
    <button class="button" v-if="isSearching" v-on:click="notSearch"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
    </transition>
    <transition>
    <button class="button" v-on:click="showResults">Recomend a movie</button>
    </transition>
  </div>
</template>

<script lang="ts">
import {store} from "@/store/store";
import {defineComponent} from "vue";
import { notify } from "@kyvg/vue3-notification";
export default defineComponent({
  name: "searchbar",
  data() {
    return {
      dismissSecs: 10,
      dismissCountDown: 0,
    }
  },
  computed:{
    isSearching(){
      return store.getters['search/getIsSearching'];
    },
    gridSelected(){
      return store.getters['search/getGridSelected']
    },


  },
  methods:{
    goToSearch(){
        store.commit('search/setIsSearching', 'searching')
    },
    notSearch(){
      store.commit('search/setIsSearching', false)
    },
    circlesGrid(){

      store.commit('search/setGridSelected', 'circles')
      notify({
        title: "Warning",
        text: "the size of the circles depends on the score of the movies",
        type: "warning"
      });
    },
    cardsGrid(){
      store.commit('search/setGridSelected','cards')
    },
    showResults(){
      store.commit("search/setShowResult",true)
    }
  }
})
</script>

<style scoped>
.input {
  width: 100%;
  height: 30px;
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  margin-left: 20px;
  justify-self: flex-start;
  padding-left: 20px ;
}
#input-manifying-glass{
  position: absolute;
  display: block;
  bottom: .5rem;
  right: 0px;

  user-select: none;
  cursor: pointer;

}
.relative{

  position: relative;
}

.button {
  color: cornflowerblue;
  border-radius: 20px;
  border: 3px solid cornflowerblue;
  justify-self: end;
  margin-right: .5rem;
}

.template-Search {
  display: grid;
  margin-top: 20px;
  grid-template-columns: 1fr 7fr 1fr 1fr;
  margin-bottom: 20px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>