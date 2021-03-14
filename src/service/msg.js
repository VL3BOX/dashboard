import { $_helper } from "./axios";
import qs from "qs";

function getMsgs(i = 1) {
    return $_helper.get("/api/messages", {
        params: {
            // length : 2,
            page: i,
        },
    });
}

function readMsg(ids) {
    let data = {};
    if (ids) data.ids = ids;

    return $_helper.put(`/api/messages/read`, qs.stringify(data));
}

function removeMsg(ids) {
    return $_helper.put(
        `/api/messages/remove`,
        qs.stringify({
            ids: ids,
        })
    );
}

export { getMsgs, readMsg, removeMsg };
