import Vuex from "vuex";
Vue.use(Vuex);

// 默认仓储
let store = {
    state: {
        post : {
            ID : '',
            post_mode: "tinymce",
            post_title: "",
            post_content: "",
            post_meta: {},
            post_excerpt: "",
            post_banner: "",
            post_tags: [],
            post_status : 'publish',
            post_type : '',
        },
        meta : {},
        extend: {
            feedEnable: false, 
            followEnable: false,
            tencentEnable: false,
            weiboEnable: false,
            tuilanEnable: false,
        },
    },
    mutations: {
        changeType : function (state, payload){
            state.post.post_type = payload;
        },
        changeStatus : function (state, payload){
            state.post.post_status = payload;
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
        editMeta: function(state, payload) {
            state.post.post_meta = payload;
        },
        editExcerpt: function(state, payload) {
            state.post.post_excerpt = payload;
        },
        editBanner: function(state, payload) {
            state.post.post_banner = payload;
        },
        editPost: function(state, payload) {
            state.post = payload;
        },
        editInfo: function(state, payload) {
            state.meta = payload;
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
