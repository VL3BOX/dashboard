import { $pay, $next, $cms } from "@jx3box/jx3box-common/js/https";
import dayjs from 'dayjs'
function getMyAsset() {
    return $pay().get("/api/vip/i");
}

function getUserMedals(uid) {
    return $next().get("/api/user/" + uid + "/medals");
}

function getUserInfo(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`);
}

function getMyInfo(){
    return $cms().get(`/api/cms/user/my/info`);
}

function getMyAssetLogs(start_date){
    return $pay().get(`/api/my/asserts/history`,{
        params : {
            start: start_date || dayjs().format('YYYYMMDD'),
            end : dayjs().add(1, 'day').format('YYYYMMDD')
        }
    })
}

export { getMyAsset, getUserMedals, getUserInfo ,getMyAssetLogs, getMyInfo};
