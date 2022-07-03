<!--
 * @Author: iRuxu
 * @Date: 2022-07-03 01:06:06
 * @LastEditTime: 2022-07-03 02:11:29
 * @Description:
-->
<template>
    <div class="m-feedback-index">
        <section class="m-feedback-box">
            <el-tabs v-model="active">
                <el-tab-pane label="提交反馈" name="submit" lazy>
                    <add></add>
                </el-tab-pane>
                <el-tab-pane label="我的反馈" name="myfeedback" lazy>
                    <list v-if="active === 'myfeedback'"></list>
                </el-tab-pane>
            </el-tabs>
        </section>
        <aside class="m-feedback-aside">
            <el-button class="u-btn" size="small" type="warning" plain @click="handleEraseClick">注销账号</el-button>
            <div class="m-faq">
                <div class="u-faq-title"><i class="el-icon-question"></i> FAQ</div>
            </div>
            <div class="u-faq-content" v-if="faq && faq.menus">
                <div class="u-faq-item" v-for="(item, index) in faq.menus" :key="item.link">
                    <span>{{ index + 1 }}.</span><a :href="item.link">{{ item.label }}</a>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
import add from "./add.vue";
import list from "./list.vue";
import { getMenus } from "@jx3box/jx3box-common/js/api_misc";
export default {
    name: "FeedbackIndex",
    components: {
        add,
        list,
    },
    data() {
        return {
            active: "submit",
            faq: {},
        };
    },
    watch: {
        "$route.query": {
            deep: true,
            immediate: true,
            handler(val) {
                this.active = val.tab || "submit";
            },
        },
        active(val) {
            this.$router.push({
                path: this.$route.path,
                query: {
                    tab: val,
                },
            });
        },
    },
    mounted() {
        this.getFAQ()
    },
    methods: {
        handleEraseClick() {
            this.$router.push({ name: "feedback_erase" });
        },
        getFAQ() {
            getMenus({ names: ['feedback_faq'] }).then((res) => {
                this.faq = res.feedback_faq;
            });
        },
    },
};
</script>

<style lang="less" scoped>
.m-feedback-index {
    display: flex;
    gap: 20px;

    .m-feedback-box {
        flex: 1;
        overflow: hidden;
    }

    .m-feedback-aside {
        width: 240px;

        .u-btn {
            width: 100%;
        }

        .m-faq {
            margin-top: 20px;
            border-bottom: 1px solid #e6e6e6;
            border-radius: 4px;
            padding: 10px;
            .u-faq-title {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
}
</style>
