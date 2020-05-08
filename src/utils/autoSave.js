import IDB from "@jx3box/jx3box-common/js/idb";
const _ = require("lodash");
const DB = new IDB();
const INTERVAL = 5000; //至少5秒才触发一次

function savePost(name, data) {
    let id = data.post.id || "草稿";
    let date = new Date().toUTCString();
    let key = id + "@" + date;

    DB.ready().then(() => {
        DB.setItem(`${name}[${key}]`, data);
    });
}

const autoSavePost = _.throttle(savePost, INTERVAL);

export { savePost, autoSavePost };
