<template>
  <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>
    <slot class="grid-item"></slot>
  </div>
</template>

<script>
export default {
  name: "Flex"
}
</script>

<style scoped>
.flex-template{
  display: flex;
  gap: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 300px;
  justify-items: flex-start;

}
</style>