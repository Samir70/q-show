<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { shuffleFY } from '../assets/shuffleFY';
const props = defineProps({
    qData: Object
})
const emits = defineEmits(['user-answered'])
const qText = computed(() => props.qData.q)
const userWasCorrect = ref(false);
const waitForAns = ref(true);
const options = ref(
    shuffleFY([props.qData.a, ...props.qData.wrongOptions]).map((x, i) => {
        return { text: x, id: i, class: 'mcq-option selectable' }
    })
);

const updateUserAnswer = (userAns) => {
    if (!waitForAns.value) {return}
    console.log('received new answer:', userAns)
    userWasCorrect.value = props.qData.a === userAns
    waitForAns.value = false;
    for (let i of options.value) {
        i.class = i.text === props.qData.a ? 'mcq-option correct' 
            : i.text === userAns ? 'mcq-option wrong' : 'mcq-option disable'
    }
    emits('user-answered', {
        userWasCorrect: userWasCorrect.value 
    })
}
</script>


/**
 * This will ask the question and provide up to 4 options.
 * Only one option can be the correct answer * 
 */

<template>
    <div id="q-space">
        <p>{{ qText }}</p>
        <div id="mcq-option-list">
            <div
                v-for="item in options"
                v-bind:key="item.id"
                v-bind:class="item.class"
                v-on:click="updateUserAnswer(item.text)"
            >{{ item.text }}</div>
        </div>
        <div v-if="!waitForAns">
            <p>{{props.qData.feedback || (userWasCorrect ? 'Correct!' : 'Wrong!')}}</p>
        </div>
    </div>
</template>

<style scoped>
#q-space {
    background: #cff;
    border: 2px solid #6ff;
    border-radius: 5%;
    text-align: center;
    /* height: 100vh; */
    width: 90vw;
    max-width: 480px;
}
#mcq-option-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.mcq-option {
    flex: 1 1 150px;
    margin: 5px;
    padding: 5px;
    font-size: large;
    border-radius: 5%;
    background: white;
}
.correct {
    background: green;
}
.wrong {
    background: rgb(245, 54, 54);
}
.disable {
    background-color: salmon;
    opacity: 0.5;
}
.selectable:hover {
    background: coral;
}
</style>
