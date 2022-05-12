<template>
  <h1 class="main-title">Mastermind</h1>
  <GameBoard v-if="!end && !win" />
  <p class="message" v-else-if="end && !win">Perdu !</p>
  <p class="message" v-else>Gagné !</p>
  <button v-show="end || win" class="replay" @click="reset">Rejouer</button>
  <p class="round" v-show="!end && !win">Round {{ roundNumber }}</p>
  <ul class="previous-results" v-show="oldPropositions.length > 0">
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

const reset = () => {
  store.dispatch("reset");
};

onMounted(() => {
  store.dispatch("getNewAnswer");
});
</script>

<style lang="scss">
@use "@/styles/vars";

#app {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @include vars.desktop {
    justify-content: center;
  }
}
.replay {
  cursor: pointer;
  height: 60px;
  width: fit-content;
  padding: 0.5rem 1rem;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 3rem;
  background-color: chocolate;
  border: none;
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
    box-shadow: 1px 1px 10px orange;
  }
}
.main-title {
  font-size: 2rem;
  color: white;

  @include vars.desktop {
    top: 0;
    left: 2rem;
    position: absolute;
  }
}
.round {
  margin: 1rem;
  font-size: 1.5rem;
  color: white;
}
.previous-results {
  padding: 5px;
  margin: 0.5rem auto 0;
  list-style: none;
  background-color: #ffffff55;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;

  @include vars.desktop {
    position: absolute;
    right: 0;
    bottom: 0;
    overflow: auto;
    height: 50vh;
    border-top-right-radius: 0;
  }
}
.message {
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
}
</style>
