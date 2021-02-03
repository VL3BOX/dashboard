import {$http} from "./axios";

const qs = require("qs");

// 获取最新攻略
function get_newest_post(type, id) {
  if (!id) return;
  return $http({
    method: "GET",
    url: `/api/wiki/post`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: {type: type, source_id: id},
  });
}

function create_post(params) {
  return $http({
    method: "POST",
    url: `/api/wiki/post`,
    headers: {Accept: "application/prs.helper.v2+json"},
    data: qs.stringify({post: params}),
  });
}

export {
  get_newest_post,
  create_post
};
