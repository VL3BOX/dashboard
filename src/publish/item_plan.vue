<template>
  <div class="m-publish-box">
    <!-- 头部 -->
    <pubheader name="物品百科" :localDraft="false">
      <slot name="header"></slot>
    </pubheader>

    <h1 class="m-publish-item-header">物品清单</h1>

    <el-form label-position="left" label-width="80px" class="m-publish-item">
      <!-- 清单名称 -->
      <el-form-item label="标题">
        <el-input v-model="plan.title" placeholder="请输入物品清单的标题"></el-input>
      </el-form-item>
      <!-- 清单描述 -->
      <el-form-item label="描述">
        <el-input type="textarea" :rows="3" v-model="plan.description" placeholder="简单说明一下你的物品清单"></el-input>
      </el-form-item>
      <!-- 清单类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="plan.type" size="medium">
          <el-radio-button label="1">道具清单</el-radio-button>
          <el-radio-button label="2">装备清单</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <!-- 清单关系 -->
      <el-form-item label="内容">
        <el-row style="line-height:initial;">
          <el-col :xs="24" :sm="5" class="c-item-search">
            <el-input placeholder="请输入物品名称" prefix-icon="el-icon-search" v-model="keyword"></el-input>
            <draggable class="m-search-items" tag="ul" v-if="items && items.length" :list="items" :sort="false"
                       :group="{ name: 'draggable-item', pull: 'clone', put: false }" :move="move_handle"
                       ghost-class="ghost">
              <li v-for="(item,key) in items" :key="key" class="m-search-item">
                <Item :item="item"/>
              </li>
            </draggable>
            <div v-if="items && !items.length" class="m-no-item">
              <i class="el-icon-chat-line-round"></i>
              <span>&nbsp;查找不到相关记录</span>
            </div>
          </el-col>

          <el-col :xs="24" :sm="19" class="c-plan-relation c-normal-relation" v-if="plan.type==1">
            <div class="m-positions">
              <div class="m-position" v-for="(position,key) in normal_relation" :key="key">
                <el-input class="u-title" v-model='position.title' placeholder="子清单标题（选填）"></el-input>
                <div class="c-selected-items">
                  <draggable class="m-selected-items" tag="ul" :list="position.data" group="draggable-item"
                             :class="{empty:!position.data||!position.data.length}" ghost-class="ghost">
                    <li v-for="(item,k) in position.data" :key="k" class="m-selected-item">
                      <Item :item="item"/>
                      <i class="u-el-icon el-icon-close" @click="position.data.splice(k,1)"></i>
                    </li>
                  </draggable>
                  <span v-if="!position.data.length" class="u-tip">拖拽所需道具到此处</span>
                </div>
                <i class="u-el-icon el-icon-close" @click="normal_relation.splice(key,1)"></i>
              </div>
            </div>
            <div class="m-position-add" @click="add_normal_relation">+</div>
          </el-col>

          <el-col :xs="24" :sm="19" class="c-plan-relation" v-if="plan.type==2">
            <div class="m-positions">
              <div class="m-position" v-for="(position,key) in positions" :key="key">
                <h3 class="u-title" v-text="position.label"></h3>
                <div class="c-selected-items">
                  <draggable class="m-selected-items m-selected-equips" tag="ul" :list="equip_relation[key]"
                             group="draggable-item"
                             :data-AucGenre="position.AucGenre" :data-AucSubType="position.AucSubType"
                             :move="move_handle"
                             :class="{empty:!equip_relation[key]||!equip_relation[key].length}" ghost-class="ghost">
                    <li v-for="(item,k) in equip_relation[key]" :key="k" class="m-selected-item">
                      <Item :item="item"/>
                      <i class="u-el-icon el-icon-close" @click="equip_relation[key].splice(k,1)"></i>
                    </li>
                  </draggable>
                  <span v-if="!equip_relation[key].length" class="u-tip">拖拽所需装备到此处</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
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
      normal_relation: [{title: '', data: []}],
      equip_relation: {
        '1': [],
        '2': [],
        '3_1': [],
        '3_2': [],
        '3_3': [],
        '3_4': [],
        '3_5': [],
        '3_6': [],
        '4_1': [],
        '4_3': [],
        '4_2_1': [],
        '4_2_2': [],
      },
      plan: {
        id: '',
        title: '',
        type: 1,
        relation: null,
        description: '',
      },
      positions: {
        '1': {label: '武器', AucGenre: 1},
        '2': {label: '暗器', AucGenre: 2},
        '3_1': {label: '上衣', AucGenre: 3, AucSubType: 1},
        '3_2': {label: '帽子', AucGenre: 3, AucSubType: 2},
        '3_3': {label: '腰带', AucGenre: 3, AucSubType: 3},
        '3_4': {label: '下装', AucGenre: 3, AucSubType: 4},
        '3_5': {label: '鞋子', AucGenre: 3, AucSubType: 5},
        '3_6': {label: '护腕', AucGenre: 3, AucSubType: 6},
        '4_1': {label: '项链', AucGenre: 4, AucSubType: 1},
        '4_3': {label: '腰坠', AucGenre: 4, AucSubType: 3},
        '4_2_1': {label: '戒指', AucGenre: 4, AucSubType: 2, index: 1},
        '4_2_2': {label: '戒指', AucGenre: 4, AucSubType: 2, index: 2},
      },
    };
  },
  computed: {},
  methods: {
    add_normal_relation() {
      this.normal_relation.push({title: '', data: []});
    },
    move_handle(e) {
      if (!e.to.classList.contains('m-selected-items')) return false;
      if (!e.to.classList.contains('m-selected-equips')) return true;
      let AucGenre = e.to.getAttribute('data-AucGenre');
      let AucSubType = e.to.getAttribute('data-AucSubType');
      let result = e.draggedContext.element.AucGenre == AucGenre;
      if (AucSubType !== null) result = result && e.draggedContext.element.AucSubType == AucSubType;
      return result;
    },
    search() {
      search_items(this.keyword, 10, ['id', 'UiID', 'Name', 'IconID', 'Quality', 'AucGenre', 'AucSubType'], this.plan.type == 2).then(
          (data) => {
            data = data.data;
            this.items = data.code === 200 ? data.data.data : [];
          },
          () => {
            this.options.items = false;
          }
      );
    }
  },
  mounted() {

  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.search();
      }
    },
    'plan.type': function () {
      this.search();
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
