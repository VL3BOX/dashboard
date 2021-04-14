import { $pay, $next, $cms } from "@jx3box/jx3box-common/js/https";

function getMyAsset() {
    return $pay().get("/api/vip/i");
}

function getUserMedals(uid) {
    return $next().get("/api/user/" + uid + "/medals");
}

function getUserInfo(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`);
}

export { getMyAsset, getUserMedals, getUserInfo };
