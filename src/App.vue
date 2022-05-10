<template>
  <h1 class="main-title">Mastermind</h1>
  <GameBoard @propose="propose" v-if="!end && !win"/>
  <p class="message" v-else-if="end && !win">Perdu !</p>
  <p class="message" v-else>Gagné !</p>
  <p class="round" v-show="!end && !win">Round {{ roundNumber }}</p>
  <ul class="previous-result">
    <SinglePreviousResult
      v-for="(oldProposition, index) of oldPropositions"
      :key="index"
      :colors="oldProposition.colors"
      :misplaced="oldProposition.misplaced"
      :wellplaced="oldProposition.wellPlaced"
    />
  </ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { giveRandomColors, test } from "@/utils/gameFunctions";
import "./styles/style.scss";
import GameBoard from "./components/GameBoard.vue";
import SinglePreviousResult from "./components/SinglePreviousResult.vue";

const answer = ref([]);
const oldPropositions = ref([]);
const roundNumber = ref(1);
const end = ref(false);
const win = ref(false);

onMounted(() => {
  answer.value = giveRandomColors();
  console.log(answer.value);
});

function propose(data) {
  roundNumber.value++;
  const result = test([...data], answer.value);

  const proposition = {
    colors: [...data],
    wellPlaced: result[0],
    misplaced: result[1],
  };

  oldPropositions.value.unshift(proposition);

  if (roundNumber.value <= 12) {
    if (proposition.wellPlaced === 5) {
      win.value = true;
    }
  } else {
    end.value = true;
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0d1117;
}
.main-title {
  position: absolute;
  left: 1rem;
  color: white;
}
.round {
  position: absolute;
  bottom: calc(40vh + 2rem);
  font-size: 1.5rem;
  color: white;
}
.previous-result {
  position: absolute;
  bottom: 1rem;
  height: 40vh;
  overflow: auto;
  padding: 0;
  margin: 2rem auto;
  list-style: none;
}
.message {
  color: white;
  font-size: 3rem;
}
</style>
