<template>
    <div v-if="contact" class="m-letter-box">
        <div class="u-chat-name" v-if="hasData">{{ contact.receiver_info.display_name }}</div>
        <div class="m-letter-list"></div>
        <send-box />
    </div>
</template>

<script>
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
        return {};
    },
    computed: {
        hasData() {
            return !!this.contact?.receiver_info?.id;
        },
    },
    watch: {},
};
</script>
