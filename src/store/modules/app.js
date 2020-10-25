const state = {
  mapLocation: {
    center: [46.5208, 6.6304], // Center on Lausanne by default. latLng format
    zoom: 13
  }
};

const getters = {
};

const mutations = {
  SAVE_MAP_CENTER: (state, payload) => {
    state.mapLocation.center = payload;
  },
  SAVE_MAP_ZOOM: (state, payload) => {
    state.mapLocation.zoom = payload;
  }
};

const actions = {
  saveMapCenter({ commit }, loc) {
    let { lat, lng } = loc;
    // Remove uneeded precision
    lng = parseFloat(lng.toFixed(4));
    lat = parseFloat(lat.toFixed(4));
    commit('SAVE_MAP_CENTER', [lat, lng]);
  },
  saveMapZoom({ commit }, zoom) {
    commit('SAVE_MAP_ZOOM', zoom);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
