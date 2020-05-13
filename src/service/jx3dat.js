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

export { uploadHub ,uploadData};
