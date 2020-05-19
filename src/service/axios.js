import axios from "axios";
import { __server } from "@jx3box/jx3box-common/js/jx3box.json";
const $ = axios.create({
    baseURL: __server,
    withCredentials: true,
});
// const $ = axios.create({
//     baseURL: 'http://localhost:5160/',  //TODO:
//     withCredentials: true,
// });

export { $, axios };
