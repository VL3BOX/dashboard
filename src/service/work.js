import { $ } from "./axios";
import User from "@jx3box/jx3box-common/js/user";

function getWorks(query) {

    let _ = {
        status: "all",
        author: 8,  //TODO: User.getInfo().uid 
        page : 1
    }

    _ = Object.assign(_,query)

    return $.get("post/list", {
        params: _
    });
}

function delPost(id){
    return $.post('post/delete',{
        pid : id
    })
}

function hidePost(id){
    return $.post('post/status',{
        pid : id,
        status : 'draft'
    })
}


export { getWorks,delPost,hidePost };
