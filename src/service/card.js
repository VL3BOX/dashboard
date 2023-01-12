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

function markSn(id, flag) {
    return $pay().put(`/api/my/codesn/${id}/mark/${flag}`);
}

function markKeycode(id, flag) {
    return $pay().put(`/api/my/codekeycode/${id}/mark/${flag}`);
}

function getVirtualCode(id, data) {
    return $pay().post(`/mall/manage/virtual_goods/${id}/secret`, data);
}

export { getKeycodeList, getSnList, activationKeycode, activationSn, markSn, markKeycode, getVirtualCode };