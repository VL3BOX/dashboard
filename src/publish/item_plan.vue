<template>
  <div class="m-publish-box">
    <!-- 头部 -->
    <pubheader name="物品百科" :localDraft="false">
      <slot name="header"></slot>
    </pubheader>

    <h1 class="m-publish-item-header">物品清单</h1>
    <el-row>
      <el-col :xs="24" :sm="5" class="c-item-search">
        <el-input placeholder="请输入物品名称" prefix-icon="el-icon-search" v-model="keyword"></el-input>
        <draggable class="m-search-items" tag="ul" v-if="items && items.length" :list="items" :sort="false"
                   :group="{ name: 'people', pull: 'clone', put: false }" :move="move_handle">
          <li v-for="(item,key) in items" :key="key">
            <Item :item="item"/>
          </li>
        </draggable>
        <div v-if="items && !items.length" class="m-no-item">
          <i class="el-icon-chat-line-round"></i>
          <span>&nbsp;查找不到相关记录</span>
        </div>
      </el-col>

      <el-col :xs="24" :sm="19" class="c-plan-relation">
        <div class="m-position" v-for="(position,key) in positions" :key="key">
          <h3 class="u-title" v-text="position.label"></h3>
          <draggable class="m-selected-items" tag="ul" :list="selecteds" group="people" :move="move_handle"
                     :data-AucGenre="position.AucGenre" :data-AucSubType="position.AucSubType"
                     style="min-height:60px;border: 1px solid;border-radius: 4px;">
            <li v-for="(item,key) in selecteds" :key="key">
              <Item :item="item"/>
            </li>
          </draggable>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pubheader from "@/components/publish/pubheader.vue";
import Tinymce from '@jx3box/jx3box-editor/src/Tinymce';
import Item from '@/components/publish/item.vue';
import draggable from 'vuedraggable';

// 本地依赖
import {JX3BOX} from "@jx3box/jx3box-common";
import {search_items, get_item_newest_post, create_item_post} from "../service/item";

const qs = require("qs");
const lodash = require("lodash");

export default {
  name: "item",
  props: [],
  data: function () {
    return {
      keyword: '',
      items: null,
      selecteds: [],
      plan: {
        id: '',
        name: '',
        type: '',
        relation: '',
        description: '',
      },
      positions: [
        {label: '武器', AucGenre: 1},
        {label: '暗器', AucGenre: 2},
        {label: '上衣', AucGenre: 3, AucSubType: 1},
        {label: '帽子', AucGenre: 3, AucSubType: 2},
        {label: '腰带', AucGenre: 3, AucSubType: 3},
        {label: '下装', AucGenre: 3, AucSubType: 4},
        {label: '鞋子', AucGenre: 3, AucSubType: 5},
        {label: '护腕', AucGenre: 3, AucSubType: 6},
        {label: '项链', AucGenre: 4, AucSubType: 1},
        {label: '腰坠', AucGenre: 4, AucSubType: 3},
        {label: '戒指', AucGenre: 4, AucSubType: 2},
        {label: '戒指', AucGenre: 4, AucSubType: 2},
      ],
    };
  },
  computed: {},
  methods: {
    move_handle(e, to) {
      if (to.target.classList.contains('m-selected-items')) {
        let AucGenre = to.target.getAttribute('data-AucGenre');
        let AucSubType = to.target.getAttribute('data-AucSubType');
        console.log(44,e.draggedContext.element);
        let result = e.draggedContext.element.AucGenre == AucGenre;
        if (AucSubType !== null) result = result && e.draggedContext.element.AucSubType == AucSubType;
        return result;
      }
    },
  },
  mounted() {

  },
  watch: {
    keyword() {
      search_items(this.keyword, 10, ['id', 'UiID', 'Name', 'IconID', 'Quality', 'AucGenre', 'AucSubType']).then(
          (data) => {
            data = data.data;
            this.items = data.code === 200 ? data.data.data : [];
            console.log(41412,this.items);
          },
          () => {
            this.options.items = false;
          }
      );
    }
  },
  components: {
    draggable,
    pubheader,
    // Tinymce,
    Item,
  },
};
</script>

<style lang="less">
@import "../assets/css/publish/item_plan.less";
</style>
