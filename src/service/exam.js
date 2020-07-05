import { axios } from "./axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

// const API = __next + 'api/question/'  //TODO:
const API = "/api/question/";

function getQuestion(id,vm) {
    return axios
        .get(API + id, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function createQuestion(data, vm) {
    return axios
        .post(API + "create", data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function updateQuestion(id, data, vm) {
    return axios
        .put(API + id + "/update", data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}


function createPaper(data,vm) {
    return axios
        .post(API + "exam-paper", data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function updatePaper(id,data,vm){
    return axios
        .put(API + "exam-paper/" + id, data, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function getPaper(id,vm){
    return axios
        .get(API + 'exam-paper/'+ id, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}


function getQuestions(query, vm) {
    return axios
        .get(API + "my-list", {
            params: query,
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

export {
    getQuestion,
    createQuestion,
    updateQuestion,
    getQuestions,
    createPaper,
    updatePaper,
    getPaper
};
