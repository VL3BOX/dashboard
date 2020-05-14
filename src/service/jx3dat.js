import { $ } from "./axios";
// import { JX3BOX } from "@jx3box/jx3box-common";
// const API = JX3BOX.__hub;

function uploadHub(formdata) {
    return fetch("api/plugins/my-team-mon", {
        method: "POST",
        body: formdata,
        redirect: "follow",
    })
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}

function uploadData(formdata){
    return $.post('upload/data',formdata)
}

// TODO:同时发布到只读hub redis
function publishToRedis(user,data){
    let mergedData = transferForRedis(user,data)
    console.log(JSON.stringify(mergedData))
    // 返回promise
}

function transferForRedis(user,data){
    let _ = {
        author : user.name,
        user_id : user.uid,
        post_id : data.ID,
        data : data.post_meta.data
    }
    return _
}

export { uploadHub ,uploadData,publishToRedis};
