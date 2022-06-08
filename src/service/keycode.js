import { $pay } from "@jx3box/jx3box-common/js/https";

function getKeycodeList(params) {
    return $pay().get(`/api/my/codekeycode/history`, {
        params,
    });
}
function getSnList(params) {
    return $pay().get(`/api/my/codesn/history`, {
        params,
    });
}
function getSnNumber(id, data) {
    return $pay().post(`/api/my/codesn/${id}/activation-code`, data);
}
function getKeycodeNumber(id, data) {
    return $pay().post(`/api/my/codekeycode/${id}/activation-code`, data);
}

export { getKeycodeList, getSnList, getKeycodeNumber, getSnNumber };
