import {$ as $http} from "./axios";
import {__helperUrl} from '@jx3box/jx3box-common/js/jx3box.json';

function get_posts(keyword, page, limit) {
    let data = {};
    if (keyword) data.keyword = keyword;
    if (page) data.page = page;
    if (limit) data.limit = limit;

    return $http({
        method: "GET",
        url: `${__helperUrl}api/my/achievement/posts`,
        headers: {Accept: "application/prs.helper.v2+json"},
        params: data,
    });
}

function remove_post(post_id) {
    if (!post_id) return null;
    return $http({
        method: "PUT",
        url: `${__helperUrl}api/my/achievement/post/${post_id}/remove`,
        headers: {Accept: "application/prs.helper.v2+json"},
    });
}

export {get_posts, remove_post};
