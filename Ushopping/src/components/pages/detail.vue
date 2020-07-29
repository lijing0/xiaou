<template>
  <div class="detail">
    <mt-header title="商品详情" class="head">
      <mt-button icon="back" slot="left" @click="$router.go(-1)">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <mt-swipe class="banner">
      <!-- <mt-swipe-item>
        <img src="../../assets/images/wine/17.jpg" alt="pic" />
      </mt-swipe-item>
      <mt-swipe-item> -->
        <img :src="info.img" alt="pic" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="top">
      <h2 class="title">{{info.goodsname}}</h2>
      <p>
        <i>￥{{info.price}}</i>
        <span>市场价格：￥{{info.market_price}}</span>
      </p>
    </div>
    <div class="main">
      <ul>
        <li class="line1">
          <div class="txt">
            <img src="../../assets/images/wine/small.png" alt />
            <h3>是否新品：</h3>
            <div>
              <mt-badge color="#991000" size="normal" v-if="info.isnew == 1">是</mt-badge>
              <mt-badge color="#991000" size="normal" v-else>否</mt-badge>
            </div>
          </div>
        </li>
        <li class="line2">
          <div class="txt">
            <img src="../../assets/images/wine/small.png" alt />
            <h3>是否热销：</h3>
            <div>
              <mt-badge color="#991000" size="normal" v-if="info.ishot == 1">是</mt-badge>
              <mt-badge color="#991000" size="normal" v-else>否</mt-badge>
            </div>
          </div>
        </li>
        <li class="last">
          <div class="txt">
            <img src="../../assets/images/wine/small.png" alt />
            <h3>{{info.specsname}} :</h3>
            <div>
              <mt-badge
                color="#991000"
                size="normal"
                v-for="(item,idx) of info.specsattr"
                :key="idx"
              >{{item}}</mt-badge>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="descript" v-html="info.description"></div>
    <img :src="info.img" />
    <div class="bottom">
      <!-- <button>加入购物车</button> -->
      <button class="btn" @click="addcart(info.id)">加入购物车</button>
    </div>
    <div class="toast" v-show="toastShow">{{toastText}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "",
      toastText: "添加成功",
      toastShow: false
    };
  },
  methods: {
    addcart(id) {
      let data = {};
      data.num = 1;
      if (sessionStorage.getItem("umember")) {
        data.uid = JSON.parse(sessionStorage.getItem("umember")).uid;
      } else {
        this.$router.push("/login");
      }
      data.goodsid = id;
      this.$http.post("/api/cartadd", data).then(res => {
        if (res.data.code == 200) {
          this.toastShow = true;
          setTimeout(() => {
            console.log(111);
            this.toastShow = false;
            console.log(222);
          }, 1000);
        } else {
          alert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    if (this.$route.params.goodid) {
      this.$axios({
        url: "/api/getgoodsinfo",
        params: { id: this.$route.params.goodid }
      }).then(res => {
        this.info = res.data.list[0];
        this.info.specsattr = this.info.specsattr.split(",");
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.detail {
  .head {
    background-color: rgb(130, 0, 0);
  }

  .banner {
    height: 7rem;
    margin: 0.2rem 0;
    margin: 0;

    img {
      width: 100%;
      height: 7rem;
    }
  }

  .top {
    margin: 0.2rem 0 0.2rem 0.3rem;

    h2 {
      font-size: 0.6rem;
      font-weight: 600;
    }

    i {
      display: inline-block;
      color: red;
      font-size: 0.5rem;
      margin: 0.3rem 0.3rem 0.3rem 0;
    }
  }

  .main {
    img {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.2rem;
    }

    li {
      margin-bottom: 0.2rem;

      .txt {
        display: flex;

        h3 {
          margin-top: 0.1rem;
          width: 1.5rem;
        }
      }
    }
  }

  .descript {
    padding-bottom: 1.3rem;
    width: 100%;
    margin: 0.3rem 0;
  }

  img {
    width: 100%;
  }

  .bottom {
    position: fixed;
    bottom: 1rem;

    .btn {
      width: 100vw;
      height: 0.9rem;
      border-radius: 0.1rem;
      background-color: #820000;
      color: white;
      font-size: 0.3rem;
    }
  }

  .toast {
    position: fixed;
    z-index: 2000;
    left: 50%;
    top: 45%;
    transition: all 0.5s;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    -o-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    text-align: center;
    border-radius: 5px;
    color: #FFF;
    background: rgba(17, 17, 17, 0.7);
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    max-width: 150px;
  }
}
</style>