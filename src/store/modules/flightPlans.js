import Vue from 'vue';

const state = {
  list: []
};

const getters = {
  nextId: (state) => {
    return state.list.length === 0
      ? 1
      : Math.max(...state.list.map(flightPlan => flightPlan.id)) + 1;
  }
};

const mutations = {
  SET_POINTS: (state, { id, points }) => {
    const index = state.list.findIndex(flightPlan => flightPlan.id === id);

    if (index >= 0) {
      state.list[index].points = points;
      Vue.set(state.list, state.list[index].points, points);
    }
  },
  NEW_FLIGHT_PLAN: (state, id) => {
    state.list.push({
      id,
      creationTimestamp: Date.now(),
      points: []
    });
  },
  DELETE_FLIGHT_PLAN: (state, id) => {
    const index = state.list.findIndex(flightPlan => flightPlan.id === id);

    if (index >= 0) {
      state.list.splice(index, 1);
    }
  }
};

const actions = {
  createFlightPlan({ commit, getters }) {
    const id = getters.nextId;
    commit('NEW_FLIGHT_PLAN', id);

    return id;
  },
  deleteFlightPlan({ commit }, flightPlanId) {
    commit('DELETE_FLIGHT_PLAN', flightPlanId);
  },
  savePoints({ commit }, { id, points }) {
    commit('SET_POINTS', { id, points });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
