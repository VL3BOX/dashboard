<template>
    <uc class="m-dashboard-frame" icon="el-icon-brush" title="主题装扮" :tab-list="tabList">
        <el-alert type="warning" title="特殊表情最多只能选择三个" show-icon class="u-tips"></el-alert>
        <div class="m-list">
            <div
                class="u-item"
                v-for="item in emotions"
                :key="item.group_id"
                :class="{ 'is-using': isUsing(item.group_name), disabled: isDisabled(item.group_name), hidden: isHidden(item.group_name) }"
                @click.stop="handleEmotionClick(item)"
            >
                <img class="u-img" :src="imgSrc(item.group_name)" :alt="item.group_name" />
                <div class="u-title">{{ item.group_name }}</div>
            </div>
        </div>

        <div class="m-actions">
            <el-button type="primary" @click="handleSave" icon="el-icon-circle-check" :loading="loading">保存</el-button>
        </div>
    </uc>
</template>

<script>
import uc from "@/components/uc.vue";
import { getDecoration, getEmotion, setDecoration } from "@/service/decoration";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { tabList } from "@/assets/data/theme.json";
export default {
    name: "emotion",
    props: [],
    data: function () {
        return {
            tabList,

            emotionList: [],
            emotions: [],
            active: [],
            loading: false,
        };
    },
    computed: {},
    methods: {
        loadDecoration() {
            getDecoration({ type: "emotion" }).then((res) => {
                this.emotionList = res.data.data;
                this.active = this.emotionList.filter((item) => item.using).map((item) => item.val);
            });
        },
        getEmotion() {
            try {
                const _emotions = JSON.parse(sessionStorage.getItem("jx3_emotion"));

                if (_emotions) {
                    this.emotions = _emotions;
                    return;
                } else {
                    getEmotion().then((res) => {
                        this.emotions = res.data;
                        sessionStorage.setItem("jx3_emotion", JSON.stringify(res.data));
                    });
                }
            } catch (e) {
                console.log(e);
                this.emotions = [];
            }
        },
        imgSrc(val) {
            const group = this.emotions.find((item) => item.group_name === val);
            const defaultEmo = group.items?.[0];
            return __imgPath + "emotion/output/" + defaultEmo?.filename;
        },
        isUsing(val) {
            return this.active.includes(val) || val === "默认";
        },
        isDisabled(val) {
            return !this.emotionList.map((item) => item.val).includes(val) && val !== "默认";
        },
        isHidden(val) {
            return val === '默认';
        },
        handleEmotionClick(item) {
            if (this.isDisabled(item.group_name)) {
                return;
            }
            // 最多只能选择三个
            if (this.active.length >= 3 && !this.isUsing(item.group_name)) {
                this.$message.error("最多只能选择三个表情包");
                return;
            } else {
                if (this.isUsing(item.group_name)) {
                    this.active = this.active.filter((val) => val !== item.group_name);
                } else {
                    this.active.push(item.group_name);
                }
            }
        },
        handleSave() {
            this.loading = true;
            const val = this.active.join(",");
            setDecoration({ type: "emotion", val }).then((res) => {
                this.$message.success("保存成功");
                this.loading = false;
            });
        },
    },
    mounted: function () {
        this.loadDecoration();
        this.getEmotion();
    },
    components: {
        uc,
    },
};
</script>

<style lang="less">
.m-dashboard-frame {
    .m-list {
        .flex;
        flex-wrap: wrap;
    }
    .u-tips {
        margin-bottom: 16px;
    }
    .u-item {
        .flex;
        .pointer;
        align-items: center;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        padding: 4px 8px;
        margin: 4px;
        .u-img {
            .size(20px, 20px);
        }
        .u-title {
            margin-left: 4px;
        }

        &.hidden {
            .none;
        }

        &.is-using {
            border-color: #409eff;
            position: relative;

            // 倒三角标
            &::before {
                content: "";
                .pa;
                right: 0;
                bottom: 0;
                border: 12px solid #4abe84;
                border-top-color: transparent;
                border-left-color: transparent;
                border-bottom-right-radius: 3px;
            }
            &::after {
                content: "";
                width: 2px;
                height: 8px;
                .pa;
                right: 4px;
                bottom: 4px;
                border: 2px solid #fff;
                border-top-color: transparent;
                border-left-color: transparent;
                transform: rotate(45deg);
            }
        }
        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
    .m-actions {
        margin-top: 16px;
        text-align: center;
    }
}
</style>
