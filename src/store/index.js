import { createStore } from "vuex";

export default createStore({
  state: {
    user: sessionStorage.getItem("user"),
    userType: sessionStorage.getItem("userType"),
  },
  mutations: {
    setUser(state, user) {
      sessionStorage.setItem("user", user);
    },  
    setUserType(state, userType) {
      sessionStorage.setItem("userType", userType);
    },
  },
  actions: {
    setUser: ({ commit }, user) => commit("setUser", user),
    setUserType: ({ commit }, userType) => commit("setUserType", userType),
  },
  modules: {},
});
