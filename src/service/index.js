import { $pay, $next, $server } from "@jx3box/jx3box-common/js/axios";
import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getMyAsset() {
    return $pay.get("api/vip/i");
}

function getUserMedals(uid) {
    return $next.get("/api/user/" + uid + "/medals");
}

function getUserInfo(uid) {
    return axios.get(__server + "user/info", {
        params: {
            uid,
        },
    });
}

export { getMyAsset, getUserMedals, getUserInfo };
