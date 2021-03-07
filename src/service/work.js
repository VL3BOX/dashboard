import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
import { installNextInterceptors } from "@jx3box/jx3box-common/js/axios";
const $cms = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __server : "/",
});
installNextInterceptors($cms);

function getWorks(query) {
    return $cms.get("cms/my/post", {
        params: query,
    });
}

function delPost(id) {
    return $cms.delete(`/cms/my/post/${id}`);
}

function checkPost(id,status) {
    return $cms.put(`/cms/my/post/${id}/check`, {
        status,
    });
}

export { getWorks, delPost, checkPost };
