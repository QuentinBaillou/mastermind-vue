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
    rulesOpen: false,
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

    toggleRulesState(state) {
      state.rulesOpen = !state.rulesOpen;
    },

    reset(state) {
      state.oldPropositions.length = 0;
      state.win = false;
      state.end = false;
      state.roundNumber = 1;
      console.log('state fini');
      for (const index in state.board.proposition) {
        state.board.proposition[index] = '';
        state.board.colorsPalletStatus[index] = true;
      }
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

      commit('addProposition', proposition);

      if (state.roundNumber <= 12) {
        if (proposition.wellPlaced === 5) {
          commit('setWin', true);
        }
      } else {
        commit('setEnd', true);
      }

      console.log(state.answer);
    },

    reset({ commit, dispatch }) {
      dispatch('getNewAnswer');
      commit('reset');
    },
  },

  modules: {
    board,
  },
});
