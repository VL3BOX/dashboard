import { $pay } from "@jx3box/jx3box-common/js/https";

function getCardList(params) {
    return $pay().get(`/api/my/codekeycode/history`, {
        params,
    });
}
function getCodeList(params) {
    return $pay().get(`/api/my/codesn/history`, {
        params,
    });
}
function sendCode(id, data) {
    return $pay().post(`/api/my/codesn/${id}/activation-code`, data);
}
function sendCard(id, data) {
    return $pay().post(`/api/my/codekeycode/${id}/activation-code`, data);
}

export { getCardList, getCodeList, sendCard, sendCode };
