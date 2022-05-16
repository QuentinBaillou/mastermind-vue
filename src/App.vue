<template>
  <header class="header">
    <h1 class="main-title">Mastermind</h1>
    <button class="main-button home-page-button" @click="toggleRules">
      Règles
    </button>
    <GameRules v-show="rulesOpen" />
  </header>
  <GameBoard v-if="!end && !win" />
  <p class="message" v-else-if="end && !win">Perdu !</p>
  <p class="message" v-else>Gagné !</p>
  <button
    v-show="end || win"
    class="main-button home-page-button"
    @click="reset"
  >
    Rejouer
  </button>
  <p class="round" v-show="!end && !win">Round {{ roundNumber }}</p>
  <PreviousResult />
</template>

<script setup>
import { computed, onMounted } from "vue";
import "./styles/style.scss";
import GameBoard from "./components/GameBoard.vue";
import PreviousResult from "./components/PreviousResult.vue";
import GameRules from "./components/GameRules.vue";
import { useStore } from "vuex";

const store = useStore();

const roundNumber = computed(() => store.state.roundNumber);
const win = computed(() => store.state.win);
const end = computed(() => store.state.end);
const rulesOpen = computed(() => store.state.rulesOpen);

const reset = () => {
  store.dispatch("reset");
};

const toggleRules = () => {
  store.commit("toggleRulesState");
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
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 320px;
  @include vars.desktop {
    width: 320px;
    top: 0;
    left: 1rem;
    position: absolute;
  }
}
.main-title {
  font-size: 2rem;
  color: white;
}
.round {
  margin: 1rem;
  font-size: 1.5rem;
  color: white;
}

.message {
  color: white;
  font-size: 3rem;
  margin: 1rem 0;
}

.home-page-button {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 3rem;
}
</style>
