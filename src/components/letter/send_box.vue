<template>
    <div class="m-letter-sendbox">
        <sendTools @update:image="sendImage" />
        <div class="u-send-content">
            <el-input type="textarea" v-model="content"></el-input>
        </div>
        <div class="u-send-action">
            <span class="u-text-sum">
                <span class="u-current-sum" :class="{ over: isOver }">{{ currentSum }}</span>
                <span class="u-max-sum">/{{ max }}</span>
            </span>
            <el-button size="mini" :disabled="isOver || !currentSum" @click="send">发送</el-button>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import sendTools from "./send_tools.vue";
export default {
    name: "sendBox",
    components: {
        sendTools,
    },
    emits: ["send"],
    data() {
        return {
            content: "",
            max: 500,

            user: User.getInfo(),

            isLogin: User.isLogin(),
        };
    },
    computed: {
        currentSum() {
            return this.content.length;
        },
        // 是否超过
        isOver() {
            return this.currentSum > this.max;
        },
    },
    methods: {
        // 发送
        send() {
            if (this.isOver || !this.currentSum) return;
            this.$emit("send", { content: this.content, content_type: 0 }); // 文本类型
        },
        clear() {
            this.content = "";
        },
        sendImage(image) {
            this.$emit("send", { content: image, content_type: 1 }); // 图片类型
        },
    },
};
</script>
