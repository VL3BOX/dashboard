import {$, $ as $http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

function get_legal_tags() {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collection/legal_tags`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_collection(collection_id) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collection/${collection_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_my_collections(params) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/my/post/collections`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function submit_collection(collection) {
  return $http({
    method: "POST",
    url: `${JX3BOX.__helperUrl}api/post/collection`,
    headers: {Accept: "application/prs.helper.v2+json"},
    data: qs.stringify({
      action: collection.id ? 'update' : 'create',
      collection: collection,
    }),
  });
}

function remove_collection(collection_id) {
  if (collection_id) {
    return $http({
      method: "PUT",
      url: `${JX3BOX.__helperUrl}api/post/collection/remove`,
      headers: {Accept: "application/prs.helper.v2+json"},
      data: qs.stringify({id: collection_id})
    });
  } else return null;
}

export {get_legal_tags, get_collection, get_my_collections, submit_collection, remove_collection};
