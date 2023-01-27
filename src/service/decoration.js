import { $cms } from "@jx3box/jx3box-common/js/https.js";
import axios from 'axios'
import { __imgPath, __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";
function getDecoration(params) {
    return $cms().get(`/api/cms/user/decoration`, {
        params
    });
}
function setDecoration(data) {
    return $cms().post(`/api/cms/user/decoration`, data);
}
function getDecorationJson() {
    let url = __imgPath + "decoration/index.json"
    return axios.get(url)
}
function getEmotion(){
    return axios.get(`${__dataPath}emotion/output/catalog.json`);
}
export {
    getDecoration, setDecoration, getDecorationJson, getEmotion
};
