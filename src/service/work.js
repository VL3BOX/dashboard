import { $ } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

function getWorks(query) {
    return $.get(__server + "post/mywork", {
        params: query,
    });
}

function delPost(id) {
    return $.post(__server + "post/delete", {
        pid: id,
    });
}

function hidePost(id) {
    return $.post(__server + "post/status", {
        pid: id,
        status: "draft",
    });
}

function publishPost(id) {
    return $.post(__server + "post/status", {
        pid: id,
        status: "publish",
    });
}

export { getWorks, delPost, hidePost, publishPost };
