import { $helper } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getMyFavs(query) {
    return $helper().get(`/api/my/post/favorites`, {
        params: query,
    });
}

function delFav(post_type, post_id) {
    if (post_type && post_id) {
        return $helper().post(
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
