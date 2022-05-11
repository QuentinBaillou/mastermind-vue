<template>
  <h1 class="main-title">Mastermind</h1>
  <GameBoard v-if="!end && !win" />
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
import { computed, onMounted } from "vue";
import "./styles/style.scss";
import GameBoard from "./components/GameBoard.vue";
import SinglePreviousResult from "./components/SinglePreviousResult.vue";
import { useStore } from "vuex";

const store = useStore();

const roundNumber = computed(() => store.state.roundNumber);
const oldPropositions = computed(() => store.state.oldPropositions);
const win = computed(() => store.state.win);
const end = computed(() => store.state.end);

onMounted(() => {
  store.dispatch("getNewAnswer");
});
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
  margin: 1rem;
  font-size: 1.5rem;
  color: white;
}
.previous-result {
  flex-grow: 1;
  height: 40vh;
  padding: 0;
  margin: 0 auto;
  overflow: auto;
  list-style: none;
}
.message {
  color: white;
  font-size: 3rem;
}
</style>
