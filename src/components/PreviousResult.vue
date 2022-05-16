<template>
  <ul class="previous-results" v-show="oldPropositions.length > 0">
    <li
      class="single-proposition"
      v-for="(oldProposition, index) of oldPropositions"
      :key="index"
    >
      <ul class="single-proposition__colors">
        <li
          class="single-proposition__color"
          v-for="(color, index) in oldProposition.colors"
          :key="index"
          :style="{ 'background-color': color }"
        ></li>
      </ul>
      <p class="single-proposition__info">
        Il y a {{ oldProposition.wellPlaced }} couleur(s) bien placées
      </p>
      <p class="single-proposition__info">
        Il y a {{ oldProposition.misplaced }} couleur(s) mal positionnée(s)
      </p>
    </li>
  </ul>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const oldPropositions = computed(() => store.state.oldPropositions);
</script>

<style scoped lang="scss">
@use "@/styles/vars";

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

.single-proposition {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background-color: #ffffffd2;
  border-radius: 1rem;

  &__colors {
    display: flex;
    list-style: none;
    padding: 0;
    gap: 8px;
    margin: 0 0 0.5rem;
  }

  &__color {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }

  &__info {
    margin: 2px 0;
  }
}
</style>