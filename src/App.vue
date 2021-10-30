<script setup>
import MultipleChoiceQ from './components/multipleChoiceQ.vue';
import { dummyQs } from './assets/dummyQs';
// import { computed } from '@vue/reactivity';
import { ref } from '@vue/reactivity';
const currentQ = ref(dummyQs[1]);
const showQ = ref(true);
const userAns = ref({})
const respondToAns = (ans) => {
  console.log('Need to respond to answer:',ans);
  showQ.value = false
  userAns.value = ans
}
const nextQ = () => {
  currentQ.value = dummyQs[1]
  showQ.value = true
}
</script>

<template>
  <MultipleChoiceQ v-if="showQ" v-bind:qData="currentQ" v-on:user-answered="respondToAns" />
  <div v-else >
    <p>You answered the question! And I knew about it! Yay!!!</p>
    <p>You were {{userAns.status ? 'correct' : 'wrong'}}!</p>
    <p>{{userAns.extra}}</p>
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
