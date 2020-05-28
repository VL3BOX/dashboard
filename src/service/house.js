import { $, axios } from "./axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";

function uploadData(formdata, vm){
    return $.post("upload", formdata).catch((err) => {
        vm.failCallback(err, vm);
    });
}

function postHouse(data,vm){

    let _data = {
        ID : data.post.ID || '',
        // UID 和 author 通过token获取
        title : data.post.post_title,
        content : data.post.post_content,
        server : data.meta.server,
        area : data.meta.area,
        num : data.meta.num,
        map : data.meta.map,
        pics : data.meta.pics,
        blueprint : data.meta.blueprint,
        status : data.post.post_status
    }

    if(data.post.ID){
        return $.post("house/update", _data).catch((err) => {
            vm.failCallback(err, vm);
        });
    }else{
        return $.post("house/create", _data).catch((err) => {
            vm.failCallback(err, vm);
        });
    }
    
}

function getHouse(vm){
    let id = vm.$route.params.id;

    if (id) {
        return $.get(`house/query`, {
            params: {
                id: id,
            },
        })
            .then((res) => {
                let data = res.data.data
                vm.post = {
                    ID : data.ID,
                    post_title : data.title,
                    post_content : data.content,
                    post_status : data.status
                }
                vm.meta = {
                    server : data.server,
                    area : data.area,
                    num : data.num,
                    map : data.map,
                    pics : data.pics,
                    blueprint : data.blueprint,
                }
            })
            .catch((err) => {
                vm.failCallback(err, vm);
            });
    } else {
        return new Promise((resolve, reject) => {
            resolve(location.href);
        });
    }
}

export {uploadData,postHouse,getHouse}