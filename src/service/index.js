import { $pay,$next } from "@jx3box/jx3box-common/js/axios";

function getMyAsset() {
    return $pay.get("api/vip/i");
}

function getUserMedals(uid) {
    return $next.get("/api/user/" + uid + "/medals");
}

export { getMyAsset, getUserMedals };
