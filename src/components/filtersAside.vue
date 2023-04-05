<template>
  <h3>FILTERS</h3>
  <div class="filter">
    <label for="categories"> CATEGORIES</label>
    <select id="categories">
      <option v-for="i in [1,2,3,4,5,6,7]" v-bind:value="i" v-bind:content="i"> Categoria {{i}}</option>
    </select>
  </div>
  <div class="filter">
    <label > DURATION</label>
    <input class="filter--duration--slider" type="range" min="1" max="100" value="50">
  </div>
  <div class="filter">
    <label > DATE</label>
    <div class="dates">
      <label for="dateFrom">FROM</label>
      <label for="dateTo">TO</label>
      <input id = "dateFrom" type="number" min="1890" max="2023" ><input id="dateTo" type="number" min="1890" max="2023">
    </div>

  </div>
  <div class="filter">
    <label > SCORE</label>
    <input class="filter--duration--slider" type="range" min="0" max="10" value="5">
  </div>
  <div class="filter">
    <label for="language"> LANGUAGE</label>
    <select id="language">
      <option v-for="i in [1,2,3,4,5,6,7]" v-bind:value="i" v-bind:content="i"> language {{i}}</option>
    </select>
  </div>

</template>

<script>
export default {
  name: "filtersAside"
}
</script>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: 3px solid cornflowerblue;
  margin-bottom: 0;
}

label {
  margin-top: 0;
  margin-right: 1rem;
}
select{
  margin-top: .5rem;
}
.filter{
  padding-top: 1rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid cornflowerblue;
}
.filter--duration--slider{
  background-color: #2c3e50;
}
.dates{
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content min-content;
  margin-top: 1rem;
  column-gap:  1rem;
}
#dateTo{
  grid-row: 2;
  grid-column: 2;
  width: 3rem;
}
#dateFrom{
  grid-row: 2;
  grid-column: 1;
  width: 3rem;
}
.template-grid {
  justify-content: center;
  align-content: center;
  display: grid;
  grid-template-columns: repeat(8,180px);
  grid-gap: 15px;}
</style>