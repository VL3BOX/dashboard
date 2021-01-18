import { $http } from "./axios";
// import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

const qs = require("qs");

function getMsgs(i = 1) {
    return $http.get("/api/messages", {
        headers: { Accept: "application/prs.helper.v2+json" },
        params: {
            // length : 2,
            page: i,
        },
    });
}

function readMsg(ids) {
    let data = {};
    if (ids) data.ids = ids;

    return $http.put(`/api/messages/read`, qs.stringify(data), {
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

function removeMsg(ids) {
    return $http.put(
        `/api/messages/remove`,
        qs.stringify({
            ids: ids,
        }),
        {
            headers: { Accept: "application/prs.helper.v2+json" },
        }
    );
}

export { getMsgs, readMsg, removeMsg };
