<script setup>
import MultipleChoiceQ from './components/multipleChoiceQ.vue';
import { dummyQs } from './assets/dummyQs';
// import { computed } from '@vue/reactivity';
import { ref } from '@vue/reactivity';
const currentQ = ref(0);
const respondToAns = (ans) => {
  console.log('Need to respond to answer:',ans);
  currentQ.value = (currentQ.value + 1) % 2
}
const nextQ = () => {
  currentQ.value = (currentQ.value + 1) % 2
}
const qTypes = {
  multiChoice: MultipleChoiceQ
}
</script>

<template>
  <component v-bind:is="qTypes[dummyQs[currentQ].qType]" v-bind:qData="dummyQs[currentQ]" v-on:user-answered="respondToAns"  />
  <!-- <MultipleChoiceQ v-if="dummyQs[currentQ].qType === 'multiChoice'" v-bind:qData="dummyQs[currentQ]" v-on:user-answered="respondToAns" /> -->
  <div>
    <p>I don't know how to display questions of type: {{dummyQs[currentQ].qType}}</p>
    <button v-on:click="nextQ">Next Q</button>
  </div>
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
