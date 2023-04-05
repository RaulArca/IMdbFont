<template>
<div class="template-grid">
    <slot></slot>
</div>
</template>

<script lang="ts">
export default {
  name: "Grid"
}

</script>

<style>
.template-grid{
  display: grid;
  grid-template-columns: repeat(6,180px);
  grid-gap: 15px;
  justify-content: center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
@media only screen and (min-width: 2000px) {
  .template-grid {
    justify-content: center;
    align-content: center;
    display: grid;
    grid-template-columns: repeat(8,180px);
    grid-gap: 15px;} }
@media only screen and (max-width: 1000px) {
  .template-grid {
    justify-content: center;
    align-content: center;
    display: grid;
    grid-template-columns: repeat(3,180px);
    grid-gap: 15px;} }
@media only screen and (max-width: 500px) {
  .template-grid {
    justify-content: center;
    align-content: center;
    display: grid;
    grid-template-columns: repeat(2,180px);
    grid-gap: 15px;} }

</style>