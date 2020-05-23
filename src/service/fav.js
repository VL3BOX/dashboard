import { $ } from "./axios";

function getFavs(query) {
    return $.get("post/myfav", {
        params: query,
    });
}

function addFav(id) {
    return $.post("post/fav", {
        pid: id,
        action: 1,
    });
}

function delFav(id) {
    return $.post("post/fav", {
        pid: id,
        action: 0,
    });
}

export { getFavs, addFav, delFav };
