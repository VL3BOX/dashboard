import { $cms } from "@jx3box/jx3box-common/js/https.js";
import axios from 'axios'
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
function getDecoration(params) {
    return $cms().get(`/api/cms/user/decoration`,{
        params
    });
}
function setDecoration(data) {
    return $cms().post(`/api/cms/user/decoration`,data);
}
function getDecorationJson(){
    let url = __imgPath + "decoration/index.json"
    return axios.get(url)
}
export {
    getDecoration,setDecoration,getDecorationJson
};