<template>
  <div class="m-dashboard m-dashboard-work m-dashboard-fav">
    <h2 class="u-title">剑三小册</h2>
    <el-input
        class="m-dashboard-work-search"
        placeholder="请输入小册标题搜索内容"
        v-model="search"
        @change="page_change(1)"
    >
      <template slot="prepend">关键词</template>
      <el-button
          slot="append"
          icon="el-icon-search"
          @click="page_change(1)"
      ></el-button>
    </el-input>

    <div class="m-dashboard-box">
      <ul class="m-dashboard-box-list" v-if="data.length">
        <li v-for="(item, i) in data" :key="i">
          <div class="c-image">
            <img class="u-image" :src="item.image">
          </div>
          <div class="c-content">
            <i class="u-icon">
              <img
                  v-if="item.public"
                  svg-inline
                  src="../assets/img/works/repo.svg"
              />
              <img
                  v-else
                  svg-inline
                  src="../assets/img/works/draft.svg"
              />
            </i>
            <a
                class="u-title"
                target="_blank"
                :href="getLink(item.post_type, item.post_id)"
            >{{ item.title || "无标题" }}</a
            >
            <div class="u-desc">
              <div class="m-tags">
                <div class="m-tag" v-for="(tag, key) in item.tags" :key="key" v-text="tag"></div>
              </div>
              <span v-if="item.updated"> | 最后更新: {{ item.updated * 1000 | dateFormat }}</span>
            </div>
            <el-button-group class="u-action">
              <el-button
                  size="mini"
                  icon="el-icon-edit"
                  title="编辑"
                  @click="post_edit(item.id)"
              ></el-button>
              <el-button
                  size="mini"
                  icon="el-icon-delete"
                  title="删除"
                  @click="post_del(item.id)"
              ></el-button>
            </el-button-group>
          </div>
        </li>
      </ul>
      <el-alert
          v-else
          class="m-dashboard-box-null"
          title="没有找到相关条目"
          type="info"
          center
          show-icon
      >
      </el-alert>
      <el-pagination
          class="m-dashboard-box-pages"
          background
          :page-size="limit"
          :hide-on-single-page="true"
          @current-change="page_change"
          :current-page="page"
          layout="total, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {get_my_collections, remove_collection} from "../service/collection";
  import {getLink, getTypeLabel} from "@jx3box/jx3box-common/js/utils";
  import dateFormat from "../utils/dateFormat";

  export default {
    name: "collection",
    props: [],
    data: function () {
      return {
        type: "all",
        data: [],
        total: 1,
        page: 1,
        limit: 9,
        search: "",
      };
    },
    computed: {},
    methods: {
      page_change(i = 1) {
        get_my_collections({
          keyword: this.search,
          page: i,
          limit: this.limit,
        }).then((res) => {
          res = res.data;
          this.data = res.code === 200 ? res.data.data : [];
          this.total = res.code === 200 ? res.data.total : 0;
        });
      },
      post_edit(id) {
        location.href = "./publish/#/collection/" + id;
      },
      post_del(id) {
        this.$alert("确定要删除这篇小册吗？", "确认信息", {
          confirmButtonText: "确定",
          callback: (action) => {
            remove_collection(id).then((res) => {
              res = res.data;
              if (res.code === 200) {
                this.$message({type: "success", message: `删除成功`});
                this.page_change(this.page)
              } else this.$message({type: "warning", message: res.message});
            });
          },
        });
      },
      getLink,
      getTypeLabel,
    },
    filters: {
      dateFormat: function (val) {
        return dateFormat(new Date(val));
      },
    },
    mounted: function () {
      this.page_change();
    },
  };
</script>

<style scoped lang="less">
  @import "../assets/css/work.less";

  .c-image {
    .fl;
    .w(75px);

    .u-image {
      .w(100%);
      border-radius: 3px;
    }
  }

  .c-content {
    .ml(85px);
    overflow: hidden;
  }

  .m-tags {
    .dbi;
    list-style: none;
  }

  .m-tag {
    .dbi;
    .mr(5px);
    padding: 1px 6px 3px;
    line-height: initial;
    background-color: #0366D6;
    color: #FFFFFF;
    font-size: 12px;
    border-radius: 4px;
  }
</style>
