<template>
    <div class="m-letter-sendbox">
        <div class="u-send-tool"></div>
        <div class="u-send-content">
            <el-input type="textarea" v-model="content"></el-input>
        </div>
        <div class="u-send-action">
            <span class="u-text-sum">
                <span class="u-current-sum" :class="{ over: isOver }">{{ currentSum }}</span>
                <span class="u-max-sum">/{{ max }}</span>
            </span>
            <el-button size="mini" :disabled="isOver || !currentSum">发送</el-button>
        </div>
    </div>
</template>

<script>
import { sendLetter } from "@/service/letter";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "sendBox",
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
            sendLetter(this.user.uid).then((res) => {
                this.content = "";
            });
        },
    },
};
</script>
