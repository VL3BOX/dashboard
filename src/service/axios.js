import axios from "axios";
import { JX3BOX } from "@jx3box/jx3box-common";
const $ = axios.create({
    baseURL: JX3BOX.__server,
    withCredentials: true,
});

export { $, axios };
