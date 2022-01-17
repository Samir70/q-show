<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
const props = defineProps({
    qData: Object
})
const emits = defineEmits(['user-answered'])
const qText = computed(() => props.qData.q)
const userAns = ref('');
const userWasCorrect = ref(false);
const waitForAns = ref(true);

const checkAnswer = () => {
    waitForAns.value = false
    userWasCorrect.value = userAns.value === '' + props.qData.a.replace(/`/g, '')
    emits('user-answered', {
        userWasCorrect: userWasCorrect.value,
        userAns: userAns.value,
        qAns: props.qData.a
    })
}
</script>

<template>
    <div id="q-space">
        <p>{{ qText }}</p>
        <div v-if="waitForAns">
            <input type="text" v-model="userAns" />
            <button v-on:click="checkAnswer">Check Answer</button>
        </div>
        <div v-else>
            <p>{{ userAns }} is {{ userWasCorrect ? 'Correct!' : 'Wrong!' }}</p>
        </div>
    </div>
</template>

<style scoped>
#q-space {
    background: rgb(153, 238, 153);
    border: 2px solid #6ff;
    border-radius: 5%;
    text-align: center;
    /* height: 100vh; */
    width: 90vw;
    max-width: 480px;
}
</style>
