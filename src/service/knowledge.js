import {$http} from "./axios";

const qs = require("qs");

function get_menus() {
  return $http({
    method: "GET",
    url: `/api/knowledge/menus`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_list(params) {
  return $http({
    method: "GET",
    url: `/api/knowledges`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function create_knowledge(params) {
  return $http({
    method: "POST",
    url: `/api/knowledge`,
    headers: {Accept: "application/prs.helper.v2+json"},
    data: qs.stringify({knowledge: params}),
  });
}

export {
  get_menus,
  get_list,
  create_knowledge
};
