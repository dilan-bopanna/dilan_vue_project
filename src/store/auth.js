import axios from "axios";

export default {
  namespaced: true,

  state: {
    userData: null
  },

  getters: {
    user: state => state.userData
  },

  mutations: {
    setUserData(state, user) {
      state.userData = user;
    }
  },

  actions: {
    getUserData({ commit }) {
      axios
        .get(process.env.VUE_APP_API_URL + "user")
        .then(response => {
          commit("setUserData", response.data);
          /* Temporary Fix */
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(() => {
          localStorage.removeItem("authToken");
        });
    },
    sendLoginRequest({ commit }, data) {
        //console.log('Send Login Request Function');
      commit("setErrors", {}, { root: true });
      return axios
        .post(process.env.VUE_APP_API_URL + "Login", data)
        .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data.userdata));
        });
    },
   
    sendLogoutRequest({ commit }) {
      axios.post(process.env.VUE_APP_API_URL + "logout").then(() => {
        commit("setUserData", null);
        localStorage.removeItem("authToken");
      });
    },
  
  }
};
