import { $http } from "./axios";

const qs = require("qs");

function get_legal_tags() {
    return $http({
        method: "GET",
        url: `/api/post/collection/legal_tags`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function get_collection(collection_id) {
    return $http({
        method: "GET",
        url: `/api/post/collection/${collection_id}`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function get_my_collections(params) {
    return $http({
        method: "GET",
        url: `/api/my/post/collections`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function submit_collection(collection) {
    return $http({
        method: "POST",
        url: `/api/post/collection`,
        headers: { Accept: "application/prs.helper.v2+json" },
        data: qs.stringify({
            action: collection.id ? "update" : "create",
            collection: collection,
        }),
    });
}

function remove_collection(collection_id) {
    if (collection_id) {
        return $http({
            method: "PUT",
            url: `/api/post/collection/remove`,
            headers: { Accept: "application/prs.helper.v2+json" },
            data: qs.stringify({ id: collection_id }),
        });
    } else return null;
}

export {
    get_legal_tags,
    get_collection,
    get_my_collections,
    submit_collection,
    remove_collection,
};
