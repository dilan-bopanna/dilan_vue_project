import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: [],
    chatuserlists:[],
    chatmessages:[],
    assignmentdetails:[],
  },

  getters: {
    errors: state => state.errors,
    chatuserlists: state => {
      return state.chatuserlists
    },
    chatmessages: state => {
      return state.chatmessages
    },
    assignmentdetails: state => {
      return state.assignmentdetails
    },
  },

  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    },
    UPDATE_USER_LIST(state, chatuser) {
      //console.log(chatuser);
      state.chatuserlists.push(chatuser);
    },
    UPDATE_MESSAGES(state, chatmessage) {
      //console.log(chatmessage);
      state.chatmessages.push(chatmessage);
    },
    UPDATE_MESSAGES_FROM_PUSHERS(state, chatmessage) {
      //console.log(chatmessage);
      state.chatmessages[0].push(chatmessage);
    },
    STORE_ASSIGNMENT_DETAILS(state, assignmentdetails) {
      //console.log(assignmentdetails);
      state.assignmentdetails.push(assignmentdetails);
    },
    STORE_ASSIGNMENT_DETAILS_FORM_PUSHERS(state, assignmentdetails) {
      //console.log(assignmentdetails);
      state.assignmentdetails[0].push(assignmentdetails);
    },
  },

  actions: {},
  modules: {
    auth
  }
});
