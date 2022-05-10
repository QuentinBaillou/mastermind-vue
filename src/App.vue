<template>
  <GameBoard @propose="propose" />
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

onMounted(() => {
  answer.value = giveRandomColors();
  console.log(answer.value);
});

function propose(data) {
  console.log(data);
  const result = test([...data], answer.value);
  console.log(result);
  const proposition = {
    colors: [...data],
    wellPlaced: result[0],
    misplaced: result[1],
  };
  oldPropositions.value.unshift(proposition);
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.previous-result {
  height: 50vh;
  overflow: auto;
  padding: 0;
  margin: 2rem auto;
  list-style: none;
}
</style>
