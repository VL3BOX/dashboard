import axios from "axios";
import store from '../store/publish.js'
import { __server,__next } from "@jx3box/jx3box-common/js/jx3box.json";
import broadcast from '@/utils/msg.js'
const $ = axios.create({
    withCredentials : true
});
function installInterceptors(target){
    target['interceptors']['response'].use(
        function(response) {
            store.commit("endProcess");
            return response;
        },
        function(err) {
            if (err.response && err.response.data) {
                broadcast.$message.error(`${err.response.data.msg}`);
            } else {
                broadcast.$message.error("网络请求异常");
            }
            console.log(err)
            store.commit("endProcess");
            return Promise.reject(err);
        }
    );
}
installInterceptors(axios)
installInterceptors($)

export { $, axios };
