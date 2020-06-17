import { $, axios } from "./axios";
import { __next, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import dateFormat from '../utils/dateFormat'
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
const API = __next + "api/macro/publish"
// const API = '/api/macro/publish'

function syncRedis(data, vm) {
    let redisData = transferForRedis(data);
    console.log("正在执行redis同步作业:", redisData);
    return axios
        .post(API, redisData, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function transferForRedis(data) {
    let author = data.author;
    let pid = data.ID;

    let _ = {
        author: author,
        user_id: ~~data.post_author || 0,
        post_id: pid,
        post_status : data.post_status,
        data: {},
    };

    let xf = xfmap[data.post_subtype]['id'] + ''

    data.post_meta.data.forEach((item, i) => {

        // 描述处理
        let desc = ''

        // 奇穴
        desc += '【奇穴】'
        let talent = ''
        try{
            talent = item.talent && JSON.parse(item.talent)
            desc += talent.sq
        }catch(e){
            console.log('奇穴编码解析失败',e)
        }

        // 时间
        desc += '\n【最后更新于】'
        desc += dateFormat(new Date())

        // 来源
        desc += '\n【来源】JX3BOX'

        if(!item.name) item.name = Date.now()

        _.data[item.name] = {
            author: author,
            key: item.name,
            version: Date.now(),
            icon:~~item.icon || 13,
            xf:xf || 0,

            data : item.macro,
            desc: desc,
            
            about: __Root + "macro/?pid=" + pid,
        };

    });

    return _;
}

export { syncRedis };
