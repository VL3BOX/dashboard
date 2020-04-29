<template>
    <div id="app">
        <Header />
        <Breadcrumb>
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main>
            <router-view />
        </Main>
    </div>
</template>

<script>
import Info from '@/components/Info.vue';
import Nav from '@/components/Nav.vue';
    export default {
        name : 'App',
        props:[],
        data : function(){
            return {
                
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
        components:{
            Info,
            Nav,
        }
    }
</script>

<style lang="less">
   .c-main{
       margin-right:0 !important;
   }
    
</style>