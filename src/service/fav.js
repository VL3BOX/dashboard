import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getFavs(query) {
    return $.get(__server + "post/myfav", {
        params: query,
    });
}

function addFav(id) {
    return $.post(__server + "post/fav", {
        pid: id,
        action: 1,
    });
}

function delFav(id) {
    return $.post(__server + "post/fav", {
        pid: id,
        action: 0,
    });
}

export { getFavs, addFav, delFav };
