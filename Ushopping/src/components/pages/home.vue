<template>
  <div class="home">
    <!-- 头部 -->
    <div class="top">
      <!-- <img src="../../assets/images/wine/logo1.png" alt="logo" /> -->
      <input type="search" placeholder="请输入关键词进行搜索" />
    </div>
    <!-- 导航 -->
    <div class="navlist">
      <ul>
        <li v-for="cate of catelist" :key="cate.id">
          <a href="#">{{ cate.catename }}</a>
        </li>
      </ul>
      <p class="arrow"></p>
    </div>
    <!-- banner 自动轮播 -->
    <mt-swipe class="banner">
      <mt-swipe-item v-for="item of bannerarr" :key="item.id">
        <img :src="item.img" alt="pic" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 功能导航 -->
    <div class="funnav">
      <div class="icons">
        <a href="#">
          <img src="../../assets/images/icon_1.jpg" alt="icon_1" />
          <i>限时抢购</i>
        </a>
        <a href="#">
          <img src="../../assets/images/icon_2.jpg" alt="icon_2" />
          <i>积分商城</i>
        </a>
        <a href="#">
          <img src="../../assets/images/icon_3.jpg" alt="icon_3" />
          <i>联系我们</i>
        </a>
        <a href="javascript:;" @click="$router.push('/cate')">
          <img src="../../assets/images/icon_4.jpg" alt="icon_4" />
          <i>商品分类</i>
        </a>
      </div>
    </div>
    <!-- 限时秒杀 -->
    <div class="limtime"></div>
    <!-- 广告 -->
    <div class="pd">
      <a href="#">
        <img src="../../assets/images/bar.jpg" alt="bar" />
      </a>
    </div>
    <!-- 商品展示 -->
    <div class="goods">
      <div class="bar">
        <div
          v-for="(item,idx) of btnarr"
          :key="idx"
          :class="{active:btnactive == idx}"
          @click="btnactive = idx"
        >{{ item }}</div>
      </div>
      <div>
        <div class="main" v-for="(good,idx) of goodsarr" :key="idx" v-show="btnactive == idx">
          <ul
            class="tabContainer"
            v-for="item of good.content"
            :key="item.id"
            @click="$router.push('/detail/'+item.id)"
          >
            <li>
              <a href="javascript:;">
                <img :src="item.img" alt="shop" />
              </a>
            </li>
            <li class="content">
              <h1>{{ item.goodsname}}</h1>
              <h3>现价￥{{item.price}}</h3>
              <p>市场价格￥{{ item.market_price}}</p>
              <input type="button" value="立即抢购" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnactive: 0,
      btnarr: ["热门推荐", "发现好货", "只看专场"],
      catelist: [],
      bannerarr: [],
      goodsarr: []
    };
  },
  methods: {
    //获取分类信息
    getcate() {
      return this.$axios.get("/api/getcate");
    },
    // 获取轮播图
    getbanner() {
      return this.$axios.get("/api/getbanner");
    },
    //
    getindexgoods() {
      return this.$axios.get("/api/getindexgoods");
    }
  },
  mounted() {
    this.$axios
      .all([this.getcate(), this.getbanner(), this.getindexgoods()])
      .then(
        this.$axios.spread((cateres, bannerres, indgoodsres) => {
          this.catelist = cateres.data.list;
          this.bannerarr = bannerres.data.list;
          this.goodsarr = indgoodsres.data.list;
        })
      );
  }
};
</script>
<style lang="stylus" scoped>
body html {
  width: 100%;
}
.top {
  display: flex;
  height: 0.8rem;
  margin: 0.3rem 0;
  padding-bottom: 0.2rem;
  width: 100%;
  border-bottom: 1px solid #333;
  background: pink

  img {
    width: 2rem;
    height: 0.4rem;
    margin: 0 0.3rem 0 0.2rem;
  }

  input {
    color: rgba(255, 255, 300, 0.7);
    border: 1px solid rgba(255, 255, 300, 0.5);
    text-align: center;
    margin: 0.2rem 0 0 3rem;
  }
}

.navlist {
  position: relative;
}

.navlist ul {
  overflow: hidden;
  margin-left: 0.2rem;
}

.navlist ul li {
  float: left;
  margin-right: 0.2rem;
}

.navlist ul li a {
  font: bold 0.3rem '仿宋';
  color: #820000;
  text-decoration: none;
}

.navlist .arrow {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.76rem;
  height: 0.35rem;
  background: #ffffff url('../../assets/images/arrow.jpg') no-repeat center / 0.35rem 0.21rem;
}

.banner {
  height: 2.9rem;
  margin: 0.2rem 0;

  img {
    width: 100%;
    height: 3.1rem;
  }
}

.funnav {
  .icons {
    display: flex;
    justify-content: space-between;
    padding: 0 0.37rem 0.16rem 0.37rem;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #820000;

      i {
        font: 0.28rem / 0.69rem '微软雅黑';
      }

      img {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
}

.limtime {
  margin: 0.2rem 0;
  width: 100%;
  height: 3rem;
  background-color: #ff0;
}

.pd img {
  margin: 0.2rem 0;
  width: 100%;
  height: auto;
}

.goods {
  .bar {
    border: 1px solid #d2d2d2;
    margin: 0.2rem;
    display: flex;
    justify-content: space-between;

    div {
      flex-grow: 1;
      border-left: 1px solid #d0d0d0;
      font: 0.28rem / 0.68rem '微软雅黑';
      text-align: center;
      // color: #0b0b0b;
    }
  }

  .active {
    // a {
    // color: #fff;
    // }
    color: white;
    background-color:lightblue;
  }

  .main {
    height: 3rem;

    .tabContainer {
      display: flex;
      height: 2.99rem;
      border: 1px solid #e9e9e9;
      margin-bottom: 0.34rem;
      box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.4);
      
      img {
        width: 2.16rem;
        height: 2.2rem;
        padding: 0.53rem 0 0 0.36rem;
      }

      .content {
        padding-left: 0.52rem;

        h1 {
          font: 0.3rem / 0.58rem '微软雅黑';
          color: #000;
          padding-top: 0.3rem;
        }

        h3 {
          font: 0.3rem / 0.51rem '微软雅黑';
          color: red;
        }

        p {
          font: 0.24rem / 0.6rem '微软雅黑';
          margin-bottom: 0.12rem;
          color: #9a9a9a;
        }

        input {
          font: 0.24rem / 0.52rem '微软雅黑';
          color: #fff6f2;
          padding: 0 0.35rem;
          background: skyblue;
          border-radius: 0.04rem;
        }
      }
    }
  }
  .main ul:last-child{
    margin-bottom 1.3rem
  }
}
</style>