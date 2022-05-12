<template>
  <div class="container">
    <h2 class="title">Votre proposition :</h2>
    <ul class="game-board">
      <li
        class="game-board__proposition"
        v-for="(guessedColor, colorIndex) in proposition"
        :key="colorIndex"
        @click="toggleColorsList(colorIndex)"
      >
        <div
          class="game-board__guessed-color"
          :style="{
            'background-color': guessedColor,
            'box-shadow': `1px 1px 10px ${guessedColor}`,
          }"
        ></div>
        <ul
          class="game-board__guess-colors"
          v-show="colorsPalletStatus[colorIndex]"
        >
          <li v-for="(color, index) in colorsArray" :key="index">
            <button
              :style="{ 'background-color': color }"
              @click="changeColor(color, colorIndex)"
            ></button>
          </li>
        </ul>
      </li>
    </ul>
    <p v-show="isError" class="error">{{ error }}</p>
    <button @click="submitGuess" class="game-board__guess">Guess !</button>
  </div>
</template>


<script setup>
import colorsArray from "@/utils/colors";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const proposition = computed(() => store.state.board.proposition);
const colorsPalletStatus = computed(() => store.state.board.colorsPalletStatus);
const error = computed(() => store.state.board.error);
const isError = computed(() => store.state.board.isError);

const toggleColorsList = (colorIndex) =>
  store.commit("toggleColorsList", colorIndex);

const changeColor = (color, index) =>
  store.commit("changeColor", { index, color });

const submitGuess = () => store.dispatch("submitGuess");
</script>


<style lang="scss" scoped>
  .container {
    position: relative;
    min-height: 522px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
.title {
  margin: 1rem 0;
  font-size: 1.5rem;
  color: white;
}
.game-board {
  display: flex;
  flex-grow: 1;
  margin: 0;
  gap: 1rem;
  list-style: none;
  padding: 0;

  &__proposition {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  &__guessed-color {
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #ffffff72;

    &:hover {
      background-color: #ffffffd1;
    }
  }

  &__guess-colors {
    position: absolute;
    top: 58px;
    background-color: rgba($color: #fff, $alpha: 0.2);
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    list-style: none;
    border-radius: 20px;

    & li button {
      cursor: pointer;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  &__guess {
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
}

.error {
  margin-top: 270px;
  color: #fff;
  font-size: 1.2rem;
}
</style>