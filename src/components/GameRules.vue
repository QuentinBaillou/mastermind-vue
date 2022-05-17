<template>
  <div class="game-rules">
    <h2 class="game-rules__title">But du jeu !</h2>
    <p class="game-rules__text">
      Le but du jeu est de retrouver la combinaison de trois couleurs proposées
      par l'ordinateur. Celui-ci nous donnera des indications sur les couleurs
      bien et mal placées à chaque étape. Vous avez 12 tours. Bonne chance !
    </p>
    <h2 class="game-rules__title">Comment jouer ?</h2>
    <p class="game-rules__text">
      Il suffit de cliquer sur un des ronds pour déployer la palette de
      couleurs, puis cliquer sur une des couleurs pour modifier la proposition.
      Il suffit ensuite de faire "Guess !" pour faire une proposition, et passer
      au tour suivant.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.game-rules {
  background-color: #ffffffd2;
  margin-top: 0.5rem;
  border-radius: 1rem;
  padding: 0.5rem;
  &__text {
    margin: 0;
  }
}
</style>