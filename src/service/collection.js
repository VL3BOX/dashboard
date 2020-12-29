import {$ as $http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

function get_collection($collection_id) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collection/${$collection_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
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

export {get_collection, submit_collection};
