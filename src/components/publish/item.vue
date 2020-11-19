<template>
  <div class="m-simple-item">
    <img class="u-icon" :src="icon_url(item.IconID)" alt="`IconID:${item.IconID}`">
    <span class="u-name" :style="{'color':item_color(item.Quality)}" v-text="item.Name"></span>
    <span class="u-uiid fr" v-text="`ID:${item.id}`"></span>
  </div>
</template>

<script>
import icon_url from '@/utils/icon_url.js';
import item_color from '@/utils/item/color.js';

export default {
    name: "item",
    props: ["item"],
    methods: {
      icon_url,
      item_color,
    },
};
</script>

<style scoped lang="less">
@import "../../assets/css/components/item.less";
</style>