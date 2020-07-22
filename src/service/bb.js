// import { __bb } from "@jx3box/jx3box-common/js/jx3box.json";
import { $ } from "./axios";
const __bb = 'http://bb.jx3box.com/'

const add = __bb + 'api/wiki/user_item'
function addWiki(data) {
    return $.post(add,data)
}

export { addWiki };
