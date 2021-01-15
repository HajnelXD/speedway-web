import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    year: null,
    selectedTeam: null,
    selectedHostRider: null,
    selectedGuestRider: null,
  },
  mutations: {
    updateYear(state, year) {
      state.year = year;
    },

    updateSelectedTeam(state, selectedTeam) {
      state.selectedTeam = selectedTeam;
    },

    updateSelectedHostRider(state, selectedRider) {
      state.selectedHostRider = selectedRider;
    },

    updateSelectedGuestRider(state, selectedRider) {
      state.selectedGuestRider = selectedRider;
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

    getSelectedHostRider(state) {
      return state.selectedHostRider;
    },

    getSelectedGuestRider(state) {
      return state.selectedGuestRider;
    },
  },
  modules: {
  },
});
