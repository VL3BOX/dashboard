import axios from "axios";
import { __server,__next } from "@jx3box/jx3box-common/js/jx3box.json";
const $ = axios.create({
    baseURL: __server,
    withCredentials: true,
});
const $$ = axios.create({
    baseURL: __next,
    withCredentials: true,
});

export { $, axios,$$ };
