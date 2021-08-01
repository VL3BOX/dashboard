<template>
    <div class="m-dashboard m-cooperation">
        <h2 class="u-title">
            <i class="el-icon-reading"></i> 签约作者
        </h2>
        <div class="m-block m-ac">
            <h3>【要求与特权】</h3>
            <div>
                <p>1、申请成为魔盒的签约作者，需要每个赛季在魔盒发表不少于3篇有效评分作品（或参与公共栏目构建）。</p>
                <p>2、签约后，享有诸多内部数据支持，支撑作者撰写更为专业的攻略。</p>
                <p>3、签约后，有不定期KOL奖励派送或稿费、节日福利等。</p>
                <p>4、签约后，享有更多游戏激活码等多种权益和内部资格。</p>
            </div>
        </div>
        <div class="m-form m-block">
            <h3>【认证说明】</h3>
            <div>
                <p>1、以下所有项目请务必填写真实有效，否则将不会处理，多次提交被拒后将不再接受申请。</p>
                <p>2、自述部分请填写魔盒内发布的有效作品链接（不少于1篇），站外链接将不会作为参考依据。</p>
                <p>3、当成功接受申请后，会有管理邀请加入签约作者群，不定期发放奖励或其它通知。</p>
            </div>
            <hr>
            <h3>【认证信息】</h3>
            <el-form
                :model="form"
                :rules="rules"
                ref="form"
                label-width="100px"
                :label-position="position"
            >
                <el-form-item class="u-item" label="昵称" prop="nickname">
                    <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="QQ" prop="qq">
                    <el-input v-model="form.qq" placeholder="请输入联系QQ"></el-input>
                </el-form-item>

                <el-form-item class="u-item" label="联系电话" prop="phone">
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
                    >提交签约申请</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user";
import { contractAuthorApply } from '@/service/cooperation'
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
                        message: "请输入手机号码",
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
        };
    },
    computed: {},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const obj = {
                        action: 'create',
                        log: {
                            ...this.form
                        }
                    }
                    contractAuthorApply(obj).then(res => {
                        this.$message.success('提交申请成功，请等待管理审核。')
                        // TODO: 跳转？
                    }).catch(e => {
                        this.$message.error(e.message)
                    })
                }
            });
        },
    },
    mounted: function () {},
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
