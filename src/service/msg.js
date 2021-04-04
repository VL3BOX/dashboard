import { $helper } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getMsgs(i = 1) {
    return $helper().get("/api/messages", {
        params: {
            // length : 2,
            page: i,
        },
    });
}

function readMsg(ids) {
    let data = {};
    if (ids) data.ids = ids;

    return $helper().put(`/api/messages/read`, qs.stringify(data));
}

function removeMsg(ids) {
    return $helper().put(
        `/api/messages/remove`,
        qs.stringify({
            ids: ids,
        })
    );
}

export { getMsgs, readMsg, removeMsg };
