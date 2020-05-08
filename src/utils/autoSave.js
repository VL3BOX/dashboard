import IDB from "@jx3box/jx3box-common/js/idb";
const _ = require("lodash");
const DB = new IDB();
const INTERVAL = 5000; //至少5秒才触发一次

function savePost(name, data) {
    let id = data.post.ID || '-';
    let title = data.post.post_title
    let date = new Date().toUTCString();

    DB.ready().then(() => {
        DB.setItem(`【${name} -> ${id}】${title} @ ${date}`, data);
    });
}

const autoSavePost = _.throttle(savePost, INTERVAL);

export { DB , savePost, autoSavePost };
