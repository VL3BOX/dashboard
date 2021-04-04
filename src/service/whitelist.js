import { $cms } from "@jx3box/jx3box-common/js/https";

function getWhitelist() {
    return $cms().get("/api/cms/user/kith/my");
}
function getWhitelistById(id) {
    return $cms().get(`/api/cms/user/${id}/info`);
}

function delWhitelist(id) {
    return $cms().delete(`/api/cms/user/kith/${id}`);
}
function addWhitelist(id) {
    return $cms().post(`/api/cms/user/kith/${id}`);
}
function updateWhitelists(data) {
    return $cms().put("/api/cms/user/kith", data);
}
function editWhitelist(id, data) {
    return $cms().put(`/api/cms/user/kith/${id}`, data);
}

export {
    getWhitelist,
    editWhitelist,
    delWhitelist,
    addWhitelist,
    getWhitelistById,
    updateWhitelists,
};
