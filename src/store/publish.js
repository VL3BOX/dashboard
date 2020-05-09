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
            post_excerpt: "",
            post_banner: "",
            post_status : 'publish',
            post_type : ''
            // tags: [],
        },
        meta : {},
        extend: {
            feedEnable: false,
            followEnable: false,
            weiboEnable: false,     //TODO:格式化至微博头条
            tuilanEnable: false,    //TODO:格式化至推栏
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
        editPost: function(state, payload) {
            state.post = payload;
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
