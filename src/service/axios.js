import axios from "axios";
import { JX3BOX } from "@jx3box/jx3box-common";
// const $ = axios.create({
//     baseURL: JX3BOX.__server,
//     withCredentials: true,
// });
const $ = axios.create({
    baseURL: 'http://localhost:5160/',
    withCredentials: true,
});

export { $, axios };
