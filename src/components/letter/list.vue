<template>
    <div v-if="contact" class="m-letter-box">
        <div class="u-chat-name" v-if="hasData">{{ contact.receiver_info.display_name }}</div>
        <div class="m-letter-list">
            <div class="m-letter-list-content" v-for="item in letters" :key="item.id">
                <div class="u-time">{{ item.created_at }}</div>
                <div class="m-letter-item" :class="{ 'not-me': item.receiver === user.uid, 'me': item.sender !== user.uid }">
                    <a :href="link(item)" class="u-avatar" target="_blank">
                        <img :src="letterBelong(item)" class="u-img" :alt="item.id">
                    </a>
                    <div class="u-letter-content">
                        <div class="u-letter-text" v-if="item.content_type == 0">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <send-box />
    </div>
</template>

<script>
// api
import { getLetterList } from "@/service/letter";
// utils
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
// components
import sendBox from "@/components/letter/send_box.vue";
export default {
    name: "letterList",
    components: {
        sendBox,
    },
    props: {
        contact: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            letters: [],
            peoples: [],
            user: User.getInfo(),
        };
    },
    computed: {
        hasData() {
            return !!this.contact?.receiver_info?.id;
        }
    },
    watch: {
        contact: {
            deep: true,
            immediate: true,
            handler() {
                this.loadLetter();
            },
        }
    },
    methods: {
        loadLetter() {
            if (!this.hasData) return;
            getLetterList(this.contact.sender_info.id, this.contact.receiver_info.id).then((res) => {
                this.letters = res.data.data?.letters || [];
                this.peoples = res.data.data?.peoples || [];
            });
        },
        letterBelong(letter) {
            if (letter.sender === this.user.id) {
                return showAvatar(this.peoples[letter.sender]?.avatar);
            } else {
                return showAvatar(this.peoples[letter.receiver]?.avatar);
            }
        },
        link(letter) {
            if (letter.sender === this.user.id) {
                return authorLink(this.peoples[letter.sender]?.id);
            } else {
                return authorLink(this.peoples[letter.receiver]?.id);
            }
        }
    }
};
</script>
