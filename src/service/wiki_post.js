import { $helper } from "./axios";
import qs from "qs";

// 获取最新攻略
function get_newest_post(type, id) {
    if (!id) return;
    return $helper({
        method: "GET",
        url: `/api/wiki/post`,
        params: { type: type, source_id: id },
    });
}

function create_post(params) {
    return $helper({
        method: "POST",
        url: `/api/wiki/post`,
        data: qs.stringify({ post: params }),
    });
}

export { get_newest_post, create_post };
