<template>
  <div class="m-publish-box">
    <!-- 头部 -->
    <pubheader name="剑三小册" :localDraft="false">
      <slot name="header"></slot>
    </pubheader>

    <el-form label-position="left" class="m-publish-collection">
      <!-- 💛 栏目字段 -->
      <div class="m-publish-title">
        <el-divider content-position="left">标题</el-divider>
        <el-input v-model="collection.title" placeholder="请输入剑三小册标题" maxlength="20" show-word-limit></el-input>
      </div>

      <el-row :gutter="30">
        <el-col :span="6" class="m-publish-image">
          <el-divider content-position="left">封面图</el-divider>
          <post_banner :banner="collection.image"/>
        </el-col>
        <el-col :span="18">
          <div class="m-publish-public">
            <el-divider content-position="left">可见性</el-divider>
            <el-radio v-model="collection.public" :label="2">公开</el-radio>
            <el-radio v-model="collection.public" :label="1">私有</el-radio>
          </div>

          <div class="m-publish-tags">
            <el-divider content-position="left">标签（选填）</el-divider>
            <ul class="m-list-style">
              <li v-for="(t, key) in collection.tags" :key="key" class="m-tag">
                <span v-text="t"></span>
                <i class="el-icon-close" @click="collection.tags.splice(key, 1)"></i>
              </li>
            </ul>
            <div class="m-tag-add" v-if="collection.tags.length < 5">
              <el-input class="u-tag-add-value" placeholder="请输入标签（最多为5个）" v-model="tag"></el-input>
              <el-button class="u-tag-add" @click="()=>{if(tag)collection.tags.push(tag);tag='';}">
                <i class="el-icon-plus"></i>
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="m-publish-description">
        <el-divider content-position="left" @click="show_description=!show_description">描述（选填）</el-divider>
        <span v-if="!show_description" @click="show_description=true" class="u-show">▼ 展开</span>
        <span v-if="show_description" @click="show_description=false" class="u-hide">▲ 收起</span>
        <Tinymce
            v-show="show_description"
            v-model="collection.description"
            :attachmentEnable="true"
            :resourceEnable="true"
            :height="300"
        />
      </div>

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
                           @change="()=>{search_handle(null, item);item.url=item.title=''}">
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
                    :remote-method="(query)=>{search_handle(query, item)}"
                    @change="(post_id)=>{title_fill(post_id, item)}"
                >
                  <template v-for="post in item.posts">
                    <el-option v-if="post.id && post.title" :key="post.id" :value="post.id"
                               :label="post.title"></el-option>
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
        <div v-else class="u-content-items-empty">暂无文章信息，请进行文章添加</div>
      </div>

      <el-form-item>
        <el-button
            class="u-publish"
            icon="el-icon-s-promotion"
            type="success"
            @click="submit"
            :loading="$store.state.processing"
        >提交剑三小册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const {__postType, __otherType} = require("@jx3box/jx3box-common/js/jx3box");
  import Tinymce from '@jx3box/jx3box-editor/src/Tinymce'
  import pubheader from "@/components/publish/pubheader.vue";
  import post_banner from "@/components/publish/post_banner.vue";
  import draggable from "vuedraggable";

  // 本地依赖
  import {get_collection, submit_collection} from "../service/collection";
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
        source_types: source_types,
        // 剑三小册主体
        collection: {
          id: "",
          title: "",
          public: "",
          image: "",
          description: "",
          tags: [],
          content: [],
        },
        tag: '',
        show_description: false,
      };
    },
    mounted() {
      if (!this.collection.content.length) this.add_content_item();

      if (this.$route.params.collection_id) {
        get_collection(this.$route.params.collection_id).then(
          (res) => {
            res = res.data;
            if (res.code === 200) {
              let collection = res.data.collection;
              for (let i in collection.content) {
                let item = collection.content[i];
                item.posts = item.type === 'custom' ? null : [{id: item.id, title: item.title}];
              }
              this.collection = res.data.collection;
            }
          }
        )
      }
    },
    methods: {
      // 帖子标题填充
      title_fill(post_id, item) {
        let post = item.posts[post_id];
        item.title = post && post.title ? post.title : '';
      },
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
      submit: function () {
        this.$confirm('确定提交剑三小册信息？', '提示', {type: 'info'}).then(() => {
          let collection = JSON.parse(JSON.stringify(this.collection));

          if (!collection.content.length) {
            this.$message({message: "要添加剑三小册内文章哦", type: "warning"});
            return;
          }

          // 去除多余字段
          for (let i in collection.content) delete collection.content[i].posts;
          collection.content = JSON.stringify(collection.content);

          this.$store.commit('startProcess');
          submit_collection(collection).then((data) => {
            data = data.data;
            if (data.code === 200) {
              this.$message({message: data.message, type: "success"});
              location.href = `${__Root}collection/#/view/${data.data.collection.id}`;
            } else {
              this.$message({message: `${data.message}`, type: "warning"});
            }
          });
        });
      },
    },
    components: {
      Tinymce,
      draggable,
      pubheader,
      post_banner,
    },
  };
</script>

<style lang="less">
  @import "../assets/css/publish/collection.less";
</style>
