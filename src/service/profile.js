import axios from "axios";
import { __server,__imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import { installNextInterceptors } from "@jx3box/jx3box-common/js/axios";
const $profile = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __server : "/",
});
installNextInterceptors($profile);


// 1.资料
// -------------------------------
function getProfile() {
    return $profile.get("profile");
}
function updateProfile(data) {
    return $profile.post("profile", data);
}

// 2.头像
// -------------------------------
function updateAvatar(data) {
    return $profile.put("profile/avatar", data);
}
function uploadAvatar(data){
    return $profile.post("upload/avatar", data);
}
function getFrames(){
    return axios.get(__imgPath + 'data/user_avatar_frame.json')
}
function getUserOverview(uid){
    return axios.get(__server + `user/overview/${uid}`)
}


// 3.密码
// -------------------------------
function updatePassword(data) {
    return $profile.post("profile/password", data);
}


// 4.邮箱
// -------------------------------
function checkEmailStatus() {
    return $profile.get("profile/email/check");
}

function checkEmailAvailable(email) {
    return $profile.get("profile/email/available", {
        params: {
            user_email: email,
        },
    });
}

function sendBindEmail(data) {
    return $profile.post("profile/email/bind", data);
}

function sendVerifyEmail() {
    return $profile.post("profile/email/verify");
}


// 5.互联
function checkOAuth() {
    return $profile.get("profile/oauth/check");
}

function unbindOAuth(data) {
    return $profile.post("profile/oauth/unbind", data);
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
    getUserOverview
};
