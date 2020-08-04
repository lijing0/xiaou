<template>
    <div class="content">
        <div class="head-wrap">
            <header>
                <div class="wrap">
                    <img src="../assets/images/public/arrow.jpg" alt="" @click="$router.back()">
                    <p>确认订单</p>
                    <div>
                        <span></span>
                        <span class="two"></span>
                        <span></span>
                    </div>
                </div>
            </header>
        </div>
        
        <div class="main">
            <!-- <h1>{{$store.state.priceAll}}</h1> -->
            <!-- 客户信息 -->
            <div class="costmer-information">
                <div class="wrap">
                    <div class="text">
                        <p class="p1"><span>收货人：{{userInfo.nickname}}</span> <span>{{userInfo.phone}}</span> </p>
                    <p class="p2">
                        <span class="medial-s1">收货地址：</span>
                        <span class="s2">北京市海淀区隐泉路清林院6号楼中公优就业总部3层</span></p>
                    </div>
                    <div class="img-box">
                        <img src="../assets/images/order/arrow.jpg" alt="">
                    </div>
                    
                </div>
            </div>
            <!-- 商品信息 -->
            <div class="pro-information">
                <div class="wrap" v-for="item in proList" :key="item.id">
                    <div class="pro">
                        <div class="left">
                            <img :src="$imgUrl+item.img" alt="">
                            <div class="text">
                                <p class="p1">{{item.goodsname}}</p>
                                <p class="p2">规格：50g</p>
                            </div>
                        </div>
                        <div class="right">
                            <span>￥</span>{{item.price.toFixed(2)}}
                        </div>
                    </div>
                    <div class="count">
                        <p>购买数量：</p>
                        <p>
                            <span>-</span>
                            <span class="num">{{item.num}}</span>
                            <span >+</span>
                        </p>
                    </div>
                    <div class="post">
                        <div class="wrap">
                            <div class="left">
                                配送方式
                            </div>
                            <div class="right">
                                京东快递
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <!-- 优惠卷 -->
            <div class="youhui">
                <div class="box1">
                    <div class="left">
                        优惠券
                    </div>
                    <div class="right">
                        无可用
                    </div>

                </div>
                <div class="box2">
                    <div class="left">
                        使用积分
                    </div>
                    <div class="right">
                        <input type="text" placeholder="输入积分">
                        <a href="">使用</a>
                        <p>可用<span>50</span>积分</p>
                    </div>

                </div>
            </div>
            <ul>
                <li>
                    <span>商品金额</span>
                    <i>￥{{price.toFixed(2)}}</i>
                </li>
                <li>
                    <span>运费</span>
                    <i>+￥0.00</i>
                </li>
                <li>
                    <span>优惠券</span>
                    <i>-￥0.00</i>
                </li>
                <li>
                    <span>会员优惠</span>
                    <i>-￥0.00</i>
                </li>
                <li>
                    <span>积分抵扣</span>
                    <i>-￥0.00</i>
                </li>
                
            </ul>
            <div class="submit">
                <p class="money">
                    实付金额：<span>￥{{price.toFixed(2)}}</span>
                </p>
                <a href="javascript:;" @click="submit">提交订单</a>

            </div>
        </div>
    </div>
</template>
<script>
import {Toast} from 'vant'
export default {
    data(){
        return{
            price:0,
            userInfo:{},
            proList:[],
        }
    },
    mounted(){
        this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')):{};

        this.price = JSON.parse(sessionStorage.getItem('allPrice'));
        

        this.proList = JSON.parse(sessionStorage.getItem('checkPro'));
        console.log(this.proList)
        
       
    },
    methods:{
        submit(){
            Toast('您的订单已提交，继续购物吧！')
            this.$router.push('/index');
        }
    }
    
}
</script>

<style lang="" scoped>
@import '../assets/css/pro-order.css';
</style>