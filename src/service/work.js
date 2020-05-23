import { $ } from "./axios";

function getWorks(query) {

    return $.get("post/mywork", {
        params: query
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
