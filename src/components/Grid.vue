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
  grid-template-columns: repeat(7,180px);
  grid-gap: 15px;
  justify-content: center;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
@media only screen and (min-width: 1500px) {
  .template-grid {
    justify-content: center;
    align-content: center;
    display: grid;
    grid-template-columns: repeat(9,180px);
    grid-gap: 15px;} }
</style>