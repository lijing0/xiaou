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
        <van-image
          src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1266135263,3184502072&fm=26&gp=0.jpg"
        />
        <p>限时抢购</p>
      </van-grid-item>
      <van-grid-item>
        <van-image
          class="imgs"
          src="https://pic.rmb.bdstatic.com/4c61a8157d4053467f8d4acc720bee25.jpeg@wm_2,t_55m+5a625Y+3L+epuuagvOaVmeiCsg==,fc_ffffff,ff_U2ltSGVp,sz_13,x_9,y_9"
        />
        <p>积分商城</p>
      </van-grid-item>
      <van-grid-item>
        <van-image class="imgss" src="https://t7.baidu.com/it/u=1259718046,1103776329&fm=193" />
        <p>联系我们</p>
      </van-grid-item>
      <van-grid-item to="classify">
        <van-image
          class="imgsss"
          src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3230949816,2595020962&fm=26&gp=0.jpg"
        />
        <p>商品分类</p>
      </van-grid-item>
    </van-grid>
    <!-- 限时秒杀，品牌上新。。。 -->
    <div class="sale">
      <div class="left">
        <a href="#">
          <h3>限时秒杀</h3>
          <p class="des">每天零点场 好货秒不停</p>
          <p class="time">
            <span>{{hours}}</span>:
            <span>{{minutes}}</span>:
            <span>{{seconds}}</span>
          </p>
          <img
            class="pic"
            src="https://img.alicdn.com/bao/uploaded/bao/upload/TB1TY6khoD1gK0jSZFGXXbd3FXa.png_400x400q60.jpg"
            alt
          />
          <div class="price">
            ￥
            <span>14.8</span>
          </div>
        </a>
      </div>
      <div class="right">
        <div class="top">
          <div class="top-left">
            <h3>
              品牌上新
              <span>折</span>
            </h3>
            <p class="des">每天9点 抢大牌</p>
          </div>
          <a href="#">
            <img
              class="top-right"
              src="https://img.alicdn.com/bao/uploaded/bao/upload/TB193TabPMZ7e4jSZFOXXX7epXa.png_400x400q60.jpg"
              alt
            />
          </a>
        </div>
        <div class="bottom clearfix">
          <div class="left">
            <h3>每日十件</h3>
            <p class="des">只为你选好货</p>
            <a href="#">
              <img
                src="https://img.alicdn.com/bao/uploaded/i4/2559015013/O1CN01rVM9Jo1mu05mEgVej_!!2559015013.jpg_400x400q60.jpg"
                alt
              />
            </a>
          </div>
          <div class="right">
            <h3>拼啊</h3>
            <p class="des">超级好价拼团</p>
            <a href="#">
              <img
                src="https://img.alicdn.com/bao/uploaded/i4/728443962/O1CN01SYRnlA1f8dp1PBCoR_!!728443962-0-lubanu-s.jpg"
                alt
              />
            </a>
          </div>
        </div>
      </div>
    </div>
    <!-- <van-count-down :time="timer" /> -->
    <!-- 商品切换 -->
    <van-tabs type="card">
      <van-tab title="热门推荐">
        <van-card
          v-for="(item,index) in hotsList"
          :key="index"
          @click="toDetail(item.id)"
          class="card"
          :price="item.price"
          desc="热卖好货快来抢！！！"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
          tag="热卖"
        ></van-card>
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="item in newsList"
          :key="item.id"
          @click="toDetail(item.id)"
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
          @click="toDetail(item.id)"
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
import axios from "axios";
import { getbanner, getseckill, getindexgoods } from "../util/axios";
export default {
  data() {
    return {
      images: [],
      hotsList: [],
      newsList: [],
      goodsList: [],
      timer: 30 * 60 * 60 * 1000,
      start: 0,
      end: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  },
  mounted() {
    //组件一加载 就调取并发处理
    axios.all([getbanner(), getindexgoods(), getseckill()]).then(
      axios.spread((banners, goods, seckList) => {
        this.images = banners.list;
        console.log(goods.list);
        this.hotsList = goods.list[0].content;
        this.newsList = goods.list[1].content;
        this.goodsList = goods.list[2].content;
        console.log(seckList, "秒杀信息");
        this.start = seckList.list[0].begintime;
        this.end = seckList.list[0].endtime;
        let timer = this.end - new Date().getTime();
        let t = setInterval(() => {
          timer--;
        this.hours = parseInt((timer / 1000 / 60 / 60) % 24);
        this.minutes = parseInt((timer / 1000 / 60) % 60);
        this.seconds = parseInt((timer / 1000) % 60);
          if (this.minutes < 0) {
            clearInterval(t);
          }
        });
        
        //倒计时思路： 获取结束时间与当前时间进行差值
        //把得到的结果进行转化
      })
    );
  },
  methods: {
    // 点击去详情页
    toDetail(id) {
      this.$router.push({
        path: "/detail?id=" + id,
        query: {
          id,
        },
      });
    },
  },
};
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
.imgs,
.imgss,
.imgsss {
  width: 40px;
  height: 40px;
}
.sale {
  width: 375px;
  height: 190px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.sale h3 {
  font-size: 15px;
  color: #ff064f;
  letter-spacing: 2px;
  margin-top: 8px;
}
.sale .des {
  font-size: 11px;
  color: #999;
  margin: 3px;
}
.sale .left {
  position: relative;
  width: 188px;
  height: 190px;
  padding-left: 8px;
  box-sizing: border-box;
  background-color: #fff;
}
.sale .left h3 img {
  width: 11px;
  height: 15px;
  margin-right: 5px;
  vertical-align: -3px;
}
.sale .left .time {
  font-size: 13px;
}
.sale .left .time span {
  display: inline-block;
  background-color: #333;
  color: #fff;
  line-height: 21px;
  padding: 0 4px;
  border-radius: 0.25px;
  margin: 0 0.2px;
}
.sale .left .time i {
  display: inline-block;
  line-height: 20px;
  color: #333;
  padding: 0 12.5px 0 10.5px;
  /* background: url(../images/index_images/bg.jpg) no-repeat; */
  background-size: 100% 100%;
}
.sale .left .pic {
  display: block;
  width: 118px;
  height: 100px;
  margin: 9px auto 0;
}
.sale .left .price {
  position: absolute;
  right: 15px;
  bottom: 15px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #ff064f;
  color: #fff;
  font-size: 8px;
  line-height: 44px;
  text-align: center;
}
.sale .left .price span {
  font-size: 12px;
}
.sale .right {
  width: 186px;
  height: 190px;
  box-sizing: border-box;
}
.sale .right p {
  margin-left: 0;
}
.sale .right .top {
  width: 186px;
  height: 94px;
  display: flex;
  align-content: flex-start;
  background-color: #fff;
}
.sale .right .top .top-left {
  padding-left: 8px;
}
.sale .right .top .top-left h3 span {
  display: inline-block;
  width: 16px;
  height: 12.5px;
  line-height: 12.5px;
  background-color: #ff064f;
  text-align: center;
  font-size: 10px;
  border-radius: 1px;
  color: #fff;
  margin-left: 4px;
  vertical-align: 2px;
}
.sale .right .top .top-left img {
  width: 46px;
  height: 16px;
  margin-top: 15px;
}
.sale .right .top-right {
  width: 64px;
  height: 89px;
  margin-top: 4px;
  margin-left: 10px;
}
.sale .right .bottom {
  display: flex;
  width: 186px;
  height: 95px;
  margin-top: 1px;
}
.sale .right .bottom .left {
  width: 92.5px;
  height: 95px;
  background-color: #fff;
}
.sale .right .bottom .left img {
  width: 32px;
  height: 51px;
  margin-left: 20px;
}
.sale .right .bottom .right {
  width: 92.5px;
  height: 95px;
  background-color: #fff;
  padding-left: 8px;
  margin-left: 2px;
}
.sale .right .bottom .right img {
  width: 52px;
  height: 44px;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
