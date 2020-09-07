import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: [] as string[],
    showHistory: false,
    defaultPosition: {
      lat: -29.883333,
      lng: 31.049999,
      // Durban, South Africa
    } as google.maps.LatLngLiteral,
  },
  mutations: {
    addHistoryItem(state, record: string) {
      state.history = [
        record,
        ...state.history,
      ];
    },
    clearHistory(state) {
      state.history = [] as string[];
    },
    toggleHistory(state) {
      state.showHistory = !state.showHistory;
    },
    updateDefaultPosition(state, newPosition: google.maps.LatLngLiteral) {
      state.defaultPosition = newPosition;
    },
  },
  actions: {
    addHistoryItem(context, record: string) {
      context.commit('addHistoryItem', record);
    },
    clearHistory(context) {
      context.commit('clearHistory');
    },
    toggleHistory(context) {
      context.commit('toggleHistory');
    },
    updateDefaultPosition(context, newPosition: google.maps.LatLngLiteral) {
      context.commit('updateDefaultPosition', newPosition);
    },
  },
  modules: {
  },
  plugins: [new VuexPersistence().plugin],
});
