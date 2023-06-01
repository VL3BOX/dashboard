import { $next } from "@jx3box/jx3box-common/js/https";
import qs from "qs";

function getMsgs(params) {
    return $next().get(`/api/messages`, { params });
}

function readMsg(id) {
    return $next().put(`/api/messages/read/${id}`);
}

function readAll() {
    return $next().put(`/api/messages/read`);
}

function removeMsg(id) {
    return $next().delete(`/api/messages/${id}`);
}

export { getMsgs, readMsg, readAll, removeMsg };
