import { $_helper } from "./axios";

const qs = require("qs");

function getMyFavs(query) {
    return $_helper.get(`/api/my/post/favorites`, {
        params: query,
    });
}

function delFav(post_type, post_id) {
    if (post_type && post_id) {
        return $_helper.post(
            `/api/post/favorite`,
            qs.stringify({
                post_type: post_type,
                post_id: post_id,
                cancel: 1,
            })
        );
    } else return null;
}

export { getMyFavs, delFav };
