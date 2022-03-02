import { $cms,$_https } from "@jx3box/jx3box-common/js/https.js";

import axios from 'axios'
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";

const $server = $_https('server', {
    proxy: false,
})

// 1.资料
// -------------------------------
function getProfile() {
    return $cms().get("/api/cms/user/my/profile");
}
function updateProfile(data) {
    return $cms().put("/api/cms/user/my/profile", data);
}

// 2.头像
// -------------------------------
function updateAvatar(data) {
    return $cms().put("/api/cms/user/my/avatar", data);
}
function uploadAvatar(data) {
    return $cms().post("/api/cms/upload/avatar", data);
}
function getFrames() {
    let url = process.env.NODE_ENV == 'development'?'/temp/user_avatar_frame.json':(__imgPath + "data/user_avatar_frame.json")
    return axios.get(url)
}
function getUserOverview(uid) {
    return $cms().get(`/api/cms/user/${uid}/info`);
}

// 3.密码
// -------------------------------
function updatePassword(data) {
    return $cms().post("profile/password", data);
}

// 4.邮箱
// -------------------------------
function checkEmailStatus() {
    return $server.get("profile/email/check");
}

function checkEmailAvailable(email) {
    return $server.get("profile/email/available", {
        params: {
            user_email: email,
        },
    });
}

function sendBindEmail(data) {
    return $server.post("profile/email/bind", data);
}

function sendVerifyEmail() {
    return $server.post("profile/email/verify");
}

// 5.互联
function checkOAuth() {
    return $server.get("profile/oauth/check");
}

function unbindOAuth(data) {
    return $server.post("profile/oauth/unbind", data);
}


export {
    updateProfile,
    getProfile,
    updateAvatar,
    updatePassword,
    sendVerifyEmail,
    checkEmailAvailable,
    checkEmailStatus,
    sendBindEmail,
    unbindOAuth,
    checkOAuth,
    uploadAvatar,
    getFrames,
    getUserOverview,
};
