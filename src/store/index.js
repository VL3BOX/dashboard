/*
 * @Author: iRuxu
 * @Date: 2022-06-11 22:14:43
 * @LastEditTime: 2022-06-11 22:15:10
 * @Description:
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = {
    state: {
        userdata : '',
        client : location.href.includes('origin') ? 'origin' : 'std'
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
