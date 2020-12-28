<template>
  <div class="m-publish-box">
    <!-- 头部 -->
    <pubheader name="文集" :localDraft="false">
      <slot name="header"></slot>
    </pubheader>

    <el-form label-position="left" class="m-publish-collection">
      <!-- 💛 栏目字段 -->
      <div class="m-publish-title">
        <el-divider content-position="left">标题</el-divider>
        <el-input v-model="collection.title" placeholder="请输入文集标题" maxlength="20" show-word-limit></el-input>
      </div>

      <br>
      <el-row gutter="30">
        <el-col span="6" class="m-publish-status">
          <el-divider content-position="left">可见性</el-divider>
          <el-radio v-model="collection.status" :label="2">公开</el-radio>
          <el-radio v-model="collection.status" :label="1">私有</el-radio>
        </el-col>
        <el-col span="18" class="m-publish-tags">
          <el-divider content-position="left">标签（选填）</el-divider>
          <ul class="m-list-style">
            <li v-for="(tag, key) in collection.tags" :key="key" class="m-tag">
              <span v-text="tag"></span>
              <i class="el-icon-close" @click="collection.tags.splice(key, 1)"></i>
            </li>
          </ul>
          <div style="display:inline-block;vertical-align:middle;">
            <el-input class="u-tag-add-value" placeholder="请输入标签（最多为5个）" v-model="add_tag"></el-input>
            <el-button class="u-tag-add" @click="()=>{if(add_tag)collection.tags.push(add_tag);add_tag=''}">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>

      <br>
      <el-row gutter="30">
        <el-col span="6" class="m-publish-image">
          <el-divider content-position="left">封面图</el-divider>
          <post_banner :banner="collection.image"/>
        </el-col>

        <el-col span="18" class="m-publish-description">
          <el-divider content-position="left">描述（选填）</el-divider>
          <el-input type="textarea" maxlength="2000" show-word-limit v-model="collection.description"
                    placeholder="请简单描述一下您的文集"></el-input>
        </el-col>
      </el-row>

      <br>
      <div class="m-publish-content">
        <el-divider content-position="left">内容</el-divider>
        <div class="u-content-add" @click="add_content_item">
          <i class="el-icon-plus"></i>
          <span> 添加文章</span>
        </div>
        <draggable
            class="m-list-style"
            tag="ul"
            v-if="collection.content && collection.content.length"
            :list="collection.content"
            handle=".u-move"
        >
          <li v-for="(item, key) in collection.content" :key="key" class="c-content-item">
            <i class="u-move el-icon-more"></i>
            <i class="u-delete el-icon-close" @click="collection.content.splice(key, 1)"></i>
            <el-row class="m-content-item" :gutter="10">
              <el-col :span="4">
                <el-select class="u-item-key" v-model="item.type" placeholder="请选择文章类型"
                           @change="()=>{search_handle(null, item);item.url=''}">
                  <el-option v-for="(type, k) in source_types" :label="type" :key="k" :value="k"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select
                    v-if="item.type !== 'custom'"
                    class="u-item-value"
                    v-model="item.id"
                    filterable
                    remote
                    placeholder="通过输入文章标题进行搜索"
                    :remote-method="(query)=>{search_handle(query, item)}">
                  <template v-for="post in item.posts">
                    <el-option :key="post.id" :value="post.id" :label="post.title"
                               v-if="post.id && post.title"></el-option>
                  </template>
                </el-select>
                <el-input class="u-item-value" placeholder="请输入URL链接" v-else v-model="item.url"></el-input>
              </el-col>
              <el-col :span="12" v-if="item.url">
                <el-input v-model="item.title" placeholder="请输入自定义标题"></el-input>
              </el-col>
            </el-row>
          </li>
        </draggable>
      </div>
    </el-form>
  </div>
</template>

<script>
  const {__postType, __otherType} = require("@jx3box/jx3box-common/js/jx3box");
  import pubheader from "@/components/publish/pubheader.vue";
  import post_banner from "@/components/publish/post_banner.vue";
  import draggable from "vuedraggable";

  // 本地依赖
  import {JX3BOX} from "@jx3box/jx3box-common";
  import {search_items, get_item_newest_post, create_item_post} from "../service/item";
  import {get_posts_by_type} from "../service/post";

  const qs = require("qs");
  const lodash = require("lodash");

  export default {
    name: "item",
    props: [],
    data() {
      // 文章类型加载
      let source_types = Object.assign(__postType, __otherType);
      source_types['custom'] = '自定义';
      delete source_types['cj'];

      return {
        //选项 - 加载可选项
        options: {
          items: null,
          search_loading: false,
        },
        source_types: source_types,
        // 文集主体
        collection: {
          id: "",
          title: "",
          status: "",
          image: "",
          description: "",
          tags: [],
          content: [],
        },
        add_tag: '',
      };
    },
    mounted() {
      if (!this.collection.content.length) this.add_content_item();
    },
    computed: {
      processing: function () {
        return this.$store.state.processing
      }
    },
    methods: {
      add_content_item() {
        this.collection.content.push({title: '', type: '', id: '', url: '', posts: null})
      },
      search_handle(queryString, item) {
        if (queryString === null) item.id = queryString = '';
        get_posts_by_type(item.type, {keyword: queryString}).then((res) => {
          res = res.data;
          if (res.code === 200) {
            item.posts = res.data.posts;
          }
        });
      },
      toPublish: function () {
        if (!this.post.content) {
          this.$message({message: "要编写攻略正文哦", type: "warning"});
          return;
        }

        if (!(this.post.level >= 1 && this.post.level <= 5)) {
          this.$message({message: "请选择适合的综合难度", type: "warning"});
          return;
        }

        if (!this.post.remark) {
          this.$message({message: "请简单描述本次修订说明", type: "warning"});
          return;
        }

        this.$store.commit('startProcess');
        create_item_post(this.post).then((data) => {
          data = data.data;
          if (data.code === 200) {
            this.$message({
              message: "提交成功，请等待审核", type: "success", onClose: () => {
                this.$router.go(0);
              }
            });
          } else {
            this.$message({message: `${data.message}`, type: "warning",});
          }
        });
      },
      icon_url_filter(icon_id) {
        if (isNaN(parseInt(icon_id))) {
          return `${JX3BOX.__imgPath}image/common/nullicon.png`;
        } else {
          return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
        }
      },
    },
    watch: {},
    components: {
      draggable,
      pubheader,
      post_banner,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/publish/collection.less";
</style>
