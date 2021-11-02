<script setup>
import { ref } from 'vue';
import { shuffleFY } from '../assets/shuffleFY';
const props = defineProps({
    qData: Object
})
const emits = defineEmits(['user-answered'])
let itemList = []
for (let i = 0; i < props.qData.buckets.length; i++) {
    let bucket = props.qData.buckets[i]
    for (let item of props.qData.items[i]) {
        itemList.push({ name: item, belongsTo: bucket })
    }
}
itemList = shuffleFY(itemList)
console.log(itemList)
let qNumber = ref(0)
let currentItem = ref(itemList[0])
const bucketsText = props.qData.buckets.slice(0, -1).join(', ') + ' or ' + props.qData.buckets.slice(-1)
let feedbackList = ref([])
let answeredAll = ref(false)
const gotCorrect = ref(0)
const checkAns = (ans) => {
    let feedback = {
        text: `${currentItem.value.name} is ${ans}`,
        id: qNumber.value
    }
    feedback.status = ans === currentItem.value.belongsTo ? 'correct' : 'wrong'
    if (ans === currentItem.value.belongsTo) { gotCorrect.value++ }
    feedbackList.value = [feedback, ...feedbackList.value]
    qNumber.value = qNumber.value + 1
    if (qNumber.value < itemList.length) {
        currentItem.value = itemList[qNumber.value]
    } else {
        answeredAll.value = true
    }
}
const nextQ = () => {
    return {
        userWasCorrect: gotCorrect.value === itemList.length,
        correct: gotCorrect.value, wrong: itemList.length - gotCorrect.value
    }
}
</script>

<template>
    <div id="q-space">
        <h3 v-if="answeredAll">You got {{gotCorrect}} right out of {{itemList.length}}</h3>
        <div v-if="!answeredAll">
            <h2>Is {{ currentItem.name }} {{ bucketsText }}</h2>
            <div id="bucket-list">
                <div
                    v-for="bucket in props.qData.buckets"
                    v-bind:key="bucket"
                    class="bucket-option"
                    v-on:click="checkAns(bucket)"
                >{{ bucket }}</div>
            </div>
        </div>
        <div>
            <h4>Your answers</h4>
            <div
                v-for="fb in feedbackList"
                v-bind:key="fb.id"
                v-bind:class="fb.status"
            >{{ fb.text }}</div>
        </div>
        <button v-if="answeredAll" v-on:click="$emit('user-answered', nextQ())">Next Q</button>
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
#bucket-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.bucket-option {
    flex: 1 1 10px;
    margin: 5px;
    padding: 5px;
    width: auto;
    font-size: large;
    border-radius: 5%;
    background: white;
}
.correct {
    color: green;
}
.wrong {
    color: salmon;
}
.bucket-option:hover {
    background: coral;
}
</style>