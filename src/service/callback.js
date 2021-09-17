import { $cms } from "@jx3box/jx3box-common/js/https";

function getPost(post_id) {
    return $cms().get(`/api/cms/post/${post_id}`);
}

function getUser(user_id) {
    return $cms().get(`/api/cms/user/${user_id}/info`);
}

function quitUnionPost(post_id) {
    return $cms().delete(`/api/cms/post/${post_id}/authors/quit`);
}

function isExistInvitation(post_id) {
    return $cms().get(`/api/cms/post/${post_id}/author/my`);
}

function acceptInvitation(post_id) {
    return $cms().put(`/api/cms/post/${post_id}/author/my`);
}

export { getPost, getUser, quitUnionPost, isExistInvitation, acceptInvitation };
