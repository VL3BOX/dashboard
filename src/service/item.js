import { $helper } from "./axios";

// 物品搜索
function search_items(keyword, length, fields, is_equip = null) {
    let params = { keyword: keyword, limit: length, fields: fields };
    if (is_equip !== null) params.is_equip = is_equip ? 1 : 0;

    return $helper({
        method: "GET",
        url: `/api/item/search`,
        params: params,
    });
}

function get_item_newest_post(item_id) {
    return $helper({
        method: "GET",
        url: `/api/wiki/post`,
        params: { type: "item", source_id: item_id, supply: 0 },
    });
}

export { search_items, get_item_newest_post };
