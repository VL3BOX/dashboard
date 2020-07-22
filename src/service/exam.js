import { $ } from "./axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";

const API = __next + 'api/question/'  //TODO:
// const API = "/api/question/";

function getQuestion(id, vm) {
    return $
        .get(API + id)
}

function createQuestion(data, vm) {
    return $
        .post(API + "create", data)
}

function updateQuestion(id, data, vm) {
    return $
        .put(API + id + "/update", data)
}

function createPaper(data, vm) {
    return $
        .post(API + "exam-paper", data)
}

function updatePaper(id, data, vm) {
    return $
        .put(API + "exam-paper/" + id, data)
}

function getPaper(id, vm) {
    return $
        .get(API + "exam-paper/" + id)
}

function getQuestions(query, vm) {
    return $
        .get(API + "my-list", {
            params: query,
        })
}

export {
    getQuestion,
    createQuestion,
    updateQuestion,
    getQuestions,
    createPaper,
    updatePaper,
    getPaper,
};
