<script setup>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { shuffleFY } from '../assets/shuffleFY';
const props = defineProps({
    qData: Object
})
const emits = defineEmits(['user-answered'])
const qText = computed(() => props.qData.q)
let options = {}, tiles = [], i = 1;
for (let [left, right] of props.qData.pairs) {
    tiles.push(left, right)
    options[left] = { text: left, toMatch: right, class: 'mcq-option selectable', id: '' + left + i };
    options[right] = { text: right, toMatch: left, class: 'mcq-option selectable', id: '' + right + i };
    i++;
}
options.tiles = shuffleFY(tiles)
const cards = ref(options)

const leftToAnswer = ref(props.qData.pairs.length)
const firstTile = ref('')
const feedback = ref('')
const selectedCards = ref([])

const updateUserAnswer = (tile) => {
    console.log('react to click on', tile)
    if (cards.value[tile].class === 'mcq-option correct') { return }
    if (selectedCards.value.length % 2 === 0) {
        // if two cards are selected, unselect them
        for (let card of selectedCards.value) {
            cards.value[card].class = 'mcq-option selectable'
        }
        firstTile.value = tile
        cards.value[tile].class = 'mcq-option selected'
        selectedCards.value = [tile]
    } else {
        // only one card is selected, since we cannot get to 3 cards!
        // if the selected card was clicked, then unselect it and return
        if (cards.value[tile].class === 'mcq-option selected') {
            cards.value[tile].class = 'mcq-option selectable'
            firstTile.value = ''
            selectedCards.value = []
            return
        }
        if (tile === cards.value[firstTile.value].toMatch) {
            cards.value[firstTile.value].class = 'mcq-option correct'
            cards.value[tile].class = 'mcq-option correct'
            leftToAnswer.value--
            feedback.value = leftToAnswer.value === 0 ? 'Well done, you matched them all' : ''
            selectedCards.value = []
            console.log(tile, firstTile.value, 'is correct', leftToAnswer.value, 'left to answer')
        } else {
            cards.value[tile].class = 'mcq-option selected'
            feedback.value = `${tile} does not match ${firstTile.value}`
            selectedCards.value = [firstTile.value, tile]
            console.log(tile, firstTile.value, 'is wrong')
        }
        // firstTile.value = ''
    }
    if (leftToAnswer.value === 0) {
        emits('user-answered', {
            userWasCorrect: true
        })
    }
}
</script>

<template>
    <div id="q-space">
        <p>{{ qText }}</p>
        <p>Click a card to turn it over</p>
        <div id="mcq-option-list">
            <div
                v-for="tile in cards.tiles"
                v-bind:key="cards[tile].id"
                v-bind:class="cards[tile].class"
                v-on:click="updateUserAnswer(cards[tile].text)"
            >{{ cards[tile].text }}</div>
        </div>
        <p v-if="feedback !== ''">{{ feedback }}</p>
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
    color: transparent;
}
.correct {
    background: green;
    color: black;
}
.selected {
    background: rgb(245, 54, 54);
    color: black;
}
.disable {
    background-color: salmon;
    opacity: 0.5;
}
.selectable:hover {
    background: coral;
}
</style>