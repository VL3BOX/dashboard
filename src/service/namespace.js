import { $_helper, $helper, axios } from "./axios";
import { $cms } from "@jx3box/jx3box-common/js/https";

function getNamespace() {
    return $_helper({
        method: "GET",
        url: `/api/my/namespaces`,
    });
}

function getNamespaceByKey(key) {
    return $helper({
        method: "GET",
        url: `/api/namespace`,
        params: {
            key,
        },
    });
}

function createNamespace(data) {
    return $cms().post("/api/cms/namespace", data);
}

function updateNamespace(id, data) {
    return $cms().put(`/api/cms/namespace/${id}`, data);
}

function queryNamespace(id) {
    return $cms().get(`/api/cms/namespace/${id}`);
}

export {
    getNamespace,
    getNamespaceByKey,
    queryNamespace,
    createNamespace,
    updateNamespace,
};
