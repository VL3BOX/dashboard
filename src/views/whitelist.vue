<template>
  <div class="m-dashboard m-dashboard-work m-dashboard-whitelist">
    <div class="m-dashboard-whitelist-cont">
      <h2 class="u-title"><i class="el-icon-s-management"></i> 我的亲友</h2>
      <el-alert :title="onSuccess" v-show="success" type="success" center show-icon> </el-alert>
      <div class="u-box">
        <div class="u-item" v-for="(item, i) in list" :key="i">
          <div class="u-item-box">
            <img :src="item.info.user_avatar || avatar" />
            <div class="u-item-txt">
              <div class="u-item-name">
                <span>{{ item.info.display_name }}</span
                ><span>备注：{{ item.remark || '无' }}</span>
              </div>
              <div class="u-item-btn"><el-button type="warning" @click="delWhitelistBtn(item.kith_id)">删除</el-button><el-button @click="editWhitelistBtn(item.kith_id)">编辑</el-button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-dashboard-whitelist-add">
      <div class="u-title"><i class="el-icon-news"></i> 添加亲友</div>
      <el-input class="u-input" v-model="uid" placeholder="输入UID添加" suffix-icon="el-icon-search" @input="searchUid"></el-input>
      <div class="u-box u-user" v-if="hasUser">
        <img :src="userInfo.user_avatar || avatar" alt="userInfo.display_name" />
        <div class="u-txt">
          <span>UID：{{ userInfo.ID }}</span>
          <span>{{ userInfo.display_name }}</span>
        </div>
      </div>
      <div class="u-box" v-else>
        <el-alert title="请输入UID" type="info" show-icon :closable="false"> </el-alert>
      </div>
      <el-button type="success" :disabled="!allowAppend" @click="addWhitelistBtn">添加亲友 ({{ this.list.length }} / {{ hasNum }})</el-button>
    </div>
  </div>
</template>
<script>
import { getWhitelist, editWhitelist, delWhitelist, addWhitelist, getWhitelistById } from '@/service/whitelist.js'
import User from '@jx3box/jx3box-common/js/user.js'

export default {
  name: 'whitelist',
  props: [],
  data: function() {
    return {
      uid: '',
      list: {},
      userInfo: '',
      onSuccess: '',
      avatar: 'https://console.cnyixun.com/image/common/avatar.png?x-oss-process=style/avatar_s',
      isvip: false,
      ispro: false,
    }
  },
  computed: {
    isVerify: function() {
      if (this.uid == '') {
        return false
      }
      if (this.userInfo == null) {
        return false
      }
      return true
    },
    hasUser: function() {
      return this.userInfo
    },
    success: function() {
      return this.onSuccess !== ''
    },
    allowAppend: function() {
      let len = this.list.length
      if (len < 5) {
        return true
      } else if (len < 20) {
        return this.isvip
      } else {
        return this.ispro
      }
    },
    hasNum: function() {
      if (this.isvip) {
        return 20
      }
      if (this.ispro) {
        return 100
      }
      return 0
    },
  },
  methods: {
    searchUid() {
      if (this.uid) {
        getWhitelistById(this.uid).then((res) => {
          this.userInfo = res.data.data
        })
      }
    },
    addWhitelistBtn() {
      addWhitelist(this.uid).then((res) => {
        this.successTxt('亲友添加成功')
        this.getList()
      })
    },
    delWhitelistBtn(val) {
      delWhitelist(val).then(() => {
        this.successTxt('删除亲友成功')
        this.getList()
      })
    },
    editWhitelistBtn(id) {
      this.$prompt('请输入备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then((val) => {
          editWhitelist(id, { remark: val.value }).then(() => {
            this.successTxt('备注添加成功')
            this.getList()
          })
        })
        .catch(() => {})
    },
    successTxt(TXT) {
      this.onSuccess = TXT
      this.uid = ''
      this.userInfo = ''
      setTimeout(() => {
        this.onSuccess = ''
      }, 2000)
    },
    getList() {
      getWhitelist().then((res) => {
        this.list = res.data.data
      })
    },
  },
  mounted: function() {
    this.getList()
    User.getAsset().then(() => {
      User.isVIP().then((data) => {
        this.isvip = data
      })
      User.isPRO().then((data) => {
        this.ispro = data
      })
    })
  },
  components: {},
}
</script>

<style scoped lang="less">
@import '../assets/css/whitelist.less';
</style>
