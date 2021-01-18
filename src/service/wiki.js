import { $http } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

function get_posts(keyword, page, limit) {
    let data = {};
    if (keyword) data.keyword = keyword;
    if (page) data.page = page;
    if (limit) data.limit = limit;

    return $http({
        method: "GET",
        url: `/api/my/wiki/posts`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: data,
    });
}

function remove_post(post_id) {
    if (!post_id) return null;
    return $http({
        method: "PUT",
        url: `/api/my/wiki/post/${post_id}/remove`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function get_comments(keyword, page, limit) {
    let data = {};
    if (keyword) data.keyword = keyword;
    if (page) data.page = page;
    if (limit) data.limit = limit;

    return $http({
        method: "GET",
        url: `/api/my/wiki/comments`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: data,
    });
}

function remove_comment(comment_id) {
    if (!comment_id) return null;
    return $http({
        method: "PUT",
        url: `/api/my/wiki/comment/${comment_id}/remove`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export { get_posts, remove_post, get_comments, remove_comment };
