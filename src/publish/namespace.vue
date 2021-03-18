<template>
  <div class="m-dashboard-publish-namespace m-publish-box">
    <pubheader :name="name" :localDraft="false"><slot name="header"></slot></pubheader>
    <div class="m-publish-namespace-box">
      <header class="m-publish-namespace-header">
        <div class="u-tip">铭牌是一个可以通过关键词快速访问的功能，例如定义铭牌 "某某气纯宏"，则可以在浏览器地址栏中通过快速输入 <a href="https://剑网3.com/某某气纯宏" target="_blank">剑网3.com/某某气纯宏</a> 访问你输入的链接</div>
        <div class="u-count">
          当前可建铭牌数： <b>{{ count }}</b> 个
          <a href="https://" target="_blank" class="u-btn-buy el-button el-button--primary el-button--mini"><span class="el-icon-shopping-cart-2"></span>购买铭牌</a>
          <a href="" class="u-skip" target="_blank"><span class="el-icon-connection"></span>限时0.99元抢注10个铭牌</a>
        </div>
      </header>
      <el-form class="m-publish-namespace-form" :model="form">
        <el-form-item label="关键词">
          <el-input v-model="form.key" placeholder="全局唯一关键词"></el-input>
          <el-alert v-if="!available" title="已有关键词，请重新输入" type="error" show-icon />
        </el-form-item>

        <el-form-item label="描述">
          <el-input v-model="form.desc" placeholder="请输入关于铭牌的描述" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="form.link" placeholder="请输入跳转地址"><template slot="prepend">Https://</template></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" :disabled="!!!count && !ready" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sterilizer } from 'sterilizer/index.js'
import pubheader from '@/components/publish/pubheader'
import { getNamespace, getNamespaceByKey, queryNamespace, createNamespace, updateNamespace } from '@/service/namespace'
import User from '@jx3box/jx3box-common/js/user'

export default {
  name: 'namespace',
  props: [],
  data: function() {
    return {
      name: '剑三铭牌',
      form: { key: '', desc: '', link: '' },
      count: 0,
      //   可用性检测
      available: true,
    }
  },
  computed: {
    data: function() {
      return {
        key: this.form.key,
        desc: this.form.desc,
        link: 'https://' + this.form.link,
        source_type: 'custom',
      }
    },
    ready: function() {
      return this.available && this.form.link
    },
  },
  methods: {
    checkKey: function(val) {
      if (!val) return

      this.form.key = sterilizer(this.form.key).kill()
      this.form.key = sterilizer(this.form.key).removeSpace()
      this.checkAvailable()
      //   this.getKey(this.form.key)
    },
    checkLink: function(val) {
      if (!val) return

      const link = this.form.link
      if (link.includes('http://') || link.includes('https://')) {
        this.form.link = link.replace(/https?\:\/\//, '')
      }
    },
    checkAvailable: function() {
      getNamespaceByKey(this.form.key).then((res) => {
        if (!res.data.data.namespace) {
          this.available = true
        } else {
          this.available = false
        }
      })
    },
    onSubmit: function() {
      if (this.form.desc == '') {
        let profile = User.getInfo()
        this.data.desc = profile.name + '创建'
      }
      createNamespace(this.data).then((res) => {
        console.log(res, '...')
      })
    },
  },
  watch: {
    'form.key': function(val) {
      this.checkKey(val)
    },
    'form.link': function(val) {
      this.checkLink(val)
    },
  },
  created() {
    User.getAsset().then((data) => {
      this.count = data.namespace_card_count
    })
  },
  mounted: function() {
    if (this.$route.params.id) {
      queryNamespace(this.$route.params.id).then((res) => {
        console.log(res)
      })
    }
  },

  components: {
    pubheader,
  },
}
</script>

<style lang="less">
@import '../assets/css/publish/namespace.less';
</style>
