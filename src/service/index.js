import { $pay, $next, $cms } from "@jx3box/jx3box-common/js/https";
import moment from 'moment'
function getMyAsset() {
    return $pay().get("/api/vip/i");
}

function getUserMedals(uid) {
    return $next().get("/api/user/" + uid + "/medals");
}

function getUserInfo(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`, {
        params: {
            __no_cache: 1
        }
    });
}

function getMyInfo() {
    return $cms().get(`/api/cms/user/my/info`, {
        params: {
            __no_cache: 1
        }
    });
}

function getMyAssetLogs(start_date) {
    return $pay().get(`/api/my/asserts/history`, {
        params: {
            start: start_date || moment().format('YYYYMMDD'),
            end: moment().add(1, 'day').format('YYYYMMDD')
        }
    })
}
/**
 * 是否为团队成员
 * @returns
 */
function isTeammate() {
    return $cms().get(`/api/cms/config/teammates/check`)
}

/**
 * 获得团队成员
 * @returns
 */
function getTeammates() {
    return $cms().get(`/api/cms/config/teammates`)
}

export { getMyAsset, getUserMedals, getUserInfo, getMyAssetLogs, getMyInfo, isTeammate, getTeammates };
