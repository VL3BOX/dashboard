import { $next, $server } from "@jx3box/jx3box-common/js/axios";
import { $ } from "./axios";
import { __next, __Root, __server } from "@jx3box/jx3box-common/js/jx3box.json";
// import { __next, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
// const __server = 'http://localhost:5160/'

// 文章
function createPost(data) {
    return $server.post("server/jx3dat/", data)
    // return $.post(__server + "server/jx3dat", data)
}
function updatePost(id, data) {
    return $server.put(`server/jx3dat/${id}`, data);
    // return $.put(__server + `server/jx3dat/${id}`, data);
}
function hasFeed(){
    return $server.get(`server/jx3dat/feed/has`);
    // return $.get(__server + 'server/jx3dat/feed/has')
}

// 上传
function uploadData(formdata, vm) {
    return $.post(__server + "upload/data", formdata);
}
function uploadHub(formdata) {
    return $next.post("/api/plugins/my-team-mon/v2", formdata);
}

// 云端
function syncRedis(data) {
    let redisData = transferForRedis(data);
    console.log("正在执行redis同步作业:", redisData);
    return $next.post("api/plugins/jx3dat/publish", redisData);
}

function transferForRedis(data) {
    let author = data.author;
    let pid = data.ID;

    let _ = {
        author: author,
        user_id: ~~data.post_author || 0,
        post_id: pid,
        post_status: data.post_status,
        data: {},
        lang: data.post_meta.lang,
        original: data.original,
    };

    data.post_meta.data.forEach((item, i) => {
        _.data[item.name] = {
            author: author,
            key: item.name,

            name: item.desc,
            version: item.version || Date.now(),

            data_url: item.file,
            about: __Root + "jx3dat/" + pid,
            status: item.status,
        };
    });

    return _;
}

export { uploadHub, uploadData, syncRedis, updatePost, createPost,hasFeed };
