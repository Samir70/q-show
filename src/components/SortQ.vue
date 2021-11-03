<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { shuffleFY } from '../assets/shuffleFY';
const props = defineProps({
    qData: Object
})
const emits = defineEmits(['user-answered'])
const qText = computed(() => props.qData.q)
const ordered = computed(() => [...props.qData.a])
const mixed = ref(shuffleFY(props.qData.a))
const userAns = ref([])
const ansChecked = ref(false)
const userWasCorrect = ref(false)
let options = {}, i = 1;
for (let item of props.qData.a) {
    options[item] = { text: item, class: 'sort-option selectable', id: item + '-' + i };
    i++;
}
const cards = ref(options)
const selectCard = (item) => {
    if (cards.value[item].class === "sort-option disable") {return} 
    cards.value[item].class = "sort-option disable"
    userAns.value.push(item)
}
const deselectCard = (item) => {
    cards.value[item].class = "sort-option selectable"
    userAns.value = userAns.value.filter(a => a !== item)
}
const checkAns = () => {
    userWasCorrect.value = true
    for (let i = 0; i < userAns.value.length; i++) {
        if (userAns.value[i] === ordered.value[i]) {
            cards.value[userAns.value[i]].class = 'sort-option correct'
        } else {
            userWasCorrect.value = false
            cards.value[userAns.value[i]].class = 'sort-option wrong'
        }
    }
    ansChecked.value = true
}
const nextQ = () => {
    return { userWasCorrect: userWasCorrect.value }
}
</script>

<template>
    <div id="q-space">
        <p>{{ qText }}</p>
        <div id="sort-answer-list">
            <div
                v-for="item of userAns"
                v-bind:key="cards[item].id"
                v-bind:class="ansChecked ? cards[item].class : 'sort-option selected'"
                v-on:click="deselectCard(item)"
            >{{ cards[item].text }}</div>
        </div>
        <div id="sort-option-list" v-if="!ansChecked">
            <div
                v-for="item of mixed"
                v-bind:key="cards[item].id"
                v-bind:class="cards[item].class"
                v-on:click="selectCard(item)"
            >{{ cards[item].text }}</div>
        </div>
        <button v-if="userAns.length === ordered.length && !ansChecked" v-on:click="checkAns">Check Answer</button>
        <p v-if="ansChecked">You {{userWasCorrect ? 'successfully' : 'failed to'}} put in the correct order</p>
        <p v-if="ansChecked && !userWasCorrect">Correct order: {{ordered.join(', ')}}</p>
        <button v-if="ansChecked" v-on:click="$emit('user-answered', nextQ())">Next Q</button>
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
#sort-option-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
#sort-answer-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 30px;
    border: 1px solid black;
}
.sort-option {
    flex: 1 1 10px;
    margin: 5px;
    padding: 5px;
    width: auto;
    font-size: large;
    border-radius: 5%;
    background: white;
}
.correct {
    background: green;
}
.wrong {
    background: salmon;
}
.disable {
    background-color: grey;
    opacity: 0.5;
}
.selectable:hover {
    background: coral;
}
</style>