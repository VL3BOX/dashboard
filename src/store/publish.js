import Vuex from "vuex";
Vue.use(Vuex);

// 默认仓储
let default_state = {
    mode: "tinymce",
    title: "",
    content: "",
    excerpt: "",
    banner: "",
    tags: [],
    info : {},
    notify: {
        feedEnable: false,
        followEnable: false,
        weiboEnable: false,
        tuilanEnable: false,
    },
};

let store = {
    state: {
        mode: "tinymce",
        title: "",
        info : {},
        content: "",
        excerpt: "",
        banner: "",
        tags: [],
        notify: {
            feedEnable: false,
            followEnable: false,
            weiboEnable: false,
            tuilanEnable: false,
        },
    },
    mutations: {
        changeMode: function(state, payload) {
            state.mode = payload;
        },
        editTitle: function(state, payload) {
            state.title = payload;
        },
        editInfo: function(state, payload) {
            state.info = payload;
        },
        editContent: function(state, payload) {
            state.content = payload;
        },
        editExcerpt: function(state, payload) {
            state.excerpt = payload;
        },
        editBanner: function(state, payload) {
            state.banner = payload;
        },
        reset: function(state) {
            state = default_state;
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
