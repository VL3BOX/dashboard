import {$ as $http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const {User} = require("@jx3box/jx3box-common");
const qs = require("qs");

// 物品搜索
function search_items(keyword, length, fields, is_equip = null) {
    let params = {keyword: keyword, limit: length, fields: fields};
    if (is_equip !== null) params.is_equip = is_equip ? 1 : 0;

    return $http({
        method: "GET",
        url: `${JX3BOX.__helperUrl}api/item/search`,
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

function get_item_newest_post(item_id) {
    return $http({
        method: "GET",
        url: `${JX3BOX.__helperUrl}api/wiki/post`,
        headers: {Accept: "application/prs.helper.v2+json"},
        params: {type: 'item', source_id: item_id},
    });
}

function create_item_post(post) {
    return $http({
        method: "POST",
        url: `${JX3BOX.__helperUrl}api/wiki/post`,
        headers: {Accept: "application/prs.helper.v2+json"},
        data: qs.stringify({
            post: {
                type: 'item',
                source_id: post.source_id,
                level: post.level,
                user_nickname: User.getInfo().name,
                content: post.content,
                remark: post.remark,
            },
        }),
    });
}

export {search_items, get_item_newest_post, create_item_post};
