import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    year: null,
    selectedTeam: null,
  },
  mutations: {
    updateYear(state, year) {
      state.year = year;
    },

    updateSelectedTeam(state, selectedTeam) {
      state.selectedTeam = selectedTeam;
    },
  },
  actions: {
  },
  getters: {
    getYear(state) {
      return state.year;
    },

    getSelectedTeam(state) {
      return state.selectedTeam;
    },
  },
  modules: {
  },
});
