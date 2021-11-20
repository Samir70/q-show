<script setup>
import ClassifyQ from './components/ClassifyQ.vue';
import MatchQ from './components/MatchQ.vue';
import MultipleChoiceQ from './components/multipleChoiceQ.vue';
import ShortAnswer from './components/ShortAnswer.vue';
import SortQ from './components/SortQ.vue';
import { dummyQs } from './assets/dummyQs';
// import { computed } from '@vue/reactivity';
import { ref } from '@vue/reactivity';
const currentQ = ref(5);
const score = ref(0)
const respondToAns = (ans) => {
  console.log('Need to respond to answer:', ans);
  score.value += ans.userWasCorrect ? 1 : 0
}
const nextQ = () => {
  currentQ.value = (currentQ.value + 1) % 6
}
const qTypes = {
  classify: ClassifyQ,
  match: MatchQ,
  multiChoice: MultipleChoiceQ,
  shortAnswer: ShortAnswer,
  sort: SortQ
}
</script>

<template>
  <component
    v-bind:is="qTypes[dummyQs[currentQ].qType]"
    v-bind:qData="dummyQs[currentQ]"
    v-on:user-answered="respondToAns"
    v-bind:key="currentQ"
  />
  <!-- <MultipleChoiceQ v-if="dummyQs[currentQ].qType === 'multiChoice'" v-bind:qData="dummyQs[currentQ]" v-on:user-answered="respondToAns" /> -->
  <div>
    <p>Current qType: {{ dummyQs[currentQ].qType }}</p>
    <p>Score: {{score}}</p>
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
