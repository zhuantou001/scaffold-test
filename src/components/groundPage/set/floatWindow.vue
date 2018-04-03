<template>
    <div class="assembly" :class="{packUp: isSpread}">
        <h3 @click="spread">
            <i class="el-icon-edit"></i> 添加浮窗模块
            <span class="packUpIcon"><i class="el-icon-arrow-down" :class="{rotate:isSpread, rotate2:!isSpread}"></i></span>
            <a class="del-component" @click.stop="deleteFun"><i class="el-icon-delete"></i></a>
        </h3>
        <el-row :gutter="20">
            <el-col :span="6"><label>上传图标</label></el-col>
            <el-col :span="18">
                <el-upload
                class="upload-demo"
                :action="serverUrl"
                :headers="headerToken"
                :on-preview="handlePreview"
                :file-list="absoluteFloatImgUrls"
                :on-success="handleAvatarSuccess"
                :on-remove="handleRemove"
                :before-upload="beforeAvatarUpload"
                :on-error="onError"
                list-type="picture-card">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过50KB <br>
                    更新文件时，删除图片会同时进行保存文件操作哟！
                </div>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><label>图标位置</label></el-col>
            <el-col :span="3"><label>右边距</label></el-col>
            <el-col :span="5"><el-input v-model="consultRight" type="number" placeholder="请输入距离"></el-input></el-col>
            <el-col :span="3"><label>上边距</label></el-col>
            <el-col :span="5"><el-input v-model="consultTop" type="number" placeholder="请输入距离"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><label>图标大小</label></el-col>
            <el-col :span="3"><label>宽度</label></el-col>
            <el-col :span="5"><el-input v-model="consultWidth" type="number" placeholder="请输入宽度"></el-input></el-col>
            <el-col :span="3"><label>高度</label></el-col>
            <el-col :span="5"><el-input v-model="consultHeight" type="number" placeholder="请输入高度"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><label>图标圆角</label></el-col>
            <el-col :span="18"><el-input type="number" v-model="consultRadius"></el-input></el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6"><label>图片跳转链接</label></el-col>
            <el-col :span="18">
                <el-input v-model="consultHrefUrl" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {scaffoldData, successMsg, failMsg, deleteComponent } from '../../common/common';
    import {Config, ROUTES} from '../../common/api';
    export default {
        data () {
            return {
                isSpread: true,
                serverUrl: Config.api_url + ROUTES.btnImgUpload,
                floatImgShow: true,
                headerToken: {'x-access-token':localStorage.getItem('token')},
                dialogVisible: false,
                dialogImageUrl: '',
            }
        },
        props: ['index'],
        component: {
            deleteComponent,
            successMsg,
            failMsg
        },
        mounted () {
        },
        watch: {
            floatImgShow: function () {
                this.$store.commit('newFloatImgShow', this.floatImgShow);
            }
        },
        methods: {
            // 展开收起
            spread () {
                if (this.isSpread) {
                this.isSpread = false;
                } else {
                this.isSpread = true;
                }
            },
            deleteFun () {
                this.deleteComponent(this.setComponentsItems, this.getComponentsItems, this.index);
            },
            handlePreview (file) {
                let i;
                for (i in this.absoluteFloatImgUrls) {
                if (file.name === this.absoluteFloatImgUrls[i].name) {
                    this.dialogImageUrl = this.absoluteFloatImgUrls[i].url;
                    this.dialogVisible = true;
                    break;
                }
                }
            },
            handleAvatarSuccess (res, file) {
                if (res.resultCode === '0000') {
                    this.successMsg('上传成功');
                    let fileData = {};
                    fileData.name = res.data.imgName;
                    fileData.image_url = res.data.otherImg;
                    this.floatImgFileList.push(fileData);
                } else {
                    this.failMsg('上传失败');
                }
            },
            handleRemove (file, fileList) {
                let i;
                const self = this;
                for (i in this.floatImgFileList) {
                if (file.name === this.floatImgFileList[i].name) {
                    this.$ajax({
                    method: 'get',
                    url: Config.api_url + ROUTES.deleteDetailImg + '?imgPath=' + this.floatImgFileList[i].image_url,
                    }).then((res)=>{
                    if (res.data.data.ret_code === '0000') {
                        self.successMsg("删除成功！");
                    } else {
                        // self.failMsg("删除失败！");
                    }
                    self.floatImgFileList.splice(i, 1);
                    self.$store.commit('newFloatImgFileList', this.floatImgFileList);
                    let data = '';
                    if (localStorage.getItem('projectData')) {
                        data = JSON.parse(localStorage.getItem('projectData'));
                    }
                    if (data) {
                        // 编辑
                        this.category_id = data.category_id;
                        this.page_id = data.page_id;
                        this.updateData();
                    }
                    }).catch((e)=>{
                    self.failMsg("服务器错误");
                    })
                    break;
                }
                }
                console.log(this.floatImgFileList)
            },
            beforeAvatarUpload (file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                // 测试环境 限制50kb
                const isLt2M = file.size / 1024 < 50;
                // 正式环境  100kb
                // const isLt2M = file.size / 1024 < 100;
                if (!isJPG && !isPNG) {
                    this.failMsg('上传图片只能是 JPG或者PNG 格式');
                    return false;
                }
                if (!isLt2M) {
                    this.failMsg('上传图片大小不能超过 50kb!');
                    return false;
                    // this.$message.error('上传头图图片大小不能超过 100kb!');
                }
                return (isPNG || isJPG) && isLt2M;
            },
            onError () {
                this.failMsg('上传失败');
            },
            consult () {
                let arr = this.$store.state.app.consult;
                arr.splice(0, 1, this.obj);
                this.$store.commit('newConsult', arr);
            },
        },
        computed: {
            obj () {
                var a = {};
                a.consultFont = this.$store.state.app.consult[0].consultFont;
                a.consultColor = this.$store.state.app.consult[0].consultColor;
                a.right = this.$store.state.app.consult[0].right;
                a.top = this.$store.state.app.consult[0].top;
                a.width = this.$store.state.app.consult[0].width;
                a.height = this.$store.state.app.consult[0].height;
                a.radius = this.$store.state.app.consult[0].radius;
                return a;
            },
            consultRight: {
                get() {
                    return this.$store.state.app.consult[0].right.replace('px', '');
                },
                set(msg) {
                    this.obj.right = msg + 'px';
                    this.consult();
                }
            },
            consultTop: {
                get() {
                    return this.$store.state.app.consult[0].top.replace('px', '');
                },
                set(msg) {
                    this.obj.top = msg + 'px';
                    this.consult();
                }
            },
            consultHrefUrl: {
                get() {
                    return this.$store.state.app.consult[0].hrefUrl;
                },
                set(msg) {
                    this.obj.hrefUrl = msg;
                    this.consult();
                }
            },
            consultWidth: {
                get() {
                    return this.$store.state.app.consult[0].width.replace('px', '');
                },
                set(msg) {
                    this.obj.width = msg + 'px';
                    this.consult();
                }
            },
            consultHeight: {
                get() {
                    return this.$store.state.app.consult[0].height.replace('px', '');
                },
                set(msg) {
                    this.obj.height = msg + 'px';
                    this.consult();
                }
            },
            consultRadius: {
                get() {
                    return this.$store.state.app.consult[0].radius.replace('px', '');
                },
                set(msg) {
                    this.obj.radius = msg + 'px';
                    this.consult();
                }
            },
            // 详情图链接数组
            floatImgFileList: {
                get () {
                    return this.$store.state.floatImg.floatImgFileList;
                },
                set (value) {
                    this.$store.commit('newFloatImgFileList', value);
                }
            },
            // 绝对路径数组
            absoluteFloatImgUrls () {
                let arr = [];
                for (let i = 0; i < this.floatImgFileList.length; i++) {
                let obj = {};
        //          console.log(this.detailImgFileList[i].image_url);
                obj.url = Config.image_url + this.floatImgFileList[i].image_url;
                obj.name = this.floatImgFileList[i].name;
                console.log(obj);
                arr.push(obj);
                }
                return arr;
            },
            setComponentsItems() {
                return this.$store.state.app.setComponentsItems;
            },
            getComponentsItems() {
                return this.$store.state.app.getComponentsItems;
            }
        }
    };
</script>

<style lang="scss" scoped>

</style>