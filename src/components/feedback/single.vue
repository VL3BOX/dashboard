<template>
    <div class="m-feed-single">
        <el-button icon="el-icon-arrow-left" @click="back">返回列表</el-button>
        {{ data }}
    </div>
</template>

<script>
import { getFeedback } from "@/service/feedback";
export default {
    name: "FeedbackSingle",
    data() {
        return {
            data: {},
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                val && this.getData();
            },
        },
    },
    methods: {
        async getData() {
            try {
                let res = await getFeedback(this.id);
                this.data = res.data.data;
            } catch (e) {
                console.log(e);
            }
        },
        back() {
            this.$router.push({
                name: "feedback_index",
                query: {
                    tab: 'myfeedback',
                }
            })
        }
    },
};
</script>
