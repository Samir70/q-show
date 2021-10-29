<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
const props = defineProps({
    qData: Object
})
const qText = computed(() => props.qData.question)
const userWasCorrect = ref(false);
const userAnswer = ref('');
// Fisher-Yates shuffle algorithm
const shuffleFY = arr => {
    let out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // number 0..i
        [out[i], out[j]] = [out[j], out[i]]
    }
    return out
}
const options = ref(
    shuffleFY([props.qData.answer, ...props.qData.wrongOptions]).map((x, i) => {
        return { text: x, id: i, class: 'mcq-option' }
    })
);

const checkAnswer = () => {
    let mark = '';
    let blandFB = 'You had a go!';
    if (props.qData.answer === userAnswer.value) {
        userWasCorrect.value = true;
        mark = 'Correct! '
        blandFB = 'Wow! Way to go!!!';
    } else {
        userWasCorrect.value = false;
        mark = 'Wrong! '
        blandFB = 'Shame! Maybe Next time!';
    }
    let extra = (props.qData.feedback || blandFB)
    return { status: userWasCorrect.value, mark, extra }
}
const updateUserAnswer = (a) => {
    console.log('received new answer:', a)
    userAnswer.value = a;
    for (let i of this.options) {
        i.class = i.text === a ? 'mcq-option selected' : 'mcq-option'
    }
}
</script>


/**
 * This will ask the question and provide up to 4 options.
 * Only one option can be the correct answer * 
 */

<template>
    <div>
        <p>{{ qText }}</p>
        <div id="mcq-option-list">
            <div
                v-for="item in options"
                v-bind:key="item.id"
                v-bind:class="item.class"
                v-on:click="updateUserAnswer(item.text)"
            >{{ item.text }}</div>
        </div>
        <button v-on:click="checkAnswer; $emit('user-answered', checkAnswer())">Check Answer</button>
    </div>
</template>
