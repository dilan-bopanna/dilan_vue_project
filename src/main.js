import Vue from 'vue'
import vuetify from './plugins/vuetify';
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';
import Apps from './Layout/Wrappers/appLayout.vue';
import store from "./store";
import axios from "axios";
import moment from 'moment'
import VueI18n from 'vue-i18n'
import { languages, defaultLocale } from './assets/i18n/index.js';


const messages = Object.assign(languages)

Vue.use(VueI18n);

const i18n = new VueI18n({

    locale: defaultLocale,
    messages
})


document.documentElement.lang = defaultLocale;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

var date = localStorage.getItem("date_format");

if (date) {
    var date_format_dynamic = date.replace(/"/g, "");
} else {
    date_format_dynamic = "DD-MM-YYYY";

}

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format(date_format_dynamic)
    }
});
Vue.filter('formatDateTime', function(value) {
    if (value) {
        return moment(String(value)).format('DD-MM-YYYY hh:mm')
    }
});
Vue.filter('formatTime', function(value) {
    if (value) {
        return moment(String(value)).format('hh:mm')
    }
});

Vue.filter('striphtml', function(value) {
    var div = document.createElement("div");
    div.innerHTML = value;
    var text = div.textContent || div.innerText || "";
    return text;
});


Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);
Vue.component('apps-layout', Apps);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 422) {
            store.commit("setErrors", error.response.data.errors);
        } else if (error.response.status === 401) {
            store.commit("auth/setUserData", null);
            localStorage.removeItem("authToken");
            router.push({ name: "Login" });
        } else {
            return Promise.reject(error);
        }
    }
);

axios.interceptors.request.use(function(config) {
    config.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    };

    return config;
});

new Vue({
    el: '#app',
    router,
    vuetify,
    store,
    i18n,
    template: '<App/>',
    components: { App }
});