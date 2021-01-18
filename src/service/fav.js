import { $http } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

const qs = require("qs");

function getMyFavs(query) {
    return $http.get(`/api/my/post/favorites`, {
        params: query,
    });
}

function delFav(post_type, post_id) {
    if (post_type && post_id) {
        return $http.post(`/api/post/favorite`, qs.stringify({
            post_type: post_type,
            post_id: post_id,
            cancel: 1
        }));
    } else return null;
}

export { getMyFavs, delFav };
