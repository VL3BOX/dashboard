<template>
    <div class="c-editor-tinymce">
        <editor id="tinymce" v-model="data" :init="init" class="c-tinymce" />
        <el-alert class="u-tutorial" type="warning" show-icon
            >进入特殊区域（代码块，折叠块等等）脱离时，请使用键盘方向键，回车只是正常在区块内换行。更多帮助请参阅<a href="https://www.jx3box.com/help/219/" target="_blank">【帮助手册/编辑器】</a>
            <!-- TODO:修改链接 -->
        </el-alert>
    </div>
</template>

<script>
// import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";
// import "tinymce/themes/silver/theme";

// import "tinymce/plugins/image";
// import "tinymce/plugins/link";
// import "tinymce/plugins/code";
// import "tinymce/plugins/table";
// import "tinymce/plugins/lists";
// import "tinymce/plugins/wordcount";
// import "tinymce/plugins/anchor";
// import "tinymce/plugins/autolink";
// import "tinymce/plugins/hr";
// import "tinymce/plugins/advlist";
// import "tinymce/plugins/codesample";
// import "tinymce/plugins/emoticons";
// import "tinymce/plugins/autosave";
// import "tinymce/plugins/fullscreen";
// import "tinymce/plugins/pagebreak";
// import "../plugins/axupimgs/plugin";

export default {
    name: "tinymce",
    props: ["content"],
    data: function() {
        return {
            baseUrl: "/",
            data: this.content,
            init: {
                // 选择器
                selector: "#tinymce",

                // 语言
                language: "zh_CN",
                language_url: `./tinymce/langs/zh_CN.js`,

                // 样式
                // skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
                content_css: `./tinymce/skins/content/default/content.css`, //FIXME:编辑前后内容样式
                body_class: "c-editor-tinymce-body",
                height: 800,

                // UI
                menubar: false,
                branding: false,
                contextmenu: "",
                plugins: [
                    "link anchor autolink",
                    "hr lists advlist codesample",
                    "table image",
                    "autosave code fullscreen wordcount pagebreak",
                ],
                toolbar: [
                    "undo | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough superscript subscript | link unlink anchor | restoredraft code fullscreen",
                    "removeformat | hr alignleft aligncenter alignright alignjustify indent outdent | bullist numlist table blockquote codesample | image | pagebreak",
                ],
                mobile: {
                    plugins: ["autosave", "lists", "autolink", "pagebreak"],
                    toolbar: ["bold forecolor backcolor pagebreak undo redo"],
                },
                block_formats:
                    "段落=p;一级标题=h1;二级标题=h2;三级标题=h3;四级标题=h4;五级标题=h5;六级标题=h6;",
                fontsize_formats:
                    "12px 14px 16px 18px 22px 24px 26px 28px 32px 48px 72px",
                color_map: [
                    "FF99CC",
                    "浅粉",
                    "FF3399",
                    "深粉",
                    "FF0000",
                    "正红",
                    "CC99FF",
                    "紫色",
                    "9933ff",
                    "深紫",

                    "FFFF99",
                    "浅黄",
                    "FFFF00",
                    "金黄",
                    "FFCC00",
                    "亮黄",
                    "FFCC99",
                    "浅桃",
                    "FF6600",
                    "橘色",

                    "CCFFCC",
                    "浅绿",
                    "9bf915",
                    "荧光绿",
                    "00FF00",
                    "辣眼绿",
                    "49c10f",
                    "深绿",
                    "008080",
                    "深青",

                    "CCFFFF",
                    "浅蓝",
                    "00FFFF",
                    "参考线",
                    "00CCFF",
                    "天蓝",
                    "99CCFF",
                    "蔚蓝",
                    "0000FF",
                    "辣眼蓝",

                    "CC0000",
                    "深红",
                    "000000",
                    "黑色",
                ],

                setup: function(editor) {
                    console.log("ID为: " + editor.id + " 的编辑器即将初始化.");
                },
                init_instance_callback: function(editor) {
                    console.log(
                        "ID为: " + editor.id + " 的编辑器已初始化完成."
                    );
                },
            },
        };
    },
    watch: {
        tinymceHtml(newValue) {
            this.data = newV;
        },
        data(newValue) {
            this.$emit("input", newValue);
        },
    },
    computed: {},
    methods: {},
    mounted: function() {},
    components: {
        Editor,
    },
};
</script>

<style lang="less">
.c-editor-tinymce {

    .tox .tox-tbtn {
        cursor: pointer;
    }

    .u-tutorial {
        .mt(10px);
        .fz(13px);
        padding:5px;
        .el-alert__description{
            .mt(0);
        }
        .el-alert__icon.is-big{
            .fz(18px);
        }
        .el-alert__content{
            padding-left:0;
        }
        .el-alert__closebtn{
            top:9px;
        }
    }
}
</style>
