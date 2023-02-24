import { $helper } from "@jx3box/jx3box-common/js/https";

// 获取最近联系人
export function getRecentContacts() {
    return $helper().get(`/api/letter/recently/contacts`);
}
/**
 * 删除最近联系人
 */
export function deleteRecentContacts(uid) {
    return $helper().delete(`/api/letter/recently/contacts/${uid}`);
}
/**
 * 获取与某人的聊天记录 - 某条消息之后的消息
 * @param {number} send_uid 发送方uid
 * @param {number} receive_uid 接收方uid
 * @param {number} query.begin 上次消息的id
 * @param {number} query.limit 拉取消息的数量
 */
export function getLetterList(send_uid, receive_uid, query) {
    return $helper().get(`/api/letter/${send_uid}/to/${receive_uid}/newest`, {
        params: query,
    });
}

// 获取与某人的聊天记录 - 某条消息之前的消息
export function getLetterListBefore(send_uid, receive_uid, query) {
    return $helper().get(`/api/letter/${send_uid}/to/${receive_uid}/before`, {
        params: query,
    });
}

// 获取未读私信数量
export function getUnreadLetterCount() {
    return $helper().get(`/api/letter/system/unread/count`);
}
