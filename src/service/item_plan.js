import { $http } from "./axios";
// import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

function get_item_plan(plan_id) {
    return $http({
        method: "GET",
        url: `/api/item_plan/${plan_id}`,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

// 提交物品清单
function save_item_plan(params) {
    let action = params.id ? "update" : "create";
    let data = { action: action, plan: params };

    return $http({
        method: "POST",
        url: `/api/item_plan`,
        headers: { Accept: "application/prs.helper.v2+json" },
        data: qs.stringify(data),
    });
}

// 获取我的清单
function get_my_item_plans(params) {
    return $http({
        method: "GET",
        url: `/api/my/item_plans`,
        headers: { Accept: "application/prs.helper.v2+json" },
        params: params,
    });
}

function delete_item_plan(plan_id) {
    return $http({
        method: "PUT",
        url: `/api/item_plan/remove`,
        headers: { Accept: "application/prs.helper.v2+json" },
        data: qs.stringify({ plan_id: plan_id }),
    });
}

export { get_item_plan, save_item_plan, get_my_item_plans, delete_item_plan };
