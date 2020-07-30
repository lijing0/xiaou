<template>
    <div>
        <!-- 顶部导航 -->
        <van-nav-bar
            @click-left="$router.back()"
            :title="$route.meta.title"
            left-text="返回"
            left-arrow
        ></van-nav-bar>
        <h3>商品描述</h3>
        <div v-html="detailInfo.description"></div>
        <!-- 商品导航 -->
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" />
            <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon1" />
            <van-goods-action-button type="danger" text="加入购物车" @click="onClickButton" />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant'

import { getgoodsinfo,cartadd } from '../util/axios'
export default {
    data() {
        return {
            detailInfo: {},
        }
    },
    mounted() {
        this.getGoodsDetail()
    },
    methods: {
        //封装获取商品详情的方法
        getGoodsDetail() {
            getgoodsinfo({
                id: this.$route.query.id,
            }).then((res) => {
                console.log(res, '详情')
                if (res.code == 200) {
                    this.detailInfo = res.list[0]
                }
            })
        },
        onClickIcon() {
            this.$router.push('/car')
        },
        onClickIcon1() {
            this.$router.push('/classify')
        },
        onClickButton() {
            //调取加入购物车的方法
            let isLogin =JSON.parse(sessionStorage.getItem('userInfo')) ? true: false
            if(isLogin){
                //调取加入购物车方法
                cartadd({
                    uid:JSON.parse(sessionStorage.getItem('userInfo')).uid,
                    goodsid:this.$route.query.id,
                    num:1//数量 是取出当前产品数量
                })
                .then(res=>{
                    if(res.code==200){
                         Toast(res.msg)
                         //跳转到购物车页面
                         this.$router.push('/car')
                    }else{
                        Toast(res.msg)
                    }
                })
            }else{
                Toast('请先登录')
                //跳转到登录页面
                this.$router.push('/login')
            }
        },
    },
}
</script>

<style  lang="" scoped>
</style>
