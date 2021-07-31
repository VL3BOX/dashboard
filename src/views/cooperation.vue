<template>
  <div class="m-dashboard m-cooperation">
    <h2 class="u-title"><i class="el-icon-reading"></i> 签约作者</h2>
    <div class="m-form">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" :label-position="position">
        <el-form-item class="u-item" label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入作者昵称"></el-input>
        </el-form-item>

        <el-form-item class="u-item" label="QQ" prop="qq">
          <el-input v-model="form.qq" placeholder="请输入QQ号码"></el-input>
        </el-form-item>

        <el-form-item class="u-item" label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>

        <el-form-item class="u-item" label="微博" prop="weibo">
          <el-input v-model="form.weibo" placeholder="请输入微博地址"></el-input>
        </el-form-item>

        <el-form-item class="u-item" label="自述" prop="desc">
          <el-input type="textarea" :rows="4" maxlength="80" placeholder="自述自己的一些作品" v-model="form.desc" show-word-limit> </el-input>
        </el-form-item>

        <el-form-item class="u-btns" label="">
          <el-button type="primary" class="u-submit" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import User from '@jx3box/jx3box-common/js/user'
export default {
  name: 'cooperation',
  props: [],
  data: function() {
    return {
      position: window.innerWidth < 768 ? 'top' : 'left',
      form: {
        uid: User.getInfo().uid,
        nickname: '',
        qq: '',
        phone: '',
        weibo: '',
        desc: '',
      },
      rules: {
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        qq: [{ required: true, message: '请输入QQ号码', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        weibo: [{ required: true, message: '请输入微博地址', trigger: 'chablurnge' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
      },
    }
  },
  computed: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          return false
        }
      })
    },
  },
  mounted: function() {},
}
</script>
<style lang="less">
.m-cooperation {
  .m-form {
    padding-top: 20px;
    .u-item {
      input {
        .size(200px, 40px);
      }
    }
  }
}
</style>
