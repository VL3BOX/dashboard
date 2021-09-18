import { $cms } from "@jx3box/jx3box-common/js/https";

function getKithList() {
    return $cms().get("/api/cms/user/kith/my");
}
function searchUserById(id) {
    return $cms().get(`/api/cms/user/${id}/info`);
}
function addKith(id) {
    return $cms().post(`/api/cms/user/kith/${id}`);
}

function removeKith(id) {
    return $cms().delete(`/api/cms/user/kith/${id}`);
}

function sortKith(data) {
    return $cms().put("/api/cms/user/kith", data);
}
function editKith(id, data) {
    return $cms().put(`/api/cms/user/kith/${id}`, data);
}

export {
    getKithList,
    editKith,
    removeKith,
    addKith,
    searchUserById,
    sortKith,
};
