import {$ as $http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

function get_item_plan(plan_id) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/item_plan/${plan_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

// 提交物品清单
function save_item_plan(params) {
  let action = params.id ? 'update' : 'create';
  let data = {action: action, plan: params};

  return $http({
    method: "POST",
    url: `${JX3BOX.__helperUrl}api/item_plan`,
    headers: {Accept: "application/prs.helper.v2+json"},
    data: qs.stringify(data),
  });
}

export {get_item_plan,save_item_plan};
