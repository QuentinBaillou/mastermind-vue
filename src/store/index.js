import { createStore } from 'vuex';
import { giveRandomColors, test } from '@/utils/gameFunctions';
import { board } from './modules/board';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    answer: [],
    oldPropositions: [],
    roundNumber: 1,
    end: false,
    win: false,
  },

  getters: {},

  mutations: {
    setAnswer(state, answer) {
      state.answer = answer;
    },

    incrementRound(state) {
      state.roundNumber++;
    },

    addProposition(state, proposition) {
      state.oldPropositions.unshift(proposition);
    },

    setWin(state, status) {
      state.win = status;
    },

    setEnd(state, status) {
      state.end = status;
    },
  },

  actions: {
    getNewAnswer({ commit }) {
      commit('setAnswer', giveRandomColors());
    },

    testProposition({ state, commit }) {
      commit('incrementRound');
      const result = test(state.board.proposition, state.answer);

      const proposition = {
        colors: [...state.board.proposition],
        wellPlaced: result[0],
        misplaced: result[1],
      };

      console.log(proposition.colors);

      commit('addProposition', proposition);

      if (state.roundNumber <= 12) {
        if (proposition.wellPlaced === 5) {
          commit('setWin', true);
        }
      } else {
        commit('setEnd', true);
      }
    },
  },

  modules: {
    board,
  },
});
