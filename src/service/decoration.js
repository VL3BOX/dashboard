import { $cms } from "@jx3box/jx3box-common/js/https.js";
import axios from "axios";
import { __imgPath, __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";
function getDecoration(params) {
    return $cms().get(`/api/cms/user/decoration`, {
        params,
    });
}
function setDecoration(data) {
    return $cms().post(`/api/cms/user/decoration`, data);
}
function getDecorationJson() {
    let url = __imgPath + "decoration/index.json";
    return axios.get(url);
}
function getEmotion() {
    return axios.get(`${__dataPath}emotion/output/catalog.json`);
}
function receive(user_id, val) {
    return $cms().post(`/api/cms/user/decoration/check-suit/${user_id}/${val}/for/avatar`);
}

function updateAvatarFrame(data) {
    return $cms().put("/api/cms/user/my/avatar-frame", data);
}
export { getDecoration, setDecoration, getDecorationJson, getEmotion, receive, updateAvatarFrame };
