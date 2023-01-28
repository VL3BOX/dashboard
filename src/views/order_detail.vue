<template>
    <uc icon="el-icon-present" title="我的订单" :tabList="tabList">
        <div class="m-mall-detail">
            <div class="m-breadcrumb">
                <span @click="goBack" class="u-back"><i class="el-icon-arrow-left"></i> 返回</span>
            </div>

            <div class="m-content">
                <div class="m-address el-card">
                    <span>收件人：{{ address.actual_contact }}</span>
                    <span>联系电话：{{ address.actual_phone }}</span>
                    <span>收货地址： {{ address.actual_address }}</span>
                </div>
                <div class="m-order el-card" v-if="goods">
                    <img class="u-img" :src="goods.goods_images[0]" />
                    <div class="m-box">
                        <span class="u-title">{{ goods.title }}</span>
                        <span>订单编号：{{ order.order_no }}</span>
                        <span>下单时间：{{ order.created_at }}</span>
                        <span>购买数量：{{ order.goods_num }}</span>
                        <span>邮费：{{ goods.postage ? goods.postage / 100 + "元" : "包邮" }}</span>
                        <span>支付状态：{{ payStatus[order.pay_status] }} </span>
                        <span>订单状态：{{ orderStatus[order.order_status] }} </span>
                        <div class="u-consume">
                            <span>购买消耗：</span>
                            <div class="u-box">
                                <span v-if="goods.price_cny"
                                    >金箔：<b>{{ goods.price_cny * order.goods_num }}</b></span
                                >
                                <span v-if="goods.price_boxcoin"
                                    >盒币：<b>{{ goods.price_boxcoin * order.goods_num }}</b></span
                                >
                                <span v-if="goods.price_points"
                                    >积分：<b>{{ goods.price_points * order.goods_num }}</b></span
                                >
                            </div>
                        </div>
                        <span>备注：{{ order.remark || "-" }}</span>
                    </div>
                </div>
                <div class="m-button" v-if="closeButton(data.order)">
                    <template v-if="data.order.order_status == 0">
                        <el-button @click="cancel(data.order.id)">取消订单</el-button>
                        <el-button @click="open(data.order.id, 'address')">修改地址</el-button>
                        <el-button @click="open(data.order.id, 'remark')">添加备注</el-button>
                    </template>

                    <el-button @click="toConfirm(data.order.id)" v-if="data.order.order_status == 3"
                        >确认收货</el-button
                    >
                    <el-button @click="toPay(data)" v-if="showPay(data.order)">点击付款</el-button>
                </div>
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
    </uc>
</template>

<script>
import { updateOrderAddress, updateOrderRemark, getAddress, closeOrder, toPay, toConfirm } from "@/service/goods";
import { getOrderId } from "@/service/goods";
import { orderStatus, payStatus } from "../assets/data/mall.json";
import uc from "@/components/uc";
import { mallTab } from "@/assets/data/tabs.json";
export default {
    name: "orderDetail",
    components: { uc },
    data: function () {
        return {
            data: {},
            mode: "",
            dialogVisible: false,
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

            tabList: mallTab,
        };
    },
    computed: {
        id() {
            return this.$route.params.id;
        },
        pageIndex() {
            return this.$route.params.pageIndex;
        },
        address() {
            return this.data.shipAddress || {};
        },
        order() {
            return this.data.order;
        },
        goods() {
            return this.data.goods;
        },
        payStatus() {
            return payStatus;
        },
        orderStatus() {
            return orderStatus;
        },
        title() {
            return this.mode == "address" ? "修改收货地址" : "修改备注";
        },
    },
    methods: {
        load() {
            getOrderId(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
        loadAddress() {
            getAddress().then((res) => {
                this.addressList = res.data.data.list;
            });
        },
        // 订单关闭不显示按钮
        closeButton(data) {
            if (!data) return false;
            if (data.order_status == 1 || data.order_status == 2 || data.order_status == 7) return false;
            return true;
        },
        // 显示支付按钮
        showPay(data) {
            if (data) {
                const { order_status, pay_status } = data;
                if (order_status == 1 || order_status == 2 || order_status == 7) return false;
                return pay_status == 0 ? true : false;
            }
            return false;
        },
        // 确认收货
        toConfirm(id) {
            toConfirm(id).then(() => {
                this.$message({
                    message: "收货成功",
                    type: "success",
                });
                this.data.order.order_status = 4;
            });
        },
        goBack() {
            this.$router.push({
                name: "mall",
                params: {
                    pageIndex: this.pageIndex,
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
        // 关闭订单
        cancel(id) {
            closeOrder(id).then((res) => {
                this.$message({
                    message: "关闭订单成功",
                    type: "success",
                });
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.order_status = 1;
                    return item;
                });
            });
        },
        // 支付
        toPay(data) {
            const id = data.order.id;
            toPay(id).then(() => {
                this.$message({
                    message: "支付成功",
                    type: "success",
                });
                this.list = this.list.map((item) => {
                    if (item.order.id == id) item.order.pay_status = 1;
                    return item;
                });
            });
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

                              const list = this.addressList.filter(
                                  (item) => item.id == this.address_form.address_id
                              )[0];
                              if (list) {
                                  const { province, city, area, address, contact_name, contact_phone } = list;
                                  const actual_address = province + " " + city + " " + area + " " + address;
                                  this.data.shipAddress.actual_address = actual_address;
                                  this.data.shipAddress.actual_contact = contact_name;
                                  this.data.shipAddress.actual_phone = contact_phone;
                              }
                              this.close();
                          })
                        : updateOrderRemark(this.order_id, this.remark_form.remark).then(() => {
                              this.$message({
                                  message: "修改备注成功",
                                  type: "success",
                              });
                              this.data.order.remark = this.remark_form.remark;
                              this.close();
                          });
                }
            });
        },
    },
    mounted() {
        if (this.id) this.load();
    },
};
</script>
<style lang="less">
@import "../assets/css/order_detail.less";
</style>
