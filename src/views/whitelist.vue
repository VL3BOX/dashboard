<template>
  <div class="m-dashboard m-dashboard-work m-dashboard-whitelist">
    <div class="m-dashboard-whitelist-cont">
      <!-- title -->
      <h2 class="u-title">
        <span class="i-title"> <i class="el-icon-ship"></i> 我的亲友 </span>
        <span class="u-sort" @click="isDrag = true" v-if="!isDrag"> <i class="el-icon-sort"></i> 开启排序 </span>
        <span class="u-sort u-drag" @click="exitDrag" v-else> <i class="el-icon-finished"></i> 退出排序 </span>
      </h2>
      <!-- 拖动显示 -->
      <draggable class="m-drag" element="div" :list="list" v-bind="{ animation: 150, scrollSensitivity: 200 }" v-if="isDrag" @start="dragStart">
        <transition-group type="transition">
          <div class="u-item" v-for="item in list" :key="item.kith_id">
            <div class="u-item-box">
              <img :src="item.kith_info.user_avatar | showAvatar" />
              <div class="u-txt">{{ item.remark || item.kith_info.display_name }}</div>
            </div>
          </div>
        </transition-group>
      </draggable>

      <!--  正常显示-->
      <div class="u-box" v-else>
        <div class="u-item" v-for="(item, i) in list" :key="i">
          <div class="u-item-box">
            <img :src="item.kith_info.user_avatar | showAvatar" />
            <div class="u-item-txt">
              <div class="u-item-name">
                <span>{{ item.kith_info.display_name }}</span>
                <span>备注：{{ item.remark || '无' }}</span>
              </div>
              <div class="u-item-btn">
                <el-button type="warning" @click="delWhitelistBtn(item.kith_id)">删除</el-button>
                <el-button @click="editWhitelistBtn(item.kith_id)">编辑</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加亲友 -->
    <div class="m-dashboard-whitelist-add">
      <div class="u-title"><i class="el-icon-news"></i> 添加亲友</div>
      <el-input class="u-input" v-model="uid" placeholder="输入UID添加" :disabled="isDrag" suffix-icon="el-icon-search" @input="searchUid"></el-input>
      <div class="u-box u-user" v-if="hasUser">
        <img :src="userInfo.user_avatar | showAvatar" alt="userInfo.display_name" />
        <div class="u-txt">
          <span>UID：{{ userInfo.ID }}</span>
          <span>{{ userInfo.display_name }}</span>
        </div>
      </div>
      <div class="u-box" v-else>
        <el-alert title="请输入UID" type="info" show-icon :closable="false"></el-alert>
      </div>
      <el-button type="success" :disabled="!allowAppend" @click="addWhitelistBtn(userInfo)">添加亲友 ({{ list.length }} / {{ hasNum }})</el-button>
    </div>
  </div>
</template>
<script>
import { getWhitelist, editWhitelist, delWhitelist, addWhitelist, getWhitelistById, updateWhitelists } from '@/service/whitelist.js'
import User from '@jx3box/jx3box-common/js/user.js'
import draggable from 'vuedraggable'
import { showAvatar } from '@jx3box/jx3box-common/js/utils'
export default {
  name: 'whitelist',
  props: [],
  data: function() {
    return {
      uid: '',
      list: {},
      userInfo: '',
      isvip: false,
      ispro: false,
      isDrag: false,
      dragList: false,
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
    allowAppend: function() {
      let len = this.list.length
      if (this.isDrag == false) {
        if (len < 5) {
          return true
        } else if (len < 20) {
          return this.isvip
        } else if (len < 100) {
          return this.ispro
        } else {
          return false
        }
      } else {
        return false
      }
    },
    draglist: function() {
      return this.list
    },
    hasNum: function() {
      if (this.ispro) {
        return 100
      }
      if (this.isvip) {
        return 20
      }
      return 5
    },
  },
  methods: {
    dragStart() {
      this.dragList = true
    },
    exitDrag() {
      this.isDrag = false
      if (this.dragList == true) {
        let list = this.list
        let arr = []
        for (let i = 0; i < list.length; i++) {
          list[i].level = list.length - i
          arr.push({
            level: list[i].level,
            kith_id: list[i].kith_id,
          })
        }
        updateWhitelists(arr).then(() => {
          this.successTxt('调整排序成功!')
          this.dragList = false
        })
      }
    },
    searchUid() {
      if (this.uid) {
        getWhitelistById(this.uid).then((res) => {
          this.userInfo = res.data.data
        })
      }
    },
    addWhitelistBtn(user) {
      let n = {
        kith_id: user.ID,
        kith_info: {
          display_name: user.display_name,
          user_avatar: user.user_avatar,
        },
        level: this.list.length,
      }
      addWhitelist(this.uid).then((res) => {
        this.successTxt('亲友添加成功!')
        this.list.unshift(n)
      })
    },
    delWhitelistBtn(val) {
      let list = this.list
      this.$confirm('是否继续删除该亲友?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          delWhitelist(val).then(() => {
            this.successTxt('删除成功!')
            for (let i = 0; i < list.length; i++) {
              if (list[i].kith_id == val) {
                list.splice(i, 1)
              }
            }
            this.list = list
          })
        })
        .catch(() => {})
    },
    editWhitelistBtn(id) {
      this.$prompt('请输入备注', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then((val) => {
          editWhitelist(id, { remark: val.value }).then(() => {
            this.successTxt('备注添加成功!')
            for (let i = 0; i < this.list.length; i++) {
              if (this.list[i].kith_id == id) {
                this.list[i].remark = val.value
              }
            }
          })
        })
        .catch(() => {})
    },
    successTxt(TXT) {
      this.uid = ''
      this.userInfo = ''
      this.$notify({
        title: '成功',
        message: TXT,
        type: 'success',
      })
    },
    getList() {
      getWhitelist().then((res) => {
        let list = res.data.data
        for (let i = list.length - 1; i > 0; i--) {
          for (let j = list.length - 1 - i; j > 0; j--) {
            if (list[j].level > list[j - 1].level) {
              let temp = list[j]
              list[j] = list[j - 1]
              list[j - 1] = temp
            }
          }
        }
        this.list = list
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
  filters: {
    showAvatar: function(val) {
      return showAvatar(val, 80)
    },
  },
  components: { draggable },
}
</script>

<style scoped lang="less">
@import '../assets/css/whitelist.less';
</style>
