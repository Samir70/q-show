<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import MultipleChoiceQ from './components/multipleChoiceQ.vue';
import { dummyQs } from './assets/dummyQs';
</script>

<template>
  <MultipleChoiceQ v-bind:qData="dummyQs[1]" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background: #cff;
  display: grid;
  place-items: center;
  width: 95%;
  height: 100%;
  margin: 0px;
  padding: 5px;
  color: black;
}
</style>
