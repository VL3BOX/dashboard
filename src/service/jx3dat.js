import { $next } from "@jx3box/jx3box-common/js/axios";
import { $ } from "./axios";
import { __next, __Root, __server } from "@jx3box/jx3box-common/js/jx3box.json";
const plugins = __next + "api/plugins/my-team-mon/v2";
// const plugins = "/api/plugins/my-team-mon/v2"
const feed = __next + "api/plugins/jx3dat/publish";
// const feed = "/api/plugins/jx3dat/publish"

function uploadHub(formdata) {
    return $next.post("/api/plugins/my-team-mon/v2", formdata);
}

function uploadData(formdata, vm) {
    return $.post(__server + "upload/data", formdata);
}

function syncRedis(data, vm) {
    let redisData = transferForRedis(data);
    console.log("正在执行redis同步作业:", redisData);
    return $.post(feed, redisData);
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
            about: __Root + "jx3dat/?pid=" + pid,
            status: item.status,
        };
    });

    return _;
}

export { uploadHub, uploadData, syncRedis };
