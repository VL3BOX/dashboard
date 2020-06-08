import { $, axios } from "./axios";
import { __hub, __Root } from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import dateFormat from '../utils/moment'

function syncRedis(data, vm) {
    let redisData = transferForRedis(data);
    console.log("正在执行redis同步作业:", redisData);
    return axios
        .post(__hub + "api/plugins/macro/publish", redisData, {
            withCredentials: true,
        })
        .catch((err) => {
            vm.failCallback(err, vm);
        });
}

function transferForRedis(data) {
    let author = User.getInfo().name;
    let pid = data.ID;

    let _ = {
        author: author,
        user_id: ~~User.getInfo().uid,
        post_id: pid,
        data: {},
    };

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
        desc += dateFormat(Date.now())

        // 来源
        desc += '【来源】JX3BOX'

        _.data[item.name] = {
            author: author,
            key: item.name,
            version: Date.now(),

            data : item.macro,
            desc: desc,
            
            about: __Root + "macro/?pid=" + pid,
        };

    });

    return _;
}

export { syncRedis };
