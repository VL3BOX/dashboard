import axios from "axios";
import { $https, $_https } from "@jx3box/jx3box-common/js/https.js";
const $helper = $https("helper", {
    proxy: false,
    interceptor: "helper",
});
const $server = $https("server", {
    proxy: false,
});
const $_server = $_https("server", {
    proxy: false,
});
const $next = $https("next", {
    proxy: true,
    interceptor: "next",
});
const $_next = $_https("next", {
    proxy: true,
    interceptor: "next",
});
const $_pay = $_https("pay", {
    proxy: true,
    interceptor: "next",
});
export { axios, $helper, $server, $next, $_server, $_next, $_pay };
