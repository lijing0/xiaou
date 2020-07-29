<template>
    <div>
        <!-- 顶部 navBar -->
        <van-nav-bar :title="$route.meta.title">
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="$imgUrl+image.img" />
            </van-swipe-item>
        </van-swipe>
        <!-- 活动模块 -->
        <van-grid :border="false" :column-num="4" :gutter="10">
            <van-grid-item>
                <van-image src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1266135263,3184502072&fm=26&gp=0.jpg" />
                <p>限时抢购</p>
            </van-grid-item>
            <van-grid-item>
                <van-image class="imgs" src="https://pic.rmb.bdstatic.com/4c61a8157d4053467f8d4acc720bee25.jpeg@wm_2,t_55m+5a625Y+3L+epuuagvOaVmeiCsg==,fc_ffffff,ff_U2ltSGVp,sz_13,x_9,y_9" />
                <p>积分商城</p>
            </van-grid-item>
            <van-grid-item>
                <van-image class="imgss" src="https://t7.baidu.com/it/u=1259718046,1103776329&fm=193" />
                <p>联系我们</p>
            </van-grid-item>
            <van-grid-item to='classify'>
                <van-image class="imgsss" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3230949816,2595020962&fm=26&gp=0.jpg" />
                <p>商品分类</p>
            </van-grid-item>
        </van-grid>
        <!-- <van-count-down :time="timer" /> -->
        <!-- 商品切换 -->
        <van-tabs type="card">
            <van-tab title="热门推荐">
                <van-card
                    v-for="item in hotsList"
                    :key="item.id"
                    class="card"
                    :price="item.price"
                    desc="热卖好货快来抢！！！"
                    :title="item.goodsname"
                    :thumb="$imgUrl+item.img"
                    tag="热卖"
                />
            </van-tab>
            <van-tab title="发现新品">
                <van-card
                    v-for="item in newsList"
                    :key="item.id"
                    class="card"
                    :price="item.price"
                    desc="新品发售预订"
                    :title="item.goodsname"
                    :thumb="$imgUrl+item.img"
                    tag="新品"
                />
            </van-tab>
            <van-tab title="全部商品">
                <van-card
                    v-for="item in goodsList"
                    :key="item.id"
                    class="card"
                    :price="item.price"
                    desc="快来了解一下该商品吧"
                    :title="item.goodsname"
                    :thumb="$imgUrl+item.img"
                />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import axios from 'axios'
import { getbanner, getseckill, getindexgoods } from '../util/axios'
export default {
    data() {
        return {
            images: [],
            hotsList: [],
            newsList: [],
            goodsList:[],
            timer:30 * 60 * 60 * 1000,
            start:0,
            end:0
        }
    },
    mounted() {
        //组件一加载 就调取并发处理
        axios.all([getbanner(), getindexgoods(),getseckill()]).then(
            axios.spread((banners, goods,seckList) => {
                this.images = banners.list
                console.log(goods.list)
                this.hotsList = goods.list[0].content
                this.newsList = goods.list[1].content
                this.goodsList = goods.list[2].content
                console.log(seckList,'秒杀信息')
                this.start = seckList.begintime
                 this.end = seckList.endtime
                 let timer = this.end - new Date().getTime()
                 //倒计时思路： 获取结束时间与当前时间进行差值
                 //把得到的结果进行转化
            })
        )
    },
    methods: {},
}
</script>

<style  lang="" scoped>
.my-swipe .van-swipe-item img {
    height: 180px;
    width: 100%;
}
.card {
    background: #fff !important;
    margin-bottom: 10px !important;
}
.imgs,.imgss,.imgsss{
    width: 40px;
    height: 40px;
}
</style>
