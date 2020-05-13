import { $ } from "./axios";
import { JX3BOX } from "@jx3box/jx3box-common";
// const API = JX3BOX.__hub;

var myHeaders = new Headers();
myHeaders.append("Cookie", "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsImdyb3VwIjo2NCwibmFtZSI6Iua1rueDnyIsImlhdCI6MTU4OTM3MTEwMSwiZXhwIjoxNTg5Mzg1NTAxfQ.c1S9E-PUl1iZXRDOOHKXUPs7HM85bBCMyaBy4Hd9tN0");

function uploadHub(formdata) {
    return fetch("api/plugins/my-team-mon", {
        method: "POST",
        body: formdata,
        redirect: "follow",
        headers: myHeaders, //TODO:
    })
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
}

function uploadData(formdata){
    return $.post('upload/data',formdata)
}

export { uploadHub ,uploadData};
