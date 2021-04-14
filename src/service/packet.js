import { $_pay } from "./axios";

function getMyPacket() {
    return $_pay.get("/api/vip/i");
}

function getMyPacketList(params) {
    return $_pay.get("/api/red-packet/history", {
        params: params,
    });
}

function getMyPacketHistory(params) {
    return $_pay.get("/api/cash-out/history", {
        params: params,
    });
}

function getAllPacket(params) {
    return $_pay.get("/api/red-packet/list", {
        params: params,
    });
}

function getAllHistory(params) {
    return $_pay.get("/api/cash-out/manage/list", {
        params: params,
    });
}

function pullMyPacket(data) {
    return $_pay.post("/api/cash-out/red-packet", data);
}

function checkPacket(id, data, params) {
    return $_pay.put(`/api/cash-out/manage/${id}/status`, data, {
        params: params,
    });
}

function pushPacket(data) {
    return $_pay.post("/api/red-packet/giving", "", {
        params: data,
    });
}

function recyclePacket(params) {
    return $_pay.delete("/api/red-packet/recycle", {
        params,
    });
}

export {
    getMyPacket,
    getMyPacketList,
    getMyPacketHistory,
    getAllPacket,
    pullMyPacket,
    getAllHistory,
    checkPacket,
    pushPacket,
    recyclePacket,
};
