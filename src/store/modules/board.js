export const board = {
  state: {
    proposition: ['', '', '', '', ''],
    error: '',
    colorsPalletStatus: [true, true, true, true, true],
    isError: false,
  },

  getters: {},
  mutations: {
    toggleColorsList(state, colorNumber) {
      state.colorsPalletStatus[colorNumber] = !state.colorsPalletStatus[colorNumber];
    },

    changeColor(state, payload) {
      state.proposition[payload.index] = payload.color;
    },

    setError(state, payload) {
      state.error = payload.error;
    },

    toggleErrorStatus(state, status) {
      state.isError = status;
    },
  },

  actions: {
    submitGuess({ state, commit, dispatch }) {
      let colorNumber = 0;
      for (const color of state.proposition) {
        if (color === '') {
          commit('setError', { error: "Vous n'avez pas renseigné toute les couleurs" });
          commit('toggleErrorStatus', true);
          break;
        }
        colorNumber++;
      }

      if (colorNumber === state.proposition.length) {
        commit('toggleErrorStatus', false);
        commit('setError', { error: '' });
        dispatch('testProposition');
      }
    },
  },
};
