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
    <button
      @click="submitGuess"
      class="game-board__guess"
    >
      Guess !
    </button>
  </div>
</template>


<script setup>
import { computed, ref, defineEmits, defineProps } from "vue";
import colorsArray from "@/utils/colors";

const emit = defineEmits(["propose"]);
const error = ref("");
const proposition = ref(["", "", "", "", ""]);
const colorsPalletStatus = ref([true, true, true, true, true]);

// Display or hide list of color under proposition
function toggleColorsList(colorNumber) {
  colorsPalletStatus.value[colorNumber] =
    !colorsPalletStatus.value[colorNumber];
}

// Return true or false, depending on if there is an error message or not
const isError = computed(() => error.value.length !== 0);

// Change the color of targeted guessed color
function changeColor(color, index) {
  proposition.value[index] = color;
}

// Check if a color is missing and emit the result
function submitGuess() {
  for (const color of proposition.value) {
    if (color === "") {
      error.value = "Vous n'avez pas indiqué toute les couleurs";
      return false;
    }
  }

  error.value = "";
  console.log("emit");
  emit("propose", proposition.value);
}
</script>


<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  margin: 1rem;
  color: white;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-board {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;

  &__proposition {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
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
    position: absolute;
    right: -8rem;
    top: 65px;
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
  color: #fff;
  font-size: 1.2rem;
}
</style>