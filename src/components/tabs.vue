<template>
    <el-tabs class="m-dashboard-tabs" v-model="active" @tab-click="changeTab">
        <el-tab-pane name="profile"
            ><span slot="label"
                ><i class="el-icon-user"></i> 基本资料</span
            ></el-tab-pane
        >
        <el-tab-pane name="avatar"
            ><span slot="label"
                ><i class="el-icon-camera"></i> 修改头像</span
            ></el-tab-pane
        >
        <el-tab-pane name="pwd"
            ><span slot="label"
                ><i class="el-icon-lock"></i> 修改密码</span
            ></el-tab-pane
        >
        <el-tab-pane name="email"
            ><span slot="label"
                ><img class="u-mail" svg-inline src="../assets/img/nav/mail.svg" /> 绑定邮箱</span
            ></el-tab-pane
        >
        <el-tab-pane name="connect"
            ><span slot="label"
                ><i class="el-icon-connection"></i> 绑定账号</span
            ></el-tab-pane
        >
    </el-tabs>
</template>

<script>
export default {
    name: "",
    props: [],
    data: function() {
        return {
            active : 'profile'
        };
    },
    watch : {
        $route : function (){
            this.active = this.$route.name
        }  
    },
    computed: {},
    methods: {
        changeTab : function (){
            this.$router.push({name : this.active})
        }
    },
    mounted: function() {
        this.active = this.$route.name
    },
    components: {},
};
</script>
