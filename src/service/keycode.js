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
function activationSn(id, data) {
    return $pay().post(`/api/my/codesn/${id}/activation-code`, data);
}
function activationKeycode(id, data) {
    return $pay().post(`/api/my/codekeycode/${id}/activation-code`, data);
}

export { getKeycodeList, getSnList, activationKeycode, activationSn };
