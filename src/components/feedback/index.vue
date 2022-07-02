<template>
    <div class="m-feedback-index">
        <section class="m-feedback-box">
            <el-tabs v-model="active">
                <el-tab-pane label="提交反馈" name="submit" lazy>
                    <add></add>
                </el-tab-pane>
                <el-tab-pane label="我的反馈" name="myfeedback" lazy>
                </el-tab-pane>
            </el-tabs>
        </section>
        <aside class="m-feedback-aside">
            <el-button class="u-btn" size="medium" type="warning" @click="handleEraseClick">注销账号</el-button>

            <div class="m-faq">
                <div class="u-faq-title">FAQ</div>
            </div>
        </aside>
    </div>
</template>

<script>
import add from './add'
export default {
    name: 'FeedbackIndex',
    components: {
        add,
    },
    data() {
        return {
            active: 'submit'
        }
    },
    methods: {
        handleEraseClick() {
            this.$router.push({ name: 'feedback_erase' })
        }
    }
}
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
            border: 1px solid #e6e6e6;
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
