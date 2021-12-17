<template>
    <div class="m-dashboard m-cooperation">
        <h2 class="u-title">
            <i class="el-icon-reading"></i> 签约作者
        </h2>
        <div class="m-block m-ac">
            <h3>【签约条件】</h3>
            <div>
                <p>1、需要每个赛季在魔盒独家首发不少于3篇有效评分作品（或参与公共栏目构建）。</p>
                <p>2、每赛季末重新进行评审，稿件时效性低将被降权，将不会作为有效校验产出稿件。</p>
                <p>3、积极参与公共栏目建设者，将有机会被升级为特约签约作者作者。</p>
                <p>4、按键类工具、单纯的宏或其他随意涂鸦的作品等不作为申请依据。</p>
            </div>
            <h3>【福利特权】</h3>
            <div>
                <p>1、享有诸多内部数据支持，支撑作者撰写更为专业的攻略，并优先进行头版推送。</p>
                <p>2、享有更多游戏激活码等多种权益和内部资格。</p>
                <p>3、有不定期KOL奖励派送或稿费、节日福利等。</p>
                <p>4、（特约签约作者）享有每月一定额度的盒币评分额度。</p>
            </div>
        </div>
        <div class="m-form m-block">
            <h3>【认证说明】</h3>
            <div>
                <p>1、以下所有项目请务必填写真实有效，否则将不会处理，多次提交被拒后将不再接受申请。</p>
                <p>2、自述部分请填写魔盒内发布的有效作品链接（不少于3篇），站外链接将不会作为参考依据。</p>
                <p>3、当成功接受申请后，请加入Q群<a href="https://jq.qq.com/?_wv=1027&k=3Hgmu6jg">140129951</a>，不定期发放奖励或其它通知。</p>
            </div>
            <hr>
            <el-alert
                title="签约成功！"
                type="success"
                description="签约为每赛季审核一次，过期后如不满足条件的将会被取消资格。"
                show-icon
                :closable="false"
                v-if="isSuperAuthor"
            >
            </el-alert>
            <el-alert
                title="等待审核！"
                type="warning"
                description="签约申请提交成功，请耐心等待审核！"
                show-icon
                :closable="false"
                v-if="!isSuperAuthor && !checked"
            >
            </el-alert>
            <el-alert
                title="申请被驳回"
                type="error"
                description="请填写有效的联系方式与作品，不符合要求的作品将不会受理。"
                show-icon
                :closable="false"
                v-if="!isSuperAuthor && checked == 2"
            >
            </el-alert>
            <h3>【认证信息】</h3>
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                :label-position="position"
                :disabled="isSuperAuthor || !checked"
            >
                <el-form-item class="u-item" label="昵称" prop="nickname">
                    <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="QQ" prop="qq">
                    <el-input v-model="form.qq" placeholder="请输入联系QQ"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="电话" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="社交平台" prop="weibo">
                    <el-input v-model="form.weibo" placeholder="请输入微博/B站地址"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="自述" prop="description">
                    <el-input
                        type="textarea"
                        :rows="8"
                        :maxlength="800"
                        placeholder="详述自己的一些作品"
                        v-model="form.description"
                        show-word-limit
                    ></el-input>
                </el-form-item>

                <el-form-item class="u-btns" label>
                    <el-button
                        type="primary"
                        class="u-submit"
                        @click="submitForm('form')"
                        icon="el-icon-s-promotion"
                        :disabled="processing"
                    >提交签约申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user";
import { contractAuthorApply, getSuperAuthorState, getContractAuthorLogs } from '@/service/cooperation'
export default {
    name: "cooperation",
    props: [],
    data: function () {
        return {
            position: window.innerWidth < 768 ? "top" : "left",
            form: {
                nickname: "",
                qq: "",
                phone: "",
                weibo: "",
                description: "",
            },
            rules: {
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                ],
                qq: [
                    {
                        required: true,
                        message: "请输入QQ号码",
                        trigger: "blur",
                    },
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请认真填写，否则将申请将不会被通过",
                        trigger: "blur",
                    },
                ],
            },
            user: User, // 用户信息
            isSuperAuthor: false, // 是否为签约作者

            // 请求成功的一次
            checked: -1,

            // 签约记录
            logs: [],

            processing : false
        };
    },
    computed: {
        // 最近一次申请记录
        log : function (){
            return this.logs && this.logs[0]
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const data = {
                        action: 'create',
                        log: {
                            ...this.form
                        }
                    }
                    this.processing = true
                    contractAuthorApply(data).then(res => {
                        this.checked = 0
                        this.$message.success('提交申请成功，请等待管理审核。')
                    }).catch(e => {
                        this.$message.error(e.message)
                    }).finally(() => {
                        this.processing = false
                    })
                }
            });
        },
        // 是否为签约作者
        checkSuperUser: function() {
            getSuperAuthorState(this.user?.profile?.uid)
                .then(res => {
                    this.isSuperAuthor = res.data.data
                })
        },
        // 加载申请记录
        loadContractAuthorLogs: function() {
            getContractAuthorLogs().then(res => {
                this.logs = res.data.data.data;
                if(this.logs && this.logs.length){
                    this.checked = this.logs[0]['checked']
                    this.form = this.logs[0]
                }
            })
        },
        // 初始化
        init: function() {
            this.loadContractAuthorLogs()
            this.checkSuperUser();
        }
    },
    mounted: function () {
        this.init()
    },
    // watch: {
    //     'logs': {
    //         deep: true,
    //         handler(val) {
    //             const len = val.length
    //             if (len) {
    //                 const keys = ['nickname', 'qq', 'phone', 'weibo', 'description'];
    //                 keys.forEach(key => {
    //                     // 将最新值放入form
    //                     this.form[key] = val[0][key];
    //                 })
    //                 this.checked = val[0]?.checked
    //             } else {
    //                 // 未进行申请的状态
    //                 // HACK: 此处仅为前端状态，事实上不存在4这个状态
    //                 this.checked = 4
    //             }
    //         }
    //     }
    // }
};
</script>
<style scoped lang="less">
.m-block {
    background-color: #fafbfc;
    border: 1px solid @color-link;
    margin: 15px 15px 5px 15px;
    padding: 10px 10px 10px 30px;
    border-radius: 6px;
    position: relative;

    h3 {
        .fz(14px,22px);
        color: #333;
    }
    p {
        font-size: 12px;
        line-height: 22px;
    }
}
// .m-cooperation {
// }
</style>
