<template>
  <li class="single-proposition">
    <ul class="single-proposition__colors">
      <li
        class="single-proposition__color"
        v-for="(color, index) in colors"
        :key="index"
        :style="{ 'background-color': color }"
      ></li>
    </ul>
    <p class="single-proposition__info">
      Il y a {{ wellplaced }} couleur(s) bien placées
    </p>
    <p class="single-proposition__info">
      Il y a {{ misplaced }} couleur(s) mal positionnée(s)
    </p>
  </li>
</template>

<script setup>
defineProps({
  colors: {
    type: Array,
    required: true,
  },
  wellplaced: {
    type: Number,
    required: true,
  },
  misplaced: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="scss">
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