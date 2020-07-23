import { __bb } from "@jx3box/jx3box-common/js/jx3box.json";
import { $ } from "./axios";

const add = __bb + "api/wiki/user_item";
function addWiki(data) {
    return $.post(add, data);
}

const load = __bb + "api/wiki/user_item/";
function loadWiki(id) {
    return $.get(load + id);
}

const list = __bb + "api/wiki/user_item/";
function myWiki(params) {
    return $.get(list,{
        params : params
    });
}

export { addWiki, loadWiki, myWiki };
