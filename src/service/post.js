import {$ as $http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

/**
 * 根据文章类型获取文章列表
 * @param type
 * @param params
 * @returns {AxiosPromise}
 */
function get_posts_by_type(type, params) {
    return $http({
        method: "GET",
        url: `${JX3BOX.__helperUrl}api/posts/type/${type}`,
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

export {get_posts_by_type};
