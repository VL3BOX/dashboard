<template>
    <div class="m-page-record">
        <!-- 标题 -->
        <h2 class="u-title">
            <span class="i-title"> <i class="el-icon-document"></i> 商城订单</span>
        </h2>
        <!--  -->
        <div class="m-content">
            <el-table :data="list">
                <el-table-column prop="order.created_at" label="兑换时间" width="180"> </el-table-column>
                <el-table-column label="兑换商品">
                    <template slot-scope="scope">
                        <div class="m-line">
                            {{ scope.row.goods.title }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单号">
                    <template slot-scope="scope">
                        <div class="m-line">
                            {{ scope.row.order.order_no }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="order.goods_num" label="数量" width="80"> </el-table-column>
                <el-table-column label="订单状态" width="160">
                    <template slot-scope="scope">
                        {{ orderStatus[scope.row.order.order_status] }}
                    </template>
                </el-table-column>
                <el-table-column label="付款状态" width="160">
                    <template slot-scope="scope">
                        {{ payStatus[scope.row.order.pay_status] }}
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="order.remark" label="备注"> </el-table-column> -->

                <el-table-column label="操作" min-width="200px">
                    <template slot-scope="scope">
                        <div class="m-button">
                            <el-button type="text" @click="showDetail(scope.row.order.id)">查看详情</el-button>
                            <!-- 未发货允许操作： 取消订单&修改地址 -->
                            <template v-if="scope.row.order.order_status == 0">
                                <el-button type="text" @click="open(scope.row.order.id, 'address')">修改地址</el-button>
                                <el-button type="text" @click="open(scope.row.order.id, 'remark')">添加备注</el-button>
                                <el-popconfirm
                                    confirm-button-text="确定"
                                    cancel-button-text="取消"
                                    icon="el-icon-info"
                                    title="确定取消吗？"
                                    @confirm="cancel(scope.row.order.id)"
                                >
                                    <el-button slot="reference" type="text">取消订单</el-button>
                                </el-popconfirm>
                            </template>
                            <!-- 已发货操作： 确认收货&申请退货 -->
                            <template v-if="(scope.row.order.order_status == 3)">
                                <el-button type="text">确认收货</el-button>
                                <el-button type="text">申请退货</el-button>
                            </template>

                            <!-- 已收货操作： 评价 -->
                            <template v-if="(scope.row.order.order_status == 4)">
                                <el-button type="text">评价商品</el-button>
                            </template>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="m-record-pages">
            <el-pagination
                background
                layout="total, prev, pager, next,jumper"
                :page-size="pageSize"
                :total="total"
                :current-page.sync="pageIndex"
                :hide-on-single-page="true"
            ></el-pagination>
        </div>

        <!-- 弹窗 -->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="close"
            custom-class="m-edit-dialog"
        >
            <template v-if="mode == 'address'">
                <el-form ref="address_form" :model="address_form" :rules="address_rules" class="demo-form-inline">
                    <el-form-item label="选择收货地址" prop="address_id">
                        <el-select v-model="address_form.address_id">
                            <el-option
                                :label="`【 ${item.contact_name} ${item.contact_phone} 】 ${item.province}${item.city}${item.area}${item.address}`"
                                :value="item.id"
                                v-for="(item, i) in addressList"
                                :key="i"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <div class="m-button">
                            <el-button @click="close">取 消</el-button>
                            <el-button type="primary" @click="submit('address_form')">确定</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </template>
            <template v-else>
                <el-form ref="remark_form" :model="remark_form" :rules="remark_rules" class="demo-form-inline">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="remark_form.remark">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="m-button">
                            <el-button @click="close">取 消</el-button>
                            <el-button type="primary" @click="submit('remark_form')">确定</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getOrder, updateOrderAddress, updateOrderRemark, getAddress } from "@/service/goods";
import { payStatus, orderStatus } from "@/assets/data/mall.json";
export default {
    name: "record",
    data: function () {
        return {
            list: [],

            total: 0,
            pageIndex: 1,
            pageSize: 10,

            payStatus,
            orderStatus,

            dialogVisible: false,
            mode: "",
            order_id: "",
            addressList: [],
            address_form: {
                address_id: "",
            },
            address_rules: {
                address_id: [{ required: true, message: "请选择地址", trigger: "change" }],
            },
            remark_form: {
                remark: "",
            },
            remark_rules: {
                remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
            },
        };
    },
    computed: {
        params() {
            const _params = {
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
            };
            return _params;
        },
        title() {
            return this.mode == "address" ? "修改收货地址" : "修改备注";
        },
    },
    methods: {
        load() {
            getOrder(this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
            });
        },
        loadAddress() {
            getAddress().then((res) => {
                this.addressList = res.data.data.list;
            });
        },
        showDetail(id) {
            this.$router.push({
                name: "order-detail",
                params: {
                    id,
                },
            });
        },
        open(id, type) {
            this.order_id = id;
            if (type == "address") this.loadAddress();
            if (this.$refs.address_form !== undefined) this.$refs.address_form.clearValidate();
            if (this.$refs.remark_form !== undefined) this.$refs.remark_form.clearValidate();
            this.mode = type;
            this.dialogVisible = true;
        },
        close() {
            this.dialogVisible = false;
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.mode == "address"
                        ? updateOrderAddress(this.order_id, this.address_form.address_id).then(() => {
                              this.$message({
                                  message: "修改地址成功",
                                  type: "success",
                              });
                              this.close();
                          })
                        : updateOrderRemark(this.order_id, this.remark_form.remark).then(() => {
                              this.$message({
                                  message: "修改备注成功",
                                  type: "success",
                              });
                              this.close();
                          });
                }
            });
        },
        // 关闭订单
        cancel(id) {

        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/record.less";
</style>
