import Vuex from "vuex";
Vue.use(Vuex);

// 默认仓储
let store = {
    state: {
        post : {
            ID : '',
            post_mode: "tinymce",
            post_title: "",
            post_post_content: "",
            post_excerpt: "",
            post_banner: "",
            tags: [],
        },
        meta : {},
        extend: {
            feedEnable: false,
            followEnable: false,
            weiboEnable: false,
            tuilanEnable: false,
        },
    },
    mutations: {
        changeID : function (state,payload){
            state.post.ID = payload
        },
        changeMode: function(state, payload) {
            state.post.post_mode = payload;
        },
        editTitle: function(state, payload) {
            state.post.post_title = payload;
        },
        editContent: function(state, payload) {
            state.post.post_content = payload;
        },
        editExcerpt: function(state, payload) {
            state.post.post_excerpt = payload;
        },
        editBanner: function(state, payload) {
            state.post.post_banner = payload;
        },
        editMeta: function(state, payload) {
            state.meta = payload;
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
